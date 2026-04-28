'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

const dores = [
  {
    icone: '🔍',
    titulo: 'Invisível no Google',
    texto: 'Quando alguém pesquisa o que você oferece, seu nome não aparece. O cliente nem sabe que você existe.',
  },
  {
    icone: '📱',
    titulo: 'Instagram não converte',
    texto: 'Você investe em anúncio, o cliente clica e cai num perfil com 200 seguidores. A credibilidade some.',
  },
  {
    icone: '💸',
    titulo: 'Cliente vai embora sem comprar',
    texto: 'Sem site, sem prova social, sem CTA claro. O visitante não sabe o próximo passo — e some.',
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.55, type: 'tween' as const },
  }),
}

const textVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'tween' as const } },
}

export function Problem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: '#fff', padding: '96px 24px' }} ref={ref}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>

        {/* Texto da seção */}
        <motion.div
          variants={textVariant}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: '#F5B800', marginBottom: 16 }}>
            O problema
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 24 }}>
            Seu negócio está invisível online
          </h2>
          <p style={{ fontSize: 18, color: '#555', maxWidth: 640, lineHeight: 1.75, marginBottom: 56 }}>
            Você trabalha bem. Entrega resultado. Tem clientes satisfeitos.
            Mas quando alguém te pesquisa online —{' '}
            <strong style={{ color: '#0D0D0D' }}>nada.</strong> E enquanto você não resolve isso,
            seu concorrente continua ganhando os clientes que deveriam ser seus.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {dores.map((d, i) => (
            <motion.div
              key={d.titulo}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <SpotlightCard>
                <div style={{
                  background: '#F5F5F5',
                  borderRadius: 16,
                  padding: '32px 28px 36px',
                  border: '1px solid #E8E8E8',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  cursor: 'default',
                }}>
                  {/* Ícone com fundo âmbar sutil no hover — via CSS var não dá, uso JS */}
                  <div style={{
                    width: 52, height: 52,
                    background: '#0D0D0D',
                    borderRadius: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20, fontSize: 24,
                  }}>
                    {d.icone}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, letterSpacing: -0.3, color: '#0D0D0D' }}>
                    {d.titulo}
                  </h3>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>
                    {d.texto}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
