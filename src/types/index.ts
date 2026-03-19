export interface DiagnosticFormData {
  name: string
  phone: string
  city: string
  interest: string
  segment: string
  type: string
  reagent_type: string
  equipment_model: string
  volume: string
}

export interface CatalogItem {
  id: string
  equipment_name: string
  value: string
  provider: string
  pdf_link: string
  payment_conditions: string
  recommendation_tags: string
  image: string
  description: string
  reagent_name?: string
  cost_per_test?: number
  avg_ticket_price?: number
}

export interface ShowcaseItem {
  id: string
  title: string
  description: string
  image: string
  badge: string
}

export interface SiteContent {
  [key: string]: any
}
