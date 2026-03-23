"use client"

import { useState } from "react"
import { ChevronsUpDownIcon, CheckIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import type { Developer } from "@/lib/data/developers"

interface DeveloperComboboxProps {
  developers: Developer[]
  value: string | null
  onChange: (developerId: string | null, developerName: string) => void
}

export function DeveloperCombobox({
  developers,
  value,
  onChange,
}: DeveloperComboboxProps) {
  const [open, setOpen] = useState(false)

  const selected = developers.find((d) => d.id === value)

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">Developer</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-expanded={open}
            className="flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <span className={cn("truncate", !selected && "text-muted-foreground")}>
              {selected ? selected.name : "Select developer..."}
            </span>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              {selected && (
                <span
                  role="button"
                  className="p-0.5 rounded hover:bg-muted"
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange(null, "")
                  }}
                >
                  <XIcon className="size-3 text-muted-foreground" />
                </span>
              )}
              <ChevronsUpDownIcon className="size-3.5 text-muted-foreground" />
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search developer..." />
            <CommandList>
              <CommandEmpty>No developer found.</CommandEmpty>
              <CommandGroup>
                {developers.map((dev) => (
                  <CommandItem
                    key={dev.id}
                    value={dev.name}
                    onSelect={() => {
                      onChange(dev.id, dev.name)
                      setOpen(false)
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 size-3.5",
                        value === dev.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="truncate">{dev.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
