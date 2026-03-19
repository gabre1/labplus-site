import { ShowcaseItem, CatalogItem, SiteContent } from '@/types'
import { supabase } from '@/lib/supabase/client'

export const mockSiteContent: SiteContent = {
  logo_url: 'https://img.usecurling.com/i?q=labplus&color=blue&shape=outline',
  footer_info:
    'Excelência em distribuição de equipamentos e insumos laboratoriais para todo o Nordeste.',
  hero_badge: 'Líder em Distribuição Laboratorial',
  hero_title_1: 'Excelência em Diagnóstico e ',
  hero_title_highlight: 'Suporte Laboratorial',
  hero_subtitle:
    'Equipamentos de ponta, insumos de alta qualidade e assistência técnica especializada para garantir a máxima eficiência do seu laboratório.',
  hero_btn_diagnostic: 'Atendimento Consultivo',
  hero_btn_showcase: 'Vitrine de Oportunidades',
  hero_btn_support: 'Assistência Técnica',
  about_title_1: 'Infraestrutura Robusta para o seu ',
  about_title_highlight: 'Crescimento',
  about_text:
    'A Labplus Diagnóstica nasceu com o propósito de elevating o padrão do suporte laboratorial. Localizados estrategicamente em Maceió, Alagoas, garantimos agilidade logística incomparável.',
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
  diagnostic_title_1: 'Atendimento ',
  diagnostic_title_highlight: 'Consultivo',
  diagnostic_success_msg: 'Informações recebidas com sucesso! Em breve entraremos em contato.',
  nav_about: 'Sobre Nós',
  nav_showcase: 'Oportunidades',
  nav_faq: 'FAQ',
  nav_contact: 'Contato',
  nav_btn_diagnostic: 'Solicitar atendimento',
  address: 'Av. Menino Marcelo, 1234 - Serraria, Maceió - AL, CEP: 57000-000',
  phone_general: '(82) 3000-0000',
  phone_whatsapp: '(82) 99999-9999',
}

export async function fetchSiteContent(): Promise<any> {
  const content = { ...mockSiteContent } as any

  try {
    const { data, error } = await supabase.from('site_content' as any).select('*')
    if (data && !error) {
      data.forEach((item: any) => {
        if (item.key === 'faq_items' && typeof item.value === 'string') {
          try {
            content[item.key] = JSON.parse(item.value)
          } catch (e) {
            content[item.key] = item.value
          }
        } else {
          content[item.key] = item.value
        }
      })
    }
  } catch (error) {
    console.warn('Supabase fetch failed for site_content', error)
  }

  return content
}

export async function fetchShowcaseItems(): Promise<ShowcaseItem[]> {
  try {
    const { data, error } = await supabase
      .from('showcase_items')
      .select('*')
      .order('created_at', { ascending: false })
    if (data && !error) {
      return data.map((d) => ({
        id: d.id,
        title: d.title,
        description: d.description || '',
        image: d.image_url || '',
        badge: d.label || '',
      }))
    }
  } catch (err) {
    console.error('Supabase fetch failed for showcase_items', err)
  }
  return []
}

export async function fetchCatalogItems(): Promise<CatalogItem[]> {
  try {
    const { data, error } = await supabase
      .from('catalog_items')
      .select('*')
      .order('created_at', { ascending: false })
    if (data && !error) {
      return data.map((d) => ({
        id: d.id,
        equipment_name: d.name,
        value: d.value || '',
        provider: d.provider || '',
        pdf_link: d.folder_url || '',
        payment_conditions: d.payment_conditions || '',
        recommendation_tags: d.recommendation_tags || '',
        image: d.image_url || '',
        description: d.description || '',
      }))
    }
  } catch (err) {
    console.error('Supabase fetch failed for catalog_items', err)
  }
  return []
}
