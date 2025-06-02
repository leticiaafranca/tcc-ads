import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaUserInjured, 
  FaStethoscope, 
  FaPrescriptionBottleAlt, 
  FaUserMd,
  FaTachometerAlt
} from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  return (
    <nav className="sidebar">
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
        <FaTachometerAlt />
        Dashboard
      </NavLink>
      <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
        <FaUserInjured />
        Pacientes
      </NavLink>
      <NavLink to="/consulta" className={({ isActive }) => isActive ? 'active' : ''}>
        <FaStethoscope />
        Consulta
      </NavLink>
      {/* <NavLink to="/prescricao" className={({ isActive }) => isActive ? 'active' : ''}>
        <FaPrescriptionBottleAlt />
        Prescrição
      </NavLink> */}
      <NavLink to="/medico" className={({ isActive }) => isActive ? 'active' : ''}>
        <FaUserMd />
        Médico
      </NavLink>
    </nav>
  );
}

export default Sidebar;
