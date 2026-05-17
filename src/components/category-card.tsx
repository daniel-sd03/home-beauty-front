import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  icon: ReactNode
  label: string
  className?: string
}

export function CategoryCard({ icon, label, className }: CategoryCardProps) {
  return (
    <a
      href={`#${label.toLowerCase()}`}
      className={cn(
        "group flex flex-col items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-card/60 focus-visible:bg-card/60 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-primary transition-transform group-hover:-translate-y-0.5 md:h-24 md:w-24"
      >
        {icon}
      </span>
      <span className="font-sans text-sm font-medium text-foreground md:text-base">{label}</span>
    </a>
  )
}
