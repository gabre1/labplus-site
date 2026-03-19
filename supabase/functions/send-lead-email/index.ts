import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { lead } = await req.json()

    // In a real scenario, integrate with Resend or SendGrid here
    // e.g. await fetch('https://api.resend.com/emails', { ... })

    console.log(`[Mock] Simulating sending lead data email to labplusfiscal@gmail.com`)
    console.log(`Lead Data:`, JSON.stringify(lead, null, 2))

    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return new Response(JSON.stringify({ success: true, message: 'Email successfully sent' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
