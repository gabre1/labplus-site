import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { lead, match, roi, recipient: clientRecipient, test } = await req.json()

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey =
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY')
    let finalRecipient = clientRecipient

    if (supabaseUrl && supabaseKey && !test) {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data } = await supabase
        .from('site_content')
        .select('value')
        .eq('key', 'lead_recipient_email')
        .single()

      if (data?.value) {
        finalRecipient = data.value
      }
    }

    if (!finalRecipient) {
      finalRecipient = 'contato@labplus.com.br'
    }

    if (test) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Labplus Leads <atendimento@labplusdiagnostica.com.br>',
          to: [finalRecipient],
          subject: 'Teste de Integração - Leads Labplus',
          html: '<p>Este é um e-mail de teste do sistema de leads da Labplus.</p>',
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Error sending test email')
      }
      return new Response(
        JSON.stringify({ success: true, message: 'Test email successfully sent', data }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    const formatMoney = (val: number) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
    }

    const roiBlock = roi
      ? `
      <div style="margin-top: 24px; padding: 16px; background-color: #ecfdf5; border-radius: 8px; border: 1px solid #a7f3d0; color: #065f46;">
        <h3 style="margin-top: 0; margin-bottom: 12px; color: #065f46;">🎯 Cenário de ROI (Estimativa)</h3>
        <p style="margin: 0; line-height: 1.6;">
          Utilizando o <strong>${roi.reagent_name}</strong> ao custo de <strong>${formatMoney(roi.cost_per_test)}</strong> por teste, e realizando <strong>${roi.volume}</strong> testes/mês, a operação vai gerar um lucro bruto aproximado de <strong>${formatMoney(roi.lucro_bruto)}</strong> mensais. O equipamento se paga em <strong>${roi.payback_months > 0 ? roi.payback_months + ' meses' : 'N/A'}</strong>.
        </p>
      </div>
    `
      : ''

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2>Novo Lead - Atendimento Consultivo</h2>
        <p>Um novo lead foi capturado através do formulário de diagnóstico.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Nome:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${lead.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Telefone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${lead.phone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Cidade:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${lead.city}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Interesse:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${lead.interest === 'equipment' ? 'Equipamentos' : 'Reagentes/Insumos'}</td></tr>
          ${lead.segment ? `<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Segmento:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${lead.segment}</td></tr>` : ''}
          ${lead.equipment_type ? `<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Tipo de Equipamento:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${lead.equipment_type}</td></tr>` : ''}
          ${lead.reagent_type ? `<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Tipo de Reagente:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${lead.reagent_type}</td></tr>` : ''}
          ${lead.equipment_model ? `<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Modelo Atual:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${lead.equipment_model}</td></tr>` : ''}
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Volume de Testes:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${lead.volume} /mês</td></tr>
        </table>
        
        ${
          match
            ? `
        <div style="margin-top: 24px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h3 style="margin-top: 0; color: #0f172a;">Recomendação do Sistema</h3>
          <p style="margin: 6px 0;"><strong>Equipamento Recomendado:</strong> ${match.equipment_name}</p>
          <p style="margin: 6px 0;"><strong>Fabricante:</strong> ${match.provider}</p>
          <p style="margin: 6px 0;"><strong>Valor:</strong> ${match.value || 'Sob consulta'}</p>
          <p style="margin: 6px 0;"><strong>Condições:</strong> ${match.payment_conditions || 'N/A'}</p>
          ${match.pdf_link ? `<p style="margin: 6px 0;"><strong>Catálogo (PDF):</strong> <a href="${match.pdf_link}">${match.pdf_link}</a></p>` : ''}
        </div>
        `
            : ''
        }

        ${roiBlock}
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Labplus Leads <atendimento@labplusdiagnostica.com.br>',
        to: [finalRecipient],
        subject: `Novo Lead Capturado: ${lead.name}`,
        html: htmlContent,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Error sending email')
    }

    return new Response(JSON.stringify({ success: true, message: 'Email successfully sent' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
