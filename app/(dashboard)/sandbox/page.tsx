"use client"

import { useState } from "react"
import {
  AlertTriangleIcon,
  BoldIcon,
  ChevronDownIcon,
  InfoIcon,
  InboxIcon,
  ItalicIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  UnderlineIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { NativeSelect } from "@/components/ui/native-select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { AnnouncementBanner } from "@/components/ui/announcement-banner"
import { UsageMeter } from "@/components/ui/usage-meter"
import { Prose } from "@/components/ui/prose"
import { Label } from "@/components/ui/label"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import { Kbd } from "@/components/ui/kbd"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription as ItemDesc,
  ItemActions,
} from "@/components/ui/item"
import { FieldGroup } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"

import { FILL_STATUSES } from "@/lib/data/catalog-projects"

// --- Mock data ---

const tableData = [
  { id: 1, name: "Azuma Residence", status: "published", units: 42, price: "$185k" },
  { id: 2, name: "Sunny Cuddles", status: "filling", units: 28, price: "$120k" },
  { id: 3, name: "Sansara Pandawa", status: "filled", units: 36, price: "$210k" },
  { id: 4, name: "YOLLA Nunggalan", status: "pending", units: 0, price: "TBD" },
  { id: 5, name: "Bali Baza", status: "error", units: 15, price: "$95k" },
]

function getStatusDot(status: string) {
  const found = FILL_STATUSES.find((s) => s.value === status)
  return found?.dot ?? "bg-muted-foreground"
}

const compactListData = [
  { id: 1, name: "Sarah Chen", role: "Sales Lead", tag: "Active", avatar: "SC" },
  { id: 2, name: "Marcus Johnson", role: "BD Manager", tag: "New", avatar: "MJ" },
  { id: 3, name: "Elena Petrova", role: "Account Exec", tag: "Active", avatar: "EP" },
  { id: 4, name: "Raj Patel", role: "Regional Dir", tag: "Away", avatar: "RP" },
]

const spaciousListData = [
  { id: 1, name: "GPT-4 Turbo", tag: "New", count: 128 },
  { id: 2, name: "Claude Opus", tag: null, count: 256 },
  { id: 3, name: "Gemini Ultra", tag: "New", count: 64 },
]

const COLOR_TOKENS = [
  { name: "background", var: "--background" },
  { name: "foreground", var: "--foreground" },
  { name: "primary", var: "--primary" },
  { name: "secondary", var: "--secondary" },
  { name: "muted", var: "--muted" },
  { name: "accent", var: "--accent" },
  { name: "destructive", var: "--destructive" },
  { name: "chart-1", var: "--chart-1" },
  { name: "chart-2", var: "--chart-2" },
  { name: "chart-3", var: "--chart-3" },
  { name: "chart-4", var: "--chart-4" },
  { name: "chart-5", var: "--chart-5" },
]

