import { ShowcaseItem, CatalogItem } from '@/types'

export const showcaseItems: ShowcaseItem[] = [
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

export const catalogItems: CatalogItem[] = [
  {
    id: 'c1',
    equipmentName: 'Mindray BC-3000 Plus (Hematologia 3 Partes)',
    price: 'Sob Consulta',
    supplier: 'Mindray',
    pdfFolderLink: '#',
    paymentTerms: 'Até 24x sem juros',
    tags: ['Humano', 'Hematologia', 'Até 50', '51 a 200'],
  },
  {
    id: 'c2',
    equipmentName: 'Sysmex XN-L (Hematologia 5 Partes)',
    price: 'Sob Consulta',
    supplier: 'Sysmex',
    pdfFolderLink: '#',
    paymentTerms: 'Leasing ou Financiamento',
    tags: ['Humano', 'Hematologia', '201 a 300', 'Acima de 300'],
  },
  {
    id: 'c3',
    equipmentName: 'Bioclin 200 (Bioquímica Automatizada)',
    price: 'Sob Consulta',
    supplier: 'Bioclin',
    pdfFolderLink: '#',
    paymentTerms: 'Até 12x',
    tags: ['Humano', 'Bioquímica', '51 a 200', '201 a 300'],
  },
  {
    id: 'c4',
    equipmentName: 'Mindray BC-2800 Vet (Hematologia Veterinária)',
    price: 'Sob Consulta',
    supplier: 'Mindray',
    pdfFolderLink: '#',
    paymentTerms: 'Até 18x',
    tags: ['Veterinário', 'Hematologia', 'Até 50', '51 a 200', '201 a 300', 'Acima de 300'],
  },
]
