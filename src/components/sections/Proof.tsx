const depoimentos = [
  { inicial: 'M', nome: 'Marcos Oliveira', segmento: 'Eletricista · São Paulo', texto: 'Antes eu perdia cliente porque não tinha como "mostrar" meu trabalho. Agora mando o link e fecha na hora.' },
  { inicial: 'A', nome: 'Ana Paula Costa', segmento: 'Nutricionista · Curitiba', texto: 'Pensei que ia custar uma fortuna. Me surpreendi com a qualidade pelo que paguei. Valeu demais.' },
  { inicial: 'R', nome: 'Rafael Mendes', segmento: 'Personal Trainer · Rio de Janeiro', texto: 'Em 3 dias depois do site no ar, já recebi 2 orçamentos novos pelo formulário. Resultado imediato.' },
]

const segmentos = ['Nutricionista','Eletricista','Personal Trainer','Cabeleireiro','Arquiteto','Psicólogo','Mecânico','Fotógrafo','Advogado','Dentista','Coach','e muito mais']

export function Proof() {
  return (
    <section style={{ background: '#F5F5F5', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#F5B800', marginBottom: 16 }}>Resultados reais</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1 }}>O que dizem quem já fez</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 48 }}>
          {depoimentos.map(d => (
            <div key={d.nome} style={{ background: '#fff', borderRadius: 14, padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ color: '#F5B800', fontSize: 18, letterSpacing: 2 }}>★★★★★</div>
              <blockquote style={{ fontSize: 15, color: '#0D0D0D', lineHeight: 1.65, flex: 1 }}>&ldquo;{d.texto}&rdquo;</blockquote>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid #E5E5E5', paddingTop: 16 }}>
                <div style={{ width: 40, height: 40, background: '#0D0D0D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: '#F5B800', flexShrink: 0 }}>{d.inicial}</div>
                <div>
                  <strong style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>{d.nome}</strong>
                  <span style={{ fontSize: 12, color: '#555' }}>{d.segmento}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase' as const, color: '#555', marginBottom: 20 }}>Segmentos atendidos</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {segmentos.map(s => (
              <span key={s} style={{ fontSize: 13, fontWeight: 500, padding: '7px 14px', background: '#fff', border: '1px solid #E5E5E5', borderRadius: 100, color: '#555' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
