'use client'

import { useEffect, useRef } from 'react'

export const metadata = undefined

export default function Modelo1Nutricionista() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el)
    })

    // Counter animation
    const counters = document.querySelectorAll('.counter')
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0')
      let current = 0
      const increment = target / 60
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        counter.textContent = Math.floor(current) + (counter.getAttribute('data-suffix') || '')
      }, 30)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; background: #fafaf8; color: #1a2e1a; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(3deg); }
          66% { transform: translateY(-6px) rotate(-2deg); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,120,60,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(34,120,60,0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .reveal {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .reveal-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .leaf {
          position: absolute;
          font-size: 2rem;
          animation: float 6s ease-in-out infinite;
          opacity: 0.15;
          pointer-events: none;
        }

        .btn-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #1a472a;
          color: white;
          padding: 16px 32px;
          border-radius: 4px;
          font-family: sans-serif;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: background 0.3s, transform 0.2s;
          animation: fadeUp 1s ease 0.6s both;
        }
        .btn-whatsapp:hover {
          background: #22543d;
          transform: translateY(-2px);
        }

        .service-card {
          background: white;
          border: 1px solid #e8f0e8;
          padding: 32px;
          border-radius: 2px;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(26,71,42,0.12);
          border-color: #1a472a;
        }

        .testimonial-card {
          background: white;
          border-left: 4px solid #1a472a;
          padding: 28px;
          border-radius: 0 4px 4px 0;
          transition: transform 0.3s;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
        }

        .whatsapp-float {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 60px;
          height: 60px;
          background: #25d366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 28px;
          z-index: 9999;
          animation: pulse-green 2.5s infinite;
          transition: transform 0.2s;
        }
        .whatsapp-float:hover { transform: scale(1.1); }

        nav {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 100;
          background: rgba(250,250,248,0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid #e8f0e8;
          padding: 16px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 768px) {
          nav { padding: 14px 20px; }
          .hero-title { font-size: 2.2rem !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{ animation: 'fadeDown 0.8s ease both' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: '700', color: '#1a472a', letterSpacing: '1px' }}>
          Dra. Ana Lima · Nutricionista
        </div>
        <a href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta"
          target="_blank"
          style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#1a472a', textDecoration: 'none', fontWeight: '600', letterSpacing: '0.5px' }}>
          Agendar consulta →
        </a>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a472a 0%, #2d6a4f 60%, #40916c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
      }}>
        {/* Floating leaves */}
        {[
          { top: '15%', left: '8%', delay: '0s', size: '2.5rem' },
          { top: '70%', left: '5%', delay: '1.5s', size: '1.8rem' },
          { top: '30%', right: '6%', delay: '0.8s', size: '3rem' },
          { top: '75%', right: '10%', delay: '2s', size: '2rem' },
          { top: '50%', left: '15%', delay: '1s', size: '1.5rem' },
        ].map((leaf, i) => (
          <span key={i} className="leaf" style={{
            top: leaf.top,
            left: (leaf as unknown as Record<string,string>).left,
            right: (leaf as unknown as Record<string,string>).right,
            fontSize: leaf.size,
            animationDelay: leaf.delay,
          }}>🌿</span>
        ))}

        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: '760px', position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: 'sans-serif',
            fontSize: '13px',
            color: '#95d5b2',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '24px',
            animation: 'fadeDown 0.8s ease 0.2s both',
          }}>
            CRN 3-45678 · São Paulo, SP
          </p>
          <h1 className="hero-title" style={{
            fontSize: '3.4rem',
            color: 'white',
            fontWeight: '400',
            lineHeight: '1.25',
            marginBottom: '24px',
            animation: 'fadeDown 0.8s ease 0.35s both',
          }}>
            Nutrição que transforma.<br />
            <em style={{ fontStyle: 'italic', color: '#95d5b2' }}>Saúde que dura.</em>
          </h1>
          <p style={{
            fontFamily: 'sans-serif',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: '1.7',
            marginBottom: '40px',
            animation: 'fadeUp 0.8s ease 0.5s both',
          }}>
            Atendimento personalizado para quem quer emagrecer com saúde,<br />
            tratar doenças crônicas e recuperar energia — sem sofrimento.
          </p>
          <a href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta"
            target="_blank"
            className="btn-whatsapp">
            <span>💬</span> Agendar consulta gratuita
          </a>
          <p style={{
            fontFamily: 'sans-serif',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '16px',
            animation: 'fadeUp 0.8s ease 0.8s both',
          }}>
            Consulta online ou presencial · Seg–Sex 8h–19h
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#f0f7f0', padding: '48px 24px' }}>
        <div className="stats-row reveal" style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '24px',
          textAlign: 'center',
        }}>
          {[
            { value: 500, suffix: '+', label: 'Pacientes atendidos' },
            { value: 8, suffix: ' anos', label: 'De experiência' },
            { value: 97, suffix: '%', label: 'Taxa de satisfação' },
            { value: 3, suffix: ' min', label: 'Do metrô Paulista' },
          ].map((stat, i) => (
            <div key={i}>
              <p style={{ fontSize: '2.4rem', fontWeight: '700', color: '#1a472a', fontFamily: 'sans-serif' }}>
                <span className="counter" data-target={stat.value} data-suffix={stat.suffix}>0{stat.suffix}</span>
              </p>
              <p style={{ fontSize: '13px', color: '#4a6741', fontFamily: 'sans-serif', marginTop: '6px' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Serviços */}
      <section style={{ padding: '96px 24px', background: '#fafaf8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#40916c', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Especialidades</p>
            <h2 style={{ fontSize: '2.4rem', color: '#1a2e1a', fontWeight: '400' }}>Como posso ajudar você</h2>
          </div>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            {[
              { icon: '⚖️', title: 'Emagrecimento saudável', desc: 'Plano alimentar individualizado para perder peso de forma progressiva e sem efeito sanfona.', price: 'A partir de R$ 280' },
              { icon: '🫀', title: 'Doenças crônicas', desc: 'Acompanhamento nutricional para diabetes, hipertensão, colesterol alto e síndrome metabólica.', price: 'A partir de R$ 280' },
              { icon: '🌱', title: 'Nutrição funcional', desc: 'Alimentação baseada em evidências para melhorar energia, sono e qualidade de vida geral.', price: 'A partir de R$ 280' },
              { icon: '🏃', title: 'Performance esportiva', desc: 'Planejamento nutricional para atletas amadores e profissionais — foco em rendimento e recuperação.', price: 'A partir de R$ 320' },
              { icon: '🤰', title: 'Gestação e pós-parto', desc: 'Nutrição especializada durante a gravidez e amamentação com segurança para mãe e bebê.', price: 'A partir de R$ 300' },
              { icon: '🧒', title: 'Nutrição infantil', desc: 'Orientação para introdução alimentar, crescimento saudável e formação de hábitos alimentares.', price: 'A partir de R$ 260' },
            ].map((s, i) => (
              <div key={i} className="service-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{s.icon}</div>
                <h3 style={{ fontSize: '1.1rem', color: '#1a2e1a', marginBottom: '12px', fontWeight: '600' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: '#5a7a5a', lineHeight: '1.7', fontFamily: 'sans-serif', marginBottom: '16px' }}>{s.desc}</p>
                <p style={{ fontSize: '13px', color: '#1a472a', fontFamily: 'sans-serif', fontWeight: '600' }}>{s.price}</p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="https://wa.me/5511999999999" target="_blank" className="btn-whatsapp">
              Quero agendar minha consulta
            </a>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section style={{ padding: '96px 24px', background: '#f0f7f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#40916c', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Resultados reais</p>
            <h2 style={{ fontSize: '2.4rem', color: '#1a2e1a', fontWeight: '400' }}>O que dizem meus pacientes</h2>
            <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#4a6741', marginTop: '8px' }}>⭐⭐⭐⭐⭐ 4.9 no Google · 312 avaliações</p>
          </div>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            {[
              { text: '"Perdi 14kg em 5 meses sem passar fome e sem abandonar o que gosto de comer. A Dra. Ana muda a sua relação com a comida."', name: 'Carla M., 38 anos', result: 'Emagrecimento' },
              { text: '"Meu colesterol estava em 280. Em 4 meses de acompanhamento, caiu pra 185 só com alimentação. Impressionante."', name: 'Ricardo S., 52 anos', result: 'Saúde cardiovascular' },
              { text: '"Melhorei meu tempo de corrida em 18% depois de ajustar a nutrição. Recomendo para qualquer atleta amador."', name: 'Fernanda L., 29 anos', result: 'Performance' },
            ].map((t, i) => (
              <div key={i} className="testimonial-card reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
                <p style={{ fontSize: '13px', fontFamily: 'sans-serif', color: '#40916c', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.result}</p>
                <p style={{ fontSize: '15px', color: '#2d4a2d', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '20px' }}>{t.text}</p>
                <p style={{ fontSize: '13px', fontFamily: 'sans-serif', color: '#5a7a5a', fontWeight: '600' }}>— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section style={{ padding: '96px 24px', background: '#fafaf8' }}>
        <div className="grid-2" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div className="reveal-left">
            <div style={{
              width: '100%',
              paddingBottom: '120%',
              background: 'linear-gradient(135deg, #1a472a, #40916c)',
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'white', gap: '8px' }}>
                <span style={{ fontSize: '5rem' }}>👩‍⚕️</span>
                <p style={{ fontFamily: 'sans-serif', fontSize: '14px', opacity: 0.7 }}>Foto da nutricionista</p>
              </div>
            </div>
          </div>
          <div className="reveal-right">
            <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#40916c', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>Sobre mim</p>
            <h2 style={{ fontSize: '2.2rem', color: '#1a2e1a', fontWeight: '400', marginBottom: '24px' }}>Dra. Ana Lima</h2>
            <p style={{ fontSize: '15px', color: '#4a5a4a', lineHeight: '1.9', fontFamily: 'sans-serif', marginBottom: '16px' }}>
              Nutricionista formada pela USP com especialização em Nutrição Clínica e Funcional pelo Hospital das Clínicas. Oito anos dedicados a ajudar pessoas a reconquistar saúde e qualidade de vida através da alimentação.
            </p>
            <p style={{ fontSize: '15px', color: '#4a5a4a', lineHeight: '1.9', fontFamily: 'sans-serif', marginBottom: '32px' }}>
              Acredito que não existe dieta perfeita — existe o plano certo para cada pessoa. Meu trabalho é entender sua rotina, seus objetivos e criar uma estratégia que funcione na sua vida real.
            </p>
            <div style={{ display: 'flex', gap: '32px', fontFamily: 'sans-serif' }}>
              {['CRN 3-45678', 'USP — Nutrição', 'HC — Clínica'].map((item, i) => (
                <div key={i}>
                  <p style={{ fontSize: '12px', color: '#1a472a', fontWeight: '700' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section style={{ padding: '96px 24px', background: '#1a472a' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="reveal">
            <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#95d5b2', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>Agende agora</p>
            <h2 style={{ fontSize: '2.4rem', color: 'white', fontWeight: '400', marginBottom: '16px' }}>
              Sua primeira consulta pode mudar tudo.
            </h2>
            <p style={{ fontFamily: 'sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', marginBottom: '40px' }}>
              📍 Av. Paulista, 1000 — São Paulo · 3 min do metrô<br />
              🕐 Seg–Sex 8h–19h · Sáb 8h–13h<br />
              💻 Consultas online disponíveis
            </p>
            <a href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20minha%20consulta"
              target="_blank"
              className="btn-whatsapp"
              style={{ background: 'white', color: '#1a472a' }}>
              <span>💬</span> Falar no WhatsApp agora
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp Float */}
      <a href="https://wa.me/5511999999999" target="_blank" className="whatsapp-float" title="Falar no WhatsApp">
        💬
      </a>
    </>
  )
}
