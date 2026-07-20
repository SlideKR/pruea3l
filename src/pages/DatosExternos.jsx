import React from 'react';
import useFetch from '../hooks/useFetch';

/**
 * Muestra resultados de GET /api/canchas
 * Cambia la URL a la que te asignó el docente si difiere.
 */
export default function DatosExternos(){
  // URL asignada en tu imagen: http://127.0.0.1:8000/api/canchas
  const API_URL = 'http://127.0.0.1:8000/api/canchas';
  const {data, loading, error, refetch} = useFetch(API_URL);

  return (
    <section>
      <h2>Datos externos — canchas desde la API</h2>
      {loading && <p>⏳ Cargando...</p>}
      {error && (
        <>
          <p style={{color:'crimson'}}>❌ Error: {error}</p>
          <button className="btn" onClick={refetch}>Reintentar</button>
          <p><small>Prueba desconectar internet para ver el estado de error.</small></p>
        </>
      )}
      {data && (
        <div className="grid">
          {Array.isArray(data) ? data.map(c => (
            <article key={c.id} className="card">
              <h3>{c.nombre}</h3>
              <p><small>{c.tipo} · {c.ubicacion}</small></p>
            </article>
          )) : <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      )}
    </section>
  );
}
