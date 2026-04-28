'use client'
import { WHATSAPP_URL_DIAGNOSTICO } from '@/lib/constants'

export function HeroInst() {
  return (
    <section style={{
      background: '#0D0D0D',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '140px 24px 100px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grade decorativa de fundo */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(245,184,0,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,184,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
      }} />

      {/* Glow central âmbar */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 300,
        background: 'radial-gradient(ellipse, rgba(245,184,0,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <span style={{
          display: 'inline-block',
          fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const,
          color: '#F5B800', opacity: 0.85, marginBottom: 28,
        }}>
          Zavo · Tecnologia que gera lucro
        </span>

        <h1 style={{
          fontSize: 'clamp(34px, 5.5vw, 64px)',
          fontWeight: 900, color: '#fff',
          letterSpacing: -2, lineHeight: 1.05, marginBottom: 28,
        }}>
          Seu negócio está perdendo<br />
          dinheiro em dois lugares<br />
          <span style={{ color: '#F5B800' }}>ao mesmo tempo.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(17px, 2.2vw, 21px)',
          color: 'rgba(255,255,255,0.6)',
          maxWidth: 600, margin: '0 auto 48px',
          lineHeight: 1.7,
        }}>
          Faltam clientes chegando. E sobra trabalho manual que devora tempo e dinheiro.
          A Zavo resolve os dois — com sites, IA e automações que aumentam seu lucro.
        </p>

        <div>
          <a
            href={WHATSAPP_URL_DIAGNOSTICO}
            target="_blank"
            rel="noopener"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: '#F5B800', color: '#0D0D0D',
              fontWeight: 800, fontSize: 18,
              padding: '20px 44px', borderRadius: 12,
              textDecoration: 'none', minHeight: 64,
              boxShadow: '0 0 40px rgba(245,184,0,0.3)',
            }}
          >
            Quero meu diagnóstico gratuito
          </a>
          <span style={{
            display: 'block', fontSize: 13,
            color: 'rgba(255,255,255,0.35)', marginTop: 14,
          }}>
            15 minutos no WhatsApp. Sem compromisso. Sem enrolação.
          </span>
        </div>

        {/* Indicador de scroll */}
        <div style={{
          position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6,
          opacity: 0.35,
        }}>
          <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' as const, color: '#fff' }}>scroll</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }} />
        </div>
      </div>
    </section>
  )
}
