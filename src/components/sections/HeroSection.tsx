import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Stethoscope, Tag, Headset } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 flex items-center min-h-[85vh] overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://img.usecurling.com/p/1920/1080?q=medical%20laboratory&color=red"
          alt="Laboratory Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Líder em Distribuição Laboratorial
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Excelência em Diagnóstico e <span className="text-primary">Suporte Laboratorial</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
            Equipamentos de ponta, insumos de alta qualidade e assistência técnica especializada
            para garantir a máxima eficiência do seu laboratório.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            <Button
              asChild
              size="lg"
              className="h-auto py-4 flex flex-col items-center gap-2 w-full hover:scale-[1.02] transition-transform"
            >
              <Link to="/diagnostico">
                <Stethoscope className="h-6 w-6" />
                <span>Diagnóstico Consultivo</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-auto py-4 flex flex-col items-center gap-2 w-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white hover:scale-[1.02] transition-transform"
            >
              <a href="#oportunidades">
                <Tag className="h-6 w-6" />
                <span>Vitrine de Oportunidades</span>
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-auto py-4 flex flex-col items-center gap-2 w-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white hover:scale-[1.02] transition-transform"
            >
              <a href="#contato">
                <Headset className="h-6 w-6" />
                <span>Assistência Técnica</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
