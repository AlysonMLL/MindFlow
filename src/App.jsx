// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HeroPlain from './components/HeroPlain';
import Login from './pages/login';
import Cadastro from './pages/Cadastro';

export default function App(){
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HeroPlain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        {/* adicione outras rotas aqui */}
      </Routes>
    </BrowserRouter>
  )
}
