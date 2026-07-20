import React, { useState, useEffect } from 'react';

export default function ExtrasUseEffect(){
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(()=>{
    document.title = `Timer: ${count}`; // justificación: efecto secundario que actualiza título
  }, [count]);

  useEffect(()=>{
    if(!running) return;
    const id = setInterval(()=> setCount(c => c + 1), 1000);
    return ()=> clearInterval(id);
  }, [running]);

  return (
    <section>
      <h2>Ejercicio useEffect</h2>
      <p>Ejemplo simple que muestra un contador controlado por useEffect. El efecto actualiza el título de la pestaña y maneja un timer.</p>
      <p>Cuenta: <strong>{count}</strong></p>
      <div style={{display:'flex', gap:8}}>
        <button className="btn" onClick={()=>setRunning(true)}>Iniciar</button>
        <button className="btn secondary" onClick={()=>setRunning(false)}>Detener</button>
        <button className="btn secondary" onClick={()=>setCount(0)}>Reiniciar</button>
      </div>
    </section>
  );
}
