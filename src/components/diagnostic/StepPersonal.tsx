import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { DiagnosticFormData } from '@/types'
import { useState } from 'react'

interface Props {
  data: DiagnosticFormData
  updateData: (data: Partial<DiagnosticFormData>) => void
  onNext: () => void
}

export function StepPersonal({ data, updateData, onNext }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {}
    if (!data.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!data.phone.trim()) newErrors.phone = 'Telefone é obrigatório'
    if (!data.city.trim()) newErrors.city = 'Cidade é obrigatória'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    onNext()
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '')
    if (val.length > 11) val = val.slice(0, 11)
    if (val.length > 2) val = `(${val.slice(0, 2)}) ${val.slice(2)}`
    if (val.length > 10) val = `${val.slice(0, 10)}-${val.slice(10)}`
    updateData({ phone: val })
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Vamos começar!</h2>
        <p className="text-muted-foreground">
          Precisamos de algumas informações básicas para personalizar seu atendimento.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo do Responsável</Label>
          <Input
            id="name"
            placeholder="Ex: João da Silva"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone (WhatsApp)</Label>
          <Input
            id="phone"
            placeholder="(00) 00000-0000"
            value={data.phone}
            onChange={handlePhoneChange}
            className={errors.phone ? 'border-destructive' : ''}
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Cidade / Estado</Label>
          <Input
            id="city"
            placeholder="Ex: Maceió - AL"
            value={data.city}
            onChange={(e) => updateData({ city: e.target.value })}
            className={errors.city ? 'border-destructive' : ''}
          />
          {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <Button onClick={validateAndNext} className="gap-2">
          Próximo Passo <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
