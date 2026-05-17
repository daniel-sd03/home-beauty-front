import { Hand, Scissors, Eye, Sparkles, Droplets, Smile, Heart } from "lucide-react"

const size = "h-9 w-9 md:h-10 md:w-10"

// O nome à esquerda (unhas, cabelo) é a palavra exata que o banco de dados vai nos mandar
export const iconMap: Record<string, React.ReactNode> = {
  unhas: <Hand className={size} strokeWidth={1.5} />,
  cabelo: <Scissors className={size} strokeWidth={1.5} />,
  maquiagem: <Eye className={size} strokeWidth={1.5} />,
  pele: <Smile className={size} strokeWidth={1.5} />,
  spa: <Droplets className={size} strokeWidth={1.5} />,
  saude: <Heart className={size} strokeWidth={1.5} />,
  default: <Sparkles className={size} strokeWidth={1.5} />
}