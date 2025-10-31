import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
  return (
    <nav className="site-nav" role="navigation" aria-label="Main Navigation" style={{background:'#3f3f3f', color:'white'}}>
      <div style={{maxWidth:1200, margin:'0 auto', padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <img src="/logo_mindflow.png" alt="MindFlow" style={{width:50, height:50, borderRadius:10, objectFit:'cover'}}/>
          <Link to="/" style={{color:'white', fontFamily:'Poppins, Inter, sans-serif', fontSize:20, fontWeight:700, textDecoration:'none'}}>MindFlow</Link>

          <div style={{marginLeft:20, display:'flex', gap:18}}>
            <Link to="/" style={{color:'white', textDecoration:'none'}}>Início</Link>
            <Link to="/sobre" style={{color:'white', textDecoration:'none'}}>Sobre</Link>
            <Link to="/contato" style={{color:'white', textDecoration:'none'}}>Contato</Link>
            <Link to="/assinatura" style={{color:'white', textDecoration:'none'}}>Assinatura</Link>
          </div>
        </div>

        <div style={{display:'flex', gap:10, alignItems:'center'}}>
          <Link to="/login" style={{background:'white', color:'#3f3f3f', padding:'8px 12px', borderRadius:10, textDecoration:'none'}}>Login</Link>
          <Link to="/cadastro" style={{background:'#3cffa1', color:'#3f3f3f', padding:'9px 14px', borderRadius:12, fontWeight:700, textDecoration:'none'}}>Cadastro</Link>
        </div>
      </div>
    </nav>
  );
}
