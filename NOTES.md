# Health Tracker – Project Notes

## What this app is
- A private daily health tracker, just for me (one user).
- I log a few things every night, mostly on my phone, sometimes on my laptop.
- It will hold private health data, so we keep things simple and add outside services only when a step needs them.

## Rule
- **Build one step at a time. Never build ahead.**
- Update this file at the end of every step.

## The 20 steps
1. Project setup: an empty three-tab app live online — **DONE (code built; going online with Vercel)**
2. Login: only I can get in, with sign-ups off
3. Database and security for daily entries
4. Check-in basics: date, autosave, first fields
5. Pain and fatigue (0-3 buttons)
6. Food and drink
7. Gut, sleep and medicine
8. Mind tab: stress and mood
9. Past days: view and edit
10. Period setup and daily period fields
11. Install on phone home screen
12. Cycle length auto-calculated
13. Shot dates
14. Blood test values, typed in
15. Report numbers, part A
16. Report numbers, part B
17. AI summary of the report
18. Saved monthly reports
19. Automatic monthly report
20. Final test on both phones and a laptop

## Handy facts
- App name is set in one place: `src/config.js` (change `APP_NAME`).
- Tabs and placeholder pages live in `src/App.jsx`. Colors and layout are in `src/styles.css`.
- Phone: tabs at the bottom. Wide screen (800px+): tabs at the side.
