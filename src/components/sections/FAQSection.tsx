import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FAQSection() {
  const faqs = [
    {
      question: 'Qual o prazo médio de entrega?',
      answer:
        'Para clientes localizados em Maceió e região metropolitana, realizamos entregas em até 24 horas úteis. Para demais localidades do Nordeste, o prazo varia de 2 a 5 dias úteis dependendo da transportadora parceira.',
    },
    {
      question: 'Vocês realizam a instalação e treinamento?',
      answer:
        'Sim! Todos os nossos equipamentos incluem serviço completo de entrega técnica, instalação no local e treinamento operacional para a sua equipe, garantindo que o laboratório extraia o máximo da tecnologia.',
    },
    {
      question: 'Como acionar a assistência técnica?',
      answer:
        'Você pode acionar nosso suporte técnico diretamente pelo WhatsApp oficial ou por e-mail. Temos uma equipe de plantão em horário comercial para diagnósticos remotos e agendamento de visitas presenciais.',
    },
    {
      question: 'Quais as formas de pagamento disponíveis?',
      answer:
        'Trabalhamos com condições flexíveis para B2B, incluindo faturamento via boleto bancário (sujeito a análise de crédito), cartão de crédito em até 12x, financiamento bancário e modalidades de comodato para alto volume.',
    },
  ]

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Perguntas <span className="text-primary">Frequentes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tire suas principais dúvidas sobre nossos processos e serviços.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
