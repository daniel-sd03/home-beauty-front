import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2 md:flex-row md:items-end md:justify-between", className)}>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground text-balance md:text-3xl lg:text-4xl">
          {title}
        </h2>
        {description ? <p className="max-w-xl text-sm text-muted-foreground md:text-base">{description}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 items-center">{action}</div> : null}
    </div>
  )
}
