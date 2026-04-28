'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { WHATSAPP_URL_DIAGNOSTICO } from '@/lib/constants'

const itens = [
  { icone: '✓', texto: 'Entendemos como seu negócio funciona hoje' },
  { icone: '✓', texto: 'Identificamos os pontos de maior perda de receita' },
  { icone: '✓', texto: 'Mostramos qual solução resolve mais rápido' },
  { icone: '✓', texto: 'Se não dermos conta de ajudar, falamos sem rodeio' },
]

const nao = [
  'Sem apresentação de PowerPoint',
  'Sem venda forçada',
  'Sem contrato antes de você querer',
]

export function DiagnosticoInst() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: '#0D0D0D', padding: '96px 24px' }} ref={ref}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>

        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, type: 'tween' }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#F5B800', opacity: 0.8, marginBottom: 16 }}>
            Próximo passo
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 900, color: '#fff', letterSpacing: -1.5, lineHeight: 1.15, marginBottom: 20 }}>
            Antes de qualquer proposta,<br />
            <span style={{ color: '#F5B800' }}>a gente conversa.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 32 }}>
            15 minutos no WhatsApp. Você fala do seu negócio, a gente identifica onde você está perdendo dinheiro
            — e te diz com honestidade o que faz sentido resolver primeiro.
          </p>

          <a
            href={WHATSAPP_URL_DIAGNOSTICO}
            target="_blank"
            rel="noopener"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: '#F5B800', color: '#0D0D0D',
              fontWeight: 800, fontSize: 17,
              padding: '18px 36px', borderRadius: 10,
              textDecoration: 'none', minHeight: 60,
              boxShadow: '0 0 32px rgba(245,184,0,0.25)',
            }}
          >
            Quero meu diagnóstico gratuito →
          </a>
          <span style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 12 }}>
            Gratuito de verdade. Sem pegadinha, sem compromisso.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, type: 'tween' }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16,
            padding: '36px 32px',
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
            O que acontece na conversa
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 14, marginBottom: 32 }}>
            {itens.map(item => (
              <div key={item.texto} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: '#F5B800', fontWeight: 800, fontSize: 16, lineHeight: 1.5 }}>{item.icone}</span>
                <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{item.texto}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
              O que NÃO acontece
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              {nao.map(n => (
                <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: '#666', fontWeight: 800, fontSize: 16, lineHeight: 1.5 }}>✗</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
