import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { DiagnosticFormData } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  data: DiagnosticFormData
  updateData: (data: Partial<DiagnosticFormData>) => void
  onNext: () => void
  onPrev: () => void
}

export function StepInterest({ data, updateData, onNext, onPrev }: Props) {
  const options = [
    { id: 'reagents', title: 'Interesse em Reagentes, testes e outros insumos' },
    { id: 'equipment', title: 'Conhecer equipamentos' },
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Qual o seu principal interesse?</h2>
        <p className="text-muted-foreground">Selecione o que você busca no momento.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((item) => (
          <button
            key={item.id}
            onClick={() => updateData({ interest: item.id })}
            className={cn(
              'flex flex-col items-center justify-center p-8 rounded-xl border-2 transition-all duration-200 gap-4 text-center',
              data.interest === item.id
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:border-primary/50 hover:bg-slate-50',
            )}
          >
            <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
          </button>
        ))}
      </div>

      <div className="pt-6 flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
        <Button onClick={onNext} disabled={!data.interest} className="gap-2">
          Próximo Passo <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
