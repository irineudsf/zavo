'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { WHATSAPP_URL_DIAGNOSTICO } from '@/lib/constants'

export function CTAFinalInst() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: '#0D0D0D', padding: '96px 24px', position: 'relative', overflow: 'hidden' }} ref={ref}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 700, height: 300,
        background: 'radial-gradient(ellipse, rgba(245,184,0,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, type: 'tween' }}
        style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' as const, position: 'relative', zIndex: 1 }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#F5B800', opacity: 0.8, marginBottom: 24 }}>
          Hora de agir
        </div>

        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#fff', letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 24 }}>
          Cada semana que passa é dinheiro<br />
          <span style={{ color: '#F5B800' }}>que poderia estar no seu bolso.</span>
        </h2>

        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.75 }}>
          Não precisa resolver tudo de uma vez.
          Precisa só de 15 minutos pra saber por onde começar.
        </p>

        <a
          href={WHATSAPP_URL_DIAGNOSTICO}
          target="_blank"
          rel="noopener"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: '#F5B800', color: '#0D0D0D',
            fontWeight: 800, fontSize: 18,
            padding: '20px 48px', borderRadius: 12,
            textDecoration: 'none', minHeight: 64,
            boxShadow: '0 0 48px rgba(245,184,0,0.3)',
          }}
        >
          Falar com a Zavo agora →
        </a>
        <span style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 14 }}>
          Você decide o que fazer depois. A conversa não te obriga a nada.
        </span>
      </motion.div>
    </section>
  )
}
