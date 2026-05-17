import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  value: number
  max?: number
  showValue?: boolean
  size?: "sm" | "md"
  className?: string
}

export function RatingStars({ value, max = 5, showValue = false, size = "md", className }: RatingStarsProps) {
  const clamped = Math.max(0, Math.min(max, value))
  const sizeClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"

  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-label={`Avaliação ${clamped.toFixed(1)} de ${max}`}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: max }).map((_, i) => {
          const fill = Math.max(0, Math.min(1, clamped - i))
          return (
            <span key={i} className={cn("relative inline-block", sizeClass)}>
              <Star className={cn("absolute inset-0 text-accent/30", sizeClass)} fill="currentColor" strokeWidth={0} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className={cn("text-accent", sizeClass)} fill="currentColor" strokeWidth={0} />
              </span>
            </span>
          )
        })}
      </div>
      {showValue ? <span className="text-xs font-medium text-muted-foreground">{clamped.toFixed(1)}</span> : null}
    </div>
  )
}
