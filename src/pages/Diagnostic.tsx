import { useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { DiagnosticFormData } from '@/types'
import { useCms } from '@/contexts/CmsContext'
import { fetchCatalogItems } from '@/lib/api'
import { submitLead } from '@/services/leads'

import { StepPersonal } from '@/components/diagnostic/StepPersonal'
import { StepInterest } from '@/components/diagnostic/StepInterest'
import { StepReagents } from '@/components/diagnostic/StepReagents'
import { StepSegment } from '@/components/diagnostic/StepSegment'
import { StepType } from '@/components/diagnostic/StepType'
import { StepVolume } from '@/components/diagnostic/StepVolume'
import { StepSuccess } from '@/components/diagnostic/StepSuccess'

export default function Diagnostic() {
  const { content } = useCms()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState<DiagnosticFormData>({
    name: '',
    phone: '',
    city: '',
    interest: '',
    segment: '',
    type: '',
    reagent_type: '',
    equipment_model: '',
    volume: '',
    other_reagent_details: '',
    other_type_details: '',
  })

  const updateFormData = (data: Partial<DiagnosticFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const totalSteps = formData.interest === 'reagents' ? 4 : 5

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      let matchedItem = null
      if (formData.interest === 'equipment') {
        const catalogItems = await fetchCatalogItems()
        matchedItem = catalogItems.find((item) => {
          const tags = item.recommendation_tags?.toLowerCase() || ''
          return (
            tags.includes(formData.segment.toLowerCase()) &&
            tags.includes(formData.type.toLowerCase()) &&
            tags.includes(formData.volume.toLowerCase())
          )
        })

        if (!matchedItem) {
          matchedItem =
            catalogItems.find((item) =>
              item.recommendation_tags?.toLowerCase().includes(formData.type.toLowerCase()),
            ) ||
            catalogItems[0] ||
            null
        }
      }

      await submitLead(formData, matchedItem)

      setStep(totalSteps + 1)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro ao processar o atendimento',
        description: 'Não foi possível enviar suas informações no momento. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!content) return null

  const progress = (Math.min(step, totalSteps) / totalSteps) * 100

  const renderStep = () => {
    if (step === 1)
      return <StepPersonal data={formData} updateData={updateFormData} onNext={nextStep} />
    if (step === 2)
      return (
        <StepInterest
          data={formData}
          updateData={updateFormData}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )

    if (formData.interest === 'reagents') {
      if (step === 3)
        return (
          <StepReagents
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      if (step === 4)
        return (
          <StepVolume
            data={formData}
            updateData={updateFormData}
            onSubmit={handleSubmit}
            onPrev={prevStep}
            isLoading={isLoading}
          />
        )
      if (step === 5) return <StepSuccess />
    } else {
      if (step === 3)
        return (
          <StepSegment
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      if (step === 4)
        return (
          <StepType
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      if (step === 5)
        return (
          <StepVolume
            data={formData}
            updateData={updateFormData}
            onSubmit={handleSubmit}
            onPrev={prevStep}
            isLoading={isLoading}
          />
        )
      if (step === 6) return <StepSuccess />
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
          {content.diagnostic_title_1}{' '}
          <span className="text-primary">{content.diagnostic_title_highlight}</span>
        </h1>
        {step <= totalSteps && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground font-medium px-1">
              <span>
                Passo {step} de {totalSteps}
              </span>
              <span>{Math.round(progress)}% Concluído</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <Card className="w-full max-w-3xl p-6 md:p-10 shadow-lg border-border bg-white">
        {renderStep()}
      </Card>
    </div>
  )
}
