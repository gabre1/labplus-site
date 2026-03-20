import { CheckCircle2 } from 'lucide-react'
import { useCms } from '@/contexts/CmsContext'

export function AboutSection() {
  const { content } = useCms()

  if (!content) return null

  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src={
                content.about_image_url ||
                'https://img.usecurling.com/p/800/600?q=logistics%20warehouse&color=gray'
              }
              alt="Infraestrutura Corporativa"
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div className="text-white">
                <p className="font-bold text-lg">Sede em Maceió, AL</p>
                <p className="text-sm opacity-90">Centro de Distribuição de Alta Performance</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {content.about_title_1}{' '}
              <span className="text-primary">{content.about_title_highlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
              {content.about_text}
            </p>

            {content.about_benefits && (
              <ul className="space-y-4 mt-8">
                {content.about_benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                    <span className="font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
