'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const perguntas = [
  {
    q: 'O que exatamente é o diagnóstico gratuito?',
    a: 'Uma conversa de 15 minutos no WhatsApp onde a gente entende como seu negócio funciona e identifica onde você está perdendo dinheiro. Saindo da conversa você já sabe qual é o problema e se a Zavo pode resolver. Sem custo, sem obrigação de contratar.',
  },
  {
    q: 'Meu negócio é pequeno demais pra isso?',
    a: 'Se tem alguém na frente do computador fazendo algo que poderia ser melhor — seja você, um funcionário ou um freelancer — dá pra melhorar. Já atendemos desde profissionais autônomos até equipes de 20 pessoas.',
  },
  {
    q: 'Preciso entender de tecnologia?',
    a: 'Não. Você não precisa saber nada de tecnologia. A gente traduz tudo em português claro e cuida de toda a parte técnica. Sua parte é falar do negócio.',
  },
  {
    q: 'Quanto custa trabalhar com a Zavo?',
    a: 'Depende do que você precisa. A conversa de diagnóstico é gratuita, e é nela que chegamos juntos ao que faz mais sentido — inclusive o investimento. Sites têm precificação flexível ("pague o que achar justo"). Automações e IA são orçados após entender a complexidade.',
  },
  {
    q: 'Quanto tempo leva pra eu ver resultado?',
    a: 'Sites ficam prontos em até 7 dias úteis após a conversa inicial. Automações variam — algumas ficam prontas em dias, outras levam algumas semanas. Em todos os casos, definimos prazo claro antes de começar.',
  },
  {
    q: 'Vocês atendem meu segmento?',
    a: 'Se seu negócio tem clientes pra conquistar ou processos pra otimizar — e tem alguém na frente do computador — a Zavo pode ajudar. Já atendemos clínicas, escritórios, imobiliárias, comércios, prestadores de serviço, academias e mais.',
  },
]

function Item({ pergunta, aberta, onToggle }: { pergunta: typeof perguntas[0], aberta: boolean, onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid #E8E8E8' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', textAlign: 'left' as const,
          padding: '20px 0',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 700, color: '#0D0D0D', lineHeight: 1.4 }}>{pergunta.q}</span>
        <span style={{ color: '#F5B800', fontSize: 20, fontWeight: 400, flexShrink: 0, transform: aberta ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s' }}>+</span>
      </button>
      {aberta && (
        <p style={{ fontSize: 15, color: '#555', lineHeight: 1.75, paddingBottom: 20, margin: 0 }}>
          {pergunta.a}
        </p>
      )}
    </div>
  )
}

export function FAQInst() {
  const [aberta, setAberta] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: '#fff', padding: '96px 24px' }} ref={ref}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, type: 'tween' }}
          style={{ marginBottom: 48 }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#F5B800', marginBottom: 16 }}>
            Dúvidas frequentes
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.1, color: '#0D0D0D' }}>
            Perguntas que todo mundo faz
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {perguntas.map((p, i) => (
            <Item
              key={i}
              pergunta={p}
              aberta={aberta === i}
              onToggle={() => setAberta(aberta === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
