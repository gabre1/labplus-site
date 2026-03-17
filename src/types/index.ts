export interface FaqItem {
  question: string
  answer: string
}

export interface SiteContent {
  hero_badge: string
  hero_title_1: string
  hero_title_highlight: string
  hero_subtitle: string
  hero_btn_diagnostic: string
  hero_btn_showcase: string
  hero_btn_support: string

  about_title_1: string
  about_title_highlight: string
  about_text: string
  about_benefits: string[]

  showcase_badge: string
  showcase_title_1: string
  showcase_title_highlight: string
  showcase_subtitle: string

  faq_title_1: string
  faq_title_highlight: string
  faq_subtitle: string
  faq_items: FaqItem[]

  contact_title_1: string
  contact_title_highlight: string
  contact_subtitle: string

  diagnostic_title_1: string
  diagnostic_title_highlight: string
  diagnostic_success_msg: string

  nav_about: string
  nav_showcase: string
  nav_faq: string
  nav_contact: string
  nav_btn_diagnostic: string
}

export interface ShowcaseItem {
  id: string
  title: string
  description: string
  image: string
  badge: string
}

export interface CatalogItem {
  id: string
  equipment_name: string
  value: string
  provider: string
  pdf_link: string
  payment_conditions: string
  recommendation_tags: string
}

export interface DiagnosticFormData {
  name: string
  phone: string
  city: string
  segment: string
  type: string
  volume: string
}
