"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface DatePickerProps {
  value?: string | null
  onChange?: (date: string | null) => void
  className?: string
  placeholder?: string
}

function DatePicker({ value, onChange, className, placeholder = "Выбрать дату" }: DatePickerProps) {
  return (
    <Input
      type="date"
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value || null)}
      className={cn("w-auto", className)}
      placeholder={placeholder}
    />
  )
}

export { DatePicker }
