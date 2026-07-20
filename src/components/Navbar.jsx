import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav aria-label="Principal">
      <NavLink to="/" end className={({isActive})=>isActive?'active':''}>Inicio</NavLink>
      <NavLink to="/gestion" className={({isActive})=>isActive?'active':''}>Gestión</NavLink>
      <NavLink to="/datos-externos" className={({isActive})=>isActive?'active':''}>Datos externos</NavLink>
    </nav>
  );
}
