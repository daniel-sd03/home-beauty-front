import { Search } from "lucide-react"
import { CategoryCard } from '@/components/category-card'
import { HeroSection } from '@/components/hero-section'
import { LayoutContainer } from '@/components/layout-container'
import { Logo } from '@/components/logo'
import { ProfessionalCard } from '@/components/professional-card'
import { SectionHeader } from '@/components/section-header'
import { Footer as SiteFooter } from '@/components/footer'
import { useCategories } from '@/hooks/use-categories'
import { iconMap } from '@/lib/icons'


// Professionals data (kept static for now)
const professionals = [
  { id: "ana", name: "Ana Souza", specialty: "Cabeleireira", rating: 5, image: "/professionals/ana.jpg" },
  { id: "carla", name: "Carla Lima", specialty: "Maquiadora", rating: 4.5, image: "/professionals/carla.jpg" },
  { id: "juliana", name: "Juliana Costa", specialty: "Manicure", rating: 5, image: "/professionals/juliana.jpg" },
]

export default function Home() {
  // Fetching dynamic data via custom hook
  const { categories, isLoading, error } = useCategories()

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex-1">
        
        {/* Header section */}
        <LayoutContainer as="header" className="flex items-center justify-between py-6 md:py-8 gap-4">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Search bar section */}
          <div className="hidden flex-1 max-w-md sm:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Buscar serviços ou profissionais..."
                className="w-full bg-card/50 border border-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Main navigation section */}
          <nav aria-label="Navegação principal" className="flex items-center gap-4 md:gap-8 flex-shrink-0">
            <a href="#categorias" className="hidden text-sm font-medium text-foreground/80 transition-colors hover:text-primary lg:block">
              Categorias
            </a>
            <a href="#profissionais" className="hidden text-sm font-medium text-foreground/80 transition-colors hover:text-primary lg:block">
              Profissionais
            </a>
            <a href="#entrar" className="rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary whitespace-nowrap">
              Entrar
            </a>
          </nav>
        </LayoutContainer>

        {/* Hero section */}
        <LayoutContainer as="section" className="mt-2 md:mt-4">
          <HeroSection />
        </LayoutContainer>

        {/* Dynamic Categories section */}
        <LayoutContainer as="section" className="mt-14 md:mt-20" id="categorias">
          <SectionHeader title="Categorias" description="Escolha o serviço que você precisa hoje." />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-10 md:grid-cols-6 lg:gap-8">
            {isLoading && <p className="col-span-full text-center text-sm text-muted-foreground">Loading...</p>}
            {error && <p className="col-span-full text-center text-sm text-red-500">{error}</p>}
            
            {!isLoading && !error && categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                icon={iconMap[category.iconName] || iconMap.default}
                label={category.name} 
              />
            ))}
          </div>
        </LayoutContainer>

        {/* Professionals section */}
        <LayoutContainer as="section" className="mt-16 md:mt-24 mb-20" id="profissionais">
          <SectionHeader title="Profissionais em destaque" description="Especialistas avaliados pela nossa comunidade." />
          <div className="mt-8 flex flex-col gap-4 md:mt-10 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {professionals.map((pro) => (
              <ProfessionalCard key={pro.id} image={pro.image} name={pro.name} specialty={pro.specialty} rating={pro.rating} />
            ))}
          </div>
        </LayoutContainer>
      </div>

      {/* Footer section */}
      <SiteFooter />
    </main>
  )
}