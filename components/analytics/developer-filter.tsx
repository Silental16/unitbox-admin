"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

const DEVELOPERS = [
  { code: "breig", name: "BREIG" },
  { code: "wellstate", name: "Wellstate" },
  { code: "teus", name: "Teus" },
  { code: "alexvillas", name: "Alex Villas" },
  { code: "embracebali", name: "Embrace Bali" },
  { code: "nexa", name: "Nexa" },
  { code: "bigbaligroup", name: "Big Bali Group" },
  { code: "meta", name: "Meta" },
  { code: "biom", name: "Biom" },
  { code: "bridge", name: "Bridge" },
  { code: "sevensky", name: "Seven Sky" },
  { code: "hqc", name: "HQC" },
  { code: "ecoinvest", name: "Ecoinvest" },
] as const

export function DeveloperFilter({ selected }: { selected: string[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = React.useState(false)

  function handleToggle(code: string) {
    const next = selected.includes(code)
      ? selected.filter((c) => c !== code)
      : [...selected, code]

    const params = new URLSearchParams(searchParams.toString())
    if (next.length > 0) {
      params.set("dev", next.join(","))
    } else {
      params.delete("dev")
    }
    router.push(`/analytics?${params.toString()}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-1">
          {selected.length > 0 ? (
            <>
              <span className="text-sm">Developers</span>
              <Badge variant="secondary" className="ml-1">
                {selected.length}
              </Badge>
            </>
          ) : (
            <span className="text-sm">All developers</span>
          )}
          <ChevronsUpDownIcon className="ml-1 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="end">
        <Command>
          <CommandInput placeholder="Search developers..." />
          <CommandList>
            <CommandEmpty>No developer found.</CommandEmpty>
            <CommandGroup>
              {DEVELOPERS.map((dev) => (
                <CommandItem
                  key={dev.code}
                  value={dev.code}
                  data-checked={selected.includes(dev.code)}
                  onSelect={() => handleToggle(dev.code)}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 size-4",
                      selected.includes(dev.code)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <span>{dev.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {dev.code}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
