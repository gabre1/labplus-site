import { supabase } from '@/lib/supabase/client'
import { DiagnosticFormData, CatalogItem } from '@/types'

export const submitLead = async (
  leadData: DiagnosticFormData,
  match: CatalogItem | null = null,
) => {
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
        recommended_item: match?.equipment_name || null,
      },
    ])
    .select()
    .single()

  if (!error && data) {
    await supabase.functions.invoke('send-lead-email', {
      body: { lead: data, match, recipient: null }, // Recipient is fetched within the edge function
    })
  }

  return { data, error }
}
