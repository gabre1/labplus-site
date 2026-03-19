import { supabase } from '@/lib/supabase/client'
import { DiagnosticFormData } from '@/types'

export const submitLead = async (leadData: DiagnosticFormData) => {
  const equipment_type =
    leadData.type === 'Outros' ? `Outros: ${leadData.other_type_details}` : leadData.type

  const reagent_type =
    leadData.reagent_type === 'Outra necessidade'
      ? `Outra necessidade: ${leadData.other_reagent_details}`
      : leadData.reagent_type

  const { data, error } = await supabase
    .from('leads' as any)
    .insert([
      {
        name: leadData.name,
        phone: leadData.phone,
        city: leadData.city,
        interest: leadData.interest,
        segment: leadData.segment,
        equipment_type,
        reagent_type,
        equipment_model: leadData.equipment_model,
        volume: leadData.volume,
      },
    ])
    .select()
    .single()

  if (!error && data) {
    const { data: contentData } = await supabase
      .from('site_content' as any)
      .select('value')
      .eq('key', 'lead_recipient_email')
      .single()

    const recipient = contentData?.value || 'contato@labplus.com.br'

    await supabase.functions.invoke('send-lead-email', {
      body: { lead: data, recipient },
    })
  }

  return { data, error }
}
