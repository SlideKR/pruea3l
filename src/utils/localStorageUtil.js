/**
 * localStorage helpers for reservas
 * key: 'reservas_canchas_v1'
 */
const KEY = 'reservas_canchas_v1';

export function loadReservas(){
  try{
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){
    console.error('loadReservas', e);
    return {};
  }
}

export function saveReservas(reservas){
  try{
    localStorage.setItem(KEY, JSON.stringify(reservas));
  }catch(e){
    console.error('saveReservas', e);
  }
}

export function clearReservas(){
  localStorage.removeItem(KEY);
}
