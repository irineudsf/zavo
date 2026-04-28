import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400','500','600','700','800','900'] })

export const metadata: Metadata = {
  title: 'Site que Gera Clientes para seu Negócio | Zavo',
  description: 'A Zavo cria sites que colocam seu negócio na frente de quem já quer comprar. Você paga o quanto quiser. Entrega em 7 dias úteis.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
