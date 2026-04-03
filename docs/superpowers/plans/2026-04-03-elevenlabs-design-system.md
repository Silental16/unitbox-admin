# ElevenLabs Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle all Unitbox HQ shadcn/ui components and page layouts to match the ElevenLabs design system extracted from 27 UI dumps.

**Architecture:** Top-down approach: Phase 1 updates CSS tokens in globals.css (font, colors, radius, shadows). Phase 2 modifies individual shadcn components to match ElevenLabs patterns. Phase 3 updates the dashboard layout shell and page containers. Each task is independent and committable.

**Tech Stack:** Next.js 16, Tailwind CSS v4, shadcn/ui, Inter font (already imported)

**Reference:** Full spec in `~/.claude/skills/elevenlabs-style/references/` (design-tokens.md, component-overrides.md, page-patterns.md, anti-patterns.md)

---

## Phase 1: Foundation (globals.css + font)

### Task 1: Switch font from Geist to Inter

**Files:**
- Modify: `app/globals.css:10` — change `--font-sans`
- Modify: `components/ui/sidebar.tsx` — remove manual Inter override (now global)

- [ ] **Step 1: Update globals.css font-sans to Inter**

In `app/globals.css`, line 10, change:
```css
--font-sans: var(--font-geist-sans);
```
to:
```css
--font-sans: var(--font-inter);
```

- [ ] **Step 2: Remove sidebar-specific Inter override**

