import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroPlain from './components/HeroPlain';

function Login(){ return <div style={{padding:40}}>Página Login (ainda simples)</div> }
function Cadastro(){ return <div style={{padding:40}}>Página Cadastro (ainda simples)</div> }

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroPlain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  )
}
