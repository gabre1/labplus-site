import { ShowcaseItem, CatalogItem, SiteContent } from '@/types'

export const mockSiteContent: SiteContent = {
  hero_badge: 'Líder em Distribuição Laboratorial',
  hero_title_1: 'Excelência em Diagnóstico e ',
  hero_title_highlight: 'Suporte Laboratorial',
  hero_subtitle:
    'Equipamentos de ponta, insumos de alta qualidade e assistência técnica especializada para garantir a máxima eficiência do seu laboratório.',
  hero_btn_diagnostic: 'Diagnóstico Consultivo',
  hero_btn_showcase: 'Vitrine de Oportunidades',
  hero_btn_support: 'Assistência Técnica',

  about_title_1: 'Infraestrutura Robusta para o seu ',
  about_title_highlight: 'Crescimento',
  about_text:
    'A Labplus Diagnóstica nasceu com o propósito de elevar o padrão do suporte laboratorial. Localizados estrategicamente em Maceió, Alagoas, garantimos agilidade logística incomparável para suprir as necessidades da sua rotina, seja com reagentes, insumos ou manutenção de equipamentos.',
  about_benefits: [
    'Agilidade Logística em todo o Nordeste',
    'Estoque estratégico e peças de reposição',
    'Equipe técnica altamente qualificada',
    'Atendimento consultivo e personalizado',
  ],

  showcase_badge: 'Estoque Limitado',
  showcase_title_1: 'Vitrine de ',
  showcase_title_highlight: 'Oportunidades',
  showcase_subtitle:
    'Equipamentos de mostruário, seminovos revisados e insumos com validade curta. Condições exclusivas para fechamento rápido.',

  faq_title_1: 'Perguntas ',
  faq_title_highlight: 'Frequentes',
  faq_subtitle: 'Tire suas principais dúvidas sobre nossos processos e serviços.',
  faq_items: [
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
  ],

  contact_title_1: 'Localização e ',
  contact_title_highlight: 'Contato',
  contact_subtitle:
    'Nossa matriz está localizada estrategicamente para atender sua demanda com máxima velocidade.',

  diagnostic_title_1: 'Diagnóstico ',
  diagnostic_title_highlight: 'Consultivo',
  diagnostic_success_msg:
    'Informações recebidas com sucesso! Em breve, um especialista entrará em contato com a melhor solução.',

  nav_about: 'Sobre Nós',
  nav_showcase: 'Oportunidades',
  nav_faq: 'FAQ',
  nav_contact: 'Contato',
  nav_btn_diagnostic: 'Solicitar Diagnóstico',
}

export async function fetchSiteContent(): Promise<SiteContent> {
  try {
    const backendUrl = import.meta.env.VITE_POCKETBASE_URL || import.meta.env.VITE_BACKEND_URL || ''
    const url = backendUrl
      ? `${backendUrl}/api/collections/SiteContent/records`
      : '/api/collections/SiteContent/records'

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      if (data.items && data.items.length > 0) {
        const dbData = data.items[0]

        // Safely parse JSON arrays if they were stored as strings
        if (typeof dbData.about_benefits === 'string') {
          try {
            dbData.about_benefits = JSON.parse(dbData.about_benefits)
          } catch (e) {}
        }
        if (typeof dbData.faq_items === 'string') {
          try {
            dbData.faq_items = JSON.parse(dbData.faq_items)
          } catch (e) {}
        }

        return { ...mockSiteContent, ...dbData }
      }
    }
  } catch (error) {
    console.warn('Backend fetch failed for SiteContent, using mock data.', error)
  }
  return new Promise((resolve) => setTimeout(() => resolve(mockSiteContent), 300))
}

