import React from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';

function UserPage(){
  const {name} = useParams();
  return <div className="card"><h3>Ruta dinámica</h3><p>Parámetro: {name}</p></div>;
}

function RouterIndex(){
  return (
    <div>
      <h3>Ejercicio Router</h3>
      <p>Demostración de rutas y enlaces internos sin recargar la página.</p>
      <nav style={{display:'flex', gap:8}}>
        <Link to="/extras/router/user/Ana">Ana</Link>
        <Link to="/extras/router/user/Beto">Beto</Link>
        <Link to="/extras/router/user/Camila">Camila</Link>
      </nav>
    </div>
  );
}

export default function ExtrasRouter(){
  return (
    <section>
      <Routes>
        <Route path="/" element={<RouterIndex />} />
        <Route path="user/:name" element={<UserPage />} />
      </Routes>
    </section>
  );
}
