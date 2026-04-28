export function Solution() {
  return (
    <section style={{ background: '#0D0D0D', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#F5B800', opacity: 0.8, marginBottom: 16 }}>A solução</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 24 }}>
            A Zavo não cria site por criar.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 20 }}>
            A gente cria site <strong style={{ color: 'rgba(255,255,255,0.9)' }}>pra vender.</strong> Um site que explica o que você faz em 5 segundos.
            Que passa credibilidade. Que convence o visitante a entrar em contato.
            Que funciona como vendedor 24 horas por dia — enquanto você dorme.
          </p>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>
            E o melhor: você não precisa de orçamento corporativo pra ter isso.
          </p>
        </div>
        <div style={{ background: 'rgba(245,184,0,0.08)', border: '1px solid rgba(245,184,0,0.2)', borderRadius: 14, padding: '28px 32px' }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#F5B800', lineHeight: 1.4, letterSpacing: -0.3 }}>
            &ldquo;Fundindo seu negócio ao mundo digital — com a mesma tecnologia que usamos para gerir o nosso.&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
