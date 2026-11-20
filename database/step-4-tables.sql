-- Health Tracker – Step 4: tables and security rules
-- Built from the approved data-plan.md. Run once in the Supabase SQL editor.
-- No passwords, keys or email addresses are in this file.

begin;

-- A small helper that stamps "last changed" on a row whenever it is edited.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------
-- Table 1: Daily entries (one row = one day)
-- ---------------------------------------------------------------
create table public.daily_entries (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null default auth.uid() references auth.users (id) on delete cascade,
  entry_date      date not null,
  stepped_out     boolean,
  worked_out      boolean,
  body_pain       smallint check (body_pain between 0 and 3),
  fatigue         smallint check (fatigue between 0 and 3),
  water_glasses   smallint check (water_glasses >= 0),
  protein_shake   boolean,
  alcohol         boolean,
  alcohol_drinks  smallint check (alcohol_drinks >= 1),
  poop_count      smallint check (poop_count >= 0),
  bloating        boolean,
  sleep_hours     numeric(3,1) check (sleep_hours between 0 and 24 and sleep_hours * 2 = trunc(sleep_hours * 2)),
  had_period      boolean,
  period_flow     text check (period_flow in ('light', 'medium', 'heavy')),
  period_cramps   smallint check (period_cramps between 0 and 3),
  thyronorm_taken boolean,
  combiflam_taken boolean,
  stress          smallint check (stress between 0 and 3),
  mood            smallint check (mood between 1 and 5),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (user_id, entry_date),
  constraint drinks_only_if_alcohol_yes
    check (alcohol_drinks is null or alcohol is true),
  constraint period_details_only_if_period_yes
    check ((period_flow is null and period_cramps is null) or had_period is true)
);

-- Table 2: Workout types (my list)
create table public.workout_types (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name       text not null check (length(trim(name)) > 0),
  in_use     boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index workout_types_name_unique on public.workout_types (user_id, lower(name));

-- Table 3: Workouts done each day
create table public.daily_workouts (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null default auth.uid() references auth.users (id) on delete cascade,
  entry_id        uuid not null references public.daily_entries (id) on delete cascade,
  workout_type_id uuid not null references public.workout_types (id) on delete restrict,
  created_at      timestamptz not null default now(),
  unique (entry_id, workout_type_id)
);
create index daily_workouts_type_idx on public.daily_workouts (workout_type_id);

-- Table 4: Food triggers (my list)
create table public.food_triggers (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name       text not null check (length(trim(name)) > 0),
  in_use     boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index food_triggers_name_unique on public.food_triggers (user_id, lower(name));

-- Table 5: Food triggers each day
create table public.daily_food_triggers (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null default auth.uid() references auth.users (id) on delete cascade,
  entry_id        uuid not null references public.daily_entries (id) on delete cascade,
  food_trigger_id uuid not null references public.food_triggers (id) on delete restrict,
  created_at      timestamptz not null default now(),
  unique (entry_id, food_trigger_id)
);
create index daily_food_triggers_trigger_idx on public.daily_food_triggers (food_trigger_id);

-- Table 6: Period setup (only ever one row)
create table public.period_setup (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null default auth.uid() references auth.users (id) on delete cascade unique,
  last_period_start      date,
  usual_cycle_length     smallint check (usual_cycle_length >= 1),
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

-- Table 7: Vitamin D shots
create table public.vitamin_d_shots (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  shot_date  date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, shot_date)
);

-- Table 8: Blood tests (one row = one visit)
create table public.blood_tests (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  test_date  date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Table 9: Blood test results (one row = one measure from one visit)
create table public.blood_test_results (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null default auth.uid() references auth.users (id) on delete cascade,
  blood_test_id uuid not null references public.blood_tests (id) on delete cascade,
  measure       text not null check (length(trim(measure)) > 0),
  value         numeric not null,
  unit          text not null check (length(trim(unit)) > 0),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (blood_test_id, measure)
);

-- Table 10: Monthly reports (several per month are allowed)
create table public.monthly_reports (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  report_month date not null check (extract(day from report_month) = 1),
  report_date  date not null default current_date,
  summary      text not null,
  early_look   boolean not null default false,
  days_logged  smallint not null check (days_logged >= 0),
  based_on     jsonb not null default '{}'::jsonb,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- "Last changed" stamps
-- ---------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'daily_entries', 'workout_types', 'food_triggers', 'period_setup',
    'vitamin_d_shots', 'blood_tests', 'blood_test_results', 'monthly_reports'
  ] loop
    execute format(
      'create trigger set_updated_at before update on public.%I
         for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- ---------------------------------------------------------------
-- Security: locked for everyone except my logged-in account,
-- and even then only for rows marked as mine.
-- ---------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'daily_entries', 'workout_types', 'daily_workouts', 'food_triggers',
    'daily_food_triggers', 'period_setup', 'vitamin_d_shots', 'blood_tests',
    'blood_test_results', 'monthly_reports'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('alter table public.%I force row level security', t);
    -- Logged-out visitors (anon) get no access at all.
    execute format('revoke all on public.%I from anon', t);
    -- Logged-in accounts may read and write, but the policy below limits them to their own rows.
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format(
      'create policy "only my own rows" on public.%I
         for all to authenticated
         using (user_id = (select auth.uid()))
         with check (user_id = (select auth.uid()))', t);
  end loop;
end $$;

-- ---------------------------------------------------------------
-- Starting lists (added to my one account)
-- ---------------------------------------------------------------
insert into public.workout_types (user_id, name)
select u.id, v.name
from auth.users u
cross join (values ('yoga'), ('walk'), ('swimming')) as v(name)
on conflict do nothing;

insert into public.food_triggers (user_id, name)
select u.id, v.name
from auth.users u
cross join (values ('dairy'), ('gluten'), ('spicy'), ('caffeine'), ('fried'), ('sugar')) as v(name)
on conflict do nothing;

commit;
