'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const lados = [
  {
    tag: 'Lado 1 — Aquisição',
    titulo: 'Clientes que poderiam ser seus estão indo pro seu concorrente',
    itens: [
      'Seu concorrente aparece no Google. Você não.',
      'Ele tem um site que convence em 5 segundos. O seu afasta.',
      'O cliente pesquisa, não te acha, e fecha com outro.',
      'Isso acontece todo dia — em silêncio.',
    ],
    cor: '#F5B800',
  },
  {
    tag: 'Lado 2 — Operação',
    titulo: 'Você paga caro pra fazer o que a tecnologia faria de graça',
    itens: [
      'Alguém responde sempre a mesma dúvida no WhatsApp.',
      'Alguém lança dado manualmente todo dia.',
      'Alguém monta o mesmo relatório toda semana.',
      'Trabalho que parece necessário — mas já tem tecnologia pra substituir.',
    ],
    cor: '#C084FC',
  },
]

const fade = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, type: 'tween' as const } }),
}

export function ProblemaInst() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: '#fff', padding: '96px 24px' }} ref={ref}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, type: 'tween' }}
          style={{ marginBottom: 64 }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#F5B800', marginBottom: 16 }}>
            O problema
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 20, color: '#0D0D0D' }}>
            Dinheiro saindo pelos dois lados.
          </h2>
          <p style={{ fontSize: 18, color: '#555', maxWidth: 620, lineHeight: 1.75 }}>
            Você trabalha bem. Entrega resultado. Tem clientes satisfeitos.
            Mas o negócio poderia ir muito melhor — e a resposta quase sempre vem de dois lugares ao mesmo tempo.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {lados.map((lado, i) => (
            <motion.div
              key={lado.tag}
              custom={i}
              variants={fade}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              style={{
                background: '#F7F7F7',
                border: `1px solid ${i === 0 ? 'rgba(245,184,0,0.25)' : 'rgba(192,132,252,0.25)'}`,
                borderRadius: 16,
                padding: '36px 32px',
              }}
            >
              <div style={{
                display: 'inline-block', fontSize: 11, fontWeight: 700,
                letterSpacing: 3, textTransform: 'uppercase' as const,
                color: lado.cor, marginBottom: 16,
              }}>
                {lado.tag}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.25, marginBottom: 24, color: '#0D0D0D' }}>
                {lado.titulo}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
                {lado.itens.map(item => (
                  <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: lado.cor, fontSize: 18, lineHeight: 1.4, flexShrink: 0 }}>✗</span>
                    <span style={{ fontSize: 15, color: '#444', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontSize: 18, fontWeight: 700, color: '#0D0D0D',
            textAlign: 'center' as const, marginTop: 48,
            padding: '24px 32px',
            background: 'rgba(245,184,0,0.06)',
            border: '1px solid rgba(245,184,0,0.2)',
            borderRadius: 12,
          }}
        >
          Dois problemas. Dinheiro saindo pelos dois lados. E a maioria dos negócios nunca resolve nenhum porque não sabe por onde começar.
        </motion.p>
      </div>
    </section>
  )
}
