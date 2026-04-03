# UI Component Conventions

## Required
- ALL UI must use shadcn/ui components from `@/components/ui/`
- No raw HTML for UI elements (use Card, Table, Badge, etc.)
- No inline styles
- No custom CSS classes for UI elements

## Charts (Recharts)
- Always wrap in `ChartContainer` with `ChartConfig`
- Colors via CSS vars: `var(--chart-1)` through `var(--chart-5)`
- Never hardcode hex colors
- `ChartConfig` must use `satisfies ChartConfig`
- Always include `ChartTooltip` with `ChartTooltipContent`

## Numbers
- `tabular-nums` class on all numeric values
- `toLocaleString()` for numbers > 999

## ElevenLabs Design System
- NEVER use `rounded-4xl` (pill) on buttons, inputs, selects, tabs
- NEVER use solid gray borders — use alpha: `border-border` resolves to `rgba(0,0,29,0.075)`
- NEVER use amber/brand primary — primary is near-black
- NEVER use pill TabsList as default — use underline variant
- NEVER add per-page padding — layout wrapper handles `px-5 py-8`
- ALWAYS use `tabular-nums` on numeric values
- Font is Inter globally — no per-component font overrides

## Conditional classNames

- Use `cn()` from `@/lib/utils`, never string template concatenation

## React keys
- Use composite keys for non-unique fields: `${item.name}-${item.category}`
- Never use array index as key for dynamic lists

## Client vs Server
- Chart components: `"use client"` (Recharts requires it)
- Page components: server (async, no "use client")
- Loading skeletons: no "use client"
