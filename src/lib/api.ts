import { ShowcaseItem, CatalogItem, SiteContent } from '@/types'

export const mockSiteContent: SiteContent = {
  logo_url: 'https://img.usecurling.com/i?q=labplus&color=blue&shape=outline',
  footer_info:
    'Excelência em distribuição de equipamentos e insumos laboratoriais para todo o Nordeste.',
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
    'A Labplus Diagnóstica nasceu com o propósito de elevar o padrão do suporte laboratorial. Localizados estrategicamente em Maceió, Alagoas, garantimos agilidade logística incomparável.',
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
    'Equipamentos de mostruário, seminovos revisados e insumos com validade curta.',
  faq_title_1: 'Perguntas ',
  faq_title_highlight: 'Frequentes',
  faq_subtitle: 'Tire suas principais dúvidas sobre nossos processos e serviços.',
  faq_items: [
    {
      question: 'Qual o prazo médio de entrega?',
      answer: 'Para Maceió e região, entregas em 24h. Restante do Nordeste de 2 a 5 dias úteis.',
    },
    {
      question: 'Vocês realizam a instalação e treinamento?',
      answer: 'Sim! Todos os equipamentos incluem entrega técnica, instalação e treinamento.',
    },
  ],
  contact_title_1: 'Localização e ',
  contact_title_highlight: 'Contato',
  contact_subtitle: 'Nossa matriz está localizada estrategicamente para atender sua demanda.',
  diagnostic_title_1: 'Diagnóstico ',
  diagnostic_title_highlight: 'Consultivo',
  diagnostic_success_msg: 'Informações recebidas com sucesso! Em breve entraremos em contato.',
  nav_about: 'Sobre Nós',
  nav_showcase: 'Oportunidades',
  nav_faq: 'FAQ',
  nav_contact: 'Contato',
  nav_btn_diagnostic: 'Solicitar Diagnóstico',
}

function getPbImageUrl(item: any, fieldName: string) {
  const fileName = item[fieldName]
  if (!fileName) return undefined
  if (fileName.startsWith('http') || fileName.startsWith('data:')) return fileName
  const backendUrl = import.meta.env.VITE_POCKETBASE_URL || import.meta.env.VITE_BACKEND_URL || ''
  return `${backendUrl}/api/files/${item.collectionId}/${item.id}/${fileName}`
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
        if (typeof dbData.about_benefits === 'string')
          dbData.about_benefits = JSON.parse(dbData.about_benefits)
        if (typeof dbData.faq_items === 'string') dbData.faq_items = JSON.parse(dbData.faq_items)
        if (dbData.logo_url) dbData.logo_url = getPbImageUrl(dbData, 'logo_url') || dbData.logo_url

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
    description: 'Equipamento semi-novo, totalmente revisado com garantia de 6 meses.',
    image: 'https://img.usecurling.com/p/400/300?q=laboratory%20machine',
    badge: 'Última Unidade',
  },
  {
    id: '2',
    title: 'Reagentes Hematologia',
    description: 'Kit completo de reagentes para linha Sysmex com vencimento em 45 dias.',
    image: 'https://img.usecurling.com/p/400/300?q=medical%20vials',
    badge: 'Validade Curta - 40% OFF',
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
        return data.items.map((item: any) => ({
          ...item,
          image: getPbImageUrl(item, 'image') || item.image,
        }))
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
    equipment_name: 'Mindray BC-3000 Plus',
    value: 'Sob Consulta',
    provider: 'Mindray',
    pdf_link: '#',
    payment_conditions: 'Até 24x sem juros',
    recommendation_tags: 'Humano, Hematologia, Até 50, 51 a 200',
    image: 'https://img.usecurling.com/p/400/300?q=medical%20machine',
    description: 'Analisador hematológico automatizado ideal para laboratórios de pequeno porte.',
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
        return data.items.map((item: any) => ({
          ...item,
          image: getPbImageUrl(item, 'image') || item.image,
        }))
      }
    }
  } catch (error) {
    console.warn('Backend fetch failed for CatalogItems, using mock data.', error)
  }
  return new Promise((resolve) => setTimeout(() => resolve(mockCatalogItems), 300))
}
