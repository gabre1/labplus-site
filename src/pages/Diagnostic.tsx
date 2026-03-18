import { useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { DiagnosticFormData, CatalogItem } from '@/types'
import { useCms } from '@/contexts/CmsContext'
import { fetchCatalogItems } from '@/lib/api'

import { Step1Personal } from '@/components/diagnostic/Step1Personal'
import { Step2Segment } from '@/components/diagnostic/Step2Segment'
import { Step3Type } from '@/components/diagnostic/Step3Type'
import { Step4Volume } from '@/components/diagnostic/Step4Volume'
import { StepSuccess } from '@/components/diagnostic/StepSuccess'

const TOTAL_STEPS = 4

export default function Diagnostic() {
  const { content } = useCms()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [matchResult, setMatchResult] = useState<CatalogItem | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState<DiagnosticFormData>({
    name: '',
    phone: '',
    city: '',
    segment: '',
    type: '',
    volume: '',
  })

  const updateFormData = (data: Partial<DiagnosticFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const catalogItems = await fetchCatalogItems()

      let matchedItem = catalogItems.find((item) => {
        const tags = item.recommendation_tags.toLowerCase()
        return (
          tags.includes(formData.segment.toLowerCase()) &&
          tags.includes(formData.type.toLowerCase()) &&
          tags.includes(formData.volume.toLowerCase())
        )
      })

      if (!matchedItem) {
        matchedItem =
          catalogItems.find((item) =>
            item.recommendation_tags.toLowerCase().includes(formData.type.toLowerCase()),
          ) || catalogItems[0]
      }

      setMatchResult(matchedItem)

      console.log('--- NOVO LEAD RECEBIDO (ALERTA INTERNO VENDAS) ---', {
        LeadData: {
          Nome: formData.name,
          Telefone: formData.phone,
        },
        City: formData.city,
        Routine: {
          Segmento: formData.segment,
          Equipamento: formData.type,
          Volume: formData.volume,
        },
        MatchedEquipment: {
          Name: matchedItem?.equipment_name,
          Value: matchedItem?.value,
          Provider: matchedItem?.provider,
          Link: matchedItem?.pdf_link,
          Conditions: matchedItem?.payment_conditions,
          Image: matchedItem?.image,
          Description: matchedItem?.description,
        },
      })

      toast({
        title: '🚨 Alerta Interno de Vendas',
        description: `Lead: ${formData.name} - Match: ${matchedItem?.equipment_name}`,
        duration: 8000,
      })

      setStep(5)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao processar o diagnóstico',
        description: 'Não foi possível encontrar uma recomendação no momento.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!content) return null

  const progress = (step / TOTAL_STEPS) * 100

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
          {content.diagnostic_title_1}{' '}
          <span className="text-primary">{content.diagnostic_title_highlight}</span>
        </h1>
        {step <= TOTAL_STEPS && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground font-medium px-1">
              <span>
                Passo {step} de {TOTAL_STEPS}
              </span>
              <span>{Math.round(progress)}% Concluído</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <Card className="w-full max-w-3xl p-6 md:p-10 shadow-lg border-border bg-white">
        {step === 1 && (
          <Step1Personal data={formData} updateData={updateFormData} onNext={nextStep} />
        )}
        {step === 2 && (
          <Step2Segment
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 3 && (
          <Step3Type
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 4 && (
          <Step4Volume
            data={formData}
            updateData={updateFormData}
            onSubmit={handleSubmit}
            onPrev={prevStep}
            isLoading={isLoading}
          />
        )}
        {step === 5 && <StepSuccess match={matchResult} />}
      </Card>
    </div>
  )
}
