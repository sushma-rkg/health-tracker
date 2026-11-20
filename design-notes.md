# Health Tracker – Design Notes

These are the approved look and feel. **Every build step follows these notes.** Do not change any choice here without asking me first.

---

## Overall feel
- Warm purple and gold.
- Gentle and encouraging.
- Uncluttered, with only a few things on each screen.
- Phone first. The laptop version adapts the phone design.
- Sans-serif font throughout: **Plus Jakarta Sans**.
- Short, kind wording. For example "Nearly there" instead of "Incomplete".

## Colours
| Use | Colour |
|---|---|
| Page background (warm cream) | #FAF5EA |
| Cards | White, with a thin border #EFE6D3 and a very soft shadow |
| Main text (deep plum) | #2B2236 |
| Hint text (soft grey-plum) | #6B6075 |
| Main colour (buttons, selected states) | Purple #6B45B8 |
| Dark purple for text on light purple | #4B2C91 |
| Light purple tints | #EFE8F9, #D9C9F0, #B596E3 |
| Button and field borders | #CDBFE6 |
| Gold for gentle highlights | #E2AE3F |
| Gold tint | #FBEFCF |
| Gold text | #7A4F00 (darker: #5C3D00) |
| "Not logged yet" chips and the grey toggle background | #EFE9DD, with text #5F5469 |
| Bottom bar | White, with a top border #EADFC9 |

## Shapes and sizes
- Cards: 20px rounded corners, 20px inside spacing.
- Buttons: 14px rounded corners.
- Pills and chips: fully rounded.
- Every tap target is at least 44px tall.
- Screens are designed at phone width (390px).

## The 0 to 3 scale (pain, fatigue, stress, cramps)
- Four equal buttons: **0 None, 1 Slight, 2 Medium, 3 Extreme**.
- The selected button gets a purple border and a fill that gets deeper with each step: #EFE8F9, #D9C9F0, #B596E3, #6B45B8 (white text on the deepest).
- Never use red.

## Behaviour rules
- Yes/No fields start with neither chosen. Untouched means "not logged yet", which is different from "no".
- Untouched fields show a small grey "Not logged yet" label.
- Everything saves automatically as I tap. No Save button on the daily screens.
- Extra fields appear only when needed (for example the drink count only after "Yes" for alcohol).
- Status chips at the top of Body and Mind:
  - Gold: "Body done"
  - Purple tint: "Mind in progress"
  - Grey: "Mind not yet"
- Mood uses five simple drawn faces, from low to great, in gold. Not emoji characters.

## Navigation
- Three tabs: **Body, Mind, Reports**. A small settings icon sits at the top right.
- **On a phone:** the tabs sit in a bar at the bottom. The active tab has a light purple pill behind its icon.
- **On a laptop:** the same tabs sit in a bar at the side.
- Labs and shots live under Body.
- Settings opens from the settings icon, with a back button.

---

## Screens (already drawn as phone mockups)

### Body, top
- A date and greeting ("Good evening").
- Status chips.
- **Movement card:** stepped out, worked out, and the type (yoga, walk or swimming).
- **"How your body feels" card:** pain and fatigue, 0 to 3.

### Body, lower
- **Food and drink card:**
  - Water glasses, with minus and plus buttons.
  - Protein shake, yes/no.
  - Alcohol, yes/no. On Yes, a gold-tint "How many drinks?" row appears.
  - Food triggers as chips: dairy, gluten, spicy, caffeine, fried, sugar, plus a box to add a new one.
- **Gut card:** poop count, bloating yes/no.

### Mind
- **Stress card** (0 to 3).
- **Mood card** (five faces).
- A gold-tint "Nearly there" message with "Everything you tap is saved automatically".

### Reports
- **Gold gradient summary card for the month:**
  - A month chip.
  - An "Early look, limited data" chip.
  - A short summary.
  - "Patterns, not proof. Not medical advice."
  - A "Generate now" button.
- **"Mind and Body links" card:** rows with small "Lower" or "Higher" pills.
- **"Past reports" card.**

### Labs and shots
- A back button.
- A two-way switch: **Blood tests / Vitamin D shot**.
- An **"Add a blood test" card:** a date and six value boxes (T3, T4, TSH, vitamin D, B12, iron, each with its unit shown).
- A **"Save blood test"** button.

### Settings
- **"Period setup" card:**
  - First day of last period.
  - Usual cycle length, with minus and plus buttons.
  - A gold-tint note that it will be worked out automatically later.
  - A "Save period details" button.
- **"Account" card** with a "Log out" button.

---

## Not drawn yet (follow the same style, design properly when we reach them)
- **Body groups:**
  - Sleep hours (like the water counter).
  - Period: yes/no, then flow as chips (light, medium, heavy) and cramps 0 to 3, shown only on Yes.
  - Medicine: Thyronorm and Combiflam, each a yes/no row.
- **Vitamin D shot tab:** a list of shot dates, a "next due" card in gold tint, and a "Log a shot" button.
- **The login screen.**
