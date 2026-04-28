import { WHATSAPP_URL } from '@/lib/constants'

export function CTAFinal() {
  return (
    <section style={{ background: '#0D0D0D', padding: '100px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: 'radial-gradient(circle, rgba(245,184,0,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 620, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: 'rgba(245,184,0,0.7)', marginBottom: 16 }}>Próximo passo</div>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: '#fff', letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 20 }}>
          Todo dia que passa sem site<br />é um cliente a menos.
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 40 }}>
          Não precisa de muito dinheiro. Não precisa de tempo. Não precisa de conhecimento técnico.
          Precisa só de 15 minutos pra conversar com a gente.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: '#F5B800', color: '#0D0D0D', fontWeight: 800, fontSize: 18,
          padding: '20px 40px', borderRadius: 12, textDecoration: 'none', minHeight: 64
        }}>
          Quero meu site agora →
        </a>
        <span style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 12 }}>
          Você decide quanto vale. Garantia de satisfação ou não paga.
        </span>
      </div>
    </section>
  )
}
