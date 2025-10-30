
import React from 'react';

export default function HeroPlain(){
  return (
    <>
      <nav className="site-nav" role="navigation" aria-label="Main Navigation">
        <div className="container" style={{maxWidth:1200, margin:'0 auto', padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div className="logo-row">
              
              <div className="brand">MindFlow</div>
            </div>

            <div className="nav-links" role="menubar" aria-label="Primary">
              <a href="#">Início</a>
              <a href="#">Sobre</a>
              <a href="#">Contato</a>
              <a href="#">Assinatura</a>
            </div>
          </div>

          <div className="header-actions">
            <a href="/login" className="btn btn-ghost" aria-label="Login">Login</a>
            <a href="/cadastro" className="btn btn-primary" aria-label="Começar">Comece gratuitamente</a>
          </div>
        </div>
      </nav>

      <header className="hero" role="banner">
        <div className="hero-left">
          <h1 className="h1">
            <div className="muted">Respire.</div>
            <div className="accent">Reflita.</div>
            <div className="muted">Renove.</div>
          </h1>

          <p className="lead">
            <strong style={{color:'var(--mint)'}}>Seu primeiro passo para o Mindfulness.</strong> Comece já a cuidar da sua saúde mental de forma prática para o dia-a-dia.
          </p>

          <div className="cta-row" role="region" aria-label="Ações principais">
            <a className="btn btn-primary btn-large" href="#" role="button">Comece gratuitamente</a>
            <a className="btn btn-ghost btn-large btn-ghost-dark" href="#">Ver trilhas</a>
          </div>

          <div className="badges" aria-hidden>
            <div className="badge-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 8v4l3 3"/></svg><span>Acesso gratuito</span></div>
            <div className="badge-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4"/></svg><span>Trilhas Personalizadas</span></div>
            <div className="badge-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 11c0 2.21-1.79 4-4 4s-4-1.79-4-4"/></svg><span>Privacidade garantida</span></div>
          </div>
        </div>

        <div className="hero-right" aria-hidden>
          <img src="/hero-photo.jpeg" alt="Ilustração MindFlow" className="hero-img" />
        </div>
      </header>
    </>
  );
}
