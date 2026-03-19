import { Button } from '@/components/ui/button'
import { CheckCircle, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export function StepSuccess() {
  return (
    <div className="space-y-8 animate-fade-in-up py-4">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-16 w-16 text-green-600 animate-pulse-soft" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground">Concluído!</h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto font-medium text-green-700">
          Obrigado! Seus dados foram enviados com sucesso. Nossa equipe de especialistas analisará
          seu perfil e entrará em contato em breve para oferecer a melhor solução para o seu
          laboratório.
        </p>
      </div>

      <div className="flex justify-center gap-4 pt-8">
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link to="/">
            <Home className="h-5 w-5" /> Voltar ao Início
          </Link>
        </Button>
      </div>
    </div>
  )
}
