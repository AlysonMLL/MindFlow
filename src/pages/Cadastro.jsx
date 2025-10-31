// src/pages/Cadastro.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Cadastro(){
  return (
    <div style={{minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
      <div style={{width:'100%', maxWidth:520, padding:28, borderRadius:12, boxShadow:'0 10px 30px rgba(0,0,0,0.06)', background:'#fff'}}>
        <h2 style={{marginBottom:8}}>Cadastro</h2>
        <p style={{color:'#6b7280'}}>Página de cadastro simples — implemente com react-hook-form quando desejar.</p>

        <div style={{marginTop:18}}>
          <p style={{color:'#374151'}}>Ainda não implementado — voltar para <Link to="/">Início</Link>.</p>
        </div>
      </div>
    </div>
  );
}
