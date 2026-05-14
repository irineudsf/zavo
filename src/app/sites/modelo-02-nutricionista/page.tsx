'use client'

import { useEffect } from 'react'

const WA = 'https://wa.me/5511994567890?text=Olá!%20Vim%20pelo%20site%20da%20Nutri%20Vida%20Plena%20e%20gostaria%20de%20agendar%20uma%20consulta.'

export default function Modelo02Nutricionista() {
  useEffect(() => {
    const navbar = document.getElementById('navbar')
    const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 50)
    window.addEventListener('scroll', onScroll)

    const toggle = document.getElementById('menuToggle')
    const links = document.getElementById('navLinks')
    toggle?.addEventListener('click', () => links?.classList.toggle('active'))
    links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('active')))

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => observer.observe(el))

    document.querySelectorAll<HTMLElement>('.number[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count ?? '0')
      const suffix = el.dataset.suffix ?? ''
      let n = 0
      const step = target / 60
      const t = setInterval(() => {
        n = Math.min(n + step, target)
        el.textContent = Math.floor(n) + suffix
        if (n >= target) clearInterval(t)
      }, 30)
    })

    document.getElementById('contactForm')?.addEventListener('submit', e => {
      e.preventDefault()
      const v = (id: string) => (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)?.value ?? ''
      const msg = `Olá!%20Vim%20pelo%20site.%0ANome:%20${encodeURIComponent(v('nome'))}%0ATelefone:%20${encodeURIComponent(v('telefone'))}%0AObjetivo:%20${encodeURIComponent(v('assunto'))}%0AMensagem:%20${encodeURIComponent(v('mensagem'))}`
      window.open(`https://wa.me/5511994567890?text=${msg}`, '_blank')
    })

    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');

        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}

        :root{
          --primary:#15803d;
          --primary-light:#16a34a;
          --primary-dark:#14532d;
          --accent:#4ade80;
          --accent-warm:#d4a373;
          --bg-white:#ffffff;
          --bg-section:#f0fdf4;
          --bg-warm:#fefce8;
          --text-dark:#0f1f14;
          --text-body:#374151;
          --text-light:#6b7280;
          --white:#ffffff;
          --shadow-sm:0 2px 8px rgba(0,0,0,.05);
          --shadow-md:0 4px 24px rgba(0,0,0,.08);
          --shadow-lg:0 12px 48px rgba(0,0,0,.12);
          --radius:20px;
          --radius-sm:10px;
          --tr:0.35s cubic-bezier(.4,0,.2,1);
        }

        html{scroll-behavior:smooth}
        body{font-family:'Inter',sans-serif;color:var(--text-body);background:var(--bg-white);line-height:1.75;overflow-x:hidden}
        img{max-width:100%;display:block}
        a{text-decoration:none;color:inherit}
        ul{list-style:none}
        .container{max-width:1200px;margin:0 auto;padding:0 28px}

        h1,h2,h3{font-family:'Playfair Display',serif;color:var(--text-dark);line-height:1.2}
        h4,h5{font-family:'Inter',sans-serif;color:var(--text-dark)}
        h1{font-size:clamp(2.4rem,5.5vw,3.8rem);font-weight:700}
        h2{font-size:clamp(2rem,4vw,2.8rem);font-weight:700}
        h3{font-size:1.3rem;font-weight:600}

        .section-label{display:inline-flex;align-items:center;gap:8px;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:3px;color:var(--primary);background:rgba(21,128,61,.08);padding:7px 18px;border-radius:50px;margin-bottom:16px}
        .section-label::before{content:'';width:6px;height:6px;background:var(--primary);border-radius:50%;display:block}
        .section-title{margin-bottom:16px}
        .section-desc{max-width:580px;margin:0 auto 52px;color:var(--text-light);font-size:1.05rem;line-height:1.8}

        /* Animações */
        .fade-up{opacity:0;transform:translateY(32px);transition:opacity .65s ease,transform .65s ease}
        .fade-up.visible{opacity:1;transform:translateY(0)}
        .fade-left{opacity:0;transform:translateX(-36px);transition:opacity .65s ease,transform .65s ease}
        .fade-left.visible{opacity:1;transform:translateX(0)}
        .fade-right{opacity:0;transform:translateX(36px);transition:opacity .65s ease,transform .65s ease}
        .fade-right.visible{opacity:1;transform:translateX(0)}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes pulse-wa{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4)}50%{box-shadow:0 4px 35px rgba(37,211,102,.65)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}

        /* Navbar */
        .navbar{position:fixed;top:0;left:0;width:100%;z-index:1000;padding:18px 0;transition:var(--tr)}
        .navbar.scrolled{background:rgba(255,255,255,.97);backdrop-filter:blur(14px);box-shadow:0 1px 24px rgba(0,0,0,.07);padding:11px 0}
        .navbar .container{display:flex;align-items:center;justify-content:space-between}
        .navbar-logo{display:flex;align-items:center;gap:11px;font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:700;color:var(--white);transition:var(--tr)}
        .navbar.scrolled .navbar-logo{color:var(--primary-dark)}
        .logo-leaf{width:38px;height:38px;background:linear-gradient(135deg,var(--primary),var(--primary-light));border-radius:50% 10px 50% 10px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
        .nav-links{display:flex;align-items:center;gap:34px}
        .nav-links a{font-size:.88rem;font-weight:500;color:rgba(255,255,255,.88);transition:var(--tr);position:relative}
        .navbar.scrolled .nav-links a{color:var(--text-body)}
        .nav-links a::after{content:'';position:absolute;bottom:-5px;left:0;width:0;height:2px;background:var(--accent);border-radius:2px;transition:var(--tr)}
        .nav-links a:hover::after{width:100%}
        .navbar.scrolled .nav-links a:hover{color:var(--primary)}
        .nav-cta{padding:11px 26px!important;background:var(--primary)!important;color:var(--white)!important;border-radius:50px!important;font-weight:600!important;letter-spacing:.3px}
        .nav-cta:hover{background:var(--primary-light)!important;transform:translateY(-2px);box-shadow:0 5px 18px rgba(21,128,61,.35)}
        .nav-cta::after{display:none!important}
        .menu-toggle{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
        .menu-toggle span{width:24px;height:2px;background:var(--white);border-radius:2px;transition:var(--tr)}
        .navbar.scrolled .menu-toggle span{background:var(--text-dark)}

        /* Hero */
        .hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden}
        .hero-bg{position:absolute;inset:0;z-index:0}
        .hero-bg img{width:100%;height:100%;object-fit:cover;object-position:center}
        .hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(20,83,45,.94) 0%,rgba(21,128,61,.80) 60%,rgba(21,128,61,.55) 100%)}
        .hero .container{position:relative;z-index:1;display:grid;grid-template-columns:1.1fr 0.9fr;align-items:center;gap:56px;padding-top:90px;padding-bottom:70px}
        .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:3px;color:var(--accent);margin-bottom:20px}
        .hero-eyebrow-dot{width:8px;height:8px;background:var(--accent);border-radius:50%;animation:float 3s ease-in-out infinite}
        .hero-content h1{color:var(--white);margin-bottom:22px}
        .hero-content h1 em{font-style:italic;color:var(--accent)}
        .hero-content>p{color:rgba(255,255,255,.85);font-size:1.15rem;margin-bottom:38px;max-width:480px;line-height:1.8}
        .hero-buttons{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:44px}
        .btn{display:inline-flex;align-items:center;gap:9px;padding:15px 34px;border-radius:50px;font-family:'Inter',sans-serif;font-size:.95rem;font-weight:600;cursor:pointer;border:none;transition:var(--tr);letter-spacing:.2px}
        .btn-primary{background:var(--accent-warm);color:var(--text-dark)}
        .btn-primary:hover{filter:brightness(1.08);transform:translateY(-3px);box-shadow:0 10px 28px rgba(212,163,115,.45)}
        .btn-outline{background:transparent;color:var(--white);border:2px solid rgba(255,255,255,.4)}
        .btn-outline:hover{border-color:var(--white);background:rgba(255,255,255,.1);transform:translateY(-3px)}
        .hero-stats{display:flex;gap:0;border-top:1px solid rgba(255,255,255,.15);padding-top:28px}
        .hero-stat{flex:1;text-align:center;padding:0 16px;border-right:1px solid rgba(255,255,255,.15)}
        .hero-stat:last-child{border-right:none}
        .hero-stat .number{font-family:'Playfair Display',serif;font-size:2.1rem;font-weight:700;color:var(--accent);display:block;line-height:1}
        .hero-stat .label{font-size:.78rem;color:rgba(255,255,255,.65);text-transform:uppercase;letter-spacing:1.5px;margin-top:5px;display:block}
        /* Imagem lateral — retangular, mosaic de fotos */
        .hero-image{display:flex;align-items:center;justify-content:center}
        .hero-img-mosaic{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;width:100%;max-width:460px}
        .hero-img-mosaic .img-main{grid-column:1/2;grid-row:1/3;border-radius:var(--radius) var(--radius-sm) var(--radius-sm) var(--radius);overflow:hidden;height:380px}
        .hero-img-mosaic .img-main img{width:100%;height:100%;object-fit:cover}
        .hero-img-mosaic .img-sm{border-radius:var(--radius-sm);overflow:hidden}
        .hero-img-mosaic .img-sm img{width:100%;height:100%;object-fit:cover;height:184px}
        .hero-badge{position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:var(--white);border-radius:50px;padding:10px 20px;display:flex;align-items:center;gap:8px;box-shadow:var(--shadow-md);white-space:nowrap;font-size:.82rem;font-weight:600;color:var(--primary-dark)}
        .hero-badge .stars{color:#f59e0b;letter-spacing:1px}

        /* Serviços */
        .services{padding:108px 0;background:var(--bg-section);text-align:center}
        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:8px}
        .service-card{background:var(--white);border-radius:var(--radius);padding:40px 30px;text-align:left;box-shadow:var(--shadow-sm);transition:var(--tr);position:relative;overflow:hidden;cursor:default}
        .service-card::before{content:'';position:absolute;top:0;left:0;width:4px;height:0;background:linear-gradient(180deg,var(--primary),var(--accent));transition:height .4s ease}
        .service-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg)}
        .service-card:hover::before{height:100%}
        .service-num{font-family:'Playfair Display',serif;font-size:3.5rem;font-weight:700;color:rgba(21,128,61,.08);position:absolute;top:16px;right:24px;line-height:1}
        .service-icon-wrap{width:56px;height:56px;background:linear-gradient(135deg,rgba(21,128,61,.1),rgba(21,128,61,.06));border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.6rem;margin-bottom:20px;transition:var(--tr)}
        .service-card:hover .service-icon-wrap{background:linear-gradient(135deg,var(--primary),var(--primary-light));transform:scale(1.08) rotate(-3deg)}
        .service-card h3{margin-bottom:10px;font-size:1.1rem;font-family:'Inter',sans-serif;font-weight:700}
        .service-card p{font-size:.9rem;color:var(--text-light);line-height:1.75}
        .service-tag{display:inline-block;margin-top:16px;font-size:.78rem;font-weight:600;color:var(--primary);background:rgba(21,128,61,.08);padding:5px 12px;border-radius:50px}

        /* Depoimentos */
        .testimonials{padding:108px 0;background:var(--bg-section);text-align:center}
        .testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .testimonial-card{background:var(--white);border-radius:var(--radius);padding:36px 30px;text-align:left;transition:var(--tr);position:relative}
        .testimonial-card::after{content:'"';position:absolute;top:20px;right:28px;font-family:'Playfair Display',serif;font-size:5rem;color:rgba(21,128,61,.07);line-height:1}
        .testimonial-card:hover{transform:translateY(-5px);box-shadow:var(--shadow-md)}
        .testimonial-stars{color:#f59e0b;font-size:1rem;margin-bottom:14px;letter-spacing:2px}
        .testimonial-result{display:inline-block;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--primary);background:rgba(21,128,61,.08);padding:4px 12px;border-radius:50px;margin-bottom:14px}
        .testimonial-card p.text{font-size:.94rem;font-style:italic;margin-bottom:22px;color:var(--text-body);line-height:1.78}
        .testimonial-author{display:flex;align-items:center;gap:12px}
        .testimonial-avatar{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-light));display:flex;align-items:center;justify-content:center;color:var(--white);font-weight:700;font-size:.95rem;flex-shrink:0;font-family:'Playfair Display',serif}
        .testimonial-author .name{font-weight:700;font-size:.93rem;color:var(--text-dark)}
        .testimonial-author .role{font-size:.78rem;color:var(--text-light)}

        /* Sobre */
        .about{padding:108px 0;background:var(--bg-white)}
        .about .container{display:grid;grid-template-columns:1fr 1.05fr;gap:72px;align-items:center}
        .about-img-wrap{position:relative}
        .about-img-wrap img{border-radius:var(--radius);box-shadow:var(--shadow-lg);width:100%;aspect-ratio:3/4;object-fit:cover;object-position:top}
        .about-img-wrap::before{content:'';position:absolute;bottom:-18px;right:-18px;width:80%;height:80%;border:3px solid rgba(21,128,61,.2);border-radius:var(--radius);z-index:-1}
        .about-img-wrap::after{content:'🌿';position:absolute;top:-16px;left:-16px;width:50px;height:50px;background:var(--bg-section);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;box-shadow:var(--shadow-md)}
        .about-creds{display:flex;gap:24px;flex-wrap:wrap;margin:24px 0 32px}
        .cred-pill{display:flex;align-items:center;gap:8px;background:var(--bg-section);padding:10px 16px;border-radius:50px;font-size:.83rem;font-weight:600;color:var(--primary-dark)}
        .cred-pill span{font-size:1rem}
        .about-content p{margin-bottom:18px;font-size:1.02rem;color:var(--text-body);line-height:1.85}

        /* Contato */
        .contact{padding:108px 0;background:var(--bg-section);text-align:center}
        .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:52px;text-align:left}
        .contact-info h3{font-family:'Playfair Display',serif;font-size:1.6rem;margin-bottom:16px;font-weight:700}
        .contact-info>p{margin-bottom:30px;color:var(--text-light);font-size:1rem}
        .contact-item{display:flex;align-items:center;gap:15px;margin-bottom:22px}
        .contact-icon{width:46px;height:46px;background:rgba(21,128,61,.1);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.25rem;flex-shrink:0}
        .contact-item .text strong{display:block;font-size:.83rem;font-weight:700;color:var(--text-dark);margin-bottom:2px}
        .contact-item .text span{font-size:.9rem;color:var(--text-light)}
        .contact-form{background:var(--white);border-radius:var(--radius);padding:38px;box-shadow:var(--shadow-md)}
        .form-group{margin-bottom:18px}
        .form-group label{display:block;font-size:.83rem;font-weight:700;color:var(--text-dark);margin-bottom:7px;letter-spacing:.2px}
        .form-group input,.form-group textarea,.form-group select{width:100%;padding:13px 16px;border:2px solid #e5e7eb;border-radius:var(--radius-sm);font-family:'Inter',sans-serif;font-size:.95rem;color:var(--text-dark);transition:var(--tr);background:var(--bg-white);appearance:none}
        .form-group input:focus,.form-group textarea:focus,.form-group select:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 4px rgba(21,128,61,.1)}
        .form-group textarea{resize:vertical;min-height:100px}
        .contact-form .btn{width:100%;justify-content:center;margin-top:4px}

        /* Footer */
        .footer{background:#0a1f0f;color:rgba(255,255,255,.55);padding:64px 0 26px}
        .footer-grid{display:grid;grid-template-columns:2.2fr 1fr 1fr;gap:52px;margin-bottom:44px}
        .footer-brand p{margin-top:14px;font-size:.88rem;line-height:1.8}
        .footer h4{color:var(--white);font-size:.93rem;font-weight:700;margin-bottom:18px;text-transform:uppercase;letter-spacing:1px}
        .footer-links a{display:block;padding:4px 0;font-size:.88rem;transition:var(--tr)}
        .footer-links a:hover{color:var(--accent);padding-left:7px}
        .footer-social{display:flex;gap:10px;margin-top:18px}
        .footer-social a{width:40px;height:40px;background:rgba(255,255,255,.07);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;transition:var(--tr)}
        .footer-social a:hover{background:var(--primary);transform:translateY(-3px)}
        .footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:22px;text-align:center;font-size:.83rem}

        /* WhatsApp */
        .whatsapp-float{position:fixed;bottom:28px;right:28px;width:62px;height:62px;background:#25d366;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.9rem;color:var(--white);z-index:999;transition:var(--tr);animation:pulse-wa 2.2s infinite;box-shadow:0 4px 20px rgba(37,211,102,.4)}
        .whatsapp-float:hover{transform:scale(1.12);box-shadow:0 6px 32px rgba(37,211,102,.55)}

        /* Responsive */
        @media(max-width:992px){
          .hero .container{grid-template-columns:1fr;text-align:center;padding-bottom:80px}
          .hero-content>p,.hero-eyebrow{margin-left:auto;margin-right:auto}
          .hero-buttons{justify-content:center}
          .hero-stats{justify-content:center}
          .hero-image{margin-top:20px}
          .hero-img-mosaic{max-width:380px;margin:0 auto}
          .metodo-grid,.about .container{grid-template-columns:1fr}
          .services-grid{grid-template-columns:1fr 1fr}
          .testimonials-grid{grid-template-columns:1fr 1fr}
          .contact-grid{grid-template-columns:1fr}
          .footer-grid{grid-template-columns:1fr 1fr}
        }
        @media(max-width:768px){
          .nav-links{display:none;position:fixed;top:0;left:0;width:100%;height:100vh;background:rgba(20,83,45,.98);flex-direction:column;justify-content:center;gap:26px;z-index:999}
          .nav-links.active{display:flex}
          .nav-links a{font-size:1.25rem;color:var(--white)!important}
          .menu-toggle{display:flex}
          .services-grid,.testimonials-grid{grid-template-columns:1fr}
          .footer-grid{grid-template-columns:1fr}
          .hero-stats{flex-wrap:wrap;gap:0}
          .hero-stat{min-width:50%;border-right:none;border-bottom:1px solid rgba(255,255,255,.12);padding:14px 0}
          .hero-stat:nth-child(odd){border-right:1px solid rgba(255,255,255,.12)}
        }
      `}</style>

      {/* ===== NAVBAR ===== */}
      <nav className="navbar" id="navbar">
        <div className="container">
          <a href="#" className="navbar-logo">
            <span className="logo-leaf">🌿</span>
            Nutri Vida Plena
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
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80" alt="Alimentos saudáveis e coloridos" />
        </div>
        <div className="container">
          <div className="hero-content fade-left">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              CRN-3 · 57204 · Vila Madalena, São Paulo
            </div>
            <h1>
              Comer bem é o ato mais <em>amoroso</em> que existe
            </h1>
            <p>
              Atendimento nutricional personalizado que respeita seu corpo, sua rotina e seus gostos. Sem dietas restritivas, com resultados reais e duradouros.
            </p>
            <div className="hero-buttons">
              <a href={WA} target="_blank" className="btn btn-primary">📅 Agendar Consulta Grátis</a>
              <a href="#metodo" className="btn btn-outline">Como funciona</a>
            </div>
            <div className="hero-stats">
              {[
                { count: 1400, suffix: '+', label: 'Pacientes' },
                { count: 8, suffix: ' anos', label: 'Experiência' },
                { count: 97, suffix: '%', label: 'Satisfação' },
                { count: 3, suffix: 'x', label: 'Prêmios CRN' },
              ].map((s, i) => (
                <div className="hero-stat" key={i}>
                  <span className="number" data-count={s.count} data-suffix={s.suffix}>0{s.suffix}</span>
                  <span className="label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-image fade-right">
            <div className="hero-img-mosaic" style={{position:'relative'}}>
              <div className="img-main">
                <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=85" alt="Refeição saudável e colorida" />
              </div>
              <div className="img-sm">
                <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&q=85" alt="Bowl nutritivo" />
              </div>
              <div className="img-sm">
                <img src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500&q=85" alt="Frutas e verduras" />
              </div>
              <div className="hero-badge fade-up">
                <span className="stars">★★★★★</span>
                <span>4.9 · 287 avaliações no Google</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section className="services" id="servicos">
        <div className="container">
          <span className="section-label fade-up">Especialidades</span>
          <h2 className="section-title fade-up">Como posso transformar<br />sua relação com a comida</h2>
          <p className="section-desc fade-up">Cada pessoa é única. Por isso cada plano é criado do zero, respeitando seu biotipo, rotina e objetivos.</p>
          <div className="services-grid">
            {[
              { icon: '⚖️', title: 'Emagrecimento Saudável', desc: 'Perda de peso sustentável sem passar fome. Plano adaptado à sua rotina, com alimentos que você já gosta.', tag: '+ Procurado', n: '01' },
              { icon: '🧬', title: 'Nutrição Funcional', desc: 'Tratamento da causa raiz dos sintomas usando alimentos como medicina. Inflamação, intestino, energia e sono.', tag: 'Alta eficácia', n: '02' },
              { icon: '🏃', title: 'Nutrição Esportiva', desc: 'Performance máxima no treino e recuperação acelerada. Estratégias nutricionais para atletas e praticantes.', tag: 'Resultados rápidos', n: '03' },
              { icon: '🤰', title: 'Nutrição Materno-Infantil', desc: 'Acompanhamento especializado na gestação, amamentação e introdução alimentar do bebê com segurança.', tag: 'Cuidado especial', n: '04' },
              { icon: '🧠', title: 'Comportamento Alimentar', desc: 'Trabalho com Mindful Eating para acabar com a compulsão, ansiedade e a relação difícil com a comida.', tag: 'Abordagem única', n: '05' },
              { icon: '🩺', title: 'Nutrição Clínica', desc: 'Controle nutricional para diabetes, hipertensão, SII, doenças autoimunes e outras condições de saúde.', tag: 'Saúde integral', n: '06' },
            ].map((s, i) => (
              <div key={i} className="service-card fade-up" style={{transitionDelay:`${i * 0.08}s`}}>
                <span className="service-num">{s.n}</span>
                <div className="service-icon-wrap">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="service-tag">{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEPOIMENTOS ===== */}
      <section className="testimonials" id="depoimentos">
        <div className="container">
          <span className="section-label fade-up">Resultados reais</span>
          <h2 className="section-title fade-up">Histórias que me<br />enchem de orgulho</h2>
          <p className="section-desc fade-up">⭐⭐⭐⭐⭐ 4.9 no Google · 287 avaliações</p>
          <div className="testimonials-grid">
            {[
              { initials: 'RC', name: 'Roberta Campos', role: 'Emagrecimento — perdeu 18kg', result: '−18 kg em 5 meses', text: '"Tentei de tudo durante 6 anos. Com a Dra. Beatriz foi diferente desde a primeira consulta — ela me entendeu de verdade. Não foi uma dieta, foi uma mudança de vida. Já faz 1 ano e não recuperei nada."' },
              { initials: 'FS', name: 'Felipe Santos', role: 'Nutrição Esportiva', result: 'Performance +40%', text: '"Meu rendimento no crossfit deu um salto depois que comecei o acompanhamento. Perdi gordura, ganhei massa e ainda reduzi o tempo de recuperação. Nunca me senti tão bem nos treinos."' },
              { initials: 'AM', name: 'Ana Martins', role: 'Comportamento Alimentar', result: 'Sem compulsão há 14 meses', text: '"Tinha compulsão por doces há anos. A Dra. Beatriz me ajudou a entender de onde vinha esse comportamento e trabalhou comigo de uma forma que nenhum outro profissional tinha feito. Hoje me sinto livre."' },
            ].map((t, i) => (
              <div key={i} className="testimonial-card fade-up" style={{transitionDelay:`${i * 0.12}s`}}>
                <div className="testimonial-stars">★★★★★</div>
                <div className="testimonial-result">{t.result}</div>
                <p className="text">{t.text}</p>
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
          <div className="about-img-wrap fade-left">
            <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=700&q=85" alt="Dra. Beatriz Mendonça — Nutricionista" />
          </div>
          <div className="fade-right">
            <span className="section-label">Sobre mim</span>
            <h2 className="section-title">Dra. Beatriz<br />Mendonça</h2>
            <div className="about-creds">
              {[
                { e: '🎓', t: 'CRN-3 · 57204' },
                { e: '🏛️', t: 'USP — Nutrição' },
                { e: '🧬', t: 'Nutrição Funcional' },
                { e: '📍', t: 'Vila Madalena, SP' },
              ].map(c => (
                <div className="cred-pill" key={c.t}><span>{c.e}</span>{c.t}</div>
              ))}
            </div>
            <p>
              Sou nutricionista formada pela USP com pós-graduação em Nutrição Funcional e Comportamento Alimentar. Nesses 8 anos de carreira, aprendi que cada paciente carrega uma história — e é essa história que precisa ser compreendida antes de qualquer plano alimentar.
            </p>
            <p>
              Meu trabalho vai além de montar uma dieta. Quero que você construa uma relação de respeito e prazer com a comida. Porque comer bem não precisa ser um sacrifício — pode ser, e deve ser, um ato de cuidado e alegria.
            </p>
            <p style={{marginBottom:'32px'}}>
              Atendo de forma presencial em Vila Madalena e online para todo o Brasil.
            </p>
            <a href={WA} target="_blank" className="btn btn-primary">
              🌿 Agendar consulta com a Dra. Beatriz
            </a>
          </div>
        </div>
      </section>

      {/* ===== CONTATO ===== */}
      <section className="contact" id="contato">
        <div className="container">
          <span className="section-label fade-up">Contato</span>
          <h2 className="section-title fade-up">Vamos conversar?</h2>
          <p className="section-desc fade-up">Atendimento presencial em Vila Madalena e online para todo o Brasil.</p>
          <div className="contact-grid">
            <div className="contact-info fade-left">
              <h3>Informações</h3>
              <p>Escolha o canal que preferir — estou aqui para te atender com atenção e cuidado.</p>
              {[
                { icon: '📍', label: 'Endereço', text: 'R. Harmonia, 287 · Vila Madalena, São Paulo' },
                { icon: '📱', label: 'WhatsApp', text: '(11) 99456-7890' },
                { icon: '🕐', label: 'Horário', text: 'Seg–Sex 8h às 19h · Sáb 8h às 13h' },
                { icon: '💻', label: 'Online', text: 'Atendimento em todo o Brasil' },
              ].map(c => (
                <div className="contact-item" key={c.label}>
                  <span className="contact-icon">{c.icon}</span>
                  <div className="text"><strong>{c.label}</strong><span>{c.text}</span></div>
                </div>
              ))}
              <a href={WA} target="_blank" className="btn btn-primary" style={{marginTop:'8px',display:'inline-flex'}}>
                💬 Falar no WhatsApp agora
              </a>
            </div>
            <form className="contact-form fade-right" id="contactForm">
              <div className="form-group">
                <label htmlFor="nome">Nome Completo</label>
                <input type="text" id="nome" placeholder="Como prefere ser chamado(a)?" required />
              </div>
              <div className="form-group">
                <label htmlFor="telefone">WhatsApp</label>
                <input type="tel" id="telefone" placeholder="(00) 00000-0000" required />
              </div>
              <div className="form-group">
                <label htmlFor="assunto">Qual é o seu principal objetivo?</label>
                <select id="assunto" required defaultValue="">
                  <option value="" disabled>Selecione...</option>
                  <option>Emagrecer de forma saudável</option>
                  <option>Nutrição funcional e saúde</option>
                  <option>Melhorar minha performance</option>
                  <option>Nutrição na gestação / amamentação</option>
                  <option>Trabalhar meu comportamento alimentar</option>
                  <option>Controle de condição clínica</option>
                  <option>Outro objetivo</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="mensagem">Conta um pouco mais (opcional)</label>
                <textarea id="mensagem" placeholder="Quanto tempo tem tentando emagrecer? Tem alguma condição de saúde? Qualquer detalhe que achar relevante..." />
              </div>
              <button type="submit" className="btn btn-primary">Enviar pelo WhatsApp 🌿</button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="navbar-logo" style={{color:'#fff',fontSize:'1.15rem'}}>
                <span className="logo-leaf">🌿</span>
                Nutri Vida Plena
              </a>
              <p>Dra. Beatriz Mendonça · CRN-3 57204. Especialista em Nutrição Funcional e Comportamento Alimentar. Vila Madalena, São Paulo.</p>
              <div className="footer-social">
                <a href="#" aria-label="Instagram">📸</a>
                <a href="#" aria-label="YouTube">🎬</a>
                <a href={WA} aria-label="WhatsApp" target="_blank">💬</a>
              </div>
            </div>
            <div>
              <h4>Navegação</h4>
              <div className="footer-links">
                <a href="#servicos">Especialidades</a>
                <a href="#depoimentos">Depoimentos</a>
                <a href="#sobre">Sobre</a>
                <a href="#contato">Contato</a>
              </div>
            </div>
            <div>
              <h4>Especialidades</h4>
              <div className="footer-links">
                <a href="#servicos">Emagrecimento</a>
                <a href="#servicos">Nutrição Funcional</a>
                <a href="#servicos">Nutrição Esportiva</a>
                <a href="#servicos">Comportamento Alimentar</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Nutri Vida Plena — R. Harmonia, 287, Vila Madalena, São Paulo · (11) 99456-7890</p>
          </div>
        </div>
      </footer>

      {/* ===== WHATSAPP FLUTUANTE ===== */}
      <a href={WA} target="_blank" className="whatsapp-float" aria-label="Falar no WhatsApp">💬</a>
    </>
  )
}
