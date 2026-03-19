import { useCms } from '@/contexts/CmsContext'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FAQSection() {
  const { content } = useCms()

  if (!content || !content.faq_items || content.faq_items.length === 0) return null

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {content.faq_title_1}{' '}
            <span className="text-primary">{content.faq_title_highlight}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{content.faq_subtitle}</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {content.faq_items.map((faq: any, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
