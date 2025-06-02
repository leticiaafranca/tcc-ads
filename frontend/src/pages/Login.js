import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Login.css';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log('Resposta do login:', data);

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user, data.token);
        navigate('/dashboard');
      } else {
        const errorMsg = data.error
          ? `${data.message}: ${data.error}`
          : data.message || 'Erro no login';
        setMessage(errorMsg);
      }
    } catch (err) {
      setMessage('Erro ao conectar com o servidor');
    }
  };

  return (
    <>
      <div className="page">
        <div className="container">
          <h2 className="title">Login</h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              name="password"
              type="password"
              placeholder="Senha"
              value={form.password}
              onChange={handleChange}
              required
              className="input"
            />
            <button type="submit" className="button">
              Entrar
            </button>
          </form>
          {message && <p className="errorMessage">{message}</p>}
          <p className="registerText">
            Novo usuário?{' '}
            <Link to="/register" className="registerLink">
              Registre-se aqui
            </Link>
          </p>
        </div>
      </div>
      <img src={logo} alt="Logo" className="logo" />
    </>
  );
}
