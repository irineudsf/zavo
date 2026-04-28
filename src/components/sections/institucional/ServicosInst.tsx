'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GlowCard } from '@/components/ui/spotlight-card'
import { WHATSAPP_URL, WHATSAPP_URL_DIAGNOSTICO } from '@/lib/constants'

const servicos = [
  {
    id: 'sites',
    icone: '🌐',
    titulo: 'Sites que vendem',
    descricao: 'Seu site é o único vendedor que trabalha 24h por dia, 7 dias por semana, nunca tira férias e nunca pede aumento. A Zavo cria sites que aparecem no Google, passam credibilidade em 5 segundos e transformam visitante em contato.',
    paraQuem: 'Negócio sem presença digital, ou com site que não gera nenhum resultado.',
    cta: 'Ver oferta de sites',
    ctaUrl: '/sites',
    externo: false,
  },
  {
    id: 'ia',
    icone: '🤖',
    titulo: 'IA aplicada ao seu negócio',
    descricao: 'Inteligência artificial não é coisa de empresa grande. A Zavo identifica onde a IA pode trabalhar por você — atendimento, triagem, geração de conteúdo, análise de dados — e implementa sem complicação técnica.',
    paraQuem: 'Negócio que quer escalar sem aumentar a equipe.',
    cta: 'Quero saber mais sobre IA',
    ctaUrl: WHATSAPP_URL_DIAGNOSTICO,
    externo: true,
  },
  {
    id: 'automacoes',
    icone: '⚡',
    titulo: 'Automações de processo',
    descricao: 'Cada tarefa repetitiva que sua equipe faz no computador é dinheiro desperdiçado. A Zavo mapeia o que pode ser automatizado e faz isso acontecer — integrando sistemas, eliminando retrabalho, liberando sua equipe para o que importa.',
    paraQuem: 'Equipe sobrecarregada com trabalho operacional que poderia ser zero.',
    cta: 'Quero automatizar meu negócio',
    ctaUrl: WHATSAPP_URL_DIAGNOSTICO,
    externo: true,
  },
]

const fade = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, type: 'tween' as const } }),
}

export function ServicosInst() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servicos" style={{ background: '#0D0D0D', padding: '96px 24px' }} ref={ref}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, type: 'tween' }}
          style={{ marginBottom: 64 }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#F5B800', opacity: 0.8, marginBottom: 16 }}>
            O que fazemos
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 900, color: '#fff', letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 20 }}>
            Três caminhos.<br />
            <span style={{ color: '#F5B800' }}>Um destino: mais lucro.</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 560, lineHeight: 1.75 }}>
            Não vendemos tecnologia pela tecnologia. Cada serviço existe pra gerar resultado concreto no seu bolso.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {servicos.map((s, i) => (
            <motion.div
              key={s.id}
              id={s.id}
              custom={i}
              variants={fade}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <GlowCard customSize glowColor="amber" width="100%">
                <div style={{ padding: '36px 28px', display: 'flex', flexDirection: 'column' as const, height: '100%' }}>
                  <div style={{
                    width: 56, height: 56,
                    background: 'rgba(245,184,0,0.1)',
                    border: '1px solid rgba(245,184,0,0.2)',
                    borderRadius: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, marginBottom: 20,
                  }}>
                    {s.icone}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 14, letterSpacing: -0.3, color: '#0D0D0D' }}>
                    {s.titulo}
                  </h3>
                  <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, marginBottom: 20, flex: 1 }}>
                    {s.descricao}
                  </p>
                  <div style={{
                    fontSize: 12, color: '#888', lineHeight: 1.5,
                    padding: '12px 14px',
                    background: 'rgba(0,0,0,0.04)',
                    borderRadius: 8, marginBottom: 24,
                    borderLeft: '3px solid #F5B800',
                  }}>
                    <strong style={{ color: '#555' }}>Para quem:</strong> {s.paraQuem}
                  </div>
                  <a
                    href={s.ctaUrl}
                    target={s.externo ? '_blank' : undefined}
                    rel={s.externo ? 'noopener' : undefined}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      background: '#0D0D0D', color: '#F5B800',
                      fontWeight: 700, fontSize: 14,
                      padding: '13px 20px', borderRadius: 8,
                      textDecoration: 'none',
                      border: '1px solid rgba(245,184,0,0.3)',
                      transition: 'background 0.2s',
                    }}
                  >
                    {s.cta} →
                  </a>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
