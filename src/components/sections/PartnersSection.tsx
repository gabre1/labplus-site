import { useEffect, useState } from 'react'
import { fetchPartners } from '@/lib/api'
import { Partner } from '@/types'

export function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([])

  useEffect(() => {
    fetchPartners().then((data) => setPartners(data))
  }, [])

  if (partners.length === 0) return null

  return (
    <section className="py-16 bg-white border-t border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">
          Nossos <span className="text-primary">Parceiros e Fornecedores</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center w-32 h-20 group relative"
            >
              <img
                src={partner.logo_url}
                alt={partner.name}
                title={partner.name}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
