import { Star, MapPin, ChevronRight, Clock } from "lucide-react"

interface Service {
  id: number
  title: string
  price: string
  duration: string
  image: string
}

interface ProfessionalProps {
  name: string
  rating: number
  category: string
  distance: string
  image: string
  services: Service[]
}

export function ProfessionalSearchCard({ name, rating, category, distance, image, services }: ProfessionalProps) {
  return (
    <section className="space-y-4 border-b border-border/50 pb-10 last:border-0">
      {/* Cabeçalho do Profissional */}
      <div className="flex items-center justify-between group cursor-pointer px-1">
        <div className="flex items-center gap-4">
          <img 
            src={image} 
            alt={name} 
            className="w-16 h-16 rounded-2xl object-cover border border-border shadow-sm" 
          />
          <div>
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{name}</h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 text-accent font-bold">
                <Star size={14} fill="currentColor" /> {rating}
              </span>
              <span>•</span>
              <span>{category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {distance}
              </span>
            </div>
          </div>
        </div>
        <ChevronRight className="text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
      </div>

      {/* Lista de Serviços (Horizontal) */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-1">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="min-w-[280px] group/service bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col"
          >
            {/* Foto do Serviço */}
            <div className="h-32 w-full overflow-hidden">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover group-hover/service:scale-105 transition-transform duration-500" 
              />
            </div>
            
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h4 className="font-semibold text-foreground leading-tight">{service.title}</h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Clock size={12} /> {service.duration}
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-primary text-lg">{service.price}</span>
                <button className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                  AGENDAR
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}