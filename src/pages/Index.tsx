import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ShowcaseSection } from '@/components/sections/ShowcaseSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Index() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [hash])

  return (
    <div className="w-full">
      <HeroSection />
      <AboutSection />
      <ShowcaseSection />
      <FAQSection />
      <ContactSection />
    </div>
  )
}
