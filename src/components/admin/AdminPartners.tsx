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
import { Partner } from '@/types'

export function AdminPartners() {
  const [items, setItems] = useState<Partner[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState({ id: '', name: '', logo_url: '' })
  const { toast } = useToast()

  const loadItems = async () => {
    const { data } = await supabase
      .from('partners' as any)
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
      await supabase
        .from('partners' as any)
        .update(insertData)
        .eq('id', id)
    } else {
      await supabase.from('partners' as any).insert([insertData])
    }
    setIsOpen(false)
    loadItems()
    toast({ title: 'Salvo com sucesso' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este parceiro?')) return
    await supabase
      .from('partners' as any)
      .delete()
      .eq('id', id)
    loadItems()
    toast({ title: 'Excluído com sucesso' })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-xl font-bold">Parceiros e Fornecedores</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setForm({ id: '', name: '', logo_url: '' })}>
              Adicionar Parceiro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{form.id ? 'Editar Parceiro' : 'Adicionar Parceiro'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome do Parceiro</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>URL da Logo</Label>
                <Input
                  value={form.logo_url}
                  onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                Salvar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="w-[150px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    src={item.logo_url}
                    alt={item.name}
                    className="h-10 w-auto object-contain bg-slate-50 p-1 rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  Nenhum parceiro cadastrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
