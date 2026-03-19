import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { DiagnosticFormData } from '@/types'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  data: DiagnosticFormData
  updateData: (data: Partial<DiagnosticFormData>) => void
  onNext: () => void
  onPrev: () => void
}

export function StepReagents({ data, updateData, onNext, onPrev }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const types = [
    'Hematologia',
    'Bioquímica',
    'Imuno/hormônio',
    'Centrífugas',
    'Microscópios',
    'Biologia Molecular',
    'Outra necessidade',
  ]

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {}
    if (!data.reagent_type.trim()) newErrors.reagent_type = 'Tipo de produto é obrigatório'

    if (
      data.reagent_type === 'Outra necessidade' &&
      (!data.other_reagent_details || !data.other_reagent_details.trim())
    ) {
      newErrors.other_reagent_details = 'Por favor, descreva sua necessidade'
    }

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
        <h2 className="text-2xl font-bold mb-2">Detalhes dos produtos</h2>
        <p className="text-muted-foreground">Conte-nos mais sobre a sua necessidade.</p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="reagent_type">Tipo de Produto/Reagente</Label>
          <Select
            value={data.reagent_type || undefined}
            onValueChange={(val) => updateData({ reagent_type: val })}
          >
            <SelectTrigger className={errors.reagent_type ? 'border-destructive' : ''}>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type} className="py-2 text-base">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.reagent_type && <p className="text-sm text-destructive">{errors.reagent_type}</p>}
        </div>

        {data.reagent_type === 'Outra necessidade' && (
          <div className="space-y-2 animate-fade-in-up pt-1">
            <Label htmlFor="other_reagent_details">Descreva sua necessidade</Label>
            <Textarea
              id="other_reagent_details"
              placeholder="Digite os detalhes..."
              maxLength={500}
              value={data.other_reagent_details || ''}
              onChange={(e) => updateData({ other_reagent_details: e.target.value })}
              className={errors.other_reagent_details ? 'border-destructive h-24' : 'h-24'}
            />
            {errors.other_reagent_details && (
              <p className="text-sm text-destructive">{errors.other_reagent_details}</p>
            )}
          </div>
        )}

        <div className="space-y-2 pt-2">
          <Label htmlFor="equipment_model">Modelo do Equipamento Atual</Label>
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
