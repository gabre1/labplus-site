import { MessageCircle } from 'lucide-react'
import { useCms } from '@/contexts/CmsContext'

export function FloatingWhatsApp() {
  const { content } = useCms()
  const whatsappNumber = content?.phone_whatsapp?.replace(/\D/g, '') || '5582999999999'

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-pulse-soft"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
