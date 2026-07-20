import React from 'react';

export default function CourtCard({court, onReserve, onCancel, onEdit, reservation}){
  // court: {id, nombre, tipo, ubicacion}
  return (
    <article className="card" aria-labelledby={`court-${court.id}`}>
      <h3 id={`court-${court.id}`}>{court.nombre}</h3>
      <p><small>{court.tipo} · {court.ubicacion}</small></p>
      {reservation ? (
        <>
          <p><strong>Reservado por:</strong> {reservation.nombre} — {reservation.hora}</p>
          <div style={{display:'flex', gap:8}}>
            <button className="btn" onClick={()=>onEdit && onEdit(court.id)}>Editar</button>
            <button className="btn secondary" onClick={()=>onCancel(court.id)}>Cancelar</button>
          </div>
        </>
      ) : (
        <button className="btn" onClick={()=>onReserve(court)}>Reservar</button>
      )}
    </article>
  );
}
