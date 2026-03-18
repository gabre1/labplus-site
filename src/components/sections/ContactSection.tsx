import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useCms } from '@/contexts/CmsContext'

export function ContactSection() {
  const { content } = useCms()

  if (!content) return null

  return (
    <section id="contato" className="py-24 bg-slate-50 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {content.contact_title_1}{' '}
                <span className="text-primary">{content.contact_title_highlight}</span>
              </h2>
              <p className="text-muted-foreground text-lg">{content.contact_subtitle}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Endereço (Matriz)</h3>
                  <p className="text-muted-foreground">
                    Av. Menino Marcelo, 1234 - Serraria
                    <br />
                    Maceió - AL, CEP: 57000-000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Telefones</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {content.contact_phone?.replace(' / ', '\n') ||
                      '(82) 3000-0000\n(82) 99999-9999'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">E-mail</h3>
                  <p className="text-muted-foreground">
                    {content.contact_email || 'contato@labplus.com.br'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Horário de Atendimento</h3>
                  <p className="text-muted-foreground">
                    Segunda a Sexta: 08:00 às 18:00
                    <br />
                    Plantão Técnico 24h para contratos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] lg:h-auto rounded-xl overflow-hidden shadow-lg border border-border">
            {/* Embedded Google Maps - showing Maceió AL */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125557.51465243163!2d-35.80376785642721!3d-9.646960136653597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x70145a331ab7d5f%3A0xc0fbba138e63a34a!2sMacei%C3%B3%20-%20AL!5e0!3m2!1spt-BR!2sbr!4v1715000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