export default function SandboxPage() {
  const [segmented, setSegmented] = useState("overview")
  const [segmentedControl, setSegmentedControl] = useState("Week")
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-balance">
          Component Sandbox
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visual reference for all ElevenLabs-styled shadcn components.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {/* 1. Typography */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Typography
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-semibold">Heading 1 — text-2xl/semibold</h1>
                <h2 className="text-xl font-semibold">Heading 2 — text-xl/semibold</h2>
                <h3 className="text-lg font-medium">Heading 3 — text-lg/medium</h3>
                <h4 className="text-base font-medium">Heading 4 — text-base/medium</h4>
                <p className="text-sm">Body — text-sm</p>
                <p className="text-sm text-muted-foreground">Muted — text-sm text-muted-foreground</p>
                <p className="text-xs">Small — text-xs</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2. Buttons */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Buttons
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              {(["default", "secondary", "outline", "ghost", "destructive"] as const).map(
                (variant) => (
                  <div key={variant} className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-muted-foreground capitalize">
                      {variant}
                    </span>
                    <div className="flex flex-wrap gap-2 items-center">
                      <Button variant={variant}>Default</Button>
                      <Button variant={variant} size="sm">Small</Button>
                      <Button variant={variant} size="xs">XS</Button>
                      <Button variant={variant} size="icon">
                        <PlusIcon />
                      </Button>
                      <Button variant={variant} size="icon-sm">
                        <PlusIcon />
                      </Button>
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </section>

        {/* 3. Badges */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Badges
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Default size</span>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="ghost">Ghost</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Small size</span>
                <div className="flex flex-wrap gap-2">
                  <Badge size="sm">Default</Badge>
                  <Badge size="sm" variant="secondary">Secondary</Badge>
                  <Badge size="sm" variant="outline">Outline</Badge>
                  <Badge size="sm" variant="destructive">Destructive</Badge>
                  <Badge size="sm" variant="ghost">Ghost</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Status badges</span>
                <div className="flex flex-wrap gap-2">
                  {FILL_STATUSES.map((s) => (
                    <Badge key={s.value} variant="secondary" className="gap-1.5">
                      <span className={`size-1.5 rounded-full ${s.dot}`} />
                      <span>{s.label}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 4. Inputs & Forms */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Inputs & Forms
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label>Search input</Label>
                <div className="relative max-w-sm">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input placeholder="Search projects..." className="pl-9" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Default input</Label>
                <Input placeholder="Enter value..." className="max-w-sm" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Textarea</Label>
                <Textarea placeholder="Write a description..." className="max-w-sm" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Select</Label>
                <Select>
                  <SelectTrigger className="max-w-sm">
                    <SelectValue placeholder="Choose option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option-1">Option 1</SelectItem>
                    <SelectItem value="option-2">Option 2</SelectItem>
                    <SelectItem value="option-3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Native select</Label>
                <NativeSelect className="max-w-sm">
                  <option value="">Choose...</option>
                  <option value="a">Alpha</option>
                  <option value="b">Beta</option>
                  <option value="c">Gamma</option>
                </NativeSelect>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="demo-checkbox" />
                <Label htmlFor="demo-checkbox">Accept terms and conditions</Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch id="demo-switch" />
                <Label htmlFor="demo-switch">Enable notifications</Label>
              </div>

              <div className="flex flex-col gap-2 max-w-sm">
                <Label>Slider</Label>
                <Slider defaultValue={[40]} max={100} step={1} />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Radio group</Label>
                <RadioGroup defaultValue="option-1">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-1" id="r1" />
                    <Label htmlFor="r1">Standard</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-2" id="r2" />
                    <Label htmlFor="r2">Premium</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-3" id="r3" />
                    <Label htmlFor="r3">Enterprise</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 5. Cards */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Cards
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent>
                <h3 className="text-lg font-medium">Basic Card</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Simple card with just a title and content text.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Full Card</CardTitle>
                <CardDescription>With header, content, and footer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  This card uses all available card sub-components for a complete layout.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button size="sm">Save</Button>
                <Button size="sm" variant="outline">Cancel</Button>
              </CardFooter>
            </Card>

            <div className="bg-[rgba(0,0,0,0.02)] rounded-3xl p-2">
              <div className="bg-background rounded-2xl p-5 shadow-card">
                <h3 className="text-lg font-medium">Chart Wrapper</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Outer: bg-[rgba(0,0,0,0.02)] rounded-3xl p-2
                </p>
                <p className="text-sm text-muted-foreground">
                  Inner: bg-background rounded-2xl p-5 shadow-card
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Table */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Table
          </h2>
          <Card className="w-full">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Units</TableHead>
                    <TableHead className="text-right">Avg Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <span className={`size-1.5 rounded-full ${getStatusDot(row.status)}`} />
                          <span className="capitalize text-sm">{row.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{row.units}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* 7. Lists */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Lists
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Compact list */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Compact List</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-0">
                {compactListData.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center gap-3 rounded-[16px] px-3 py-2 hover:bg-muted transition-colors"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-medium text-background">
                      {item.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                    <Badge size="sm" variant="secondary">{item.tag}</Badge>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontalIcon />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Spacious list */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Spacious List</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                {spaciousListData.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-xl px-3 py-3 hover:bg-muted transition-colors"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-3xl bg-muted text-sm font-medium">
                      {item.name.slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{item.name}</p>
                        {item.tag && (
                          <Badge size="sm" className="bg-foreground text-background">
                            {item.tag}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary">{item.count}k tokens</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 8. Tabs */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Tabs
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Underline tabs (default)</span>
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Overview</TabsTrigger>
                    <TabsTrigger value="tab2">Analytics</TabsTrigger>
                    <TabsTrigger value="tab3">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">
                    <p className="text-sm text-muted-foreground p-4">Overview content goes here.</p>
                  </TabsContent>
                  <TabsContent value="tab2">
                    <p className="text-sm text-muted-foreground p-4">Analytics content goes here.</p>
                  </TabsContent>
                  <TabsContent value="tab3">
                    <p className="text-sm text-muted-foreground p-4">Settings content goes here.</p>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Category pill tabs</span>
                <div className="flex gap-1">
                  {["overview", "projects", "team"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSegmented(tab)}
                      className={
                        segmented === tab
                          ? "bg-foreground text-background rounded-[10px] h-8 px-3 text-sm font-medium transition-colors"
                          : "bg-background border border-input rounded-[10px] h-8 px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      }
                    >
                      <span className="capitalize">{tab}</span>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground p-4">
                  Active tab: <span className="font-medium text-foreground capitalize">{segmented}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 9. Dialogs & Sheets */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Dialogs & Sheets
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Action</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to proceed? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sheet Panel</SheetTitle>
                    <SheetDescription>
                      A slide-over panel for secondary content or forms.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground">
                      Sheet body content goes here. Use for detail views, forms, or settings.
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </section>

        {/* 10. Micro-components */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Micro-components
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Announcement Banner</span>
                <AnnouncementBanner badge="New">
                  Introducing AI-powered project filling
                </AnnouncementBanner>
              </div>

              <div className="flex flex-col gap-2 max-w-sm">
                <span className="text-xs font-medium text-muted-foreground">Usage Meter</span>
                <UsageMeter label="API Calls" value={7500} max={10000} />
                <UsageMeter label="Storage" value={3.2} max={5} formatValue={(n) => `${n} GB`} />
              </div>

              <div className="flex flex-col gap-2 max-w-lg">
                <span className="text-xs font-medium text-muted-foreground">Prose</span>
                <Prose>{`**Markdown rendering** with support for:\n\n## Headings\n\n- Bold text and *italic*\n- Lists with items\n- Inline \`code\` blocks`}</Prose>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Segmented Control</span>
                <div className="bg-[rgb(243,244,246)] rounded-[10px] p-1 inline-flex gap-0.5 w-fit">
                  {["Day", "Week", "Month"].map((label) => (
                    <button
                      key={label}
                      onClick={() => setSegmentedControl(label)}
                      className={
                        segmentedControl === label
                          ? "bg-white rounded-[8px] px-3 h-7 text-sm font-medium shadow-sm transition-all"
                          : "px-3 h-7 text-sm font-medium text-muted-foreground rounded-[8px] transition-all hover:text-foreground"
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Empty State</span>
                <Empty className="border border-dashed">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <InboxIcon />
                    </EmptyMedia>
                    <EmptyTitle>No projects yet</EmptyTitle>
                    <EmptyDescription>
                      Get started by creating your first project.
                    </EmptyDescription>
                  </EmptyHeader>
                  <Button size="sm">
                    <PlusIcon />
                    Create Project
                  </Button>
                </Empty>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 11. Separator & Kbd */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Separator & Kbd
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Horizontal separator</span>
                <Separator />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Vertical separator between elements</span>
                <div className="flex items-center gap-3 h-8">
                  <span className="text-sm">Home</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm">Settings</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm">Profile</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Keyboard shortcuts</span>
                <div className="flex flex-wrap gap-3">
                  <Kbd>⌘K</Kbd>
                  <Kbd>⌘S</Kbd>
                  <Kbd>Esc</Kbd>
                  <Kbd>⌘⇧P</Kbd>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 12. Alert */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Alert
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <Alert>
                <InfoIcon className="size-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is a default informational alert with a title and description.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertTriangleIcon className="size-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong. Please check your input and try again.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>

        {/* 13. AlertDialog */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Alert Dialog
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Project</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the project
                      and remove all associated data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </section>

        {/* 14. Skeleton */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Skeleton
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Skeleton className="size-12 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 15. Tooltip */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Tooltip
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <TooltipProvider>
                <div className="flex gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a tooltip</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <PlusIcon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add new item</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        </section>

        {/* 16. Popover */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Popover
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Popover Content</h4>
                    <p className="text-sm text-muted-foreground">
                      This is a popover with some content. You can put forms, lists, or any other content here.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        </section>

        {/* 17. Progress */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Progress
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 max-w-md">
                <span className="text-xs font-medium text-muted-foreground">25%</span>
                <Progress value={25} />
              </div>
              <div className="flex flex-col gap-2 max-w-md">
                <span className="text-xs font-medium text-muted-foreground">60%</span>
                <Progress value={60} />
              </div>
              <div className="flex flex-col gap-2 max-w-md">
                <span className="text-xs font-medium text-muted-foreground">100%</span>
                <Progress value={100} />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 18. Avatar */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Avatar
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>

                <Avatar className="size-14">
                  <AvatarFallback className="text-lg">XL</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 19. Toggle & ToggleGroup */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Toggle & ToggleGroup
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Single toggles</span>
                <div className="flex gap-2">
                  <Toggle aria-label="Toggle bold">
                    <BoldIcon className="size-4" />
                  </Toggle>
                  <Toggle aria-label="Toggle italic">
                    <ItalicIcon className="size-4" />
                  </Toggle>
                  <Toggle aria-label="Toggle underline">
                    <UnderlineIcon className="size-4" />
                  </Toggle>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Toggle group</span>
                <ToggleGroup type="multiple">
                  <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <BoldIcon className="size-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <ItalicIcon className="size-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline" aria-label="Toggle underline">
                    <UnderlineIcon className="size-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 20. DropdownMenu */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Dropdown Menu
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Open Menu
                    <ChevronDownIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        </section>

        {/* 21. Item / Field / InputGroup / ButtonGroup */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Item / InputGroup / ButtonGroup
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">Item (outline variant)</span>
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>Project Configuration</ItemTitle>
                    <ItemDesc>Manage your project settings and preferences</ItemDesc>
                  </ItemContent>
                  <ItemActions>
                    <Button size="sm" variant="outline">Configure</Button>
                  </ItemActions>
                </Item>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">InputGroup with search addon</span>
                <FieldGroup>
                  <InputGroup className="max-w-sm">
                    <InputGroupAddon>
                      <SearchIcon className="size-4" />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Search..." />
                  </InputGroup>
                </FieldGroup>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">ButtonGroup</span>
                <ButtonGroup>
                  <Button variant="outline">Left</Button>
                  <Button variant="outline">Right</Button>
                </ButtonGroup>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 22. Accordion */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Accordion
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Unitbox?</AccordionTrigger>
                  <AccordionContent>
                    Unitbox is a real estate catalog platform focused on emerging markets like Bali.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How does AI filling work?</AccordionTrigger>
                  <AccordionContent>
                    AI agents parse project materials (PDFs, spreadsheets, websites) and populate
                    all database fields following 78 domain-specific rules.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What tech stack is used?</AccordionTrigger>
                  <AccordionContent>
                    Next.js, NestJS, PostgreSQL, Supabase, and shadcn/ui for the admin interface.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* 23. Collapsible */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Collapsible
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
                <div className="flex items-center gap-2">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm">
                      <ChevronDownIcon className={`size-4 transition-transform ${collapsibleOpen ? "rotate-180" : ""}`} />
                      {collapsibleOpen ? "Hide" : "Show"} details
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-3">
                  <div className="rounded-lg border px-4 py-3 text-sm text-muted-foreground">
                    This content is hidden by default and can be toggled with the button above.
                    Use Collapsible for progressive disclosure of secondary information.
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </section>

        {/* 24. Color Palette */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Color Palette
          </h2>
          <Card className="w-full">
            <CardContent className="flex flex-col gap-6">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {COLOR_TOKENS.map((token) => (
                  <div key={token.name} className="flex flex-col gap-1.5">
                    <div
                      className="aspect-square w-full rounded-lg border"
                      style={{ backgroundColor: `var(${token.var})` }}
                    />
                    <span className="text-[10px] font-medium text-muted-foreground truncate">
                      {token.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
