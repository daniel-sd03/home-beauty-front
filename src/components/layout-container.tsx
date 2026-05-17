import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface LayoutContainerProps {
  children: ReactNode
  className?: string
  as?: "div" | "section" | "main" | "header" | "footer"
  id?: string
}

export function LayoutContainer({ children, className, as: Tag = "div" }: LayoutContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-6xl px-4 md:px-8", className)}>{children}</Tag>
}
