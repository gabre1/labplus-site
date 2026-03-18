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
import { useToast } from '@/hooks/use-toast'

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
  })
  const { toast } = useToast()

  const loadItems = async () => {
    const { data } = await supabase
      .from('catalog_items')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setItems(data)
  }

  useEffect(() => {
    loadItems()
  }, [])

  const handleSave = async () => {
    const { id, ...insertData } = form
    if (id) {
      await supabase.from('catalog_items').update(insertData).eq('id', id)
    } else {
      await supabase.from('catalog_items').insert([insertData])
    }
    setIsOpen(false)
    loadItems()
    toast({ title: 'Salvo com sucesso' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir?')) return
    await supabase.from('catalog_items').delete().eq('id', id)
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
    })

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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                <Label>Valor</Label>
                <Input
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Condições de Pagamento</Label>
                <Input
                  value={form.payment_conditions}
                  onChange={(e) => setForm({ ...form, payment_conditions: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Tags de Recomendação (Ex: Humano, Hematologia, Até 50)</Label>
                <Input
                  value={form.recommendation_tags}
                  onChange={(e) => setForm({ ...form, recommendation_tags: e.target.value })}
                />
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setForm(item)
                      setIsOpen(true)
                    }}
                  >
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
