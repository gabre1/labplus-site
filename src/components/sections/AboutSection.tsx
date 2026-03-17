import { CheckCircle2 } from 'lucide-react'

export function AboutSection() {
  const benefits = [
    'Agilidade Logística em todo o Nordeste',
    'Estoque estratégico e peças de reposição',
    'Equipe técnica altamente qualificada',
    'Atendimento consultivo e personalizado',
  ]

  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src="https://img.usecurling.com/p/800/600?q=logistics%20warehouse&color=gray"
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
              Infraestrutura Robusta para o seu <span className="text-primary">Crescimento</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A Labplus Diagnóstica nasceu com o propósito de elevar o padrão do suporte
              laboratorial. Localizados estrategicamente em Maceió, Alagoas, garantimos agilidade
              logística incomparável para suprir as necessidades da sua rotina, seja com reagentes,
              insumos ou manutenção de equipamentos.
            </p>

            <ul className="space-y-4 mt-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <span className="font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
