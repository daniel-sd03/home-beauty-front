import { Search } from "lucide-react"

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden rounded-3xl bg-card px-6 py-10 md:px-12 md:py-16 lg:px-16 lg:py-20"
    >
      {/* Decorative face line illustration */}
      <img
        src="/beauty-face-line-art.png"
        alt="Arte decorativa de rosto"
        className="pointer-events-none absolute -right-6 top-1/2 z-0 h-[110%] -translate-y-1/2 object-contain md:-right-2 md:h-[115%] lg:right-6"
      />
      <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <div className="flex flex-col gap-6">
          <h1
            id="hero-title"
            className="font-serif text-4xl leading-[1.05] font-semibold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl"
          >
            Encontre profissionais de beleza locais
          </h1>
          <p className="max-w-md text-base leading-relaxed text-foreground/75 md:text-lg">
            Conecte-se com especialistas em sua área para cabelo, unhas, maquiagem e muito mais.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-sans text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
              Pesquisar
            </button>
            <span className="text-sm text-muted-foreground">Mais de 500 profissionais perto de você</span>
          </div>
        </div>

        {/* Spacer column on desktop so the illustration has room */}
        <div className="hidden md:block" aria-hidden="true" />
      </div>
    </section>
  )
}
