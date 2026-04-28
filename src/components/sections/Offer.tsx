import { WHATSAPP_URL } from '@/lib/constants'

const itens = [
  'Site completo e profissional',
  'Domínio (.com.br) incluso no 1º ano',
  'Hospedagem inclusa no 1º ano',
  'SEO básico configurado',
  'WhatsApp integrado',
  'Suporte por 30 dias após entrega',
  'Ajustes gratuitos por 30 dias',
]

export function Offer() {
  return (
    <section style={{ background: '#F5B800', padding: '96px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: 'rgba(0,0,0,0.45)', marginBottom: 16 }}>A oferta</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#0D0D0D', letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 32 }}>Tudo incluso. Proposta em minutos.</h2>
        <ul style={{ listStyle: 'none', background: 'rgba(0,0,0,0.08)', borderRadius: 14, padding: '24px 28px', textAlign: 'left', marginBottom: 32 }}>
          {itens.map(item => (
            <li key={item} style={{ fontSize: 16, fontWeight: 600, color: '#0D0D0D', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ opacity: 0.6, fontWeight: 900 }}>✓</span> {item}
            </li>
          ))}
        </ul>
        <div style={{ background: '#0D0D0D', borderRadius: 16, padding: '36px 40px', marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>Investimento</div>
          <div style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 900, color: '#F5B800', letterSpacing: -2, lineHeight: 1, marginBottom: 8 }}>Sob consulta.</div>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
            O valor depende do tipo de site e do escopo do projeto. Fale com a gente pelo WhatsApp e receba sua proposta na hora — sem enrolação.
          </div>
        </div>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: '#0D0D0D', color: '#F5B800', fontWeight: 800, fontSize: 18,
          padding: '20px 40px', borderRadius: 12, textDecoration: 'none', minHeight: 64
        }}>
          Quero meu site →
        </a>
        <p style={{ fontSize: 15, color: 'rgba(0,0,0,0.5)', marginTop: 20, lineHeight: 1.6 }}>
          Sem enrolação. Proposta clara, entrega em até 7 dias.
        </p>
      </div>
    </section>
  )
}
