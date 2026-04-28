const items = [
  { titulo: 'Aparece no Google', desc: 'SEO básico configurado desde o início — você começa do jeito certo.' },
  { titulo: 'Design que transmite confiança', desc: 'Profissional desde o primeiro segundo. Não parece "amador".' },
  { titulo: 'Texto estratégico', desc: 'Não é panfleto — é argumento de venda. Copy que converte visitante em contato.' },
  { titulo: 'Mobile perfeito', desc: '80% dos seus clientes vêm pelo celular. Seu site funciona em qualquer tela.' },
  { titulo: 'WhatsApp integrado', desc: 'Botão direto pra você fechar negócio em tempo real.' },
  { titulo: 'Entrega em até 7 dias úteis', desc: 'Sem esperar meses. Seu site no ar enquanto o concorrente ainda está pensando.' },
]

export function Benefits() {
  return (
    <section style={{ background: '#fff', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#F5B800', marginBottom: 16 }}>O que você recebe</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 48 }}>
          Tudo que seu negócio precisa<br />para vender online
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {items.map(item => (
            <div key={item.titulo} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: '#F5F5F5', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ width: 28, height: 28, background: '#F5B800', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l4 4 6-7" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <strong style={{ fontSize: 15, fontWeight: 700, display: 'block', marginBottom: 3, letterSpacing: -0.2 }}>{item.titulo}</strong>
                <span style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
