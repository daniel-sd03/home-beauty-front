import { MessageCircle } from 'lucide-react'

import { LayoutContainer } from '@/components/layout-container'
import { Logo } from '@/components/logo'

function BrandInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function BrandFacebook({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
      aria-hidden
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.656 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card/30 py-12 md:mt-32">
      <LayoutContainer className="grid gap-10 md:grid-cols-4">
        {/* Coluna 1: Logo e Bio */}
        <div className="col-span-2 flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Conectando você aos melhores profissionais de beleza e bem-estar da sua região. 
            Agende seu momento de cuidado com facilidade e segurança.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <BrandInstagram size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <BrandFacebook size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Coluna 2: Links Rápidos */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-foreground">Navegação</h4>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="#categorias" className="hover:text-primary transition-colors">Categorias</a>
            <a href="#profissionais" className="hover:text-primary transition-colors">Profissionais</a>
            <a href="#" className="hover:text-primary transition-colors">Como funciona</a>
          </nav>
        </div>

        {/* Coluna 3: Suporte */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-foreground">Suporte</h4>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Central de Ajuda</a>
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
          </nav>
        </div>
      </LayoutContainer>
      
      <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Home Beauty. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}