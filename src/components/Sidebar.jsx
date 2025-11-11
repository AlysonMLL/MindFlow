// src/components/Sidebar.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ open, onClose, navigate }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  function handleLogout() {
    localStorage.removeItem('usuario');
    onClose();
    // volta pra tela pública (HeroPlain)
    if (navigate) navigate('/', { replace: true });
  }

  // itens que por ora apenas fecham o menu (pode alterar p/ navegar depois)
  function handleItem(fn) {
    if (fn) fn();
    onClose();
  }

  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
          zIndex: 999
        }}
      />

      {/* sidebar */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu lateral"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: 300,
          maxWidth: '80%',
          background: '#3f3f3f', // mesma cor do header
          color: 'white',
          zIndex: 1000,
          padding: 20,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}
      >
        {/* header do menu */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <img src="/logo_mindflow.png" alt="MindFlow" style={{ width: 40, height: 40, borderRadius: 8 }} />
            <div style={{ fontWeight: 700, fontSize: 18 }}>MindFlow</div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: 20,
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        <nav aria-label="Navegação do menu" style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
          <button onClick={() => handleItem()} style={menuBtnStyle}>Check-in Diário</button>
          <button onClick={() => handleItem(() => navigate && navigate('/home'))} style={menuBtnStyle}>Minhas Trilhas</button>
          <button onClick={() => handleItem()} style={menuBtnStyle}>Downloads</button>
          <button onClick={() => handleItem()} style={menuBtnStyle}>Feedback</button>
          <button onClick={() => handleItem(() => window.scrollTo({ top: 0, behavior: 'smooth' }))} style={menuBtnStyle}>Sobre</button>
        </nav>

        <div style={{ flex: 1 }} />

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
          <button onClick={handleLogout} style={{ ...menuBtnStyle, width: '100%', textAlign: 'left', color: '#ffdddd' }}>
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}

/* estilo simples reutilizável */
const menuBtnStyle = {
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '10px 12px',
  borderRadius: 8,
  background: 'transparent',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  fontSize: 15,
  fontWeight: 600
};
