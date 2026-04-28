'use client'
import { WHATSAPP_URL, WHATSAPP_URL_DIAGNOSTICO } from '@/lib/constants'

const Logo = () => (
  <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
    <svg width="36" height="36" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hbg" cx="50%" cy="40%" r="70%"><stop offset="0%" stopColor="#1A1A2E"/><stop offset="100%" stopColor="#070710"/></radialGradient>
        <radialGradient id="hg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#1A5ACA" stopOpacity="0.55"/><stop offset="100%" stopColor="#000010" stopOpacity="0"/></radialGradient>
        <filter id="hs"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#000" floodOpacity="0.8"/></filter>
      </defs>
      <rect width="100" height="100" rx="18" fill="url(#hbg)"/>
      <circle cx="50" cy="50" r="43" fill="url(#hg)"/>
      {([[50,12],[88,50],[50,88],[12,50]] as [number,number][]).map(([x,y],i) => <circle key={i} cx={x} cy={y} r="1.8" fill="white" opacity="0.9"/>)}
      <line x1="50" y1="12" x2="88" y2="50" stroke="white" strokeWidth="0.5" opacity="0.25"/>
      <line x1="88" y1="50" x2="50" y2="88" stroke="white" strokeWidth="0.5" opacity="0.25"/>
      <line x1="50" y1="88" x2="12" y2="50" stroke="white" strokeWidth="0.5" opacity="0.25"/>
      <line x1="12" y1="50" x2="50" y2="12" stroke="white" strokeWidth="0.5" opacity="0.25"/>
      <path d="M 18,18 H 82 V 31 L 36,69 H 82 V 82 H 18 V 69 L 64,31 H 18 Z" fill="#F5B800" filter="url(#hs)"/>
    </svg>
    <span style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: 2 }}>
      <span style={{ color: '#F5B800' }}>Z</span>AVO
    </span>
  </a>
)

interface HeaderProps {
  variant?: 'landing' | 'institutional'
}

export function Header({ variant = 'institutional' }: HeaderProps) {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(13,13,13,0.96)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto', padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Logo />

        {variant === 'institutional' && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="/sites" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
              Sites
            </a>
            <a href="#ia" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
              IA
            </a>
            <a href="#automacoes" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
              Automações
            </a>
            <a href={WHATSAPP_URL_DIAGNOSTICO} target="_blank" rel="noopener" style={{
              background: '#F5B800', color: '#0D0D0D', fontWeight: 700, fontSize: 14,
              padding: '10px 20px', borderRadius: 8, textDecoration: 'none',
            }}>
              Diagnóstico gratuito →
            </a>
          </nav>
        )}

        {variant === 'landing' && (
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" style={{
            background: '#F5B800', color: '#0D0D0D', fontWeight: 700, fontSize: 14,
            padding: '10px 20px', borderRadius: 8, textDecoration: 'none',
          }}>
            Quero meu site →
          </a>
        )}
      </div>
    </header>
  )
}
