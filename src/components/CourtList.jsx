import React from 'react';
import CourtCard from './CourtCard';

export default function CourtList({canchas, reservas, onReserve, onCancel}){
  return (
    <section className="grid" aria-live="polite">
      {canchas.map(c => (
        <CourtCard
          key={c.id}
          court={c}
          onReserve={onReserve}
          onCancel={onCancel}
          reservation={reservas[c.id] || null}
        />
      ))}
    </section>
  );
}
