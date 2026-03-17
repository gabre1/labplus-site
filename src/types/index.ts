export interface ShowcaseItem {
  id: string
  title: string
  description: string
  image: string
  badge: string
}

export interface CatalogItem {
  id: string
  equipmentName: string
  price: string
  supplier: string
  pdfFolderLink: string
  paymentTerms: string
  tags: string[] // e.g., ["Humano", "Hematologia", "Até 50"]
}

export interface DiagnosticFormData {
  name: string
  phone: string
  city: string
  segment: string
  type: string
  volume: string
}
