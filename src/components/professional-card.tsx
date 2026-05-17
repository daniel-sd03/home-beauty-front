import { RatingStars } from '@/components/rating-stars'
import { cn } from '@/lib/utils'

interface ProfessionalCardProps {
  image: string
  name: string
  specialty: string
  rating: number
  className?: string
}

export function ProfessionalCard({ image, name, specialty, rating, className }: ProfessionalCardProps) {
  return (
    <article
      className={cn(
        "flex items-center gap-4 rounded-3xl bg-card/60 p-4 transition-colors hover:bg-card md:flex-col md:items-start md:gap-5 md:p-6",
        className,
      )}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-background md:h-full md:w-full md:rounded-3xl md:ring-0 md:aspect-[4/5]">
        <img
          src={image || '/placeholder.svg'}
          alt={`Foto de ${name}`}
          className="h-full w-full object-cover"
          decoding="async"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 md:gap-2">
        <h3 className="font-serif text-xl leading-tight font-semibold tracking-tight text-foreground md:text-2xl">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground md:text-base">{specialty}</p>
        <RatingStars value={rating} showValue className="mt-1" />
      </div>
    </article>
  )
}
