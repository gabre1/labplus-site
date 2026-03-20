import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
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
  FormDescription,
} from '@/components/ui/form'
import { useCms } from '@/contexts/CmsContext'
import { Trash } from 'lucide-react'

const formSchema = z.object({
  logo_url: z.string().url('URL inválida').or(z.literal('')),
  about_image_url: z.string().url('URL inválida').or(z.literal('')),
  hero_title: z.string().min(1, 'Obrigatório'),
  hero_description: z.string().min(1, 'Obrigatório'),
  about_text: z.string().min(1, 'Obrigatório'),
  contact_email: z.string().email('E-mail inválido').or(z.literal('')),
  phone_general: z.string().min(1, 'Obrigatório'),
  phone_whatsapp: z.string().min(1, 'Obrigatório'),
  address: z.string().min(1, 'Obrigatório'),
  lead_recipient_email: z.string().email('E-mail inválido').or(z.literal('')),
  faq_items: z
    .array(
      z.object({
        question: z.string().min(1, 'Obrigatório'),
        answer: z.string().min(1, 'Obrigatório'),
      }),
    )
    .optional(),
})

type ContentFormValues = z.infer<typeof formSchema>

export function AdminContent() {
  const { toast } = useToast()
  const { refreshContent } = useCms()

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo_url: '',
      about_image_url: '',
      hero_title: '',
      hero_description: '',
      about_text: '',
      contact_email: '',
      phone_general: '',
      phone_whatsapp: '',
      address: '',
      lead_recipient_email: '',
      faq_items: [],
    },
  })

  const faqFields = useFieldArray({ control: form.control, name: 'faq_items' })

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('site_content' as any).select('*')
      if (data) {
        const values: Record<string, string> = {}
        data.forEach((d: any) => (values[d.key] = d.value))

        let faqs = []
        if (values.faq_items) {
          try {
            faqs = JSON.parse(values.faq_items)
          } catch (e) {
            // ignore JSON parse error
          }
        }

        form.reset({
          logo_url: values.logo_url || '',
          about_image_url: values.about_image_url || '',
          hero_title: values.hero_title || '',
          hero_description: values.hero_description || '',
          about_text: values.about_text || '',
          contact_email: values.contact_email || '',
          phone_general: values.phone_general || '',
          phone_whatsapp: values.phone_whatsapp || '',
          address: values.address || '',
          lead_recipient_email: values.lead_recipient_email || '',
          faq_items: faqs,
        })
      }
    }
    load()
  }, [form])

  const onSubmit = async (data: ContentFormValues) => {
    const updates = Object.entries(data).map(([key, value]) => ({
      key,
      value: typeof value === 'object' ? JSON.stringify(value) : (value as string),
      updated_at: new Date().toISOString(),
    }))

    const { error } = await supabase
      .from('site_content' as any)
      .upsert(updates, { onConflict: 'key' })

    if (error) {
      toast({ title: 'Erro ao salvar o conteúdo', variant: 'destructive' })
    } else {
      toast({ title: 'Conteúdo salvo com sucesso!' })
      refreshContent()
    }
  }

  const handleTestEmail = async () => {
    const email = form.getValues('lead_recipient_email')
    if (!email) {
      toast({ title: 'Preencha o e-mail de recebimento antes de testar', variant: 'destructive' })
      return
    }
    try {
      toast({ title: 'Enviando e-mail de teste...' })
      const { data, error } = await supabase.functions.invoke('send-lead-email', {
        body: { test: true, recipient: email },
      })
      if (error) {
        throw error
      }
      if (data?.error) {
        throw new Error(data.error)
      }
      toast({ title: 'E-mail de teste disparado com sucesso!' })
    } catch (e: any) {
      toast({
        title: 'Erro ao enviar teste',
        description: e.message || 'Falha ao processar a requisição.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6 max-w-3xl pb-8">
      <div className="pb-4">
        <h2 className="text-xl font-bold">Conteúdo Geral</h2>
        <p className="text-muted-foreground text-sm">
          Atualize os textos principais, branding e informações do site.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4 border p-4 rounded-md bg-white">
            <h3 className="text-lg font-semibold text-primary">Sistema de Leads</h3>
            <div className="flex items-end gap-4">
              <FormField
                control={form.control}
                name="lead_recipient_email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>E-mail de Recebimento de Leads</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contato@labplus.com.br" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" variant="secondary" onClick={handleTestEmail}>
                Enviar e-mail de teste
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              O endereço configurado aqui receberá todos os formulários submetidos na página de
              Atendimento Consultivo.
            </p>
          </div>

          <div className="space-y-4 border p-4 rounded-md bg-white">
            <h3 className="text-lg font-semibold text-primary">Branding & Hero</h3>
            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Logo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea className="h-20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 border p-4 rounded-md bg-white">
            <h3 className="text-lg font-semibold text-primary">Sobre Nós</h3>
            <FormField
              control={form.control}
              name="about_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem (Sobre Nós)</FormLabel>
                  <FormControl>
                    <Input placeholder="Tamanho recomendado: 800x600px" {...field} />
                  </FormControl>
                  <FormDescription>
                    Tamanho recomendado: 800x600px. Esta imagem será exibida na seção "Sobre Nós".
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="about_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texto da Seção Sobre</FormLabel>
                  <FormControl>
                    <Textarea className="h-32" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 border p-4 rounded-md bg-white">
            <h3 className="text-lg font-semibold text-primary">Contato & Endereço</h3>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço Completo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                name="phone_general"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone Geral</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4 border p-4 rounded-md bg-white">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-primary">FAQ (Perguntas Frequentes)</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => faqFields.append({ question: '', answer: '' })}
              >
                Adicionar nova linha
              </Button>
            </div>
            {faqFields.fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-start gap-4 p-4 border rounded-md relative bg-slate-50"
              >
                <div className="flex-1 space-y-4">
                  <FormField
                    control={form.control}
                    name={`faq_items.${index}.question`}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel>Pergunta</FormLabel>
                        <FormControl>
                          <Input {...f} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`faq_items.${index}.answer`}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel>Resposta</FormLabel>
                        <FormControl>
                          <Textarea className="h-16" {...f} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => faqFields.remove(index)}
                  className="text-destructive mt-8"
                >
                  <Trash className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>

          <Button type="submit" size="lg" className="w-full md:w-auto">
            Salvar Alterações
          </Button>
        </form>
      </Form>
    </div>
  )
}
