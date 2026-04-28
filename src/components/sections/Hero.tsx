'use client'
import { useEffect, useRef } from 'react'
import { SplineBackground } from '@/components/ui/SplineBackground'
import { WHATSAPP_URL } from '@/lib/constants'

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset
        const maxScroll = 400
        const opacity = 1 - Math.min(scrollY / maxScroll, 1)
        if (contentRef.current) {
          contentRef.current.style.opacity = opacity.toString()
          contentRef.current.style.transform = `translateY(${scrollY * 0.2}px)`
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      background: '#0D0D0D',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Fundo 3D Spline */}
      <SplineBackground />

      {/* Conteúdo do hero */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          padding: '140px 24px 100px',
          pointerEvents: 'none',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span style={{
            display: 'inline-block',
            fontSize: 11, fontWeight: 700,
            letterSpacing: 4, textTransform: 'uppercase' as const,
            color: '#F5B800', opacity: 0.85, marginBottom: 24,
          }}>
            Zavo · Sites que vendem
          </span>

          <h1 style={{
            fontSize: 'clamp(34px, 6vw, 62px)',
            fontWeight: 900, color: '#fff',
            letterSpacing: -2, lineHeight: 1.05, marginBottom: 24,
          }}>
            Seu negócio perde cliente todo dia —<br />
            <span style={{ color: '#F5B800' }}>e o concorrente que tem site agradece.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: 560, margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            O cliente te pesquisou, não te achou, foi pro concorrente. Simples assim.
            A Zavo cria o site que coloca seu negócio na frente de quem já quer comprar de você. Entrega em até 7 dias.
          </p>

          <div style={{ pointerEvents: 'auto' }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: '#F5B800', color: '#0D0D0D',
                fontWeight: 800, fontSize: 18,
                padding: '20px 40px', borderRadius: 12,
                textDecoration: 'none', minHeight: 64,
                boxShadow: '0 0 32px rgba(245,184,0,0.25)',
              }}
            >
              Quero meu site →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
