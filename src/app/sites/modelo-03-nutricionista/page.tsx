'use client'

import { useEffect } from 'react'

const WA = 'https://wa.me/5511997654321?text=Olá!%20Vim%20pelo%20site%20do%20Espaço%20Nutri%20Consciente%20e%20gostaria%20de%20agendar%20uma%20avaliação.'

export default function Modelo03Nutricionista() {
  useEffect(() => {
    const navbar = document.getElementById('navbar')
    const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', onScroll)

    const toggle = document.getElementById('menuToggle')
    const links = document.getElementById('navLinks')
    toggle?.addEventListener('click', () => links?.classList.toggle('active'))
    links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('active')))

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    document.querySelectorAll<HTMLElement>('.counter[data-to]').forEach(el => {
      const target = parseInt(el.dataset.to ?? '0')
      const suffix = el.dataset.suffix ?? ''
      let n = 0
      const step = target / 60
      const t = setInterval(() => {
        n = Math.min(n + step, target)
        el.textContent = Math.floor(n) + suffix
        if (n >= target) clearInterval(t)
      }, 28)
    })

    document.getElementById('contactForm')?.addEventListener('submit', e => {
      e.preventDefault()
      const v = (id: string) => (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)?.value ?? ''
      const msg = `Olá!%20Vim%20pelo%20site.%0ANome:%20${encodeURIComponent(v('nome'))}%0ATelefone:%20${encodeURIComponent(v('telefone'))}%0AObjetivo:%20${encodeURIComponent(v('assunto'))}`
      window.open(`https://wa.me/5511997654321?text=${msg}`, '_blank')
    })

    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');

        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}

        :root{
          --primary:#9b5a1a;
          --primary-light:#c17a35;
          --primary-dark:#6b3e10;
          --accent:#e8a838;
          --accent-soft:#f5d49a;
          --bg-white:#ffffff;
          --bg-cream:#faf6f1;
          --bg-warm:#f2ebe0;
          --text-dark:#1c1209;
          --text-body:#4a3728;
          --text-light:#9a8070;
          --white:#ffffff;
          --sh:0 2px 12px rgba(100,50,10,.07);
          --sh-md:0 6px 28px rgba(100,50,10,.1);
          --sh-lg:0 16px 56px rgba(100,50,10,.14);
          --r:18px;
          --tr:0.4s cubic-bezier(.22,1,.36,1);
        }

        html{scroll-behavior:smooth}
        body{font-family:'Inter',sans-serif;color:var(--text-body);background:var(--bg-white);line-height:1.75;overflow-x:hidden}
        img{max-width:100%;display:block}
        a{text-decoration:none;color:inherit}
        ul{list-style:none}
        .wrap{max-width:1180px;margin:0 auto;padding:0 28px}

        h1,h2,.serif{font-family:'Cormorant Garamond',serif;line-height:1.15}
        h1{font-size:clamp(3rem,7vw,5.5rem);font-weight:600;color:var(--white)}
        h2{font-size:clamp(2.2rem,4.5vw,3.4rem);font-weight:600;color:var(--text-dark)}
        h3{font-size:1.15rem;font-weight:600;color:var(--text-dark);font-family:'Inter',sans-serif}

        /* Animações */
        .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .reveal-slow{transition-duration:.95s}
        @keyframes pulse-wa{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4)}50%{box-shadow:0 4px 36px rgba(37,211,102,.6)}}

        /* Navbar */
        .nav{position:fixed;top:0;left:0;width:100%;z-index:1000;padding:22px 0;transition:var(--tr)}
        .nav.scrolled{background:rgba(250,246,241,.97);backdrop-filter:blur(16px);box-shadow:var(--sh);padding:13px 0}
        .nav .wrap{display:flex;align-items:center;justify-content:space-between}
        .nav-logo{font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:600;color:var(--white);letter-spacing:.5px;transition:var(--tr)}
        .nav-logo em{font-style:italic;font-weight:400}
        .nav.scrolled .nav-logo{color:var(--primary-dark)}
        .nav-links{display:flex;align-items:center;gap:36px}
        .nav-links a{font-size:.85rem;font-weight:500;color:rgba(255,255,255,.82);transition:var(--tr);letter-spacing:.2px}
        .nav.scrolled .nav-links a{color:var(--text-body)}
        .nav-links a:hover{color:var(--white)}
        .nav.scrolled .nav-links a:hover{color:var(--primary)}
        .nav-cta{padding:10px 24px!important;background:var(--primary)!important;color:var(--white)!important;border-radius:4px!important;font-weight:600!important;letter-spacing:.5px;font-size:.82rem!important;text-transform:uppercase}
        .nav-cta:hover{background:var(--primary-light)!important;transform:translateY(-1px)}
        .menu-toggle{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
        .menu-toggle span{width:24px;height:1.5px;background:var(--white);border-radius:2px;transition:var(--tr)}
        .nav.scrolled .menu-toggle span{background:var(--text-dark)}

        /* Hero — Opção A: centralizado */
        .hero{position:relative;min-height:100vh;display:flex;align-items:flex-end;overflow:hidden}
        .hero-bg{position:absolute;inset:0;z-index:0}
        .hero-bg img{width:100%;height:100%;object-fit:cover;object-position:center 30%}
        .hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(28,18,9,.88) 0%,rgba(28,18,9,.45) 50%,rgba(28,18,9,.2) 100%)}
        .hero-body{position:relative;z-index:1;width:100%;padding:0 0 80px}
        .hero-inner{max-width:920px}
        .hero-kicker{display:inline-flex;align-items:center;gap:10px;font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:4px;color:var(--accent-soft);margin-bottom:28px}
        .hero-kicker-line{width:32px;height:1px;background:var(--accent-soft);display:block}
        .hero-inner h1{margin-bottom:24px;letter-spacing:-.5px}
        .hero-inner h1 em{font-style:italic;color:var(--accent-soft)}
        .hero-sub{font-size:1.08rem;color:rgba(255,255,255,.78);max-width:540px;line-height:1.85;margin-bottom:40px}
        .hero-actions{display:flex;gap:16px;flex-wrap:wrap;align-items:center;margin-bottom:72px}
        .btn-hero{display:inline-flex;align-items:center;gap:9px;padding:16px 36px;font-family:'Inter',sans-serif;font-size:.9rem;font-weight:600;letter-spacing:.5px;text-transform:uppercase;cursor:pointer;border:none;transition:var(--tr);border-radius:4px}
        .btn-hero-solid{background:var(--accent);color:var(--text-dark)}
        .btn-hero-solid:hover{background:var(--accent-soft);transform:translateY(-2px);box-shadow:0 8px 24px rgba(232,168,56,.35)}
        .btn-hero-ghost{background:transparent;color:var(--white);border:1px solid rgba(255,255,255,.4);border-radius:4px}
        .btn-hero-ghost:hover{border-color:var(--white);background:rgba(255,255,255,.08);transform:translateY(-2px)}
        .hero-stats-row{display:flex;gap:48px}
        .hstat strong{font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:600;color:var(--white);display:block;line-height:1}
        .hstat span{font-size:.72rem;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,.5)}

        /* Serviços — layout de lista numerada */
        .services{padding:110px 0;background:var(--bg-cream)}
        .services-header{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:end;margin-bottom:64px}
        .services-list{display:flex;flex-direction:column}
        .service-row{display:grid;grid-template-columns:64px 1fr auto;gap:28px;align-items:center;padding:32px 0;border-bottom:1px solid rgba(155,90,26,.12);transition:var(--tr);cursor:default;position:relative}
        .service-row:first-child{border-top:1px solid rgba(155,90,26,.12)}
        .service-row::after{content:'';position:absolute;left:0;bottom:-1px;width:0;height:1px;background:var(--primary);transition:width .4s ease}
        .service-row:hover::after{width:100%}
        .service-row:hover .svc-n{color:var(--primary)}
        .service-row:hover .svc-arrow{opacity:1;transform:translateX(0)}
        .svc-n{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:600;color:rgba(155,90,26,.25);transition:var(--tr);line-height:1}
        .svc-body h3{font-size:1.05rem;margin-bottom:5px;transition:var(--tr)}
        .svc-body p{font-size:.88rem;color:var(--text-light);line-height:1.7}
        .svc-tag{font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:var(--primary);background:rgba(155,90,26,.08);padding:5px 12px;border-radius:3px;margin-top:10px;display:inline-block}
        .svc-arrow{font-size:1.2rem;color:var(--primary);opacity:0;transform:translateX(-8px);transition:var(--tr)}

        /* Depoimentos */
        .testimonials{padding:110px 0;background:var(--bg-cream);text-align:center}
        .testi-featured{background:var(--bg-warm);border-radius:var(--r);padding:52px 64px;max-width:840px;margin:0 auto 48px;position:relative}
        .testi-featured::before{content:'"';font-family:'Cormorant Garamond',serif;font-size:10rem;color:rgba(155,90,26,.1);position:absolute;top:-20px;left:32px;line-height:1}
        .testi-featured p{font-family:'Cormorant Garamond',serif;font-size:1.55rem;font-style:italic;color:var(--text-dark);line-height:1.6;margin-bottom:28px;position:relative;z-index:1}
        .testi-featured-author{display:flex;align-items:center;justify-content:center;gap:14px}
        .tav{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-light));color:var(--white);font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:600;display:flex;align-items:center;justify-content:center}
        .tav-info .name{font-weight:600;font-size:.95rem;color:var(--text-dark)}
        .tav-info .role{font-size:.8rem;color:var(--text-light)}
        .testi-stars{color:var(--accent);letter-spacing:2px;font-size:1rem;margin-bottom:20px}
        .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .testi-card{background:var(--white);border-radius:var(--r);padding:32px 28px;text-align:left;transition:var(--tr)}
        .testi-card:hover{transform:translateY(-5px);box-shadow:var(--sh-md)}
        .testi-card .stars{color:var(--accent);font-size:.9rem;letter-spacing:2px;margin-bottom:12px}
        .testi-card p{font-size:.9rem;font-style:italic;color:var(--text-body);line-height:1.78;margin-bottom:18px}
        .testi-card .author{display:flex;align-items:center;gap:10px}
        .testi-card .av{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-light));color:var(--white);display:flex;align-items:center;justify-content:center;font-size:.9rem;font-weight:600;flex-shrink:0}
        .testi-card .nm{font-weight:600;font-size:.88rem;color:var(--text-dark)}
        .testi-card .rl{font-size:.76rem;color:var(--text-light)}

        /* Sobre */
        .about{padding:110px 0;background:var(--bg-white)}
        .about-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:88px;align-items:center}
        .about-text .eyebrow{font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:4px;color:var(--primary);margin-bottom:16px;display:block}
        .about-text h2{margin-bottom:12px}
        .about-text h2 em{font-style:italic;color:var(--primary)}
        .about-divider{width:48px;height:2px;background:var(--accent);margin:24px 0}
        .about-text p{margin-bottom:16px;font-size:1rem;color:var(--text-body);line-height:1.9}
        .cred-list{display:flex;flex-direction:column;gap:12px;margin:28px 0 36px}
        .cred-item{display:flex;align-items:center;gap:12px;font-size:.9rem;color:var(--text-body)}
        .cred-icon{width:34px;height:34px;background:rgba(155,90,26,.08);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
        .about-img{position:relative}
        .about-img img{width:100%;border-radius:var(--r);box-shadow:var(--sh-lg);aspect-ratio:2/3;object-fit:cover;object-position:top}
        .about-img-deco{position:absolute;bottom:-24px;left:-24px;width:56%;height:56%;border:2px solid rgba(232,168,56,.3);border-radius:var(--r);z-index:-1}
        .about-img-badge{position:absolute;top:24px;right:-24px;background:var(--white);border-radius:12px;padding:18px 22px;box-shadow:var(--sh-md);max-width:180px;text-align:center}
        .about-img-badge .badge-num{font-family:'Cormorant Garamond',serif;font-size:2.5rem;font-weight:700;color:var(--primary);line-height:1}
        .about-img-badge .badge-label{font-size:.75rem;color:var(--text-light);line-height:1.4;margin-top:4px}

        /* Contato */
        .contact{padding:110px 0;background:var(--bg-cream)}
        .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
        .contact-left h2{margin-bottom:12px}
        .contact-left>p{font-size:1rem;color:var(--text-light);margin-bottom:36px;line-height:1.85}
        .info-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:22px}
        .info-icon{width:42px;height:42px;background:rgba(155,90,26,.09);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;margin-top:2px}
        .info-item strong{display:block;font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--primary);margin-bottom:3px}
        .info-item span{font-size:.93rem;color:var(--text-body)}
        .form-card{background:var(--white);border-radius:var(--r);padding:40px;box-shadow:var(--sh-md)}
        .form-title{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;color:var(--text-dark);margin-bottom:24px}
        .fg{margin-bottom:16px}
        .fg label{display:block;font-size:.78rem;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-light);margin-bottom:6px}
        .fg input,.fg select{width:100%;padding:13px 16px;border:1.5px solid #e5d9ce;border-radius:8px;font-family:'Inter',sans-serif;font-size:.93rem;color:var(--text-dark);transition:var(--tr);background:var(--bg-white)}
        .fg input:focus,.fg select:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(155,90,26,.1)}
        .fg-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .btn-form{width:100%;padding:15px;background:var(--primary);color:var(--white);border:none;border-radius:8px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:600;letter-spacing:.5px;text-transform:uppercase;cursor:pointer;transition:var(--tr);margin-top:8px}
        .btn-form:hover{background:var(--primary-light);transform:translateY(-1px)}

        /* Footer */
        .footer{background:#100a03;color:rgba(255,255,255,.45);padding:60px 0 22px}
        .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:52px;margin-bottom:44px}
        .footer-brand-name{font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:rgba(255,255,255,.85);margin-bottom:12px}
        .footer-brand-name em{font-style:italic;color:var(--accent-soft)}
        .footer-brand p{font-size:.86rem;line-height:1.85}
        .footer h4{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,.6);margin-bottom:18px}
        .footer-links a{display:block;padding:5px 0;font-size:.86rem;transition:var(--tr)}
        .footer-links a:hover{color:var(--accent-soft);padding-left:6px}
        .footer-social{display:flex;gap:10px;margin-top:18px}
        .footer-social a{width:38px;height:38px;background:rgba(255,255,255,.06);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:var(--tr)}
        .footer-social a:hover{background:var(--primary);transform:translateY(-2px)}
        .footer-bottom{border-top:1px solid rgba(255,255,255,.07);padding-top:20px;display:flex;justify-content:space-between;align-items:center;font-size:.8rem;flex-wrap:wrap;gap:8px}

        /* WhatsApp */
        .wa-float{position:fixed;bottom:28px;right:28px;width:60px;height:60px;background:#25d366;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.8rem;color:var(--white);z-index:999;transition:var(--tr);animation:pulse-wa 2s infinite}
        .wa-float:hover{transform:scale(1.1)}

        /* Responsive */
        @media(max-width:1024px){
          .about-grid{grid-template-columns:1fr}
          .about-grid .about-text{order:1}
          .about-grid .about-img{order:2;max-width:460px;margin:0 auto}
          .services-header{grid-template-columns:1fr}
          .footer-grid{grid-template-columns:1fr 1fr}
        }
        @media(max-width:768px){
          .nav-links{display:none;position:fixed;top:0;left:0;width:100%;height:100vh;background:rgba(16,10,3,.97);flex-direction:column;justify-content:center;gap:28px;z-index:999}
          .nav-links.active{display:flex}
          .nav-links a{font-size:1.35rem;color:var(--white)!important;text-align:center}
          .menu-toggle{display:flex}
          .testi-featured{padding:36px 28px}
          .testi-featured p{font-size:1.25rem}
          .testi-grid{grid-template-columns:1fr}
          .contact-grid{grid-template-columns:1fr}
          .hero-stats-row{flex-wrap:wrap;gap:24px}
          .footer-grid{grid-template-columns:1fr}
          .footer-bottom{flex-direction:column;text-align:center}
        }
      `}</style>

      {/* ===== NAVBAR ===== */}
      <nav className="nav" id="navbar">
        <div className="wrap">
          <a href="#" className="nav-logo">Espaço <em>Nutri</em> Consciente</a>
          <ul className="nav-links" id="navLinks">
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#depoimentos">Depoimentos</a></li>
            <li><a href="#sobre">A Nutricionista</a></li>
            <li><a href="#contato">Contato</a></li>
            <li><a href={WA} target="_blank" className="nav-cta">Agendar</a></li>
          </ul>
          <button className="menu-toggle" id="menuToggle" aria-label="Abrir menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ===== HERO — centralizado, fundo full-bleed ===== */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1600&q=80" alt="Alimentação saudável e colorida" />
        </div>
        <div className="wrap hero-body">
          <div className="hero-inner reveal">
            <div className="hero-kicker">
              <span className="hero-kicker-line" />
              Nutrição · Vila Olímpia · São Paulo
            </div>
            <h1>
              Seu corpo merece<br />
              <em>comida de verdade.</em>
            </h1>
            <p className="hero-sub">
              Atendimento nutricional holístico que cuida do seu corpo e da sua mente. Sem regras punitivas, sem dietas que duram 2 semanas. Só resultados reais.
            </p>
            <div className="hero-actions">
              <a href={WA} target="_blank" className="btn-hero btn-hero-solid">📅 Agendar avaliação gratuita</a>
              <a href="#servicos" className="btn-hero btn-hero-ghost">Conhecer serviços →</a>
            </div>
            <div className="hero-stats-row">
              {[
                { to: 1200, suffix: '+', label: 'Pacientes atendidas' },
                { to: 10, suffix: ' anos', label: 'De experiência' },
                { to: 96, suffix: '%', label: 'Taxa de satisfação' },
              ].map((s, i) => (
                <div className="hstat" key={i}>
                  <strong className="counter" data-to={s.to} data-suffix={s.suffix}>0{s.suffix}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS — lista numerada ===== */}
      <section className="services" id="servicos">
        <div className="wrap">
          <div className="services-header reveal">
            <div>
              <span style={{fontSize:'.72rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'4px',color:'var(--primary)',display:'block',marginBottom:'14px'}}>O que eu ofereço</span>
              <h2>Cuidado que vai <em style={{fontStyle:'italic',color:'var(--primary)'}}>além</em> do prato</h2>
            </div>
            <p style={{color:'var(--text-light)',fontSize:'1rem',lineHeight:'1.85'}}>
              Cada serviço é adaptado à sua realidade. Não existe plano genérico aqui — só estratégias construídas para você.
            </p>
          </div>
          <div className="services-list">
            {[
              { n: '01', title: 'Emagrecimento Sustentável', desc: 'Perda de peso real e duradoura sem abrir mão de prazer. Estratégia alimentar, reeducação e suporte contínuo.', tag: 'Mais procurado' },
              { n: '02', title: 'Nutrição Funcional', desc: 'Alimentos como medicina. Tratamento de inflamação crônica, intestino, qualidade do sono e energia.', tag: 'Alta eficácia' },
              { n: '03', title: 'Nutrição Esportiva', desc: 'Maximize sua performance e acelere sua recuperação. Planejamento nutricional para treino e competição.', tag: 'Para atletas' },
              { n: '04', title: 'Comportamento Alimentar', desc: 'Mindful eating, terapia cognitiva nutricional. Para quem luta com compulsão, restrição e ansiedade com a comida.', tag: 'Abordagem única' },
              { n: '05', title: 'Gestação e Materno-Infantil', desc: 'Acompanhamento especializado em cada fase: pré-natal, amamentação e introdução alimentar do bebê.', tag: 'Cuidado especial' },
              { n: '06', title: 'Nutrição Clínica', desc: 'Diabetes, hipertensão, SII, doenças autoimunes, tireóide. Nutrição terapêutica integrada ao tratamento médico.', tag: 'Saúde integral' },
            ].map((s, i) => (
              <div className={`service-row reveal`} style={{transitionDelay:`${i * 0.07}s`}} key={i}>
                <span className="svc-n">{s.n}</span>
                <div className="svc-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="svc-tag">{s.tag}</span>
                </div>
                <span className="svc-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEPOIMENTOS ===== */}
      <section className="testimonials" id="depoimentos">
        <div className="wrap">
          <div className="reveal" style={{marginBottom:'52px'}}>
            <span style={{fontSize:'.72rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'4px',color:'var(--primary)',display:'block',marginBottom:'12px'}}>Depoimentos</span>
            <h2>Histórias que me <em style={{fontStyle:'italic',color:'var(--primary)'}}>inspiram</em></h2>
            <p style={{color:'var(--text-light)',fontSize:'1rem',marginTop:'12px'}}>⭐⭐⭐⭐⭐ 4.8 no Google · 214 avaliações</p>
          </div>
          <div className="testi-featured reveal">
            <div className="testi-stars">★★★★★</div>
            <p>"Passei 12 anos em guerra com o meu corpo. Testei cada dieta que existe. Quando cheguei na Dra. Larissa, estava exausta. Ela foi a primeira profissional que me ouviu de verdade — sem julgamento, sem proibições absurdas. Em 8 meses perdi 22kg e, mais do que isso, aprendi a me amar através da comida."</p>
            <div className="testi-featured-author">
              <div className="tav">MT</div>
              <div className="tav-info">
                <div className="name">Mariana Torres</div>
                <div className="role">Paciente desde 2023 · perdeu 22kg</div>
              </div>
            </div>
          </div>
          <div className="testi-grid">
            {[
              { av: 'BR', name: 'Bruno Rezende', role: 'Nutrição Esportiva', text: '"Minha performance no ciclismo deu um salto enorme. Melhorei meus tempos em 18% e ainda perdi 6kg de gordura mantendo toda a massa muscular."' },
              { av: 'CS', name: 'Claudia Souza', role: 'Comportamento Alimentar', text: '"Tinha episódios de compulsão todas as semanas. Com a abordagem da Dra. Larissa, entendi o porquê. Hoje faz 16 meses sem uma crise sequer."' },
              { av: 'JP', name: 'Juliana Peres', role: 'Gestação', text: '"Acompanhamento impecável durante toda a gravidez. Minha filha nasceu com peso perfeito e eu recuperei meu peso em menos de 4 meses."' },
            ].map((t, i) => (
              <div className="testi-card reveal" key={i} style={{transitionDelay:`${i * 0.1}s`}}>
                <div className="stars">★★★★★</div>
                <p>{t.text}</p>
                <div className="author">
                  <div className="av">{t.av}</div>
                  <div>
                    <div className="nm">{t.name}</div>
                    <div className="rl">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOBRE ===== */}
      <section className="about" id="sobre">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-text reveal-slow reveal">
              <span className="eyebrow">A nutricionista</span>
              <h2>Dra. Larissa <em>Vasconcelos</em></h2>
              <div className="about-divider" />
              <p>Nutricionista formada pela UNIFESP com pós-graduação em Nutrição Funcional (VP Nutri) e certificação em Terapia Cognitivo-Comportamental Nutricional. 10 anos de experiência clínica no atendimento a mulheres, atletas e pacientes com condições clínicas complexas.</p>
              <p>Minha abordagem vai além do plano alimentar. Trabalho a relação da pessoa com a comida, com o corpo e com a mente — porque comer é um ato social, emocional e cultural. Respeitar isso é o que diferencia o meu trabalho.</p>
              <div className="cred-list">
                {[
                  { icon: '🎓', text: 'CRN-3 · 44872 — UNIFESP' },
                  { icon: '🧬', text: 'Pós-graduação em Nutrição Funcional (VP Nutri)' },
                  { icon: '🧠', text: 'Certificação em TCCN — Comportamento Alimentar' },
                  { icon: '📍', text: 'Vila Olímpia, São Paulo · Atende online' },
                ].map(c => (
                  <div className="cred-item" key={c.text}>
                    <span className="cred-icon">{c.icon}</span>
                    {c.text}
                  </div>
                ))}
              </div>
              <a href={WA} target="_blank" className="btn-hero btn-hero-solid" style={{display:'inline-flex'}}>
                🍃 Agendar com a Dra. Larissa
              </a>
            </div>
            <div className="about-img reveal">
              <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=700&q=85" alt="Dra. Larissa Vasconcelos — Nutricionista" />
              <div className="about-img-deco" />
              <div className="about-img-badge">
                <div className="badge-num">1.2k+</div>
                <div className="badge-label">pacientes transformadas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTATO ===== */}
      <section className="contact" id="contato">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-left reveal">
              <span style={{fontSize:'.72rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'4px',color:'var(--primary)',display:'block',marginBottom:'14px'}}>Contato</span>
              <h2>Vamos dar o<br /><em style={{fontStyle:'italic',color:'var(--primary)'}}>primeiro passo</em></h2>
              <p>Atendimento presencial em Vila Olímpia e online para todo o Brasil. Respondo em até 2 horas em dias úteis.</p>
              {[
                { icon: '📍', label: 'Endereço', text: 'R. Funchal, 418 · Vila Olímpia, São Paulo' },
                { icon: '📱', label: 'WhatsApp', text: '(11) 99765-4321' },
                { icon: '🕐', label: 'Horário', text: 'Seg–Sex 8h–19h · Sáb 8h–13h' },
                { icon: '💻', label: 'Atendimento online', text: 'Todo o Brasil · Fuso de São Paulo' },
              ].map(c => (
                <div className="info-item" key={c.label}>
                  <span className="info-icon">{c.icon}</span>
                  <div><strong>{c.label}</strong><span>{c.text}</span></div>
                </div>
              ))}
            </div>
            <div className="reveal">
              <form className="form-card" id="contactForm">
                <p className="form-title">Solicite sua avaliação gratuita</p>
                <div className="fg-row">
                  <div className="fg">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Seu nome" required />
                  </div>
                  <div className="fg">
                    <label htmlFor="telefone">WhatsApp</label>
                    <input type="tel" id="telefone" placeholder="(00) 00000-0000" required />
                  </div>
                </div>
                <div className="fg">
                  <label htmlFor="assunto">Qual é o seu objetivo?</label>
                  <select id="assunto" required defaultValue="">
                    <option value="" disabled>Selecione...</option>
                    <option>Emagrecer de forma saudável</option>
                    <option>Nutrição funcional e saúde</option>
                    <option>Melhorar minha performance</option>
                    <option>Gestação / amamentação</option>
                    <option>Comportamento alimentar</option>
                    <option>Condição clínica (diabetes, etc.)</option>
                    <option>Outro</option>
                  </select>
                </div>
                <button type="submit" className="btn-form">Enviar via WhatsApp 🍃</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-brand-name">Espaço <em>Nutri</em> Consciente</div>
              <p>Dra. Larissa Vasconcelos · CRN-3 44872. Nutrição funcional e comportamental. Vila Olímpia, São Paulo.</p>
              <div className="footer-social">
                <a href="#" aria-label="Instagram">📸</a>
                <a href="#" aria-label="YouTube">🎬</a>
                <a href="#" aria-label="TikTok">🎵</a>
                <a href={WA} target="_blank" aria-label="WhatsApp">💬</a>
              </div>
            </div>
            <div>
              <h4>Navegação</h4>
              <div className="footer-links">
                <a href="#servicos">Serviços</a>
                <a href="#depoimentos">Depoimentos</a>
                <a href="#sobre">A Nutricionista</a>
                <a href="#contato">Contato</a>
              </div>
            </div>
            <div>
              <h4>Especialidades</h4>
              <div className="footer-links">
                <a href="#servicos">Emagrecimento</a>
                <a href="#servicos">Nutrição Funcional</a>
                <a href="#servicos">Nutrição Esportiva</a>
                <a href={WA} target="_blank">Avaliação Gratuita</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Espaço Nutri Consciente — Vila Olímpia, São Paulo</span>
            <span>CRN-3 · 44872 · (11) 99765-4321</span>
          </div>
        </div>
      </footer>

      {/* ===== WHATSAPP FLUTUANTE ===== */}
      <a href={WA} target="_blank" className="wa-float" aria-label="Falar no WhatsApp">💬</a>
    </>
  )
}
