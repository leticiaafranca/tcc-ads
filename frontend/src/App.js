import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Sidebar from './components/Sidebar.js';
import RegistrarPaciente from './pages/RegistrarPaciente';
import RegistrarConsulta from './pages/RegistrarConsulta';
import RegistrarPrescricao from './pages/RegistrarPrescricao';
import RegistrarMedico from './pages/RegistrarMedico';
import Header from './components/Header.js';
import Dashboard from './pages/Dashboard';

import Login from './pages/Login';
import Register from './pages/Register';

function Layout({ user, onLogout, children }) {
  const location = useLocation();

  const noHeaderRoutes = ['/login', '/register'];
  const showHeader = !noHeaderRoutes.includes(location.pathname);

  const noSidebarRoutes = ['/login', '/register'];
  const showSidebar = user && !noSidebarRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <Header user={user} onLogout={onLogout} />}
      {showSidebar && <Sidebar />}
      <div className="main-content">{children}</div>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const RequireAuth = ({ children }) => {
    if (loading) {
      return <div>Carregando...</div>;
    }
    return user ? children : <Navigate to="/login" />;
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <RegistrarPaciente />
              </RequireAuth>
            }
          />
          <Route
            path="/consulta"
            element={
              <RequireAuth>
                <RegistrarConsulta />
              </RequireAuth>
            }
          />
          <Route
            path="/prescricao"
            element={
              <RequireAuth>
                <RegistrarPrescricao />
              </RequireAuth>
            }
          />
          <Route
            path="/medico"
            element={
              <RequireAuth>
                <RegistrarMedico />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
