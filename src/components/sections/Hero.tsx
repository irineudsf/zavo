import { Entropy } from '@/components/ui/Entropy'
import { WHATSAPP_URL } from '@/lib/constants'

export function Hero() {
  return (
    <section style={{
      background: '#0D0D0D', padding: '140px 24px 100px',
      position: 'relative', overflow: 'hidden', textAlign: 'center'
    }}>
      <Entropy />
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <span style={{
          display: 'inline-block', fontSize: 11, fontWeight: 700,
          letterSpacing: 4, textTransform: 'uppercase', color: '#F5B800',
          opacity: 0.8, marginBottom: 24
        }}>
          Zavo · Sites que vendem
        </span>
        <h1 style={{
          fontSize: 'clamp(34px, 6vw, 62px)', fontWeight: 900,
          color: '#fff', letterSpacing: -2, lineHeight: 1.05, marginBottom: 24
        }}>
          A maioria dos pequenos negócios<br />
          perde clientes todo dia —<br />
          <span style={{ color: '#F5B800' }}>e nem sabe por quê.</span>
        </h1>
        <p style={{
          fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'rgba(255,255,255,0.55)',
          maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.65
        }}>
          O cliente te pesquisou, não te achou, foi pro concorrente. Simples assim.
          A Zavo cria o site que coloca seu negócio na frente de quem já quer comprar de você.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: '#F5B800', color: '#0D0D0D', fontWeight: 800, fontSize: 18,
          padding: '20px 40px', borderRadius: 12, textDecoration: 'none', minHeight: 64
        }}>
          Quero meu site agora
        </a>
        <span style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 12 }}>
          Você decide quanto pagar. Sem surpresa, sem enrolação.
        </span>
      </div>
    </section>
  )
}
