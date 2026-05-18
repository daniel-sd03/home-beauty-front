import { CategoryCard } from '@/components/category-card'
import { HeroSection } from '@/components/hero-section'
import { LayoutContainer } from '@/components/layout-container'
import { ProfessionalCard } from '@/components/professional-card'
import { SectionHeader } from '@/components/section-header'
import { Footer as SiteFooter } from '@/components/footer'
import { useCategories } from '@/hooks/use-categories'
import { iconMap } from '@/lib/icons'
import { Header } from '@/components/header'



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
        <Header variant="home" />

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