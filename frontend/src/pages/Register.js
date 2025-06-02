import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Login.css';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage('As senhas não coincidem');
      return;
    }

    try {
      const { confirmPassword, ...submitForm } = form;
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitForm),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Usuário criado com sucesso! Agora faça login.');
        setForm({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        setMessage(data.message || 'Erro no cadastro');
      }
    } catch (err) {
      setMessage('Erro ao conectar com o servidor');
    }
  };

  return (
    <>
      <div className="page">
        <div className="container">
          <h2 className="title">Registrar</h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              name="name"
              placeholder="Nome"
              value={form.name}
              onChange={handleChange}
              required
              className="input"
            />
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
            <input
              name="confirmPassword"
              type="password"
              placeholder="Repetir senha"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="input"
            />
            <button type="submit" className="button">
              Registrar
            </button>
          </form>
          {message && <p className="errorMessage">{message}</p>}
          <p className="registerText">
            Já tem uma conta?{' '}
            <Link to="/login" className="registerLink">
              Faça login aqui
            </Link>
          </p>
        </div>
      </div>
      <img src={logo} alt="Logo" className="logo" />
    </>
  );
}
