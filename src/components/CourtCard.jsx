import React from 'react';

export default function CourtCard({court, onReserve, onCancel, reservation}){
  // court: {id, nombre, tipo, ubicacion}
  return (
    <article className="card" aria-labelledby={`court-${court.id}`}>
      <h3 id={`court-${court.id}`}>{court.nombre}</h3>
      <p><small>{court.tipo} · {court.ubicacion}</small></p>
      {reservation ? (
        <>
          <p><strong>Reservado por:</strong> {reservation.nombre} — {reservation.hora}</p>
          <button className="btn secondary" onClick={()=>onCancel(court.id)}>Cancelar</button>
        </>
      ) : (
        <button className="btn" onClick={()=>onReserve(court)}>Reservar</button>
      )}
    </article>
  );
}
