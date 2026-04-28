import { Header } from '@/components/Header'
import { Hero } from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { Solution } from '@/components/sections/Solution'
import { Benefits } from '@/components/sections/Benefits'
import { Proof } from '@/components/sections/Proof'
import { Offer } from '@/components/sections/Offer'
import { FAQ } from '@/components/sections/FAQ'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Sites que vendem | Zavo',
  description: 'A Zavo cria o site que coloca seu negócio na frente de quem já quer comprar de você.',
}

export default function SitesPage() {
  return (
    <>
      <Header variant="landing" />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Benefits />
        <Proof />
        <Offer />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
