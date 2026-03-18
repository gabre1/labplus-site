import { MapPin, Phone, Mail, Instagram, Linkedin } from 'lucide-react'
import { useCms } from '@/contexts/CmsContext'

export function Footer() {
  const { content } = useCms()

  return (
    <footer className="bg-[#0A0A0A] text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            {content?.logo_url ? (
              <img
                src={content.logo_url}
                alt="Logo"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            ) : (
              <img
                src="https://img.usecurling.com/i?q=labplus&color=white&shape=outline"
                alt="Labplus Diagnóstica"
                className="h-8 w-auto"
              />
            )}
            <span className="font-bold text-xl tracking-tight">
              LAB<span className="text-primary">PLUS</span>
            </span>
          </div>
          <p className="text-sm text-gray-400">
            {content?.footer_info ||
              'Excelência em distribuição de equipamentos e insumos laboratoriais para todo o Nordeste.'}
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/#sobre" className="hover:text-primary transition-colors">
                {content?.nav_about || 'Sobre Nós'}
              </a>
            </li>
            <li>
              <a href="/#oportunidades" className="hover:text-primary transition-colors">
                {content?.nav_showcase || 'Vitrine de Oportunidades'}
              </a>
            </li>
            <li>
              <a href="/diagnostico" className="hover:text-primary transition-colors">
                {content?.nav_btn_diagnostic || 'Diagnóstico Consultivo'}
              </a>
            </li>
            <li>
              <a href="/#faq" className="hover:text-primary transition-colors">
                {content?.nav_faq || 'Perguntas Frequentes'}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contato</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>
                (82) 3000-0000
                <br />
                (82) 99999-9999 (WhatsApp)
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>contato@labplus.com.br</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Localização</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>
                Av. Menino Marcelo, 1234
                <br />
                Serraria, Maceió - AL
                <br />
                CEP: 57000-000
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Labplus Diagnóstica. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
