"use client"

import { useState } from "react"
import { RoiCalculator, type Lang } from "@/components/roi/roi-calculator"
import { Button } from "@/components/ui/button"
import { GlobeIcon } from "lucide-react"

export default function RoiPage() {
  const [lang, setLang] = useState<Lang>("ru")

  return (
    <>
      {/* Language switcher — injected into the header via a portal-like fixed position */}
      <div className="fixed top-2.5 right-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs font-medium text-muted-foreground"
          onClick={() => setLang(lang === "ru" ? "en" : "ru")}
        >
          <GlobeIcon className="size-3.5" />
          {lang === "ru" ? "EN" : "RU"}
        </Button>
      </div>

      <RoiCalculator lang={lang} />
    </>
  )
}
