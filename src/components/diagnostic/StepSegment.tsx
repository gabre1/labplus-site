import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, User, PawPrint } from 'lucide-react'
import { DiagnosticFormData } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  data: DiagnosticFormData
  updateData: (data: Partial<DiagnosticFormData>) => void
  onNext: () => void
  onPrev: () => void
}

export function StepSegment({ data, updateData, onNext, onPrev }: Props) {
  const segments = [
    { id: 'Humano', title: 'Laboratório Humano', desc: 'Análises clínicas humanas', icon: User },
    {
      id: 'Veterinário',
      title: 'Laboratório Veterinário',
      desc: 'Análises para pets e grandes animais',
      icon: PawPrint,
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Qual o segmento do laboratório?</h2>
        <p className="text-muted-foreground">Selecione a área principal de atuação.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {segments.map((item) => (
          <button
            key={item.id}
            onClick={() => updateData({ segment: item.id })}
            className={cn(
              'flex flex-col items-center justify-center p-8 rounded-xl border-2 transition-all duration-200 gap-4',
              data.segment === item.id
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border hover:border-primary/50 hover:bg-slate-50',
            )}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div
                className={cn(
                  'p-4 rounded-full mb-4',
                  data.segment === item.id ? 'bg-primary/20' : 'bg-slate-100',
                )}
              >
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="pt-6 flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
        <Button onClick={onNext} disabled={!data.segment} className="gap-2">
          Próximo Passo <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
