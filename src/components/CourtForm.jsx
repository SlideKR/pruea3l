import React, {useState} from 'react';

export default function CourtForm({initialData = {}, onSave, onClose}){
  const [nombre, setNombre] = useState(initialData.nombre || '');
  const [hora, setHora] = useState(initialData.hora || '');
  const [telefono, setTelefono] = useState(initialData.telefono || '');
  const [errors, setErrors] = useState({});

  function validate(){
    const e = {};
    if(!nombre.trim()) e.nombre = 'Nombre es obligatorio';
    if(!hora.trim()) e.hora = 'Hora es obligatoria';
    // teléfono opcional pero si existe debe ser dígitos
    if(telefono && !/^\d{7,15}$/.test(telefono)) e.telefono = 'Teléfono inválido (7-15 dígitos)';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev){
    ev.preventDefault();
    if(!validate()) return;
    onSave({nombre: nombre.trim(), hora: hora.trim(), telefono: telefono.trim()});
  }

  return (
    <form onSubmit={handleSubmit} className="card" aria-label="Formulario de reserva">
      <div className="form-row">
        <input placeholder="Nombre del cliente" value={nombre} onChange={e=>setNombre(e.target.value)} />
      </div>
      {errors.nombre && <div className="error">{errors.nombre}</div>}
      <div className="form-row">
        <input type="datetime-local" value={hora} onChange={e=>setHora(e.target.value)} />
      </div>
      {errors.hora && <div className="error">{errors.hora}</div>}
      <div className="form-row">
        <input placeholder="Teléfono (opcional)" value={telefono} onChange={e=>setTelefono(e.target.value)} />
      </div>
      {errors.telefono && <div className="error">{errors.telefono}</div>}
      <div style={{display:'flex', gap:8}}>
        <button type="submit" className="btn">Guardar</button>
        <button type="button" className="btn secondary" onClick={onClose}>Cerrar</button>
      </div>
    </form>
  );
}
