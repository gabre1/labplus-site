import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { DiagnosticFormData } from '@/types'
import { useState } from 'react'

interface Props {
  data: DiagnosticFormData
  updateData: (data: Partial<DiagnosticFormData>) => void
  onNext: () => void
  onPrev: () => void
}

export function StepReagents({ data, updateData, onNext, onPrev }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {}
    if (!data.reagent_type.trim()) newErrors.reagent_type = 'Tipo de reagente é obrigatório'
    if (!data.equipment_model.trim())
      newErrors.equipment_model = 'Modelo do equipamento é obrigatório'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    onNext()
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Detalhes dos Reagentes</h2>
        <p className="text-muted-foreground">Conte-nos mais sobre a sua necessidade.</p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="reagent_type">Tipo de Reagente</Label>
          <Input
            id="reagent_type"
            placeholder="Ex: Bioquímica, Hematologia..."
            value={data.reagent_type}
            onChange={(e) => updateData({ reagent_type: e.target.value })}
            className={errors.reagent_type ? 'border-destructive' : ''}
          />
          {errors.reagent_type && <p className="text-sm text-destructive">{errors.reagent_type}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="equipment_model">Modelo do Equipamento</Label>
          <Input
            id="equipment_model"
            placeholder="Ex: Mindray BS-200"
            value={data.equipment_model}
            onChange={(e) => updateData({ equipment_model: e.target.value })}
            className={errors.equipment_model ? 'border-destructive' : ''}
          />
          {errors.equipment_model && (
            <p className="text-sm text-destructive">{errors.equipment_model}</p>
          )}
        </div>
      </div>

      <div className="pt-6 flex justify-between border-t border-border mt-8">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
        <Button onClick={validateAndNext} className="gap-2">
          Próximo Passo <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
