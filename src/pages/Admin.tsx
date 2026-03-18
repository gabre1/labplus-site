import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminShowcase } from '@/components/admin/AdminShowcase'
import { AdminCatalog } from '@/components/admin/AdminCatalog'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'

export default function Admin() {
  const { signOut } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-bold text-primary">Labplus Admin</h1>
        <Button onClick={signOut} variant="outline" size="sm">
          Sair
        </Button>
      </header>

      <main className="max-w-6xl mx-auto p-6 mt-8 bg-white border border-border rounded-xl shadow-sm">
        <Tabs defaultValue="showcase" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
            <TabsTrigger value="showcase">Vitrine</TabsTrigger>
            <TabsTrigger value="catalog">Catálogo</TabsTrigger>
          </TabsList>
          <TabsContent value="showcase">
            <AdminShowcase />
          </TabsContent>
          <TabsContent value="catalog">
            <AdminCatalog />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
