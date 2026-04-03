# ElevenLabs Component Style Gold Standard

## Border Radius Scale (differentiated, NOT pill-everything)
- Buttons (primary): `rounded-xl` (12px)
- Buttons (secondary): `rounded-[10px]`
- Inputs/Search: `rounded-xl` (12px)
- Select triggers: `rounded-[10px]`
- Cards: `rounded-2xl` (16px)
- Dialogs: `rounded-3xl` (24px)
- Dropdown/popover content: `rounded-[10px]`
- Dropdown items: `rounded-lg` (8px)
- Badges/pills: `rounded-full`
- Nav items: `rounded-[10px]`

## Colors (alpha-based, NOT solid grays)
- Border: `rgba(0, 0, 29, 0.075)` via `--border`
- Input border: `rgba(0, 0, 29, 0.1)` via `--input`
- Muted text: `rgba(0, 0, 17, 0.53)` via `--muted-foreground`
- Primary: near-black `rgb(15, 15, 16)` via `--primary`

## Button Sizes
- Primary: `h-10 px-4 rounded-xl`
- Secondary: `h-9 px-3 rounded-[10px] border-input`
- Compact: `h-8 px-2.5 rounded-[10px]`

## Typography
- Font: Inter (global via `--font-sans`)
- Page titles: `text-2xl font-semibold`
- Table headers: `text-xs font-medium uppercase text-muted-foreground`
- Buttons: `text-sm font-medium`

## Tabs
- Default variant is underline (border-b), NOT pill
- Active: `text-foreground` + underline
- Inactive: `text-muted-foreground`

## Page Layout
- Content: `max-w-6xl mx-auto px-5 py-8`
- Header: `h-[50px] bg-background/90 backdrop-blur-[8px] border-b`
- NO per-page padding — layout wrapper handles it
