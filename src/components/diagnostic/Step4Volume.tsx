import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { DiagnosticFormData } from '@/types'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface Props {
  data: DiagnosticFormData
  updateData: (data: Partial<DiagnosticFormData>) => void
  onSubmit: () => void
  onPrev: () => void
  isLoading: boolean
}

export function Step4Volume({ data, updateData, onSubmit, onPrev, isLoading }: Props) {
  const volumes = [
    { id: 'Até 50', label: 'Até 50 testes / dia' },
    { id: '51 a 200', label: 'De 51 a 200 testes / dia' },
    { id: '201 a 300', label: 'De 201 a 300 testes / dia' },
    { id: 'Acima de 300', label: 'Acima de 300 testes / dia' },
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Qual a demanda estimada?</h2>
        <p className="text-muted-foreground">
          Isso nos ajuda a dimensionar a capacidade do equipamento ideal.
        </p>
      </div>

      <div className="max-w-md mx-auto pt-2 pb-6">
        <RadioGroup
          value={data.volume}
          onValueChange={(val) => updateData({ volume: val })}
          className="space-y-3"
        >
          {volumes.map((vol) => (
            <div
              key={vol.id}
              className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-slate-50 transition-colors"
            >
              <RadioGroupItem value={vol.id} id={vol.id} />
              <Label htmlFor={vol.id} className="flex-1 cursor-pointer text-base font-medium">
                {vol.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="pt-6 flex justify-between border-t border-border">
        <Button variant="outline" onClick={onPrev} disabled={isLoading} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
        <Button onClick={onSubmit} disabled={!data.volume || isLoading} className="gap-2 w-40">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              Analisando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Ver Resultado <CheckCircle className="h-4 w-4" />
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
