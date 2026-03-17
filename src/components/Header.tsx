import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, Activity } from 'lucide-react'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Sobre Nós', href: '/#sobre' },
    { name: 'Oportunidades', href: '/#oportunidades' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contato', href: '/#contato' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full glass-header">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">
            LAB<span className="text-primary">PLUS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-primary transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          <Button asChild className="rounded-full px-6">
            <Link to="/diagnostico">Solicitar Diagnóstico</Link>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-left mb-6">Menu de Navegação</SheetTitle>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-2 py-1 text-lg font-medium hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="mt-4">
                  <Button asChild className="w-full rounded-full" onClick={() => setIsOpen(false)}>
                    <Link to="/diagnostico">Solicitar Diagnóstico</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
