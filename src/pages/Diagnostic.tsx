import { useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { DiagnosticFormData, CatalogItem } from '@/types'
import { catalogItems } from '@/lib/data'

import { Step1Personal } from '@/components/diagnostic/Step1Personal'
import { Step2Segment } from '@/components/diagnostic/Step2Segment'
import { Step3Type } from '@/components/diagnostic/Step3Type'
import { Step4Volume } from '@/components/diagnostic/Step4Volume'
import { StepSuccess } from '@/components/diagnostic/StepSuccess'

const TOTAL_STEPS = 4

export default function Diagnostic() {
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

  const handleSubmit = () => {
    setIsLoading(true)

    // Simulate API call and Match Logic
    setTimeout(() => {
      let matchedItem = catalogItems.find(
        (item) =>
          item.tags.includes(formData.segment) &&
          item.tags.includes(formData.type) &&
          item.tags.includes(formData.volume),
      )

      // Fallback if strict match fails (just for demo purposes to avoid empty results)
      if (!matchedItem) {
        matchedItem =
          catalogItems.find((item) => item.tags.includes(formData.type)) || catalogItems[0]
      }

      setMatchResult(matchedItem)
      setIsLoading(false)
      setStep(5) // Success step

      // Demo CMS Lead Notification
      console.log('--- NOVO LEAD RECEBIDO ---', { lead: formData, recomendacao: matchedItem })
      toast({
        title: 'Alerta Interno (Simulação)',
        description: `Lead: ${formData.name} - Match: ${matchedItem.equipmentName}`,
        duration: 8000,
      })
    }, 1500)
  }

  const progress = (step / TOTAL_STEPS) * 100

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
          Diagnóstico <span className="text-primary">Consultivo</span>
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
