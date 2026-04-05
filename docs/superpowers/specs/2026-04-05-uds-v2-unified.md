# UDS v2 — Unified Design System

## Summary

Объединить registry, skill, sandbox и ingestion pipeline в единую систему. Результат: каталог Lego из атомов и компоновок, который пополняется из дампов и переиспользуется во всех проектах.

## Architecture

### Репозиторий unitbox-registry

```
unitbox-registry/
├── app/                          ← Next.js сайт (Vercel)
│   ├── page.tsx                  ← Страница 1: Atoms (все компоненты и вариации)
│   └── patterns/
│       └── page.tsx              ← Страница 2: Patterns (каталог компоновок)
│
├── registry/                     ← shadcn registry items
│   └── new-york/
│       ├── ui/                   ← кастомизированные атомы (button, card, select...)
│       ├── patterns/             ← composed блоки (data-table-page, filter-bar...)
│       └── unitbox-tokens/       ← CSS токены файл
│
├── registry.json                 ← индекс для shadcn CLI
└── public/r/                     ← JSON'ы (генерируются shadcn build)
```

### Скилл unitbox-ds (в ~/.claude/skills/)

```
unitbox-ds/
├── SKILL.md                      ← оркестратор: правила + когда что использовать
├── rules/                        ← правила с Incorrect/Correct примерами
│   ├── tokens.md                 ← semantic radius, colors, shadows
│   ├── radius-matching.md        ← inner = outer - padding
│   ├── typography.md             ← Inter, weight scale, sizes
│   └── anti-patterns.md          ← что НИКОГДА не делать
├── patterns/                     ← описания компоновок с НАЗВАНИЯМИ
│   ├── data-table-page.md        ← title + filters + sortable table
│   ├── card-grid-page.md         ← tabs + search + grid
│   ├── filter-bar.md             ← search + select triggers + gap-2
│   ├── compact-list.md           ← 52px rows, avatars, action buttons
│   ├── settings-page.md          ← title + description + table + sheet
│   └── ...
└── ingestion-log.md              ← лог: откуда что извлечено
```

### Скилл design-ingest (в ~/.claude/skills/)

```
design-ingest/
├── SKILL.md                      ← инструкции по разбору дампов
└── scripts/
    └── parse-dump.py             ← парсер DOM-дампов (извлекает токены, компоненты)
```

## Страница 1: Atoms (/)

Перенос sandbox из Unitbox HQ. Все компоненты shadcn + наши кастомизации. Одна страница, скролл.

Секции:
- Typography (h1-h4, body, muted, small)
- Buttons (all variants × sizes)
- Badges (all variants × sizes + status dots)
- Inputs & Forms (input, textarea, select, checkbox, switch, slider, radio)
- Cards (basic, full, chart wrapper)
- Table (compact headers, status dots, sortable)
- Lists (compact voice-style + spacious model-style с реальными данными)
- Tabs (underline + pill)
- Dialogs & Sheets
- Combobox (multi-select с аватарами)
- DropdownMenu (basic + with icons)
- Separator & Kbd
- Alert + AlertDialog
- Skeleton
- Tooltip + Popover
- Progress
- Avatar
- Toggle & ToggleGroup
- Item / InputGroup / ButtonGroup
- Accordion + Collapsible
- Color Palette (design tokens grid)

## Страница 2: Patterns (/patterns)

Каталог компоновочных решений. Оглавление вверху → якорные ссылки к секциям.

Каждый паттерн:
- Название (якорь) — можно ссылаться: "используй паттерн Data Table Page"
- Живой пример с моковыми данными (интерактивный)
- Краткое описание: когда использовать

Паттерны (начальный набор):
1. **Data Table Page** — title + subtitle + filter bar + sortable table + detail sheet
2. **Card Grid Page** — title + search + category tabs + grid of cards
3. **Settings Page** — title + description + full-width table + create/edit sheet
4. **Dashboard Layout** — greeting + KPI cards + chart cards + tabs
5. **Filter Bar** — search input + select triggers + dropdown multi-select
6. **Compact List** — voice-library style rows (avatar + name + badges + actions)
7. **Spacious List** — model-style rows (squircle avatar + micro-badges)
8. **Stats Bar** — row of KPI numbers with labels
9. **Detail Sheet** — slide-over panel with header + metadata + content
10. **Empty State** — icon + heading + description + CTA
11. **Section Header** — title + chevron (clickable)
12. **Status Badge Row** — neutral badge + colored dot + label

## Как скилл и registry работают вместе

```
Ты: "спроектируй страницу заказов"
  ↓
Claude читает unitbox-ds skill:
  → patterns/data-table-page.md (знает структуру)
  → rules/tokens.md (знает какие токены)
  → rules/anti-patterns.md (знает что нельзя)
  ↓
Claude через shadcn MCP:
  → npx shadcn add @unitbox/data-table-page (если есть готовый блок)
  → или собирает из атомов: @unitbox/button + @unitbox/select + table
  ↓
Результат: страница по паттерну, с правильными стилями
```

## Ingestion Pipeline (design-ingest)

```
1. Ты: "вот дамп, вытащи паттерн панели"
2. design-ingest skill:
   ├─ Парсит дамп → находит новый паттерн
   ├─ Создаёт registry/new-york/patterns/panel.tsx (код)
   ├─ Добавляет в registry.json (registry item)
   ├─ Добавляет на /patterns страницу (демо)
   ├─ Создаёт unitbox-ds/patterns/panel.md (описание для Claude)
   ├─ Обновляет ingestion-log.md
   └─ shadcn build + push
3. Всё обновлено: скилл знает, registry имеет, sandbox показывает
```

## Что делает каждый слой

| Слой | Что хранит | Кто читает |
|------|-----------|-----------|
| **Registry repo** (unitbox-registry/) | Код компонентов + живой каталог | shadcn CLI + браузер |
| **Skill unitbox-ds** (~/.claude/skills/) | Правила, паттерны, anti-patterns | Claude Code |
| **Skill design-ingest** (~/.claude/skills/) | Процесс разбора дампов | Claude Code |
| **Project CLAUDE.md** (.claude/CLAUDE.md) | Ссылка на registry + project-specific правила | Claude Code |

## Implementation Plan

### Phase 1: Перенос sandbox в registry
- Скопировать sandbox page из Unitbox_Admin в registry app/page.tsx
- Установить все зависимости (radix, lucide, etc.)
- Верифицировать что все компоненты рендерятся
- Deploy на Vercel

### Phase 2: Страница Patterns
- Создать app/patterns/page.tsx
- Реализовать 5 ключевых паттернов с моковыми данными: Data Table Page, Filter Bar, Compact List, Card Grid, Empty State
- Оглавление с якорными ссылками

### Phase 3: Рефакторинг скилла
- Реструктурировать unitbox-ds: SKILL.md + rules/ + patterns/
- Формат rules/: каждое правило с Incorrect/Correct примерами (как у shadcn)
- Формат patterns/: каждый паттерн с названием, описанием, когда использовать
- Убрать дублирование с registry

### Phase 4: design-ingest скилл
- Создать design-ingest skill
- parse-dump.py для автоматической экстракции токенов
- Процесс: дамп → паттерн → skill + registry + demo

## Success Criteria

- [ ] unitbox-registry.vercel.app/ показывает все атомы
- [ ] unitbox-registry.vercel.app/patterns показывает 5+ компоновок
- [ ] "используй паттерн Data Table Page" → Claude знает что делать
- [ ] Дамп → design-ingest → паттерн добавлен везде
- [ ] Sandbox удалён из Unitbox HQ (живёт только в registry)
