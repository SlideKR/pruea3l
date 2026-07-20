import React, {useEffect, useState} from 'react';
import CourtList from '../components/CourtList';
import CourtForm from '../components/CourtForm';
import { loadReservas, saveReservas } from '../utils/localStorageUtil';

// Ejemplo básico de canchas locales (si la API falla o no disponible)
const defaultCanchas = [
  {id: 1, nombre: 'Cancha 1', tipo: 'Futbol', ubicacion: 'Sector A'},
  {id: 2, nombre: 'Cancha 2', tipo: 'Tenis', ubicacion: 'Sector B'},
  {id: 3, nombre: 'Cancha 3', tipo: 'Multideporte', ubicacion: 'Sector C'},
];

export default function Gestion(){
  const [canchas] = useState(defaultCanchas);
  const [reservas, setReservas] = useState({});
  const [formFor, setFormFor] = useState(null); // {court, editingId?}

  // useEffect justificado: persistencia de reservas en Local Storage
  useEffect(()=>{
    const loaded = loadReservas();
    setReservas(loaded);
  }, []);

  // guarda cada vez que cambian las reservas
  useEffect(()=>{ saveReservas(reservas); }, [reservas]);

  function handleReserve(court){ setFormFor({court}); }

  function handleEdit(id){
    const court = canchas.find(c=>c.id === id);
    if(!court) return;
    const initialData = reservas[id] ? { ...reservas[id] } : {};
    setFormFor({court, editingId: id, initialData});
  }

  function handleSaveReserva(data){
    // data: {nombre, hora, telefono}
    const id = formFor?.court?.id;
    if(!id) return;
    setReservas(prev => ({ ...prev, [id]: { ...data, updatedAt: new Date().toISOString() } }));
    setFormFor(null);
  }

  function handleCancel(id){
    if(!confirm('¿Confirmas cancelar esta reserva?')) return;
    setReservas(prev => {
      const copy = {...prev};
      delete copy[id];
      return copy;
    });
  }

  return (
    <section>
      <h2>Gestión de reservas</h2>
      <p>Crear, listar, editar y eliminar reservas. Persisten al F5 via Local Storage.</p>
      {formFor && (
        <CourtForm
          initialData={formFor.initialData || {}}
          onSave={handleSaveReserva}
          onClose={()=>setFormFor(null)}
        />
      )}
      <CourtList canchas={canchas} reservas={reservas} onReserve={handleReserve} onCancel={handleCancel} onEdit={handleEdit} />
    </section>
  );
}