const mockShowcaseItems: ShowcaseItem[] = [
  {
    id: '1',
    title: 'Analisador Bioquímico BS-200',
    description:
      'Equipamento semi-novo, totalmente revisado com garantia de 6 meses. Ideal para laboratórios de pequeno porte.',
    image: 'https://img.usecurling.com/p/400/300?q=laboratory%20machine',
    badge: 'Última Unidade',
  },
  {
    id: '2',
    title: 'Reagentes Hematologia (Lote Curto)',
    description:
      'Kit completo de reagentes para linha Sysmex com vencimento em 45 dias. Desconto especial.',
    image: 'https://img.usecurling.com/p/400/300?q=medical%20vials',
    badge: 'Validade Curta - 40% OFF',
  },
  {
    id: '3',
    title: 'Centrífuga de Bancada 4000 RPM',
    description:
      'Mostruário. Perfeito estado de conservação. Excelente custo-benefício para rotinas básicas.',
    image: 'https://img.usecurling.com/p/400/300?q=centrifuge',
    badge: 'Mostruário',
  },
  {
    id: '4',
    title: 'Microscópio Binocular LED',
    description:
      'Óptica infinita, iluminação LED de alta durabilidade. Pronta entrega em nosso CD em Maceió.',
    image: 'https://img.usecurling.com/p/400/300?q=microscope',
    badge: 'Pronta Entrega',
  },
]

export async function fetchShowcaseItems(): Promise<ShowcaseItem[]> {
  try {
    const backendUrl = import.meta.env.VITE_POCKETBASE_URL || import.meta.env.VITE_BACKEND_URL || ''
    const url = backendUrl
      ? `${backendUrl}/api/collections/ShowcaseItems/records`
      : '/api/collections/ShowcaseItems/records'

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      if (data.items && data.items.length > 0) {
        return data.items
      }
    }
  } catch (error) {
    console.warn('Backend fetch failed for ShowcaseItems, using mock data.', error)
  }
  return new Promise((resolve) => setTimeout(() => resolve(mockShowcaseItems), 300))
}

const mockCatalogItems: CatalogItem[] = [
  {
    id: 'c1',
    equipment_name: 'Mindray BC-3000 Plus (Hematologia 3 Partes)',
    value: 'Sob Consulta',
    provider: 'Mindray',
    pdf_link: '#',
    payment_conditions: 'Até 24x sem juros',
    recommendation_tags: 'Humano, Hematologia, Até 50, 51 a 200',
  },
  {
    id: 'c2',
    equipment_name: 'Sysmex XN-L (Hematologia 5 Partes)',
    value: 'Sob Consulta',
    provider: 'Sysmex',
    pdf_link: '#',
    payment_conditions: 'Leasing ou Financiamento',
    recommendation_tags: 'Humano, Hematologia, 201 a 300, Acima de 300',
  },
  {
    id: 'c3',
    equipment_name: 'Bioclin 200 (Bioquímica Automatizada)',
    value: 'Sob Consulta',
    provider: 'Bioclin',
    pdf_link: '#',
    payment_conditions: 'Até 12x',
    recommendation_tags: 'Humano, Bioquímica, 51 a 200, 201 a 300',
  },
  {
    id: 'c4',
    equipment_name: 'Mindray BC-2800 Vet (Hematologia Veterinária)',
    value: 'Sob Consulta',
    provider: 'Mindray',
    pdf_link: '#',
    payment_conditions: 'Até 18x',
    recommendation_tags: 'Veterinário, Hematologia, Até 50, 51 a 200, 201 a 300, Acima de 300',
  },
]

export async function fetchCatalogItems(): Promise<CatalogItem[]> {
  try {
    const backendUrl = import.meta.env.VITE_POCKETBASE_URL || import.meta.env.VITE_BACKEND_URL || ''
    const url = backendUrl
      ? `${backendUrl}/api/collections/CatalogItems/records`
      : '/api/collections/CatalogItems/records'

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      if (data.items && data.items.length > 0) {
        return data.items
      }
    }
  } catch (error) {
    console.warn('Backend fetch failed for CatalogItems, using mock data.', error)
  }
  return new Promise((resolve) => setTimeout(() => resolve(mockCatalogItems), 300))
}
