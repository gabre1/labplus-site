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
                  <p className="text-muted-foreground whitespace-pre-line">
                    {content.address ||
                      'Av. Menino Marcelo, 1234 - Serraria\nMaceió - AL, CEP: 57000-000'}
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
                    {content.phone_general || '(82) 3000-0000'}
                    <br />
                    {content.phone_whatsapp || '(82) 99999-9999'}
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
                  <p className="text-muted-foreground">Segunda a Sexta: 08:00 às 17:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] lg:h-auto rounded-xl overflow-hidden shadow-lg border border-border bg-slate-200">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(content.address || 'Maceió - AL')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
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
