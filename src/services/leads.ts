import { supabase } from '@/lib/supabase/client'
import { DiagnosticFormData } from '@/types'

export const submitLead = async (leadData: DiagnosticFormData) => {
  const { data, error } = await supabase
    .from('leads' as any)
    .insert([
      {
        name: leadData.name,
        phone: leadData.phone,
        city: leadData.city,
        interest: leadData.interest,
        segment: leadData.segment,
        equipment_type: leadData.type,
        reagent_type: leadData.reagent_type,
        equipment_model: leadData.equipment_model,
        volume: leadData.volume,
      },
    ])
    .select()
    .single()

  if (!error && data) {
    await supabase.functions.invoke('send-lead-email', {
      body: { lead: data },
    })
  }

  return { data, error }
}
