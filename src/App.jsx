import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gestion from './pages/Gestion';
import DatosExternos from './pages/DatosExternos';

export default function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gestion" element={<Gestion />} />
          <Route path="/datos-externos" element={<DatosExternos />} />
        </Routes>
      </main>
      <footer>
        <p>Complejo de Canchas — SPA React · Evaluación 3</p>
      </footer>
    </>
  );
}
