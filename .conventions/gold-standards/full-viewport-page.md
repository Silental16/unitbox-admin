# Full Viewport Page Gold Standard

## When to use
For tool pages that need the entire viewport (flow editors, canvas tools, map views)
— NOT for standard CRUD list/detail pages.

## Pattern: Break out of dashboard padding

The dashboard layout wraps children in `max-w-6xl px-5 py-8`.
Full-viewport pages use negative margins to reclaim that space:

```tsx
// components/[feature]/[feature]-editor.tsx
"use client"

export function FeatureEditor({ ... }: Props) {
  return (
    <div className="h-[calc(100vh-50px)] -mx-5 -my-8 flex">
      {/* Sidebar (optional) */}
      <div className="flex-1 relative">
        {/* Floating header */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <a href="/feature-list" className="flex size-8 items-center justify-center rounded-lg bg-background/90 backdrop-blur border border-border hover:bg-accent">
            <ArrowLeftIcon className="size-4" />
          </a>
          {/* Editable name, save indicator, etc. */}
        </div>

        {/* Canvas content fills remaining space */}
      </div>
    </div>
  )
}
```

## Key rules
- `h-[calc(100vh-50px)]` — 50px is the dashboard header height
- `-mx-5 -my-8` — negates the dashboard layout padding
- Floating controls use `absolute` positioning with `z-10`
- Back button goes to the list page
- No separate layout.tsx needed unless overriding additional layout behavior

## Reference implementation
`components/flows/flow-editor.tsx` + `app/(dashboard)/flows/[id]/page.tsx`
