import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { DiagnosticFormData } from '@/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  data: DiagnosticFormData
  updateData: (data: Partial<DiagnosticFormData>) => void
  onSubmit: () => void
  onPrev: () => void
  isLoading: boolean
}

export function StepVolume({ data, updateData, onSubmit, onPrev, isLoading }: Props) {
  const isInvalid =
    !data.volume || parseInt(data.volume, 10) <= 0 || isNaN(parseInt(data.volume, 10))

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Qual a demanda estimada?</h2>
        <p className="text-muted-foreground">
          Isso nos ajuda a dimensionar a nossa recomendação para a sua demanda.
        </p>
      </div>

      <div className="max-w-md mx-auto pt-2 pb-6">
        <div className="space-y-3">
          <Label htmlFor="volume" className="text-base font-medium">
            Quantos testes realiza por mês, em média?
          </Label>
          <Input
            id="volume"
            type="number"
            min="1"
            placeholder="Ex: 150"
            value={data.volume}
            onChange={(e) => updateData({ volume: e.target.value })}
            className="h-14 text-lg"
          />
        </div>
      </div>

      <div className="pt-6 flex justify-between border-t border-border">
        <Button variant="outline" onClick={onPrev} disabled={isLoading} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
        <Button onClick={onSubmit} disabled={isInvalid || isLoading} className="gap-2 w-40">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              Enviando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Concluir <CheckCircle className="h-4 w-4" />
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
