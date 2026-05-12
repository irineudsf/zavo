'use client'

import { useEffect } from 'react'

export default function Modelo3Nutricionista() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.fade, .fade-l, .fade-r').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { font-family: 'Trebuchet MS', 'Helvetica Neue', sans-serif; background: #fdf8f4; color: #3d2c1e; }

        @keyframes waveAnim {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes breathe {
          0%,100% { transform: scale(1); opacity:0.6; }
          50% { transform: scale(1.08); opacity:1; }
        }
        @keyframes rise {
          from { opacity:0; transform:translateY(50px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes wappPulse {
          0%,100% { box-shadow:0 0 0 0 rgba(37,211,102,0.5); }
          50% { box-shadow:0 0 0 14px rgba(37,211,102,0); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        @keyframes kenBurns {
          0%, 100% { transform: scale(1) translate(0, 0); }
          40% { transform: scale(1.07) translate(-12px, -6px); }
          80% { transform: scale(1.04) translate(8px, -4px); }
        }

        .fade {
          opacity:0; transform:translateY(35px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .fade.in { opacity:1; transform:translateY(0); }
        .fade-l { opacity:0; transform:translateX(-45px); transition: opacity 0.9s, transform 0.9s; }
        .fade-l.in { opacity:1; transform:translateX(0); }
        .fade-r { opacity:0; transform:translateX(45px); transition: opacity 0.9s, transform 0.9s; }
        .fade-r.in { opacity:1; transform:translateX(0); }

        .scard {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(180,100,60,0.08);
          border: 1.5px solid rgba(224,112,80,0.15);
          transition: all 0.4s ease;
        }
        .scard:hover {
          transform: translateY(-8px) rotate(-0.5deg);
          box-shadow: 0 20px 48px rgba(180,100,60,0.18);
          border-color: rgba(224,112,80,0.4);
        }

        .tcard {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(180,100,60,0.06);
          position: relative;
          transition: transform 0.3s;
        }
        .tcard::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 24px;
          font-size: 5rem;
          color: rgba(224,112,80,0.15);
          font-family: Georgia, serif;
          line-height: 1;
        }
        .tcard:hover { transform: translateY(-6px); }

        .btn-warm {
          display:inline-flex; align-items:center; gap:10px;
          background: #e07050; color: white;
          padding: 16px 36px; border-radius: 50px;
          font-weight: 700; font-size: 16px;
          text-decoration:none;
          transition: all 0.3s;
          letter-spacing: 0.3px;
        }
        .btn-warm:hover { background: #d05a38; transform:translateY(-3px); box-shadow:0 16px 32px rgba(224,112,80,0.35); }

        .chip {
          display:inline-block;
          background: rgba(224,112,80,0.1);
          color: #c05a38;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .wapp {
          position:fixed; bottom:28px; right:28px;
          width:60px; height:60px;
          background:#25d366; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-size:28px; z-index:9999; text-decoration:none;
          animation: wappPulse 2.5s infinite;
          transition:transform 0.2s;
        }
        .wapp:hover { transform:scale(1.1); }

        nav {
          position:fixed; top:0; width:100%; z-index:100;
          background:rgba(253,248,244,0.95); backdrop-filter:blur(10px);
          border-bottom:2px solid rgba(224,112,80,0.12);
          padding:16px 48px;
          display:flex; justify-content:space-between; align-items:center;
          animation: rise 0.7s ease both;
        }

        @media(max-width:768px){
          nav { padding:14px 20px; }
          .hero-h { font-size:2.4rem !important; }
          .g3 { grid-template-columns:1fr !important; }
          .g2 { grid-template-columns:1fr !important; }
          .g4 { grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>

      {/* Nav */}
      <nav>
        <div>
          <span style={{ fontWeight:800, fontSize:'1.2rem', color:'#e07050' }}>Nutri</span>
          <span style={{ fontWeight:400, fontSize:'1.2rem', color:'#3d2c1e' }}>Camila</span>
          <span style={{ fontFamily:'Georgia', fontSize:'0.7rem', color:'#a08070', display:'block', letterSpacing:'2px', marginTop:'-4px' }}>BEM-ESTAR INTEGRAL</span>
        </div>
        <a href="https://wa.me/5511999999999?text=Oi%20Camila,%20quero%20marcar%20uma%20conversa" target="_blank" className="btn-warm" style={{ padding:'10px 24px', fontSize:'13px' }}>
          Marcar conversa 🌿
        </a>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight:'100vh',
        backgroundImage:'linear-gradient(160deg, rgba(253,248,244,0.80) 0%, rgba(250,238,230,0.76) 40%, rgba(245,221,208,0.73) 100%), url(https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1600&q=80)',
        backgroundSize:'cover',
        backgroundPosition:'center top',
        backgroundAttachment:'fixed',
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'100px 24px 80px',
        position:'relative', overflow:'hidden',
      }}>
        {/* Organic blobs */}
        {[
          { size:400, top:'-10%', right:'-8%', color:'rgba(224,112,80,0.08)', delay:'0s' },
          { size:250, bottom:'5%', left:'-5%', color:'rgba(144,200,120,0.1)', delay:'2s' },
          { size:180, top:'30%', left:'8%', color:'rgba(224,112,80,0.06)', delay:'1s' },
        ].map((b, i) => (
          <div key={i} style={{
            position:'absolute',
            width:b.size, height:b.size,
            borderRadius:'50%',
            background:b.color,
            top:(b as Record<string,unknown>).top as string,
            bottom:(b as Record<string,unknown>).bottom as string,
            left:(b as Record<string,unknown>).left as string,
            right:(b as Record<string,unknown>).right as string,
            animation:`breathe 6s ease-in-out ${b.delay} infinite`,
          }} />
        ))}

        {/* Orbiting leaf */}
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'1px', height:'1px' }}>
          <span style={{ position:'absolute', animation:'orbit 12s linear infinite', fontSize:'1.5rem', opacity:0.2 }}>🌿</span>
          <span style={{ position:'absolute', animation:'orbit 18s linear infinite reverse', fontSize:'1rem', opacity:0.15, animationDelay:'3s' }}>🌱</span>
        </div>

        <div style={{ textAlign:'center', maxWidth:'760px', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', gap:'12px', marginBottom:'28px', flexWrap:'wrap', justifyContent:'center', animation:'rise 0.8s ease 0.2s both' }}>
            {['🌿 Nutrição Integrativa', '💚 Sem dietas restritivas', '🧘 Bem-estar de verdade'].map((t,i) => (
              <span key={i} style={{ background:'white', border:'1.5px solid rgba(224,112,80,0.25)', color:'#c05a38', padding:'6px 16px', borderRadius:'100px', fontSize:'12px', fontWeight:'700', boxShadow:'0 4px 12px rgba(224,112,80,0.1)' }}>{t}</span>
            ))}
          </div>
          <h1 className="hero-h" style={{
            fontSize:'3.6rem',
            fontWeight:400,
            lineHeight:1.2,
            color:'#3d2c1e',
            marginBottom:'24px',
            animation:'rise 0.8s ease 0.35s both',
            fontFamily:'Georgia, serif',
          }}>
            Cuide do seu corpo<br />
            <strong style={{ fontWeight:800, color:'#e07050' }}>com carinho</strong>, não com punição.
          </h1>
          <p style={{
            fontSize:'18px', color:'#7a5a48', lineHeight:1.9,
            marginBottom:'48px', animation:'rise 0.8s ease 0.5s both',
          }}>
            Nutrição funcional e integrativa para quem quer saúde de verdade —<br />
            sem sofrimento, sem culpa, sem efeito sanfona.
          </p>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap', animation:'rise 0.8s ease 0.65s both' }}>
            <a href="https://wa.me/5511999999999?text=Oi%20Camila,%20quero%20marcar%20minha%20consulta" target="_blank" className="btn-warm">
              🌿 Quero minha consulta
            </a>
          </div>
          <p style={{ fontSize:'13px', color:'#a08070', marginTop:'20px', animation:'rise 0.8s ease 0.8s both' }}>
            Atendimento online e presencial · Consultório em Jardins, SP
          </p>
        </div>
      </section>

      {/* Pilares */}
      <section style={{ padding:'80px 24px', background:'white' }}>
        <div className="g4 fade" style={{ maxWidth:'900px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'24px', textAlign:'center' }}>
          {[
            { icon:'🧬', title:'Individualizado', sub:'Cada plano é único para você' },
            { icon:'🌱', title:'Integrativo', sub:'Corpo, mente e hábitos' },
            { icon:'💛', title:'Sem sofrimento', sub:'Comida boa que você ama' },
            { icon:'♻️', title:'Sustentável', sub:'Resultados que ficam' },
          ].map((p, i) => (
            <div key={i} style={{ transitionDelay:`${i*0.12}s` }}>
              <div style={{ fontSize:'2.8rem', marginBottom:'12px' }}>{p.icon}</div>
              <p style={{ fontWeight:800, color:'#3d2c1e', marginBottom:'6px' }}>{p.title}</p>
              <p style={{ fontSize:'13px', color:'#9a7a6a' }}>{p.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Serviços */}
      <section style={{ padding:'96px 24px', background:'#fdf8f4' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div className="fade" style={{ textAlign:'center', marginBottom:'64px' }}>
            <span className="chip">Atendimentos</span>
            <h2 style={{ fontSize:'2.4rem', fontWeight:400, color:'#3d2c1e', fontFamily:'Georgia, serif' }}>
              Como posso caminhar<br />
              <strong style={{ fontWeight:800, color:'#e07050' }}>com você</strong>
            </h2>
          </div>
          <div className="g3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' }}>
            {[
              { icon:'🌸', title:'Emagrecimento Gentil', desc:'Reeducação alimentar sem dietas agressivas. Aprenda a se alimentar bem sem culpa e sem restrições desnecessárias.', preco:'A partir de R$ 300' },
              { icon:'🤰', title:'Gestação & Maternidade', desc:'Nutrição especializada para gravidez, amamentação e introdução alimentar com segurança e acolhimento.', preco:'A partir de R$ 320' },
              { icon:'🌙', title:'Saúde Hormonal', desc:'Alimentação voltada para equilíbrio hormonal: TPM, menopausa, SOP e tireoide com abordagem integrativa.', preco:'A partir de R$ 300' },
              { icon:'🫁', title:'Doenças Inflamatórias', desc:'Plano alimentar anti-inflamatório para doenças autoimunes, gastrite, intestino irritável e alergias alimentares.', preco:'A partir de R$ 300' },
              { icon:'🧒', title:'Nutrição Infantil', desc:'Introdução alimentar, formação de hábitos e tratamento de recusa alimentar com abordagem leve e natural.', preco:'A partir de R$ 280' },
              { icon:'🧘', title:'Nutrição Mindful', desc:'Integra mindfulness à alimentação para quem luta com compulsão, ansiedade alimentar e relação difícil com comida.', preco:'A partir de R$ 320' },
            ].map((s, i) => (
              <div key={i} className="scard fade" style={{ transitionDelay:`${i*0.1}s` }}>
                <div style={{ fontSize:'2.2rem', marginBottom:'16px' }}>{s.icon}</div>
                <h3 style={{ fontWeight:800, color:'#3d2c1e', marginBottom:'12px' }}>{s.title}</h3>
                <p style={{ fontSize:'14px', color:'#7a5a48', lineHeight:1.8, marginBottom:'16px' }}>{s.desc}</p>
                <p style={{ fontSize:'13px', fontWeight:800, color:'#e07050' }}>{s.preco}</p>
              </div>
            ))}
          </div>
          <div className="fade" style={{ textAlign:'center', marginTop:'48px' }}>
            <a href="https://wa.me/5511999999999" target="_blank" className="btn-warm">
              Conversar com a Camila 🌿
            </a>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section style={{ padding:'96px 24px', background:'linear-gradient(135deg, #faeee6, #fdf8f4)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div className="fade" style={{ textAlign:'center', marginBottom:'64px' }}>
            <span className="chip">Histórias reais</span>
            <h2 style={{ fontSize:'2.4rem', fontWeight:400, color:'#3d2c1e', fontFamily:'Georgia, serif' }}>
              Palavras de quem<br />
              <strong style={{ fontWeight:800, color:'#e07050' }}>já caminhou comigo</strong>
            </h2>
            <p style={{ fontSize:'14px', color:'#9a7a6a', marginTop:'8px' }}>⭐⭐⭐⭐⭐ 4.9 · 248 avaliações no Google</p>
          </div>
          <div className="g3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' }}>
            {[
              { name:'Juliana, 36', emoji:'🌸', tag:'Emagrecimento', text:'"Perdi 11kg mas o maior ganho foi a paz com a comida. Aprendi que comer bem não é sofrimento. A Camila muda sua relação com o corpo."' },
              { name:'Renata, 29', emoji:'🤰', tag:'Gestação', text:'"Fiz todo o pré-natal nutricional com a Camila. Minhas filhas nasceram saudáveis e eu me senti confiante em cada fase. Muito além do que esperava."' },
              { name:'Patrícia, 44', emoji:'🌙', tag:'Menopausa', text:'"Os fogachos e o ganho de peso na menopausa me assustavam. Em 3 meses de acompanhamento me senti outra pessoa. Recomendo de coração."' },
            ].map((t, i) => (
              <div key={i} className="tcard fade" style={{ transitionDelay:`${i*0.15}s` }}>
                <div style={{ display:'flex', gap:'12px', alignItems:'center', marginBottom:'20px', paddingTop:'24px' }}>
                  <span style={{ fontSize:'2rem' }}>{t.emoji}</span>
                  <div>
                    <p style={{ fontWeight:800, color:'#3d2c1e', fontSize:'14px' }}>{t.name}</p>
                    <span style={{ background:'rgba(224,112,80,0.1)', color:'#c05a38', padding:'3px 10px', borderRadius:'100px', fontSize:'11px', fontWeight:700 }}>{t.tag}</span>
                  </div>
                </div>
                <p style={{ fontSize:'14px', color:'#7a5a48', lineHeight:1.9, fontStyle:'italic' }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section style={{ padding:'96px 24px', background:'white' }}>
        <div className="g2" style={{ maxWidth:'1000px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>
          <div className="fade-r" style={{ order: 2 }}>
            <div style={{ borderRadius:'24px', overflow:'hidden', boxShadow:'0 16px 48px rgba(180,100,60,0.15)', border:'1.5px solid rgba(224,112,80,0.2)' }}>
              <div style={{ height:'340px', overflow:'hidden', position:'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1559839914-17aae19cec71?w=700&q=85"
                  alt="Camila Rocha — Nutricionista"
                  style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', animation:'kenBurns 22s ease-in-out infinite' }}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 55%, rgba(253,248,244,0.9) 100%)' }} />
              </div>
              <div style={{ background:'linear-gradient(135deg, #faeee6, #f5ddd0)', padding:'24px', textAlign:'center', display:'flex', flexDirection:'column', gap:'8px' }}>
                {['CRN 3-23456','UNICAMP — Nutrição','Pós: Nutrição Integrativa','Pós: Nutrição Funcional'].map((c,i) => (
                  <div key={i} style={{ background:'white', border:'1.5px solid rgba(224,112,80,0.2)', color:'#c05a38', padding:'8px 20px', borderRadius:'100px', fontSize:'12px', fontWeight:700 }}>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="fade-l" style={{ order: 1 }}>
            <span className="chip">Quem sou eu</span>
            <h2 style={{ fontSize:'2.4rem', fontWeight:400, color:'#3d2c1e', fontFamily:'Georgia, serif', marginBottom:'20px' }}>
              Olá, eu sou<br />
              <strong style={{ fontWeight:900, color:'#e07050' }}>Camila Rocha 🌿</strong>
            </h2>
            <p style={{ fontSize:'15px', color:'#7a5a48', lineHeight:1.9, marginBottom:'16px' }}>
              Nutricionista formada pela UNICAMP com duas pós-graduações: Nutrição Integrativa e Nutrição Funcional. Seis anos caminhando ao lado de mulheres (e famílias) em busca de saúde com prazer.
            </p>
            <p style={{ fontSize:'15px', color:'#7a5a48', lineHeight:1.9, marginBottom:'32px' }}>
              Acredito que saúde começa na relação com o próprio corpo. Meu trabalho vai além do cardápio — é sobre autocuidado, rotina e leveza.
            </p>
            <div style={{ display:'flex', gap:'24px', marginBottom:'32px' }}>
              {[['400+','Pacientes'],['6','Anos'],['98%','Satisfação']].map(([n,l],i) => (
                <div key={i} style={{ textAlign:'center' }}>
                  <p style={{ fontSize:'2rem', fontWeight:900, color:'#e07050' }}>{n}</p>
                  <p style={{ fontSize:'12px', color:'#9a7a6a' }}>{l}</p>
                </div>
              ))}
            </div>
            <a href="https://wa.me/5511999999999" target="_blank" className="btn-warm">
              Conversar comigo 💬
            </a>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ padding:'96px 24px', background:'linear-gradient(135deg, #e07050, #c05a38)' }}>
        <div className="fade" style={{ maxWidth:'600px', margin:'0 auto', textAlign:'center' }}>
          <span style={{ fontSize:'3rem', display:'block', marginBottom:'20px', animation:'breathe 3s ease-in-out infinite' }}>🌿</span>
          <h2 style={{ fontSize:'2.4rem', fontWeight:400, fontFamily:'Georgia, serif', color:'white', marginBottom:'16px' }}>
            Pronta para cuidar<br />
            <strong style={{ fontWeight:900 }}>de você com carinho?</strong>
          </h2>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.8)', lineHeight:1.9, marginBottom:'40px' }}>
            📍 Jardins, São Paulo · Online para todo o Brasil<br />
            🕐 Seg–Sex 9h–18h · Sáb 9h–12h<br />
            📞 (11) 99999-9999
          </p>
          <a href="https://wa.me/5511999999999?text=Oi%20Camila!%20Quero%20marcar%20minha%20consulta" target="_blank"
            style={{ display:'inline-flex', alignItems:'center', gap:'12px', background:'white', color:'#e07050', padding:'18px 40px', borderRadius:'50px', fontWeight:800, fontSize:'16px', textDecoration:'none', transition:'all 0.3s', boxShadow:'0 8px 32px rgba(0,0,0,0.15)' }}>
            💬 Marcar minha consulta
          </a>
        </div>
      </section>

      <a href="https://wa.me/5511999999999" target="_blank" className="wapp">💬</a>
    </>
  )
}
