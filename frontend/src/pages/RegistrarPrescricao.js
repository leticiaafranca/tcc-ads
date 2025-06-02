import React from 'react';
import './Form.css';

function RegistrarPrescricao() {
  return (
    <div className="form-card">
      <h2>Registrar prescricao</h2>
      <form>
        <input type="text" placeholder="Nome completo" />
        <input type="text" placeholder="CPF" />
        <input type="date" placeholder="Data de nascimento" />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default RegistrarPrescricao;
