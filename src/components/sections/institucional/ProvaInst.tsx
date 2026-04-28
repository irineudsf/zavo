'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const depoimentos = [
  {
    texto: 'Antes eu perdia cliente porque não tinha como mostrar meu trabalho online. Mandei o link do novo site numa indicação e o cliente fechou sem nem me ligar.',
    nome: 'Nome do cliente',
    segmento: 'Prestador de serviço',
    resultado: '+3 clientes no 1º mês',
  },
  {
    texto: 'Minha equipe gastava quase 2 horas por dia fazendo lançamento manual. Depois da automação, esse tempo virou zero. Hoje usamos esse tempo em atendimento.',
    nome: 'Nome do cliente',
    segmento: 'Escritório de contabilidade',
    resultado: '2h/dia economizadas',
  },
  {
    texto: 'Não sabia nem por onde começar. A conversa de 15 minutos foi suficiente pra entender o que eu precisava. Em 3 semanas já tinha resultado.',
    nome: 'Nome do cliente',
    segmento: 'Clínica de estética',
    resultado: 'ROI em 3 semanas',
  },
]

const segmentos = [
  'Clínicas e consultórios', 'Escritórios de contabilidade',
  'Imobiliárias', 'Prestadores de serviço',
  'Lojas físicas e online', 'Academias',
  'Profissionais autônomos', 'Arquitetos e designers',
]

const fade = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.55, type: 'tween' as const } }),
}

export function ProvaInst() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: '#F7F7F7', padding: '96px 24px' }} ref={ref}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, type: 'tween' }}
          style={{ marginBottom: 56, textAlign: 'center' as const }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#F5B800', marginBottom: 16 }}>
            Resultados
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.1, color: '#0D0D0D' }}>
            Negócios de todos os segmentos.<br />O mesmo resultado: mais lucro.
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 64 }}>
          {depoimentos.map((d, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fade}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              style={{
                background: '#fff',
                border: '1px solid #E8E8E8',
                borderRadius: 16,
                padding: '32px 28px',
                display: 'flex', flexDirection: 'column' as const, gap: 20,
              }}
            >
              <div style={{
                display: 'inline-block', alignSelf: 'flex-start',
                background: 'rgba(245,184,0,0.1)',
                border: '1px solid rgba(245,184,0,0.25)',
                borderRadius: 20, padding: '4px 12px',
                fontSize: 12, fontWeight: 700, color: '#C99A00',
              }}>
                {d.resultado}
              </div>
              <p style={{ fontSize: 15, color: '#333', lineHeight: 1.75, fontStyle: 'italic', flex: 1 }}>
                &ldquo;{d.texto}&rdquo;
              </p>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0D0D0D' }}>{d.nome}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{d.segmento}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Segmentos atendidos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, color: '#999', textAlign: 'center' as const, marginBottom: 20 }}>
            Segmentos atendidos
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10, justifyContent: 'center' as const }}>
            {segmentos.map(s => (
              <span key={s} style={{
                fontSize: 13, color: '#555', fontWeight: 500,
                padding: '8px 16px',
                background: '#fff',
                border: '1px solid #E0E0E0',
                borderRadius: 20,
              }}>
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
