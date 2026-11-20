# Step 4 checks (run each block on its own in the Supabase SQL editor)

Each block ends by showing one line that starts with PASS or FAIL.

## Check A: security is ON for every table
Expect 10 rows, all with `security_on` = true.
```sql
select tablename, rowsecurity as security_on
from pg_tables
where schemaname = 'public'
order by tablename;
```

## Check B: a logged-out visitor is refused
Expect: `PASS: logged-out visitor was refused (read and write)`
```sql
create function pg_temp.check_logged_out() returns text
language plpgsql as $$
begin
  perform set_config('role', 'anon', true);   -- pretend to be a logged-out visitor
  begin
    perform count(*) from public.daily_entries;
    return 'FAIL: logged-out visitor could read the table';
  exception when insufficient_privilege then
    null;
  end;
  begin
    insert into public.daily_entries (entry_date) values ('1999-01-01');
    return 'FAIL: logged-out visitor could write to the table';
  exception when insufficient_privilege then
    null;
  end;
  return 'PASS: logged-out visitor was refused (read and write)';
end $$;
select pg_temp.check_logged_out() as result;
```

## Check C: my logged-in account can add and read one test row
Expect: `PASS: test row added, marked as mine, and read back`
```sql
create function pg_temp.check_logged_in() returns text
language plpgsql as $$
declare n int; mine boolean;
begin
  -- pretend to be my own logged-in account (looked up here, nothing to copy)
  perform set_config('request.jwt.claims',
    json_build_object('sub', (select id from auth.users limit 1), 'role', 'authenticated')::text, true);
  perform set_config('role', 'authenticated', true);
  insert into public.daily_entries (entry_date, mood) values ('1999-01-01', 3);
  select count(*), bool_and(user_id = auth.uid()) into n, mine
    from public.daily_entries where entry_date = '1999-01-01';
  if n = 1 and mine then
    return 'PASS: test row added, marked as mine, and read back';
  end if;
  return 'FAIL: rows found = ' || n || ', marked as mine = ' || coalesce(mine::text, 'null');
end $$;
select pg_temp.check_logged_in() as result;
```

## Check D: remove the test row
Expect `test_rows_left` = 0.
```sql
delete from public.daily_entries where entry_date = '1999-01-01';
select count(*) as test_rows_left from public.daily_entries;
```
