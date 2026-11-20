# Design Notes

These are the approved look and feel. **Every build step follows these notes and the screenshots in `design-reference/`.** Where these notes are less exact than the screenshots, follow the screenshots. Do not change any choice here without asking me first.

Colours below were measured from the screenshots, so they are close to exact.

---

## App name
- **Tend** (temporary, easy to change later).

## Overall feel
- Calm, warm, gentle and encouraging.
- Lots of white space. Uncluttered, with a few things per card.
- The screenshots show the laptop layout. On a phone it becomes one column (see "Phone layout").
- Short, kind wording. For example "Nearly there" instead of "Incomplete".

## Fonts
- **Headings, card titles and big numbers:** a warm, friendly serif font (Fraunces), semi-bold.
- **Everything else:** a clean sans-serif (Inter).

## Colours
| Use | Colour |
|---|---|
| Page background (warm off-white). The header bar is the same colour. | #FBF8F2 |
| Thin line under the header | #E5E1DC |
| Cards | White, with a thin warm-grey border (about #EDE7DE) |
| Main text (near-black) | #1A171A |
| Hint text (grey) | #57575B |
| **Main colour** (primary buttons, selected states, toggles when on) | Deep teal #0F6B67 |
| Light teal tint (selected chips) | #E2F0ED |
| **Mind page accent** | Purple #5742A7 |
| Light lavender tint (Mind) | #EDE8F7 |
| Small accent (bullet dots, warning-style outlines) | Burnt orange #A94915 |
| Toggles when off | Warm taupe #7A7164 |
| Outline buttons and chips | Warm taupe border (about #7A7266), 1.5px |
| Tab switcher background in the header | Light warm beige #EFEAE0 |
| Active tab | White pill with a very soft shadow |
| Progress bar track | Beige #EDEAE0 |

## Shapes and sizes
- **Cards:** large rounded corners (about 24px), generous inside spacing (about 32px on a laptop).
- **Buttons, chips and the tab switcher:** fully rounded pills.
- **Number buttons (the scales):** rounded squares (about 12px corners).
- **Text fields and dropdowns:** rounded (about 16px), thin border.
- **Gap between cards:** about 24 to 32px.
- **Page content** is centred, with a maximum width of about 1100px on a laptop.
- **Every tap target is at least 44px tall.**

## Header (on every page)
- **Left:** a small teal circle with a white pulse-line icon, then the app name in the serif font.
- **Centre:** a rounded switcher with four tabs, each with a small line icon and a label: **Body, Mind, Reports, Settings**. The active tab is a white pill.
- **Right:** today's date in small grey text, for example "Wed, 18 Nov 2026".

## Page top (on every page)
- A small uppercase label with wide letter spacing in teal (purple on the Mind page), for example "BODY · TODAY".
- Then a very large serif heading:
  - Body: "How is your body today?"
  - Mind: "How is your mind today?"
  - Reports: "Patterns over time"
  - Settings: "Make Tend yours"

## Cards
- A serif title, a short grey line of help text under it, then the content.
- Pages use a two-column grid on a laptop. The wide left column holds the main cards. The narrower right column is for small summary cards (later).

## Components
- **Yes/No:** two outline pills. The selected one is filled teal with white text. Both start unselected.
- **0 to 3 scale (pain, fatigue, stress, cramps):** a row of four equal rounded squares with the number inside and a small label under each: None, Slight, Medium, Extreme. The selected one is filled teal. Never use red.
- **Chips (for example food triggers, workout type):** outline pills. Selected ones get a light teal fill, a teal border and teal text. A dashed pill "+ New ..." adds something new.
- **Counters (water, drinks, poop count, sleep hours):** a minus circle, a big serif number, a plus circle.
- **Mood:** five equal large outlined buttons in a row, each with a simple line-drawn face and a label: Very low, Low, Okay, Good, Great. The selected one gets a light lavender fill and a purple border.
- **Toggle switch:** a pill, teal when on, warm taupe when off.
- **List rows:** a name on the left, a control on the right, thin divider lines between rows.
- **Summary tiles (Reports):** a small grey label, a big serif number, and a small caption.
- **Charts (later):** teal bars with a purple line with open round markers, light grid lines.
- **Pattern list (Reports):** rounded light-beige rows, each with a burnt orange dot and one sentence.
- **Progress bars (later):** teal on a beige track.

## Behaviour rules
- Yes/No fields start with neither chosen. Untouched means "not logged yet", which is different from "no".
- Untouched fields show a small grey "Not logged yet" label.
- **Everything saves automatically as I tap. No Save buttons on the daily screens**, even though the screenshots show some.
- Extra fields appear only when needed (for example the drink count only after "Yes" for alcohol; flow and cramps only after "Yes" for period).
- Status chips near the top of Body and Mind: a teal-tint "Body done" and a grey "Mind not yet".

## Phone layout
- One column. Cards stack and fill the width, with smaller inside spacing (about 20px).
- The four tabs move from the header into a bar at the bottom of the screen, each with an icon and a label. The active tab has a light teal pill behind it.
- The header on a phone shows just the logo and name.
- Headings shrink (about 30px). Number buttons and chips wrap onto more lines if needed.

---

## What each page will hold (from my approved fields)

### Body
- **Movement:** stepped out (yes/no), worked out (yes/no), type (yoga, walk, swimming).
- **How your body feels:** body pain and fatigue (0 to 3).
- **Food and drink:** water glasses, protein shake, alcohol (yes/no, then number of drinks), food triggers (dairy, gluten, spicy, caffeine, fried, sugar, plus a dashed "+ New trigger").
- **Gut:** poop count, bloating (yes/no).
- **Sleep:** hours as a counter in half-hour steps.
- **Period:** yes/no, and if yes: flow (light, medium, heavy) and cramps (0 to 3).
- **Medicine:** two rows (Thyronorm, Combiflam), each a yes/no.
- **Labs and shots:** a link or card that opens blood test entry and the monthly vitamin D shot date. (Not drawn yet. Use the same style.)

### Mind
- Mood (five faces) and stress (0 to 3).

### Reports
- Four summary tiles.
- A patterns list ("Patterns we notice") fed by the monthly summary.
- Past reports.
- Charts come later.

### Settings
- **Period setup:** date of last period, usual cycle length.
- **Account:** log out.
- Cards like the screenshots.

### Login screen
- Not drawn yet. Use the same style, centred on the page.

---

## Later versions (shown in the screenshots, NOT in the first version)
- Reminders
- Passcode lock
- Dark mode and theme choice
- Export to PDF or spreadsheet
- Custom markers
- Daily notes and gratitude
- The 7/14/30-day switch
- Charts
- Medicine dose lists
- "Earlier today" and "last 7 days" side cards
