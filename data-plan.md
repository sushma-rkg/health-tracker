# Health Tracker – Data Plan (plain words)

Status: **written, waiting for my approval.** Nothing has been created in Supabase.

## How to read this
- A **table** is like one sheet in a spreadsheet.
- A **row** is one line on that sheet.
- **Blank** means "I did not fill this in". Blank is different from "no".
- Every table below also quietly records **who owns the row** (me) and **when the row was made and last changed**. I won't mention this again in each table.

## Rules that apply to everything
- **Everything is mine.** Every row is marked as mine. Only I can see or change it. (The actual locks are built in Step 4.)
- **Blank is not "no".** A yes/no item can be yes, no, or blank. A number item can be a number or blank.
- **Only one daily entry per date.** The app will refuse a second entry for the same day.
- **Night rule:** if I log after midnight and before 4 am, it counts for the previous day. The app will handle this later. It is only noted here.
- **Dates are plain dates** (for example 20 Nov 2026), not times.
- **Easy to add new things later:** lists (like food triggers) can grow. A new thing to track can be added without touching old days.
- **Nothing is ever lost by accident:** things in my lists are "retired" (hidden from new choices) instead of deleted, so old days still make sense.
- No keys, passwords or email addresses are stored in this plan.

---

## Table 1: Daily entries
- **What one row means:** one day.
- **Who can see it:** only me.

| Item | Allowed values | Notes |
|---|---|---|
| Date | a plain date | Must be unique: one row per date |
| Stepped out | yes, no, or blank | |
| Worked out | yes, no, or blank | |
| Body pain | 0, 1, 2 or 3, or blank | |
| Fatigue | 0, 1, 2 or 3, or blank | |
| Glasses of water | a whole number (0 or more), or blank | |
| Protein shake | yes, no, or blank | |
| Alcohol | yes, no, or blank | |
| Number of drinks | a whole number (1 or more), or blank | Only filled if Alcohol is yes. Otherwise blank |
| Poop count | a whole number (0 or more), or blank | |
| Bloating | yes, no, or blank | |
| Sleep hours | a number from 0 to 24 in steps of 0.5 (6, 6.5, 7…), or blank | |
| Period | yes, no, or blank | |
| Period flow | light, medium or heavy, or blank | Only filled if Period is yes. Otherwise blank |
| Period cramps | 0, 1, 2 or 3, or blank | Only filled if Period is yes. Otherwise blank |
| Thyronorm taken | yes, no, or blank | |
| Combiflam taken | yes, no, or blank | |
| Stress | 0, 1, 2 or 3, or blank | |
| Mood | 1, 2, 3, 4 or 5 (the five faces), or blank | |

- **Workout types** and **food triggers** for the day are kept in their own small tables (Tables 3 and 5), because I can pick several.
- **"Body done / Mind done"** is not stored. The app works it out (see the end of this plan).

## Table 2: Workout types (my list)
- **What one row means:** one kind of workout I can pick.
- **Starts with:** yoga, walk, swimming.
- **Items:** name (words), and "still in use" (yes/no, so I can retire one without losing old days).
- **Who can see it:** only me.
- I can add new kinds later (for example "cycling").

## Table 3: Workouts done each day
- **What one row means:** one workout type on one day.
- **Items:** which day, which workout type.
- **Rule:** the same workout type can't be listed twice on the same day. Only meaningful if "Worked out" is yes for that day.
- **Who can see it:** only me.

## Table 4: Food triggers (my list)
- **What one row means:** one food trigger I can pick.
- **Starts with:** dairy, gluten, spicy, caffeine, fried, sugar.
- **Items:** name (words), and "still in use" (yes/no).
- **Who can see it:** only me.
- I can add new triggers any time.

## Table 5: Food triggers each day
- **What one row means:** one food trigger on one day.
- **Items:** which day, which food trigger.
- **Rule:** the same trigger can't be listed twice on the same day. A day with no rows here means "none picked" (I did not pick any).
- **Who can see it:** only me.

## Table 6: Period setup
- **What one row means:** my one period setup. There is only ever one row.
- **Items:**
  - First day of my last period: a plain date, or blank.
  - My usual cycle length: a whole number of days, or blank.
- **Who can see it:** only me.

## Table 7: Vitamin D shots
- **What one row means:** one shot.
- **Items:** date of the shot (a plain date).
- **Who can see it:** only me.

## Table 8: Blood tests
- **What one row means:** one blood test visit.
- **Items:** test date (a plain date).
- **Who can see it:** only me.

## Table 9: Blood test results
- **What one row means:** one result from one blood test (for example "TSH on 5 March").
- **Items:**
  - Which blood test (Table 8).
  - Which measure: T3, T4, TSH, vitamin D, B12 or iron. New measures can be added later.
  - The value: a number.
  - The unit: words I can change (for example ng/mL). I can set the unit for each result.
- **Rule:** one result per measure per blood test.
- **Who can see it:** only me.

## Table 10: Monthly reports
- **What one row means:** one month's report.
- **Items:**
  - The month (for example November 2026).
  - The written summary (words).
  - "Early look, limited data" (yes/no).
  - Number of days logged (a whole number).
  - The numbers the report was based on (a saved bundle of numbers, so old reports never change if my data changes later).
- **Rule:** one report per month.
- **Who can see it:** only me.

---

## Worked out by the app, not stored
- **Cycle length:** from my logged period start dates. A period start is a day where Period is yes and the day before was not yes.
- **"Body done / Mind done":** the app checks whether the Body items and the Mind items have been filled in for that day.
- **Next vitamin D shot due:** worked out from the date of my last shot.

## Decisions I made for you
- Workout types are a list I can add to (like food triggers), starting with yoga, walk and swimming. This makes it easy to add "cycling" later.
- Blood test results are saved one measure at a time, so I can add new measures later (like ferritin) without changing anything old.
- Lists are retired instead of deleted, so old days never lose their meaning.
- Sleep hours only allow whole and half hours.
- Number of drinks starts at 1 (the "no drinks" case is Alcohol = no).
- Monthly reports save a copy of their numbers, so they stay the same later.
- I can fill in or fix past days (not only today).
- If Alcohol or Period or Worked out changes back to no, the linked items (drinks, flow, cramps, workout types) are cleared.

## Questions for me
1. **Cycle length:** should the app use only my last cycle, or an average of my last 3 cycles?
2. **Blood test units:** should I pre-fill common units for each measure (you can still change them), or leave all units blank?
3. **Monthly reports:** if a report for the same month is made again, should it replace the old one or keep both?
4. **Period setup vs. daily logging:** if the Period setup and my daily Period entries disagree, which should win?
5. **Food triggers:** should "none today" be recorded as its own choice, or is "nothing picked" enough?
