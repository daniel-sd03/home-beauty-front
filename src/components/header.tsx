import { Search, ChevronLeft, Filter } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import { LayoutContainer } from '@/components/layout-container'
import { Logo } from '@/components/logo'

interface HeaderProps {
  variant?: 'home' | 'search' | 'default'
}

export function Header({ variant = 'default' }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <div className={variant === 'search' ? "sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40" : ""}>
      
      <LayoutContainer as="header" className="flex items-center justify-between py-4 md:py-6 gap-4">
        
        {/* Left Section: Logo & Navigation */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {variant === 'search' && (
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 -ml-2 text-foreground hover:bg-card rounded-full sm:hidden"
              aria-label="Back"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          <div className={variant === 'search' ? "hidden sm:block" : ""}>
            <Logo />
          </div>
        </div>

        {/* Center Section: Global Search */}
        <div className={`flex-1 max-w-md ${variant === 'home' ? 'hidden sm:block' : ''}`}>
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder={variant === 'home' ? "Buscar serviços ou profissionais..." : "O que você busca hoje?"}
              className="w-full bg-card/50 border border-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Right Section: Navigation & Auth */}
        <nav aria-label="Main navigation" className="flex items-center gap-4 md:gap-8 flex-shrink-0">
          {variant === 'home' && (
            <>
              <a href="#categorias" className="hidden text-sm font-medium text-foreground/80 transition-colors hover:text-primary lg:block">
                Categorias
              </a>
              <a href="#profissionais" className="hidden text-sm font-medium text-foreground/80 transition-colors hover:text-primary lg:block">
                Profissionais
              </a>
            </>
          )}
          
          <Link 
            to="/login" 
            className={
              variant === 'home' 
                ? "rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary whitespace-nowrap"
                : "rounded-full bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark whitespace-nowrap"
            }
          >
            Entrar
          </Link>
        </nav>
      </LayoutContainer>

      {/* Sub-header: Search Filters */}
      {variant === 'search' && (
        <LayoutContainer className="pb-4 flex gap-2 overflow-x-auto no-scrollbar">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-full text-xs font-medium hover:bg-card whitespace-nowrap">
            <Filter size={14} /> Filtros
          </button>
          {['Distância', 'Avaliação', 'Preço', 'Categorias'].map(f => (
            <button key={f} className="px-4 py-2 border border-border rounded-full text-xs font-medium hover:bg-card whitespace-nowrap">
              {f}
            </button>
          ))}
        </LayoutContainer>
      )}
    </div>
  )
}