import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, FileText, Home } from 'lucide-react'
import { CatalogItem } from '@/types'
import { Link } from 'react-router-dom'
import { useCms } from '@/contexts/CmsContext'

interface Props {
  match: CatalogItem | null
}

export function StepSuccess({ match }: Props) {
  const { content } = useCms()

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
          {content?.diagnostic_success_msg ||
            'Informações recebidas com sucesso! Em breve, um especialista entrará em contato com a melhor solução.'}
        </p>
      </div>

      {match && (
        <Card className="border-primary/20 shadow-lg max-w-2xl mx-auto bg-slate-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-xl text-primary flex items-center justify-center gap-2">
              <FileText className="h-5 w-5" /> Equipamento Recomendado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <h3 className="text-2xl font-bold text-foreground">{match.equipment_name}</h3>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground pt-2">
              <span className="bg-white px-3 py-1 rounded-full border border-border shadow-sm">
                Fabricante: {match.provider}
              </span>
              <span className="bg-white px-3 py-1 rounded-full border border-border shadow-sm">
                {match.payment_conditions}
              </span>
            </div>
            <p className="pt-4 text-muted-foreground">
              Um de nossos especialistas comerciais entrará em contato para apresentar a proposta
              comercial completa.
            </p>
          </CardContent>
        </Card>
      )}

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