In `components/ui/sidebar.tsx`, find the sidebar-inner div (~line 244) and remove `font-[family-name:var(--font-inter)]` from its className. Inter is now global — no need for sidebar-specific override.

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Check that ALL text (header, sidebar, content, buttons) renders in Inter, not Geist.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/ui/sidebar.tsx
git commit -m "Switch global font from Geist to Inter"
```

---

### Task 2: Update CSS color tokens (light mode)

**Files:**
- Modify: `app/globals.css:51-86` — `:root` block

- [ ] **Step 1: Replace light mode tokens**

Replace the entire `:root` block (lines 51-86) with:

```css
:root {
  --shadow-card: rgba(0,0,0,0.4) 0 0 1.14px, rgba(0,0,0,0.04) 0 2px 4px;
  --shadow-card-hover: rgba(0,0,0,0.06) 0 0 0 1px, rgba(0,0,0,0.06) 0 1px 1px -0.5px, rgba(0,0,0,0.06) 0 3px 3px -1.5px;
  --shadow-modal: rgba(0,0,0,0.06) 0 0 0 1px, rgba(0,0,0,0.06) 0 1px 1px -0.5px, rgba(0,0,0,0.06) 0 3px 3px -1.5px, rgba(0,0,0,0.06) 0 6px 6px -3px, rgba(0,0,0,0.04) 0 12px 12px -6px, rgba(0,0,0,0.04) 0 24px 24px -12px;
  --shadow-elevation-sm: rgba(16,24,40,0.03) 0 4px 6px -2px, rgba(16,24,40,0.08) 0 12px 16px -4px;
  --background: rgb(255, 255, 255);
  --foreground: rgb(15, 15, 16);
  --card: rgb(255, 255, 255);
  --card-foreground: rgb(15, 15, 16);
  --popover: rgba(255, 255, 255, 0.9);
  --popover-foreground: rgb(15, 15, 16);
  --primary: rgb(15, 15, 16);
  --primary-foreground: rgb(255, 255, 255);
  --secondary: rgb(255, 255, 255);
  --secondary-foreground: rgb(15, 15, 16);
  --muted: rgba(0, 0, 23, 0.043);
  --muted-foreground: rgba(0, 0, 17, 0.53);
  --accent: rgba(0, 0, 23, 0.043);
  --accent-foreground: rgb(15, 15, 16);
  --destructive: rgb(239, 68, 68);
  --border: rgba(0, 0, 29, 0.075);
  --input: rgba(0, 0, 29, 0.1);
  --ring: rgba(60, 131, 246, 0.5);
  --chart-1: oklch(0.879 0.169 91.605);
  --chart-2: oklch(0.769 0.188 70.08);
  --chart-3: oklch(0.666 0.179 58.318);
  --chart-4: oklch(0.555 0.163 48.998);
  --chart-5: oklch(0.473 0.137 46.201);
  --radius: 0.75rem;
  --sidebar: rgb(250, 250, 250);
  --sidebar-foreground: rgb(91, 91, 100);
  --sidebar-primary: rgb(15, 15, 16);
  --sidebar-primary-foreground: rgb(255, 255, 255);
  --sidebar-accent: rgba(0, 0, 23, 0.043);
  --sidebar-accent-foreground: rgb(28, 28, 29);
  --sidebar-border: rgba(0, 0, 29, 0.075);
  --sidebar-ring: rgba(60, 131, 246, 0.5);
}
```

Key changes:
- `--primary` → near-black (was amber)
- `--border` → rgba alpha (was solid oklch gray)
- `--muted` → rgba alpha (was solid)
- `--ring` → blue focus (was gray)
- `--radius` → 0.75rem/12px (was 0.625rem/10px)
- `--popover` → frosted white with alpha
- Shadows updated to ElevenLabs multi-layer patterns
- All sidebar tokens now use rgb/rgba

- [ ] **Step 2: Update dark mode tokens**

Replace the `.dark` block (lines 88-122) with:

```css
.dark {
  --shadow-card: rgba(255,255,255,0.06) 0 0 0 1px, rgba(0,0,0,0.2) 0 2px 4px;
  --shadow-card-hover: rgba(255,255,255,0.08) 0 0 0 1px, rgba(0,0,0,0.3) 0 4px 8px, rgba(0,0,0,0.4) 0 24px 48px;
  --shadow-modal: rgba(255,255,255,0.06) 0 0 0 1px, rgba(0,0,0,0.3) 0 4px 8px, rgba(0,0,0,0.5) 0 24px 48px;
  --shadow-elevation-sm: rgba(0,0,0,0.3) 0 4px 6px -2px, rgba(0,0,0,0.5) 0 12px 16px -4px;
  --background: rgb(15, 15, 16);
  --foreground: rgb(250, 250, 250);
  --card: rgb(28, 28, 29);
  --card-foreground: rgb(250, 250, 250);
  --popover: rgba(28, 28, 29, 0.9);
  --popover-foreground: rgb(250, 250, 250);
  --primary: rgb(250, 250, 250);
  --primary-foreground: rgb(15, 15, 16);
  --secondary: rgb(28, 28, 29);
  --secondary-foreground: rgb(250, 250, 250);
  --muted: rgba(255, 255, 255, 0.06);
  --muted-foreground: rgba(255, 255, 255, 0.53);
  --accent: rgba(255, 255, 255, 0.06);
  --accent-foreground: rgb(250, 250, 250);
  --destructive: rgb(248, 113, 113);
  --border: rgba(255, 255, 255, 0.08);
  --input: rgba(255, 255, 255, 0.12);
  --ring: rgba(60, 131, 246, 0.5);
  --chart-1: oklch(0.879 0.169 91.605);
  --chart-2: oklch(0.769 0.188 70.08);
  --chart-3: oklch(0.666 0.179 58.318);
  --chart-4: oklch(0.555 0.163 48.998);
  --chart-5: oklch(0.473 0.137 46.201);
  --sidebar: rgb(15, 15, 16);
  --sidebar-foreground: rgb(120, 120, 129);
  --sidebar-primary: rgb(250, 250, 250);
  --sidebar-primary-foreground: rgb(15, 15, 16);
  --sidebar-accent: rgba(255, 255, 255, 0.06);
  --sidebar-accent-foreground: rgb(229, 229, 232);
  --sidebar-border: rgba(255, 255, 255, 0.08);
  --sidebar-ring: rgba(60, 131, 246, 0.5);
}
```

- [ ] **Step 3: Update custom styles at bottom of globals.css**

Remove the amber glow hover effect on buttons (lines 150-158). Replace with:

```css
[data-slot="button"][data-variant="default"] {
  transition: opacity 0.075s ease;
}
[data-slot="button"][data-variant="default"]:hover {
  opacity: 0.85;
}
```

- [ ] **Step 4: Update radius scale in @theme**

In the `@theme inline` block, replace the radius calculations (lines 42-48) with:

```css
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 0.875rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.25rem;
  --radius-4xl: 1.5rem;
