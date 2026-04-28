import { Header } from '@/components/Header'
import { HeroInst } from '@/components/sections/institucional/HeroInst'
import { ProblemaInst } from '@/components/sections/institucional/ProblemaInst'
import { ServicosInst } from '@/components/sections/institucional/ServicosInst'
import { ProvaInst } from '@/components/sections/institucional/ProvaInst'
import { DiagnosticoInst } from '@/components/sections/institucional/DiagnosticoInst'
import { FAQInst } from '@/components/sections/institucional/FAQInst'
import { CTAFinalInst } from '@/components/sections/institucional/CTAFinalInst'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Zavo — Tecnologia que gera lucro para o seu negócio',
  description: 'A Zavo aumenta o lucro do seu negócio pelos dois lados: mais clientes chegando e menos custo operacional com IA e automações.',
}

export default function Home() {
  return (
    <>
      <Header variant="institutional" />
      <main>
        <HeroInst />
        <ProblemaInst />
        <ServicosInst />
        <ProvaInst />
        <DiagnosticoInst />
        <FAQInst />
        <CTAFinalInst />
      </main>
      <Footer />
    </>
  )
}
