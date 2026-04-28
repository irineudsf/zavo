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

export default function Home() {
  return (
    <>
      <Header />
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