```

This gives: sm=6px, md=8px, lg=12px (base), xl=14px, 2xl=16px, 3xl=20px, 4xl=24px.

- [ ] **Step 5: Verify — check browser**

Run: `npm run dev`
Verify: primary buttons are now near-black, borders are thin alpha, focus rings are blue.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css
git commit -m "Update CSS tokens to ElevenLabs design system: near-black primary, alpha borders, multi-layer shadows"
```

---

## Phase 2: Component Overrides

### Task 3: Button

**Files:**
- Modify: `components/ui/button.tsx`

- [ ] **Step 1: Update button styles**

Replace `rounded-4xl` with `rounded-xl` in the cva base string.

Replace `active:translate-y-px` with nothing (remove it — ElevenLabs buttons don't have press effect).

Replace the `focus-visible:ring-[3px]` with `focus-visible:ring-[1px]` throughout the cva base.

In `size.default`, change `h-9` to `h-10` and `px-3` to `px-4`.

In `size.sm`, change `h-8` to `h-9` and `px-3` to `px-3`.

In `size.lg`, keep `h-10` and `px-4`.

In `variant.outline`, change `bg-input/30` to `bg-background` and add a visible border color: replace `border-border` (from base) — actually the base has `border border-transparent`, so in outline variant add `border-input`.

In `variant.secondary`, change `bg-secondary text-secondary-foreground` to `bg-background text-foreground border-input` and ensure the border shows.

- [ ] **Step 2: Verify buttons visually**

Open `/preview` page and check all button variants render with `rounded-xl` (12px), not pill shape.

- [ ] **Step 3: Commit**

```bash
git add components/ui/button.tsx
git commit -m "Restyle buttons: rounded-xl, h-10 default, remove press effect"
```

---

### Task 4: Input

**Files:**
- Modify: `components/ui/input.tsx`

- [ ] **Step 1: Update input styles**

In the Input className, make these replacements:
- `rounded-4xl` → `rounded-xl`
- `h-9` → `h-10`
- `bg-input/30` → `bg-transparent`
- `border-input` → `border-input` (keep, but the CSS var now resolves to `rgba(0,0,29,0.1)`)
- `focus-visible:ring-[3px]` → `focus-visible:ring-[1px]`

- [ ] **Step 2: Commit**

```bash
git add components/ui/input.tsx
git commit -m "Restyle input: rounded-xl, h-10, transparent bg"
```

---

### Task 5: Badge

**Files:**
- Modify: `components/ui/badge.tsx`

- [ ] **Step 1: Update badge styles**

In the cva base:
- `rounded-4xl` → `rounded-full`
- `h-5` → `h-6`
- `px-2` → `px-2.5`

The `variant.default` stays `bg-primary text-primary-foreground` — since `--primary` is now near-black, this automatically becomes the dark badge style.

For `variant.secondary`, the bg will be `bg-secondary` which is now `rgb(255,255,255)` — but we want `bg-muted` (`rgba(0,0,23,0.043)`). Change to:
`bg-muted text-foreground`

- [ ] **Step 2: Commit**

```bash
git add components/ui/badge.tsx
git commit -m "Restyle badge: rounded-full, h-6, px-2.5"
```

---

### Task 6: Tabs

**Files:**
- Modify: `components/ui/tabs.tsx`

- [ ] **Step 1: Update TabsList**

In `tabsListVariants` cva base:
- `rounded-4xl` → `rounded-none`
- `p-[3px]` → `p-0`
- Change `group-data-horizontal/tabs:h-9` to `group-data-horizontal/tabs:h-auto`

In variant.default: change `bg-muted` to `bg-transparent border-b border-border`

In variant.line: keep `gap-1 bg-transparent`

Both variants should now be underline-style by default.

- [ ] **Step 2: Update TabsTrigger**

In the TabsTrigger className, change:
- `rounded-xl` → `rounded-none`
- `text-foreground/60` → `text-muted-foreground`
- `border border-transparent` → remove

For the active state pseudo-element (the `after:` underline), it's already there for `variant=line`. Make it work for default variant too:
- Remove `group-data-[variant=line]/tabs-list:` prefix from the `after:opacity-100` condition so active state underline shows in both variants.

For active state styles:
- `data-active:bg-background data-active:text-foreground` → `data-active:text-foreground` (remove bg change)

- [ ] **Step 3: Commit**

```bash
git add components/ui/tabs.tsx
git commit -m "Restyle tabs: underline default, remove pill variant as default"
```

---

### Task 7: Table

**Files:**
- Modify: `components/ui/table.tsx`

- [ ] **Step 1: Update table header**

Change `TableHead` classes:
- `h-12` → `h-9`
- `px-3` → `px-2.5`
- `text-foreground` → `text-muted-foreground uppercase text-xs`

Change `TableCell` classes:
- `p-3` → `py-2 px-2.5`

Change `TableRow`:
- Add `border-border` to make borders use the alpha color.

- [ ] **Step 2: Commit**

```bash
git add components/ui/table.tsx
git commit -m "Restyle table: h-9 header, uppercase xs text, tighter cells"
```

---

### Task 8: Dialog

**Files:**
- Modify: `components/ui/dialog.tsx`

- [ ] **Step 1: Update dialog styles**

In `DialogOverlay`:
- `bg-black/80` → `bg-[rgba(214,214,218,0.3)]`
- Remove `supports-backdrop-filter:backdrop-blur-xs`

In `DialogContent`:
- `rounded-4xl` → `rounded-3xl`
- `p-6` → `p-8`
- `ring-1 ring-foreground/5` → remove ring entirely
- `sm:max-w-md` → `sm:max-w-[512px]`
- Add `shadow-[var(--shadow-modal)]`

In `DialogTitle`:
- `text-base` → `text-xl`

- [ ] **Step 2: Commit**

```bash
git add components/ui/dialog.tsx
git commit -m "Restyle dialog: rounded-3xl, p-8, ElevenLabs overlay and shadow"
```

---

### Task 9: Sheet

**Files:**
- Modify: `components/ui/sheet.tsx`

- [ ] **Step 1: Update sheet styles**

In `SheetOverlay`:
- `bg-black/80` → `bg-[rgba(0,0,25,0.16)]`

In `SheetContent`:
- `data-[side=right]:w-3/4` → `data-[side=right]:w-[512px]`
- `data-[side=left]:w-3/4` → `data-[side=left]:w-[512px]`
- `data-[side=right]:sm:max-w-sm` → remove (fixed width now)
- `data-[side=left]:sm:max-w-sm` → remove
- Add `shadow-[var(--shadow-elevation-sm)]`

In `SheetHeader`:
- `p-6` → `px-6 pt-6 pb-0`

- [ ] **Step 2: Commit**

```bash
git add components/ui/sheet.tsx
git commit -m "Restyle sheet: 512px width, ElevenLabs overlay, elevation shadow"
```

---

### Task 10: Select

**Files:**
- Modify: `components/ui/select.tsx`

- [ ] **Step 1: Update select styles**

In `SelectTrigger`:
- `rounded-4xl` → `rounded-[10px]`
- `bg-input/30` → `bg-background`

In `SelectContent`:
- `rounded-2xl` → `rounded-[10px]`
- `shadow-2xl ring-1 ring-foreground/5` → `shadow-[var(--shadow-elevation-sm)]`
- Add `backdrop-blur-lg`

In `SelectItem`:
- `rounded-xl` → `rounded-lg`
- `py-2 pr-8 pl-3` → `py-1.5 pr-8 pl-2`

- [ ] **Step 2: Commit**

```bash
git add components/ui/select.tsx
git commit -m "Restyle select: rounded-[10px] trigger, backdrop-blur content"
```

---

### Task 11: Dropdown Menu

**Files:**
- Modify: `components/ui/dropdown-menu.tsx`

- [ ] **Step 1: Update dropdown styles**

In `DropdownMenuContent`:
- `rounded-2xl` → `rounded-[10px]`
- `shadow-2xl ring-1 ring-foreground/5` → `shadow-[var(--shadow-elevation-sm)]`
- Add `backdrop-blur-lg`

In `DropdownMenuItem`:
- `rounded-xl` → `rounded-lg`
- `px-3 py-2` → `px-2 py-1.5`

In `DropdownMenuSubContent`:
- Same changes as `DropdownMenuContent`

Apply same `rounded-lg` and `px-2 py-1.5` changes to `DropdownMenuCheckboxItem` and `DropdownMenuRadioItem`.

- [ ] **Step 2: Commit**

```bash
git add components/ui/dropdown-menu.tsx
git commit -m "Restyle dropdown: rounded-[10px], backdrop-blur, tighter items"
```

---

### Task 12: Switch, Slider, Checkbox

**Files:**
- Modify: `components/ui/switch.tsx`
- Modify: `components/ui/slider.tsx`
- Modify: `components/ui/checkbox.tsx`

- [ ] **Step 1: Update switch**

In Switch root:
- `data-[size=default]:h-[18.4px] data-[size=default]:w-[32px]` → `data-[size=default]:h-[20px] data-[size=default]:w-[36px]`
- `data-unchecked:bg-input` → `data-unchecked:bg-[rgba(0,0,29,0.1)]`

In Switch thumb, add shadow:
- Add `shadow-[rgba(16,24,40,0.03)_0_4px_6px_-2px,rgba(16,24,40,0.08)_0_12px_16px_-4px]`

- [ ] **Step 2: Update slider**

In Slider track:
- `rounded-4xl` → `rounded-full`
- `data-horizontal:h-3` → `data-horizontal:h-1`

In Slider thumb:
- `size-4` → `size-3`
- `rounded-4xl` → `rounded-full`
- `border border-primary` → `border-0`
- `bg-white` → `bg-primary`

- [ ] **Step 3: Update checkbox**

In Checkbox root:
- `size-4` → `size-5`

- [ ] **Step 4: Commit**

```bash
git add components/ui/switch.tsx components/ui/slider.tsx components/ui/checkbox.tsx
git commit -m "Restyle switch (36x20), slider (4px track, 12px thumb), checkbox (20px)"
```

---

### Task 13: Textarea and Separator

**Files:**
- Modify: `components/ui/textarea.tsx`
- Modify: `components/ui/separator.tsx`

- [ ] **Step 1: Update textarea**

- `rounded-xl` stays (already correct)
- `bg-input/30` → `bg-transparent`
- `focus-visible:ring-[3px]` → `focus-visible:ring-[1px]`

- [ ] **Step 2: Update separator**

The separator uses `bg-border` which will now resolve to `rgba(0,0,29,0.075)` — correct. No changes needed.

- [ ] **Step 3: Commit**

```bash
git add components/ui/textarea.tsx
git commit -m "Restyle textarea: transparent bg, thinner focus ring"
```

---

## Phase 3: Layout

### Task 14: Dashboard layout header

**Files:**
- Modify: `app/(dashboard)/layout.tsx`

- [ ] **Step 1: Update header to frosted glass**

Change the header className from:
```tsx
<header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
```
to:
```tsx
<header className="flex h-[50px] shrink-0 items-center gap-2 border-b border-border bg-background/90 backdrop-blur-[8px] px-2.5">
```

- [ ] **Step 2: Update main content wrapper**

Change:
```tsx
<main className="flex-1 overflow-auto">{children}</main>
```
to:
```tsx
<main className="flex-1 overflow-auto">
  <div className="mx-auto max-w-6xl px-5 py-8">
    {children}
  </div>
</main>
```

- [ ] **Step 3: Commit**

```bash
git add app/(dashboard)/layout.tsx
git commit -m "Update layout: frosted glass header h-50, max-w-6xl content wrapper"
```

---

### Task 15: Remove per-page padding (now in layout)

**Files:**
- Modify: `components/developers/developers-client.tsx`
- Modify: `components/analytics/dashboard-view.tsx`
- Modify: `components/projects/projects-client.tsx`
- Modify: `components/competitors/competitors-client.tsx` (if exists)
- Modify: `app/(dashboard)/tasks/page.tsx` or `components/tasks/tasks-client.tsx`
- Modify: `app/(dashboard)/mechanics/page.tsx`

- [ ] **Step 1: Remove p-4/p-6 from each page container**

In each file, find the outermost `<div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6">` and change to:
```tsx
<div className="flex flex-col gap-4">
```

Remove `p-4 md:p-6` (padding is now in layout's `max-w-6xl px-5 py-8` wrapper).
Remove `md:gap-6` (consistent gap, not responsive).

- [ ] **Step 2: Build to check for breakage**

Run: `npx next build`
Expected: no errors (only className changes, no logic changes)

- [ ] **Step 3: Commit**

```bash
git add components/ app/
git commit -m "Remove per-page padding — now handled by layout max-w-6xl wrapper"
```

---

### Task 16: Final build verification

- [ ] **Step 1: Full build**

Run: `npx next build`
Expected: clean build, no errors.

- [ ] **Step 2: Visual spot-check**

Open each page in browser:
1. `/analytics` — check frosted header, tabs, charts
2. `/developers` — check table headers (xs uppercase), search input (rounded-xl)
3. `/projects` — check badges (rounded-full, h-6)
4. `/mechanics` — check card grid, page padding
5. `/tasks` — check tabs (underline, not pill)

- [ ] **Step 3: Commit all remaining changes**

```bash
git add -A
git commit -m "ElevenLabs design system: complete implementation across all components"
```

- [ ] **Step 4: Push to Vercel**

```bash
git push github main
```

---

## File Map

| File | Change |
|------|--------|
| `app/globals.css` | All CSS tokens, shadows, radius scale, font, button hover |
| `app/(dashboard)/layout.tsx` | Header + content wrapper |
| `components/ui/button.tsx` | rounded-xl, h-10, no press effect |
| `components/ui/input.tsx` | rounded-xl, h-10, transparent bg |
| `components/ui/badge.tsx` | rounded-full, h-6, px-2.5 |
| `components/ui/tabs.tsx` | Underline default, remove pill |
| `components/ui/table.tsx` | h-9 header, xs uppercase, tighter cells |
| `components/ui/dialog.tsx` | rounded-3xl, p-8, modal shadow |
| `components/ui/sheet.tsx` | 512px width, elevation shadow |
| `components/ui/select.tsx` | rounded-[10px], backdrop-blur |
| `components/ui/dropdown-menu.tsx` | rounded-[10px], backdrop-blur |
| `components/ui/switch.tsx` | 36x20, thumb shadow |
| `components/ui/slider.tsx` | 4px track, 12px thumb |
| `components/ui/checkbox.tsx` | 20px size |
| `components/ui/textarea.tsx` | transparent bg |
| `components/ui/sidebar.tsx` | Remove Inter override |
| `components/developers/developers-client.tsx` | Remove padding |
| `components/analytics/dashboard-view.tsx` | Remove padding |
| `components/projects/projects-client.tsx` | Remove padding |
| + other page containers | Remove padding |
