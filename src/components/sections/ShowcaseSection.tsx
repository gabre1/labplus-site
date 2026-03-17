import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { showcaseItems } from '@/lib/data'
import { MessageCircle } from 'lucide-react'

export function ShowcaseSection() {
  const getWhatsAppLink = (itemName: string) => {
    const text = encodeURIComponent(
      `Olá! Tenho interesse no item "${itemName}" da Vitrine de Oportunidades.`,
    )
    return `https://wa.me/5582999999999?text=${text}`
  }

  return (
    <section id="oportunidades" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Estoque Limitado
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Vitrine de <span className="text-primary">Oportunidades</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Equipamentos de mostruário, seminovos revisados e insumos com validade curta. Condições
            exclusivas para fechamento rápido.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseItems.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary hover:bg-primary/90 shadow-md">{item.badge}</Badge>
                </div>
              </div>
              <CardHeader className="pb-3 pt-5">
                <h3 className="font-bold text-lg leading-tight line-clamp-2">{item.title}</h3>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button asChild className="w-full gap-2" variant="default">
                  <a href={getWhatsAppLink(item.title)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Tenho Interesse
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
