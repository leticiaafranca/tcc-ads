import React from 'react';
import logo from '../assets/logo.png';
import './Header.css';
import { FiLogOut } from 'react-icons/fi';

function Header({ user, onLogout }) {
  console.log(user);
  return (
    <header className="header">
      <img src={logo} alt="Logo do Site" className="header-logo" />
      {user && (
        <div className="header-user">
          <span>Olá, <b>{user.name}</b>!</span>
<button onClick={onLogout} className="logout-button" title="Sair" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
  <FiLogOut size={24} color="#333" />
</button>        </div>
      )}
    </header>
  );
}

export default Header;
