import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { DiagnosticFormData } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  data: DiagnosticFormData
  updateData: (data: Partial<DiagnosticFormData>) => void
  onNext: () => void
  onPrev: () => void
}

export function StepType({ data, updateData, onNext, onPrev }: Props) {
  const types = [
    'Hematologia',
    'Bioquímica',
    'Imuno/hormônio',
    'Centrífugas',
    'Microscópios',
    'Biologia Molecular',
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Qual equipamento você busca?</h2>
        <p className="text-muted-foreground">
          Selecione a principal linha que seu laboratório precisa no momento.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4 pt-4 pb-8">
        <Select value={data.type} onValueChange={(val) => updateData({ type: val })}>
          <SelectTrigger className="w-full h-14 text-lg">
            <SelectValue placeholder="Selecione o tipo de equipamento" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type} className="text-lg py-3">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="pt-6 flex justify-between border-t border-border">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
        <Button onClick={onNext} disabled={!data.type} className="gap-2">
          Próximo Passo <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
