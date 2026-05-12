'use client'

import { useEffect } from 'react'

export default function Modelo2Nutricionista() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.rev').forEach((el) => observer.observe(el))

    // Counter
    const counters = document.querySelectorAll('.cnt')
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-n') || '0')
      const suffix = el.getAttribute('data-s') || ''
      let n = 0
      const step = target / 50
      const t = setInterval(() => {
        n = Math.min(n + step, target)
        el.textContent = Math.floor(n) + suffix
        if (n >= target) clearInterval(t)
      }, 35)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', 'Helvetica Neue', sans-serif; background: #0a0f0a; color: #f0f0f0; }

        @keyframes glowPulse {
          0%,100% { text-shadow: 0 0 20px rgba(132,204,22,0.3); }
          50% { text-shadow: 0 0 40px rgba(132,204,22,0.7), 0 0 80px rgba(132,204,22,0.3); }
        }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(50px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes dotFloat {
          0%,100% { transform:translateY(0) scale(1); opacity:0.3; }
          50% { transform:translateY(-20px) scale(1.1); opacity:0.6; }
        }
        @keyframes borderAnim {
          0% { border-color: rgba(132,204,22,0.3); }
          50% { border-color: rgba(132,204,22,0.8); }
          100% { border-color: rgba(132,204,22,0.3); }
        }
        @keyframes wapp {
          0%,100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          50% { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
        }

        .rev {
          opacity:0; transform:translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .rev.visible { opacity:1; transform:translateY(0); }
        .rev-l { opacity:0; transform:translateX(-50px); transition: opacity 0.7s, transform 0.7s; }
        .rev-l.visible { opacity:1; transform:translateX(0); }
        .rev-r { opacity:0; transform:translateX(50px); transition: opacity 0.7s, transform 0.7s; }
        .rev-r.visible { opacity:1; transform:translateX(0); }

        .dot {
          position:absolute; border-radius:50%;
          animation: dotFloat 4s ease-in-out infinite;
        }

        .pill {
          display:inline-block;
          background: rgba(132,204,22,0.1);
          border: 1px solid rgba(132,204,22,0.3);
          color: #84cc16;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 32px;
          transition: all 0.3s ease;
        }
        .card:hover {
          background: rgba(132,204,22,0.06);
          border-color: rgba(132,204,22,0.4);
          transform: translateY(-6px);
        }

        .btn-primary {
          display:inline-flex; align-items:center; gap:10px;
          background: #84cc16; color: #0a0f0a;
          padding: 16px 36px; border-radius: 8px;
          font-weight: 800; font-size: 15px;
          text-decoration:none;
          transition: all 0.3s;
          letter-spacing: 0.3px;
        }
        .btn-primary:hover { background: #a3e635; transform: translateY(-3px); box-shadow: 0 16px 32px rgba(132,204,22,0.3); }

        .btn-outline {
          display:inline-flex; align-items:center; gap:10px;
          background: transparent; color: #84cc16;
          padding: 15px 35px; border-radius: 8px;
          font-weight: 700; font-size: 15px;
          text-decoration:none;
          border: 2px solid #84cc16;
          transition: all 0.3s;
        }
        .btn-outline:hover { background: rgba(132,204,22,0.1); transform: translateY(-3px); }

        .wapp-float {
          position:fixed; bottom:28px; right:28px;
          width:60px; height:60px;
          background:#25d366; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-size:28px; z-index:9999;
          text-decoration:none;
          animation: wapp 2.5s infinite;
          transition: transform 0.2s;
        }
        .wapp-float:hover { transform:scale(1.12); }

        nav {
          position:fixed; top:0; width:100%; z-index:100;
          background: rgba(10,15,10,0.9); backdrop-filter:blur(12px);
          border-bottom: 1px solid rgba(132,204,22,0.15);
          padding: 18px 48px;
          display:flex; justify-content:space-between; align-items:center;
          animation: slideUp 0.6s ease both;
        }

        @media(max-width:768px) {
          nav { padding:14px 20px; }
          .hero-h { font-size:2.4rem !important; }
          .g3 { grid-template-columns:1fr !important; }
          .g2 { grid-template-columns:1fr !important; }
          .g4 { grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>

      {/* Nav */}
      <nav>
        <span style={{ fontWeight: 900, fontSize: '1.1rem', color: '#84cc16', letterSpacing: '1px' }}>
          NUTRI<span style={{ color: 'white' }}>VITÓRIA</span>
        </span>
        <a href="https://wa.me/5511999999999" target="_blank" className="btn-primary" style={{ padding: '10px 24px', fontSize: '13px' }}>
          Começar agora
        </a>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0f0a 0%, #0f1f0a 50%, #0a1a0f 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 60px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Animated dots */}
        {[
          { w:300, h:300, top:'10%', left:'5%', bg:'rgba(132,204,22,0.06)', delay:'0s' },
          { w:200, h:200, top:'60%', right:'8%', bg:'rgba(132,204,22,0.08)', delay:'1s' },
          { w:150, h:150, top:'40%', left:'20%', bg:'rgba(132,204,22,0.04)', delay:'2s' },
          { w:400, h:400, bottom:'-100px', right:'-100px', bg:'rgba(132,204,22,0.03)', delay:'0.5s' },
        ].map((d, i) => (
          <div key={i} className="dot" style={{
            width:d.w, height:d.h,
            top:(d as Record<string,unknown>).top as string,
            left:(d as Record<string,unknown>).left as string,
            right:(d as Record<string,unknown>).right as string,
            bottom:(d as Record<string,unknown>).bottom as string,
            background:d.bg,
            animationDelay:d.delay,
          }} />
        ))}

        <div style={{ textAlign:'center', maxWidth:'820px', position:'relative', zIndex:1 }}>
          <div className="pill" style={{ animation:'slideUp 0.6s ease 0.2s both' }}>
            🏆 + de 600 vidas transformadas
          </div>
          <h1 className="hero-h" style={{
            fontSize: '3.8rem',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '24px',
            color: 'white',
            animation: 'slideUp 0.6s ease 0.35s both',
          }}>
            Chega de dieta.<br />
            <span style={{ color:'#84cc16', animation:'glowPulse 3s ease infinite' }}>
              Começa a transformação.
            </span>
          </h1>
          <p style={{
            fontSize: '18px', color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.8, marginBottom: '48px',
            animation: 'slideUp 0.6s ease 0.5s both',
          }}>
            Protocolo nutricional individualizado para emagrecer de verdade,<br />
            ganhar energia e manter os resultados para sempre.
          </p>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap', animation:'slideUp 0.6s ease 0.65s both' }}>
            <a href="https://wa.me/5511999999999?text=Quero%20começar%20minha%20transformação" target="_blank" className="btn-primary">
              💬 Quero começar agora
            </a>
            <a href="#sobre" className="btn-outline">Ver meu método →</a>
          </div>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.35)', marginTop:'24px', animation:'slideUp 0.6s ease 0.8s both' }}>
            Consulta online ou presencial · Resultados em 30 dias ou seu dinheiro de volta
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background:'rgba(132,204,22,0.08)', borderTop:'1px solid rgba(132,204,22,0.15)', borderBottom:'1px solid rgba(132,204,22,0.15)', padding:'48px 24px' }}>
        <div className="g4 rev" style={{ maxWidth:'900px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'24px', textAlign:'center' }}>
          {[
            { n:600, s:'+', label:'Vidas transformadas' },
            { n:12, s: ' kg', label:'Perda média em 90 dias' },
            { n:98, s:'%', label:'Taxa de satisfação' },
            { n:5, s: ' anos', label:'De experiência' },
          ].map((st, i) => (
            <div key={i}>
              <p style={{ fontSize:'2.8rem', fontWeight:900, color:'#84cc16' }}>
                <span className="cnt" data-n={st.n} data-s={st.s}>0{st.s}</span>
              </p>
              <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.5)', marginTop:'6px' }}>{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Serviços */}
      <section style={{ padding:'96px 24px', background:'#0a0f0a' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div className="rev" style={{ textAlign:'center', marginBottom:'64px' }}>
            <span className="pill">Programas</span>
            <h2 style={{ fontSize:'2.4rem', fontWeight:900, color:'white' }}>
              Escolha seu <span style={{ color:'#84cc16' }}>programa</span>
            </h2>
          </div>
          <div className="g3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
            {[
              { icon:'🔥', tag:'MAIS POPULAR', title:'Programa Emagrecimento', items:['Plano alimentar completo','Acompanhamento semanal','Suporte via WhatsApp','Receitas personalizadas'], price:'R$ 397/mês' },
              { icon:'⚡', tag:'PREMIUM', title:'Transformação Total', items:['Tudo do básico +','Bioimpedância mensal','Análise de exames','Cardápio detalhado','Suporte ilimitado'], price:'R$ 697/mês' },
              { icon:'🎯', tag:'PONTUAL', title:'Consulta Avulsa', items:['Avaliação nutricional','Plano para 30 dias','1 retorno incluído','Orientações gerais'], price:'R$ 280/consulta' },
            ].map((p, i) => (
              <div key={i} className="card rev" style={{
                transitionDelay:`${i*0.15}s`,
                background: i===1 ? 'rgba(132,204,22,0.08)' : 'rgba(255,255,255,0.04)',
                border: i===1 ? '2px solid rgba(132,204,22,0.5)' : '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'20px' }}>
                  <span style={{ fontSize:'2rem' }}>{p.icon}</span>
                  <span style={{ fontSize:'10px', fontWeight:800, color: i===1 ? '#84cc16' : 'rgba(255,255,255,0.4)', letterSpacing:'2px', border:`1px solid ${i===1?'#84cc16':'rgba(255,255,255,0.2)'}`, padding:'4px 10px', borderRadius:'100px' }}>
                    {p.tag}
                  </span>
                </div>
                <h3 style={{ fontSize:'1.2rem', fontWeight:800, color:'white', marginBottom:'20px' }}>{p.title}</h3>
                <ul style={{ listStyle:'none', marginBottom:'28px' }}>
                  {p.items.map((item, j) => (
                    <li key={j} style={{ fontSize:'14px', color:'rgba(255,255,255,0.65)', padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:'8px', alignItems:'center' }}>
                      <span style={{ color:'#84cc16', fontSize:'12px' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize:'1.4rem', fontWeight:900, color: i===1 ? '#84cc16' : 'white' }}>{p.price}</p>
              </div>
            ))}
          </div>
          <div className="rev" style={{ textAlign:'center', marginTop:'48px' }}>
            <a href="https://wa.me/5511999999999" target="_blank" className="btn-primary">
              Quero meu plano personalizado
            </a>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section style={{ padding:'96px 24px', background:'#0d150d' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div className="rev" style={{ textAlign:'center', marginBottom:'64px' }}>
            <span className="pill">Resultados</span>
            <h2 style={{ fontSize:'2.4rem', fontWeight:900, color:'white' }}>
              Quem já <span style={{ color:'#84cc16' }}>transformou</span>
            </h2>
          </div>
          <div className="g3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
            {[
              { name:'Marina, 34', result:'-18kg em 4 meses', text:'"Tentei várias dietas e nunca funcionou. Com a Vitória aprendi a comer de verdade. Perdi 18kg e não voltei um grama."' },
              { name:'Bruno, 41', result:'Energia e performance', text:'"Meu treino melhorou 30%. A nutrição esportiva fez toda diferença — mais força, mais foco, recuperação mais rápida."' },
              { name:'Letícia, 28', result:'Saúde hormonal', text:'"Tinha SOP e gastrite. Em 3 meses controlei os dois com alimentação. Nunca imaginei que comida pudesse fazer tanto."' },
            ].map((t, i) => (
              <div key={i} className="card rev" style={{ transitionDelay:`${i*0.15}s` }}>
                <div style={{ background:'#84cc16', color:'#0a0f0a', padding:'4px 12px', borderRadius:'100px', fontSize:'12px', fontWeight:800, display:'inline-block', marginBottom:'16px' }}>
                  {t.result}
                </div>
                <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.75)', lineHeight:1.8, marginBottom:'20px', fontStyle:'italic' }}>{t.text}</p>
                <p style={{ fontSize:'13px', fontWeight:700, color:'rgba(255,255,255,0.4)' }}>— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" style={{ padding:'96px 24px', background:'#0a0f0a' }}>
        <div className="g2" style={{ maxWidth:'1000px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>
          <div className="rev-l">
            <div style={{ background:'rgba(132,204,22,0.08)', border:'2px solid rgba(132,204,22,0.3)', borderRadius:'12px', padding:'48px', textAlign:'center', animation:'borderAnim 3s ease infinite' }}>
              <div style={{ fontSize:'6rem', marginBottom:'16px' }}>👩‍💻</div>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px' }}>Foto da nutricionista</p>
              <div style={{ marginTop:'24px', display:'flex', flexDirection:'column', gap:'8px' }}>
                {['CRN 3-98765','Formada UNIFESP','Especialista em Emagrecimento'].map((c,i) => (
                  <span key={i} style={{ background:'rgba(132,204,22,0.1)', border:'1px solid rgba(132,204,22,0.3)', color:'#84cc16', padding:'6px 16px', borderRadius:'100px', fontSize:'12px', fontWeight:700 }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="rev-r">
            <span className="pill">Sobre mim</span>
            <h2 style={{ fontSize:'2.4rem', fontWeight:900, color:'white', marginBottom:'20px' }}>
              Vitória Santos,<br />sua nutricionista.
            </h2>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.6)', lineHeight:1.9, marginBottom:'16px' }}>
              Nutricionista formada pela UNIFESP com especialização em Emagrecimento e Recomposição Corporal. Cinco anos ajudando mais de 600 pessoas a alcançarem resultados que achavam impossíveis.
            </p>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.6)', lineHeight:1.9, marginBottom:'32px' }}>
              Meu método combina ciência, personalização e consistência. Sem restrições absurdas. Sem efeito sanfona. Só resultados que duram.
            </p>
            <a href="https://wa.me/5511999999999" target="_blank" className="btn-primary">
              Falar com a Vitória
            </a>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ padding:'96px 24px', background:'linear-gradient(135deg, #1a3a05, #84cc16 300%)' }}>
        <div className="rev" style={{ maxWidth:'700px', margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontSize:'2.6rem', fontWeight:900, color:'#0a0f0a', marginBottom:'16px', lineHeight:1.2 }}>
            Sua transformação começa hoje.
          </h2>
          <p style={{ fontSize:'16px', color:'rgba(10,15,10,0.7)', lineHeight:1.8, marginBottom:'40px' }}>
            📍 Atendimento online para todo o Brasil<br />
            🕐 Seg–Sex 8h–20h · Sáb 8h–14h<br />
            📞 (11) 99999-9999
          </p>
          <a href="https://wa.me/5511999999999?text=Quero%20começar%20minha%20transformação" target="_blank"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'#0a0f0a', color:'#84cc16', padding:'18px 40px', borderRadius:'8px', fontWeight:900, fontSize:'16px', textDecoration:'none', transition:'all 0.3s' }}>
            💬 Começar minha transformação
          </a>
        </div>
      </section>

      <a href="https://wa.me/5511999999999" target="_blank" className="wapp-float">💬</a>
    </>
  )
}
