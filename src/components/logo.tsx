import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showWordmark?: boolean
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src="/eye-line-art.png"
        alt="Logo Home Beauty"
       className="h-10 w-auto shrink-0 object-contain scale-170 origin-left md:h-12"
      />
      {showWordmark ? (
        <span className="font-serif text-2xl leading-none font-semibold tracking-tight text-foreground md:text-3xl">
          Home Beauty
        </span>
      ) : (
        <span className="sr-only">Home Beauty</span>
      )}
    </div>
  )
}
