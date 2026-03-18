import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useCms } from '@/contexts/CmsContext'

const formSchema = z.object({
  logo_url: z.string().url('URL inválida').or(z.literal('')),
  hero_title: z.string().min(1, 'Obrigatório'),
  hero_description: z.string().min(1, 'Obrigatório'),
  about_text: z.string().min(1, 'Obrigatório'),
  contact_email: z.string().email('E-mail inválido').or(z.literal('')),
  contact_phone: z.string().min(1, 'Obrigatório'),
})

type ContentFormValues = z.infer<typeof formSchema>

export function AdminContent() {
  const { toast } = useToast()
  const { refreshContent } = useCms()

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo_url: '',
      hero_title: '',
      hero_description: '',
      about_text: '',
      contact_email: '',
      contact_phone: '',
    },
  })

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('site_content' as any).select('*')
      if (data) {
        const values: Record<string, string> = {}
        data.forEach((d: any) => (values[d.key] = d.value))
        form.reset({
          logo_url: values.logo_url || '',
          hero_title: values.hero_title || '',
          hero_description: values.hero_description || '',
          about_text: values.about_text || '',
          contact_email: values.contact_email || '',
          contact_phone: values.contact_phone || '',
        })
      }
    }
    load()
  }, [form])

  const onSubmit = async (data: ContentFormValues) => {
    const updates = Object.entries(data).map(([key, value]) => ({
      key,
      value: value as string,
      updated_at: new Date().toISOString(),
    }))

    const { error } = await supabase
      .from('site_content' as any)
      .upsert(updates, { onConflict: 'key' })

    if (error) {
      toast({ title: 'Erro ao salvar o conteúdo', variant: 'destructive' })
      console.error(error)
    } else {
      toast({ title: 'Conteúdo salvo com sucesso!' })
      refreshContent()
    }
  }

  return (
    <div className="space-y-6 max-w-2xl pb-8">
      <div className="pb-4">
        <h2 className="text-xl font-bold">Conteúdo Geral</h2>
        <p className="text-muted-foreground text-sm">
          Atualize os textos principais, branding e informações institucionais do site.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4 border p-4 rounded-md bg-white">
            <h3 className="text-lg font-semibold text-primary">Branding</h3>
            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Logo</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 border p-4 rounded-md bg-white">
            <h3 className="text-lg font-semibold text-primary">Seção Principal (Hero)</h3>
            <FormField
              control={form.control}
              name="hero_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título Principal</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hero_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição / Subtítulo</FormLabel>
                  <FormControl>
                    <Textarea className="h-24" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 border p-4 rounded-md bg-white">
            <h3 className="text-lg font-semibold text-primary">Institucional</h3>
            <FormField
              control={form.control}
              name="about_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texto "Sobre Nós"</FormLabel>
                  <FormControl>
                    <Textarea className="h-32" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 border p-4 rounded-md bg-white">
            <h3 className="text-lg font-semibold text-primary">Contato</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone / WhatsApp</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 0000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full md:w-auto">
            Salvar Alterações
          </Button>
        </form>
      </Form>
    </div>
  )
}
