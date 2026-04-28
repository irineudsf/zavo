'use client'
import { useState } from 'react'

const faqs = [
  { q: 'Isso é sério? Posso realmente pagar o que quiser?', r: 'Sim. A gente acredita no trabalho que entrega. Se você ver valor, paga o que achar justo. Se não gostar do resultado — não cobra nada. Simples assim.' },
  { q: 'Quanto tempo leva para o site ficar pronto?', r: 'Até 7 dias úteis depois da gente conversar e você passar as informações do seu negócio. Rápido porque temos processo — não porque é simples.' },
  { q: 'Preciso entender de tecnologia para ter um site?', r: 'Não. A gente cuida de tudo: domínio, hospedagem, design e texto. Você só aprova o resultado final.' },
  { q: 'O site vai aparecer no Google?', r: 'Sim. Todo site da Zavo já sai com SEO básico configurado. Aparecer no Google leva tempo (geralmente 30 a 90 dias), mas você começa do jeito certo desde o primeiro dia.' },
  { q: 'E se eu precisar mudar algo depois que o site ficar pronto?', r: 'Até 30 dias depois da entrega, qualquer ajuste é sem custo adicional. Foto nova, texto diferente, adicionar um serviço — tudo resolvido sem burocracia.' },
  { q: 'Como funciona o primeiro contato?', r: 'Você clica no botão, a gente te chama no WhatsApp, conversa uns 15 minutos sobre o seu negócio e já começamos. Sem reunião formal, sem PowerPoint de proposta.' },
]

export function FAQ() {
  const [aberto, setAberto] = useState<number | null>(null)

  return (
    <section style={{ background: '#fff', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#F5B800', marginBottom: 16 }}>Dúvidas frequentes</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1 }}>Perguntas que todo mundo faz</h2>
        </div>
        <div style={{ maxWidth: 720 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid #E5E5E5' }}>
              <button
                onClick={() => setAberto(aberto === i ? null : i)}
                style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '22px 0', textAlign: 'left' }}
              >
                <span style={{ fontSize: 17, fontWeight: 600, color: '#0D0D0D', letterSpacing: -0.2, lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{
                  width: 28, height: 28, background: aberto === i ? '#F5B800' : '#F5F5F5',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 18, color: '#0D0D0D', lineHeight: 1,
                  transform: aberto === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s, background 0.18s'
                }}>+</span>
              </button>
              {aberto === i && (
                <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, paddingBottom: 22 }}>{faq.r}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
