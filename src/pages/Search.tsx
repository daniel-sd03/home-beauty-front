import { Search, Filter, ChevronLeft } from "lucide-react"
import { LayoutContainer } from "@/components/layout-container"
import { Logo } from "@/components/logo"
import { Footer as SiteFooter } from "@/components/footer"
import { ProfessionalSearchCard } from "@/components/professional-search-card"

const mockData = [
    {
      id: 1,
      name: "Studio Bella - Unhas & Estética",
      rating: 4.9,
      category: "Manicure",
      distance: "1.2 km",
      image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400",
      services: [
        { 
          id: 101, 
          title: "Alongamento em Gel", 
          price: "R$ 120,00", 
          duration: "120 min",
          image: "https://images.unsplash.com/photo-1604654894610-df490651e619?w=400"
        },
        { 
          id: 102, 
          title: "Esmaltação em Gel", 
          price: "R$ 60,00", 
          duration: "45 min",
          image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400"
        }
      ]
    },
    {
      id: 2,
      name: "Corte & Estilo - Hair Design",
      rating: 4.8,
      category: "Cabeleireiro",
      distance: "0.8 km",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400",
      services: [
        { 
          id: 201, 
          title: "Corte Feminino + Escova", 
          price: "R$ 85,00", 
          duration: "60 min",
          image: "https://images.unsplash.com/photo-1560869713-7d0a29430863?w=400"
        },
        { 
          id: 202, 
          title: "Mechas e Luzes", 
          price: "R$ 320,00", 
          duration: "180 min",
          image: "https://images.unsplash.com/photo-1554519934-e32b1629d9ee?w=400"
        },
        { 
          id: 203, 
          title: "Hidratação Profunda", 
          price: "R$ 45,00", 
          duration: "30 min",
          image: "https://images.unsplash.com/photo-1527799822367-a05eb5702a51?w=400"
        }
      ]
    },
    {
      id: 3,
      name: "Barba & Navalha - Classic",
      rating: 5.0,
      category: "Barbearia",
      distance: "2.5 km",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400",
      services: [
        { 
          id: 301, 
          title: "Corte Masculino Degradê", 
          price: "R$ 55,00", 
          duration: "40 min",
          image: "https://images.unsplash.com/photo-1621605815841-aa897bd07b5d?w=400"
        },
        { 
          id: 302, 
          title: "Barba Terapia com Toalha Quente", 
          price: "R$ 40,00", 
          duration: "30 min",
          image: "https://images.unsplash.com/photo-1512690196252-741eddec99a3?w=400"
        }
      ]
    },
    {
      id: 4,
      name: "Glow Makeup Studio",
      rating: 4.7,
      category: "Maquiagem",
      distance: "3.1 km",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
      services: [
        { 
          id: 401, 
          title: "Maquiagem Social Noite", 
          price: "R$ 180,00", 
          duration: "70 min",
          image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400"
        },
        { 
          id: 402, 
          title: "Design de Sobrancelhas", 
          price: "R$ 35,00", 
          duration: "25 min",
          image: "https://images.unsplash.com/photo-1522337363644-32304d2c161a?w=400"
        }
      ]
    }
  ];

export default function SearchPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex-1">
        {/* Header Fixo */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
            <LayoutContainer as="header" className="flex items-center justify-between py-4 gap-4">
                <button onClick={() => window.history.back()} 
                    className="p-2 -ml-2 text-foreground hover:bg-card rounded-full sm:hidden"
                    aria-label="Voltar">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex-shrink-0 hidden sm:block">
                    <Logo />
                </div>
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input type="text" placeholder="O que você busca hoje?" className="w-full bg-card/50 border border-border rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                </div>
                <button className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white">Entrar</button>
            </LayoutContainer>

            {/* Filtros */}
            <LayoutContainer className="pb-4 flex gap-2 overflow-x-auto no-scrollbar">
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-full text-xs font-medium hover:bg-card whitespace-nowrap">
                    <Filter size={14} /> Filtros
                </button>
                {['Distância', 'Avaliação', 'Preço', 'Categorias'].map(f => (
                    <button key={f} className="px-4 py-2 border border-border rounded-full text-xs font-medium hover:bg-card whitespace-nowrap">{f}</button>
                ))}
            </LayoutContainer>
        </div>  

        {/* Lista de Resultados */}
        <LayoutContainer className="py-8 space-y-10">
          {mockData.map((pro) => (
            <ProfessionalSearchCard key={pro.id} {...pro} />
          ))}
        </LayoutContainer>
      </div>
      <SiteFooter />
    </main>
  )
}