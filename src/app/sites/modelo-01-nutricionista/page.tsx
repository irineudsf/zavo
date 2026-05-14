'use client'

import { useEffect } from 'react'

const WA = 'https://wa.me/5511999999999?text=Olá!%20Vim%20pelo%20site%20da%20Dra.%20Camila%20e%20gostaria%20de%20agendar%20uma%20consulta.'

export default function Modelo01Nutricionista() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar') as HTMLElement
    window.addEventListener('scroll', () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 50)
    })

    const menuToggle = document.getElementById('menuToggle')
    const navLinks = document.getElementById('navLinks')
    menuToggle?.addEventListener('click', () => {
      navLinks?.classList.toggle('active')
    })
    navLinks?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'))
    })

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))

    const counterSection = document.querySelector('.hero-stats')
    if (counterSection) {
      const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
              const target = parseInt(el.dataset.count ?? '0')
              const suffix = el.dataset.suffix ?? ''
              let current = 0
              const increment = target / (2000 / 16)
              const timer = setInterval(() => {
                current += increment
                if (current >= target) { current = target; clearInterval(timer) }
                el.textContent = Math.floor(current) + suffix
              }, 16)
            })
            counterObserver.unobserve(entry.target)
          }
        })
      }, { threshold: 0.5 })
      counterObserver.observe(counterSection)
    }

    document.getElementById('contactForm')?.addEventListener('submit', e => {
      e.preventDefault()
      const v = (id: string) => (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)?.value ?? ''
      const msg = encodeURIComponent(
        `Olá! Meu nome é ${v('nome')}.\nTelefone: ${v('telefone')}\nAssunto: ${v('assunto')}\nMensagem: ${v('mensagem')}`
      )
      window.open(`https://wa.me/5511999999999?text=${msg}`, '_blank')
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');

        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}

        :root{
          --primary:#2d6a4f;
          --primary-light:#40916c;
          --primary-dark:#1b4332;
          --accent:#d4a373;
          --accent-light:#e9c46a;
          --bg-light:#fefae0;
          --bg-white:#ffffff;
          --bg-section:#f8f9f0;
          --text-dark:#1a1a2e;
          --text-body:#4a4a5a;
          --text-light:#6b6b7b;
          --white:#ffffff;
          --shadow-sm:0 2px 8px rgba(0,0,0,.06);
          --shadow-md:0 4px 20px rgba(0,0,0,.08);
          --shadow-lg:0 8px 40px rgba(0,0,0,.12);
          --radius:16px;
          --radius-sm:8px;
          --tr:0.3s cubic-bezier(.4,0,.2,1);
        }

        html{scroll-behavior:smooth;font-size:16px}
        body{font-family:'Inter',sans-serif;color:var(--text-body);background:var(--bg-white);line-height:1.7;overflow-x:hidden}
        img{max-width:100%;display:block}
        a{text-decoration:none;color:inherit}
        ul{list-style:none}
        .container{max-width:1200px;margin:0 auto;padding:0 24px}

        h1,h2,h3,h4{font-family:'Outfit',sans-serif;color:var(--text-dark);line-height:1.2}
        h1{font-size:clamp(2.2rem,5vw,3.5rem);font-weight:700}
        h2{font-size:clamp(1.8rem,4vw,2.5rem);font-weight:600}
        h3{font-size:1.25rem;font-weight:600}

        .section-label{display:inline-block;font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:3px;color:var(--primary);background:rgba(45,106,79,.08);padding:6px 16px;border-radius:50px;margin-bottom:12px}
        .section-title{margin-bottom:16px}
        .section-desc{max-width:600px;margin:0 auto 48px;color:var(--text-light);font-size:1.05rem}

        .fade-up{opacity:0;transform:translateY(30px);transition:opacity .6s ease,transform .6s ease}
        .fade-up.visible{opacity:1;transform:translateY(0)}

        /* Navbar */
        .navbar{position:fixed;top:0;left:0;width:100%;z-index:1000;padding:16px 0;transition:var(--tr)}
        .navbar.scrolled{background:rgba(255,255,255,.95);backdrop-filter:blur(12px);box-shadow:var(--shadow-sm);padding:10px 0}
        .navbar .container{display:flex;align-items:center;justify-content:space-between}
        .navbar-logo{display:flex;align-items:center;gap:10px;font-family:'Outfit',sans-serif;font-size:1.4rem;font-weight:700;color:var(--white);transition:var(--tr)}
        .navbar.scrolled .navbar-logo{color:var(--primary-dark)}
        .logo-icon{width:36px;height:36px;background:var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem}
        .nav-links{display:flex;align-items:center;gap:32px}
        .nav-links a{font-size:.9rem;font-weight:500;color:rgba(255,255,255,.85);transition:var(--tr);position:relative}
        .navbar.scrolled .nav-links a{color:var(--text-body)}
        .nav-links a:hover{color:var(--white)}
        .navbar.scrolled .nav-links a:hover{color:var(--primary)}
        .nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--accent);transition:var(--tr)}
        .nav-links a:hover::after{width:100%}
        .nav-cta{padding:10px 24px!important;background:var(--primary)!important;color:var(--white)!important;border-radius:50px!important;font-weight:600!important}
        .nav-cta:hover{background:var(--primary-light)!important;transform:translateY(-2px);box-shadow:0 4px 15px rgba(45,106,79,.3)}
        .nav-cta::after{display:none!important}
        .menu-toggle{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
        .menu-toggle span{width:24px;height:2px;background:var(--white);border-radius:2px;transition:var(--tr)}
        .navbar.scrolled .menu-toggle span{background:var(--text-dark)}

        /* Hero */
        .hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden}
        .hero-bg{position:absolute;inset:0;z-index:0}
        .hero-bg img{width:100%;height:100%;object-fit:cover}
        .hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(27,67,50,.92),rgba(45,106,79,.75))}
        .hero .container{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:60px;padding-top:80px}
        .hero-content h1{color:var(--white);margin-bottom:20px}
        .hero-content h1 span{color:var(--accent-light)}
        .hero-content>p{color:rgba(255,255,255,.85);font-size:1.15rem;margin-bottom:36px;max-width:500px}
        .hero-buttons{display:flex;gap:16px;flex-wrap:wrap}
        .btn{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:50px;font-family:'Inter',sans-serif;font-size:.95rem;font-weight:600;cursor:pointer;border:none;transition:var(--tr)}
        .btn-primary{background:var(--accent);color:var(--text-dark)}
        .btn-primary:hover{background:var(--accent-light);transform:translateY(-3px);box-shadow:0 8px 25px rgba(212,163,115,.4)}
        .btn-outline{background:transparent;color:var(--white);border:2px solid rgba(255,255,255,.4)}
        .btn-outline:hover{border-color:var(--white);background:rgba(255,255,255,.1);transform:translateY(-3px)}
        .hero-image{display:flex;justify-content:center}
        .hero-image-wrapper{position:relative;width:380px;height:380px}
        .hero-image-wrapper img{width:100%;height:100%;object-fit:cover;object-position:top;border-radius:50%;border:5px solid rgba(255,255,255,.2);box-shadow:var(--shadow-lg)}
        .hero-image-wrapper::before{content:'';position:absolute;inset:-12px;border:2px dashed rgba(255,255,255,.2);border-radius:50%;animation:spin 20s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}
        .hero-stats{display:flex;gap:40px;margin-top:40px}
        .hero-stat{text-align:center}
        .hero-stat .number{font-family:'Outfit',sans-serif;font-size:2rem;font-weight:700;color:var(--accent-light);display:block}
        .hero-stat .label{font-size:.8rem;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:1px}

        /* Serviços */
        .services{padding:100px 0;background:var(--bg-section);text-align:center}
        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
        .service-card{background:var(--white);border-radius:var(--radius);padding:40px 28px;text-align:center;box-shadow:var(--shadow-sm);transition:var(--tr);position:relative;overflow:hidden}
        .service-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:4px;background:linear-gradient(90deg,var(--primary),var(--primary-light));transform:scaleX(0);transition:var(--tr)}
        .service-card:hover{transform:translateY(-8px);box-shadow:var(--shadow-lg)}
        .service-card:hover::before{transform:scaleX(1)}
        .service-icon{width:64px;height:64px;background:linear-gradient(135deg,var(--primary),var(--primary-light));border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:1.8rem;margin:0 auto 20px;transition:var(--tr)}
        .service-card:hover .service-icon{transform:scale(1.1) rotate(5deg)}
        .service-card h3{margin-bottom:12px}
        .service-card p{font-size:.93rem;color:var(--text-light)}

        /* Depoimentos */
        .testimonials{padding:100px 0;background:var(--bg-white);text-align:center}
        .testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
        .testimonial-card{background:var(--bg-section);border-radius:var(--radius);padding:36px 28px;text-align:left;position:relative;transition:var(--tr)}
        .testimonial-card:hover{transform:translateY(-5px);box-shadow:var(--shadow-md)}
        .testimonial-stars{color:var(--accent);font-size:1.1rem;margin-bottom:16px;letter-spacing:2px}
        .testimonial-card p{font-size:.95rem;font-style:italic;margin-bottom:20px;color:var(--text-body);line-height:1.7}
        .testimonial-author{display:flex;align-items:center;gap:12px}
        .testimonial-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-light));display:flex;align-items:center;justify-content:center;color:var(--white);font-weight:700;font-size:1rem;flex-shrink:0}
        .testimonial-author .name{font-weight:600;font-size:.95rem;color:var(--text-dark)}
        .testimonial-author .role{font-size:.8rem;color:var(--text-light)}

        /* Sobre */
        .about{padding:100px 0;background:var(--bg-white)}
        .about .container{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
        .about-image{position:relative}
        .about-image img{border-radius:var(--radius);box-shadow:var(--shadow-lg)}
        .about-image::before{content:'';position:absolute;bottom:-16px;left:-16px;width:100%;height:100%;border:3px solid var(--primary-light);border-radius:var(--radius);z-index:-1;opacity:.3}
        .about-content{padding-left:20px}
        .about-content p{margin-bottom:16px;font-size:1.02rem}
        .about-features{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:28px}
        .about-feature{display:flex;align-items:center;gap:10px;font-weight:500;font-size:.95rem;color:var(--text-dark)}
        .about-feature .icon{width:32px;height:32px;background:rgba(45,106,79,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}

        /* Contato */
        .contact{padding:100px 0;background:var(--bg-section);text-align:center}
        .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;text-align:left}
        .contact-info h3{font-size:1.5rem;margin-bottom:16px}
        .contact-info>p{margin-bottom:28px;color:var(--text-light)}
        .contact-item{display:flex;align-items:center;gap:14px;margin-bottom:20px}
        .contact-item .icon{width:44px;height:44px;background:rgba(45,106,79,.1);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
        .contact-item .text strong{display:block;font-size:.85rem;color:var(--text-dark)}
        .contact-item .text span{font-size:.9rem;color:var(--text-light)}
        .contact-form{background:var(--white);border-radius:var(--radius);padding:36px;box-shadow:var(--shadow-md)}
        .form-group{margin-bottom:18px}
        .form-group label{display:block;font-size:.85rem;font-weight:600;color:var(--text-dark);margin-bottom:6px}
        .form-group input,.form-group textarea,.form-group select{width:100%;padding:12px 16px;border:2px solid #e8e8ef;border-radius:var(--radius-sm);font-family:'Inter',sans-serif;font-size:.95rem;color:var(--text-dark);transition:var(--tr);background:var(--bg-white);appearance:none}
        .form-group input:focus,.form-group textarea:focus,.form-group select:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(45,106,79,.1)}
        .form-group textarea{resize:vertical;min-height:100px}
        .contact-form .btn{width:100%;justify-content:center}

        /* Footer */
        .footer{background:var(--text-dark);color:rgba(255,255,255,.6);padding:60px 0 24px}
        .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:48px;margin-bottom:40px}
        .footer-brand p{margin-top:12px;font-size:.9rem;line-height:1.7}
        .footer h4{color:var(--white);font-size:1rem;margin-bottom:16px}
        .footer-links a{display:block;padding:4px 0;font-size:.9rem;transition:var(--tr)}
        .footer-links a:hover{color:var(--accent);padding-left:6px}
        .footer-social{display:flex;gap:12px;margin-top:16px}
        .footer-social a{width:40px;height:40px;background:rgba(255,255,255,.08);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;transition:var(--tr)}
        .footer-social a:hover{background:var(--primary);transform:translateY(-3px)}
        .footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:20px;text-align:center;font-size:.85rem}

        /* WhatsApp */
        .whatsapp-float{position:fixed;bottom:28px;right:28px;width:60px;height:60px;background:#25d366;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.8rem;color:var(--white);box-shadow:0 4px 20px rgba(37,211,102,.4);z-index:999;transition:var(--tr);animation:pulse-wa 2s infinite}
        .whatsapp-float:hover{transform:scale(1.1);box-shadow:0 6px 30px rgba(37,211,102,.5)}
        @keyframes pulse-wa{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4)}50%{box-shadow:0 4px 30px rgba(37,211,102,.6)}}

        /* Responsive */
        @media(max-width:992px){
          .hero .container{grid-template-columns:1fr;text-align:center}
          .hero-content>p{margin:0 auto 36px}
          .hero-buttons{justify-content:center}
          .hero-image-wrapper{width:280px;height:280px}
          .hero-stats{justify-content:center}
          .about .container{grid-template-columns:1fr}
          .about-content{padding-left:0}
          .services-grid{grid-template-columns:1fr 1fr}
          .testimonials-grid{grid-template-columns:1fr 1fr}
          .contact-grid{grid-template-columns:1fr}
          .footer-grid{grid-template-columns:1fr 1fr}
        }
        @media(max-width:768px){
          .nav-links{display:none;position:fixed;top:0;left:0;width:100%;height:100vh;background:rgba(27,67,50,.98);flex-direction:column;justify-content:center;gap:24px;z-index:999}
          .nav-links.active{display:flex}
          .nav-links a{font-size:1.2rem;color:var(--white)!important}
          .menu-toggle{display:flex}
          .services-grid{grid-template-columns:1fr}
          .testimonials-grid{grid-template-columns:1fr}
          .footer-grid{grid-template-columns:1fr}
          .hero-stats{gap:24px}
          .about-features{grid-template-columns:1fr}
        }
      `}</style>

      {/* ===== NAVBAR ===== */}
      <nav className="navbar" id="navbar">
        <div className="container">
          <a href="#" className="navbar-logo">
            <span className="logo-icon">🥑</span>
            Dra. Camila
          </a>
          <ul className="nav-links" id="navLinks">
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#depoimentos">Depoimentos</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
            <li><a href={WA} target="_blank" className="nav-cta">Agendar Consulta</a></li>
          </ul>
          <button className="menu-toggle" id="menuToggle" aria-label="Abrir menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80" alt="Alimentos saudáveis" />
        </div>
        <div className="container">
          <div className="hero-content fade-up">
            <h1>Transforme sua <span>saúde</span> através da alimentação</h1>
            <p>Atendimento nutricional personalizado para você alcançar seus objetivos com equilíbrio, prazer e resultados duradouros.</p>
            <div className="hero-buttons">
              <a href={WA} target="_blank" className="btn btn-primary">📅 Agendar Consulta</a>
              <a href="#sobre" className="btn btn-outline">Saiba Mais</a>
            </div>
            <div className="hero-stats">
              {[
                { count: 1500, suffix: '+', label: 'Pacientes' },
                { count: 10, suffix: ' anos', label: 'Experiência' },
                { count: 98, suffix: '%', label: 'Satisfação' },
              ].map((s, i) => (
                <div className="hero-stat" key={i}>
                  <span className="number" data-count={s.count} data-suffix={s.suffix}>0</span>
                  <span className="label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-image fade-up">
            <div className="hero-image-wrapper">
              <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=85" alt="Dra. Camila Silva — Nutricionista" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section className="services" id="servicos">
        <div className="container">
          <span className="section-label fade-up">Serviços</span>
          <h2 className="section-title fade-up">Como posso te ajudar</h2>
          <p className="section-desc fade-up">Ofereço atendimento especializado e personalizado para diversas necessidades nutricionais.</p>
          <div className="services-grid">
            {[
              { icon: '🍃', title: 'Nutrição Funcional', desc: 'Tratamento focado na causa raiz dos sintomas, utilizando alimentos como ferramenta terapêutica para restaurar o equilíbrio do organismo.' },
              { icon: '⚖️', title: 'Emagrecimento Saudável', desc: 'Plano alimentar personalizado para perda de peso sustentável, sem dietas restritivas, com foco em mudança de hábitos duradoura.' },
              { icon: '🏋️', title: 'Nutrição Esportiva', desc: 'Otimize sua performance e recuperação com uma alimentação estratégica, adaptada ao seu tipo de treino e objetivos atléticos.' },
              { icon: '🤰', title: 'Nutrição Materno-Infantil', desc: 'Acompanhamento nutricional para gestantes, lactantes e crianças, garantindo nutrição adequada em cada fase do desenvolvimento.' },
              { icon: '🧠', title: 'Comportamento Alimentar', desc: 'Trabalho com reeducação alimentar e mindful eating para construir uma relação saudável e consciente com a comida.' },
              { icon: '🧪', title: 'Nutrição Clínica', desc: 'Tratamento nutricional para condições clínicas como diabetes, hipertensão, intolerâncias alimentares e doenças autoimunes.' },
            ].map((s, i) => (
              <div className="service-card fade-up" key={i}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEPOIMENTOS ===== */}
      <section className="testimonials" id="depoimentos">
        <div className="container">
          <span className="section-label fade-up">Depoimentos</span>
          <h2 className="section-title fade-up">O que meus pacientes dizem</h2>
          <p className="section-desc fade-up">Histórias reais de transformação e resultados.</p>
          <div className="testimonials-grid">
            {[
              { initials: 'MR', name: 'Maria Rodrigues', role: 'Paciente há 1 ano', text: '"A Dra. Camila mudou completamente minha relação com a comida. Perdi 15kg em 6 meses sem passar fome e hoje me sinto mais saudável do que nunca!"' },
              { initials: 'RF', name: 'Ricardo Ferreira', role: 'Atleta amador', text: '"Depois que comecei o acompanhamento, minha performance no treino melhorou absurdamente. A nutrição esportiva fez toda a diferença!"' },
              { initials: 'AS', name: 'Ana Santos', role: 'Paciente há 2 anos', text: '"Atendimento incrível! A Dra. Camila é super atenciosa e o plano alimentar é delicioso. Finalmente consegui controlar minha glicemia."' },
            ].map((t, i) => (
              <div className="testimonial-card fade-up" key={i}>
                <div className="testimonial-stars">★★★★★</div>
                <p>{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="name">{t.name}</div>
                    <div className="role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOBRE ===== */}
      <section className="about" id="sobre">
        <div className="container">
          <div className="about-image fade-up">
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80" alt="Refeições saudáveis preparadas" />
          </div>
          <div className="about-content fade-up">
            <span className="section-label">Sobre Mim</span>
            <h2 className="section-title">Uma abordagem humanizada para sua nutrição</h2>
            <p>Sou a Dra. Camila Silva, nutricionista formada pela USP com especialização em Nutrição Funcional e Comportamento Alimentar. Há mais de 10 anos ajudo pessoas a transformarem sua relação com a comida.</p>
            <p>Meu método é baseado em ciência, empatia e personalização. Acredito que cada pessoa é única e merece um plano alimentar que respeite seu corpo, sua rotina e seus gostos.</p>
            <div className="about-features">
              {[
                { icon: '🎓', text: 'CRN-3/12345' },
                { icon: '🏥', text: 'Pós-graduada em Nutrição Funcional' },
                { icon: '💻', text: 'Atendimento Online e Presencial' },
                { icon: '❤️', text: 'Abordagem Humanizada' },
              ].map(f => (
                <div className="about-feature" key={f.text}>
                  <span className="icon">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTATO ===== */}
      <section className="contact" id="contato">
        <div className="container">
          <span className="section-label fade-up">Contato</span>
          <h2 className="section-title fade-up">Agende sua consulta</h2>
          <p className="section-desc fade-up">Entre em contato e comece sua jornada de transformação.</p>
          <div className="contact-grid">
            <div className="contact-info fade-up">
              <h3>Informações de Contato</h3>
              <p>Estou disponível para atendimento presencial e online. Entre em contato pelo canal que preferir.</p>
              {[
                { icon: '📍', label: 'Endereço', text: 'Av. Paulista, 1000 — Sala 512, São Paulo' },
                { icon: '📱', label: 'WhatsApp', text: '(11) 99999-9999' },
                { icon: '✉️', label: 'E-mail', text: 'contato@dracamilanutri.com.br' },
                { icon: '🕐', label: 'Horário', text: 'Seg–Sex 8h às 18h · Sáb 8h às 12h' },
              ].map(c => (
                <div className="contact-item" key={c.label}>
                  <span className="icon">{c.icon}</span>
                  <div className="text"><strong>{c.label}</strong><span>{c.text}</span></div>
                </div>
              ))}
            </div>
            <form className="contact-form fade-up" id="contactForm">
              <div className="form-group">
                <label htmlFor="nome">Nome Completo</label>
                <input type="text" id="nome" placeholder="Seu nome completo" required />
              </div>
              <div className="form-group">
                <label htmlFor="telefone">Telefone / WhatsApp</label>
                <input type="tel" id="telefone" placeholder="(00) 00000-0000" required />
              </div>
              <div className="form-group">
                <label htmlFor="assunto">Assunto</label>
                <select id="assunto" required defaultValue="">
                  <option value="" disabled>Selecione um serviço</option>
                  <option>Nutrição Funcional</option>
                  <option>Emagrecimento Saudável</option>
                  <option>Nutrição Esportiva</option>
                  <option>Nutrição Materno-Infantil</option>
                  <option>Comportamento Alimentar</option>
                  <option>Nutrição Clínica</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="mensagem">Mensagem</label>
                <textarea id="mensagem" placeholder="Conte um pouco sobre seus objetivos..." />
              </div>
              <button type="submit" className="btn btn-primary">Enviar pelo WhatsApp 💬</button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="navbar-logo" style={{color:'#fff',fontSize:'1.3rem'}}>
                <span className="logo-icon">🥑</span>
                Dra. Camila Silva
              </a>
              <p>Nutricionista CRN-3/12345. Especialista em nutrição funcional e comportamento alimentar. Transformando vidas através da alimentação consciente.</p>
              <div className="footer-social">
                <a href="#" aria-label="Instagram">📸</a>
                <a href="#" aria-label="Facebook">👤</a>
                <a href="#" aria-label="YouTube">🎬</a>
                <a href={WA} target="_blank" aria-label="WhatsApp">💬</a>
              </div>
            </div>
            <div>
              <h4>Links Rápidos</h4>
              <div className="footer-links">
                <a href="#servicos">Serviços</a>
                <a href="#depoimentos">Depoimentos</a>
                <a href="#sobre">Sobre</a>
                <a href="#contato">Contato</a>
              </div>
            </div>
            <div>
              <h4>Serviços</h4>
              <div className="footer-links">
                <a href="#servicos">Nutrição Funcional</a>
                <a href="#servicos">Emagrecimento</a>
                <a href="#servicos">Nutrição Esportiva</a>
                <a href="#servicos">Nutrição Clínica</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Dra. Camila Silva Nutricionista. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* ===== WHATSAPP FLUTUANTE ===== */}
      <a href={WA} target="_blank" className="whatsapp-float" aria-label="Falar no WhatsApp">💬</a>
    </>
  )
}
