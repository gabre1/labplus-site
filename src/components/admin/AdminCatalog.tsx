import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'

const SEGMENTS = ['Humano', 'Veterinário']
const TYPES = [
  'Hematologia',
  'Bioquímica',
  'Imuno/hormônio',
  'Uroanálise',
  'Centrífugas',
  'Microscópios',
  'Biologia Molecular',
  'Outros',
]
const VOLUMES = ['Até 50', '51 a 200', '201 a 300', 'Acima de 300']

const formatBRLInput = (val: string) => {
  const digits = val.replace(/\D/g, '')
  if (!digits) return ''
  const num = parseInt(digits, 10) / 100
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const parseCurrencyToNumber = (val: string) => {
  if (!val) return null
  const digits = val.replace(/\D/g, '')
  if (!digits) return null
  return parseInt(digits, 10) / 100
}

const formatBRLFromNumber = (num: number | string | null) => {
  if (num === null || num === undefined) return ''
  const val = typeof num === 'string' ? parseFloat(num) : num
  if (isNaN(val)) return ''
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function AdminCatalog() {
  const [items, setItems] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [form, setForm] = useState({
    id: '',
    name: '',
    value: '',
    provider: '',
    folder_url: '',
    payment_conditions: '',
    recommendation_tags: '',
    image_url: '',
    description: '',
    reagent_name: '',
    cost_per_test: '',
    avg_ticket_price: '',
  })
  const { toast } = useToast()

  const loadItems = async () => {
    const { data } = await supabase
      .from('catalog_items' as any)
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setItems(data)
  }

  useEffect(() => {
    loadItems()
  }, [])

  const handleSave = async () => {
    const { id, ...insertData } = form
    const payload = {
      ...insertData,
      cost_per_test: parseCurrencyToNumber(insertData.cost_per_test),
      avg_ticket_price: parseCurrencyToNumber(insertData.avg_ticket_price),
    }

    if (id) {
      await supabase
        .from('catalog_items' as any)
        .update(payload)
        .eq('id', id)
    } else {
      await supabase.from('catalog_items' as any).insert([payload])
    }
    setIsOpen(false)
    loadItems()
    toast({ title: 'Salvo com sucesso' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir?')) return
    await supabase
      .from('catalog_items' as any)
      .delete()
      .eq('id', id)
    loadItems()
    toast({ title: 'Excluído com sucesso' })
  }

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.recommendation_tags &&
        item.recommendation_tags.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const resetForm = () =>
    setForm({
      id: '',
      name: '',
      value: '',
      provider: '',
      folder_url: '',
      payment_conditions: '',
      recommendation_tags: '',
      image_url: '',
      description: '',
      reagent_name: '',
      cost_per_test: '',
      avg_ticket_price: '',
    })

  const handleEdit = (item: any) => {
    setForm({
      ...item,
      reagent_name: item.reagent_name || '',
      cost_per_test: item.cost_per_test ? formatBRLFromNumber(item.cost_per_test) : '',
      avg_ticket_price: item.avg_ticket_price ? formatBRLFromNumber(item.avg_ticket_price) : '',
      value: item.value ? (item.value.match(/\d/) ? formatBRLInput(item.value) : item.value) : '',
      recommendation_tags: item.recommendation_tags || '',
    })
    setIsOpen(true)
  }

  const currentTags = form.recommendation_tags
    ? form.recommendation_tags
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : []

  const toggleTag = (tag: string) => {
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag]
    setForm({ ...form, recommendation_tags: newTags.join(', ') })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4 pb-4">
        <Input
          placeholder="Buscar por nome ou tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>Adicionar Equipamento</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{form.id ? 'Editar Equipamento' : 'Adicionar Equipamento'}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Nome do Equipamento</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Fornecedor</Label>
                <Input
                  value={form.provider}
                  onChange={(e) => setForm({ ...form, provider: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Valor (R$)</Label>
                <Input
                  value={form.value}
                  placeholder="Ex: R$ 50.000,00 ou Sob consulta"
                  onChange={(e) => {
                    const val = e.target.value
                    if (val.replace(/\D/g, '').length > 0) {
                      setForm({ ...form, value: formatBRLInput(val) })
                    } else {
                      setForm({ ...form, value: val })
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Condições de Pagamento</Label>
                <Input
                  value={form.payment_conditions}
                  onChange={(e) => setForm({ ...form, payment_conditions: e.target.value })}
                />
              </div>

              <div className="col-span-2 space-y-4 border p-4 rounded-md bg-slate-50">
                <Label className="text-base font-semibold">
                  Tags de Recomendação (Seleção Múltipla)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Segmento Atendido
                    </Label>
                    <div className="flex flex-col gap-2">
                      {SEGMENTS.map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tag-${tag}`}
                            checked={currentTags.includes(tag)}
                            onCheckedChange={() => toggleTag(tag)}
                          />
                          <Label htmlFor={`tag-${tag}`} className="cursor-pointer font-normal">
                            {tag}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Tipo de Equipamento
                    </Label>
                    <div className="flex flex-col gap-2">
                      {TYPES.map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tag-${tag}`}
                            checked={currentTags.includes(tag)}
                            onCheckedChange={() => toggleTag(tag)}
                          />
                          <Label htmlFor={`tag-${tag}`} className="cursor-pointer font-normal">
                            {tag}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Faixa de Volume Atendida
                    </Label>
                    <div className="flex flex-col gap-2">
                      {VOLUMES.map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tag-${tag}`}
                            checked={currentTags.includes(tag)}
                            onCheckedChange={() => toggleTag(tag)}
                          />
                          <Label htmlFor={`tag-${tag}`} className="cursor-pointer font-normal">
                            {tag}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2 space-y-4 border p-4 rounded-md bg-blue-50/50">
                <Label className="text-base font-semibold">Dados Financeiros para ROI</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Reagente Principal</Label>
                    <Input
                      value={form.reagent_name}
                      placeholder="Ex: Kit Completo"
                      onChange={(e) => setForm({ ...form, reagent_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Custo por Teste (R$)</Label>
                    <Input
                      type="text"
                      value={form.cost_per_test}
                      placeholder="Ex: R$ 2,50"
                      onChange={(e) =>
                        setForm({ ...form, cost_per_test: formatBRLInput(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ticket Médio de Venda (R$)</Label>
                    <Input
                      type="text"
                      value={form.avg_ticket_price}
                      placeholder="Ex: R$ 15,00"
                      onChange={(e) =>
                        setForm({ ...form, avg_ticket_price: formatBRLInput(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>URL da Imagem</Label>
                <Input
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>URL do Catálogo (PDF)</Label>
                <Input
                  value={form.folder_url}
                  onChange={(e) => setForm({ ...form, folder_url: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Descrição Curta</Label>
                <Input
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={handleSave} className="w-full">
              Salvar
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipamento</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="w-[150px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.provider}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {item.recommendation_tags}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Nenhum equipamento encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
