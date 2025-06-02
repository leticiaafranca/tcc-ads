import React from 'react';
import './Dashboard.css';

export function PacientesTable({ pacientes, excluirPaciente, editarPaciente }) {

  return (
    <div className="section" style={{ marginTop: '40px' }}>
      <h2>Pacientes</h2>
      <table className="table">
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(p => (
            <tr key={p._id}>
              <td>{p.nome}</td>
              <td>{new Date(p.dataNascimento).toLocaleDateString()}</td>
              <td>{p.telefone}</td>
              <td>
                <button onClick={() => editarPaciente(p)} className="delete-btn" title="Editar paciente">
                  <svg xmlns="http://www.w3.org/2000/svg" className="edit-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0L14.13 4.67l3.75 3.75 2.83-2.83z" />
                  </svg>
                </button>                <button className="delete-btn" onClick={() => excluirPaciente(p._id)} title="Excluir paciente">
                  <svg xmlns="http://www.w3.org/2000/svg" className="delete-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ConsultasTable({ consultas, excluirConsulta, editarConsulta }) {
  return (
    <div className="section" style={{ marginTop: '40px' }}>
      <h2>Consultas</h2>
      <table className="table">
        <colgroup>
          <col style={{ width: '16.66%' }} />
          <col style={{ width: '16.66%' }} />
          <col style={{ width: '16.66%' }} />
          <col style={{ width: '16.66%' }} />
          <col style={{ width: '16.66%' }} />
          <col style={{ width: '16.66%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Data</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Especialidade</th>
            <th>Sala</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map(c => (
            <tr key={c._id}>
              <td>{new Date(c.dataConsulta).toLocaleDateString()}</td>
              <td>{c.paciente?.nome || "Sem nome"}</td>
              <td>{c.medicoNome}</td>
              <td>{c.medicoEspecialidade}</td>
              <td>{c.sala}</td>
              <td>
                <button onClick={() => editarConsulta(c)} className="delete-btn" title="Editar consulta">
                  <svg xmlns="http://www.w3.org/2000/svg" className="edit-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0L14.13 4.67l3.75 3.75 2.83-2.83z" />
                  </svg>
                </button>
                <button className="delete-btn" onClick={() => excluirConsulta(c._id)} title="Excluir consulta">
                  <svg xmlns="http://www.w3.org/2000/svg" className="delete-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MedicosTable({ medicos, excluirMedico, editarMedico }) {
  return (
    <div className="section" style={{ marginTop: '40px' }}>
      <h2>Médicos</h2>
      <table className="table">
        <colgroup>
          <col style={{ width: '40%' }} />
          <col style={{ width: '40%' }} />
          <col style={{ width: '20%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Especialidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map(m => (
            <tr key={m._id}>
              <td>{m.nome || "Sem nome"}</td>
              <td>{m.especialidade || "Não informada"}</td>
              <td>
                <button onClick={() => editarMedico(m)} className="delete-btn" title="Editar paciente">
                  <svg xmlns="http://www.w3.org/2000/svg" className="edit-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0L14.13 4.67l3.75 3.75 2.83-2.83z" />
                  </svg>
                </button>
                <button className="delete-btn" onClick={() => excluirMedico(m._id)} title="Excluir médico">
                  <svg xmlns="http://www.w3.org/2000/svg" className="delete-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
