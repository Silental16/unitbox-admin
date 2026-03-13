"use client"

import {
  CopyIcon,
  CircleAlertIcon,
  TrashIcon,
  ShareIcon,
  ShoppingBagIcon,
  MoreHorizontalIcon,
  Loader2Icon,
  PlusIcon,
  MinusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react"
import { type LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const PREVIEW_ICONS: LucideIcon[] = [
  CopyIcon,
  CircleAlertIcon,
  TrashIcon,
  ShareIcon,
  ShoppingBagIcon,
  MoreHorizontalIcon,
  Loader2Icon,
  PlusIcon,
  MinusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
  SettingsIcon,
]

export function IconPreviewGrid() {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-8 place-items-center gap-4">
          {PREVIEW_ICONS.map((Icon, index) => (
            <Card
              key={index}
              className="flex size-8 items-center justify-center rounded-md p-0 ring ring-border *:[svg]:size-4"
            >
              <Icon />
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
