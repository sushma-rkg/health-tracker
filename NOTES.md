# Health Tracker – Project Notes

## What this app is
- A private daily health tracker, just for me (one user).
- I log a few things every night, mostly on my phone, sometimes on my laptop.
- It holds private health data, so safety matters more than speed.

## The plan
1. Create the Supabase project
2. Set up login in Supabase (my account only, sign-ups off)
3. Plan the data model in plain words
4. Create the base tables with security rules
5. Design notes saved
6. Empty four-tab app online
7. Login screen connected to Supabase
8. Daily check-in basics
9. Pain and fatigue
10. Food and drink
11. Gut, sleep and medicine
12. Mind tab
13. Past days
14. Period
15. Install on phone
16. Cycle length
17. Vitamin D shot
18. Labs
19. Report numbers
20. Claude summary
21. Saved reports
22. Automatic monthly run
23. Final test

## Progress
- [x] Step 1: Supabase project created (name: health-tracker, free plan, Mumbai region, Data API on, RLS on new tables on)
- [x] Step 2 done: login set up, one account, sign-ups off
- [x] Step 3 done: data plan written and approved (see data-plan.md)
- [x] Step 4 done: tables created, security on, tested (script saved in database/step-4-tables.sql)
- [x] Step 5 done: design notes saved (see design-notes.md and the screenshots in design-reference/)
- [ ] Step 6: Empty four-tab app online. NOTE: an earlier empty app (old purple and gold look, three tabs plus a settings icon) is already online from the `app` folder. It must be rebuilt in the new Tend design.
- [ ] Steps 7 to 23: not started

## Rules
- Build one step at a time. Do not jump ahead.
- Never put passwords or secret keys in any file or chat.
- Every build step follows the design notes and the screenshots in design-reference.
