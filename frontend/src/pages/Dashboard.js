import React, { useEffect, useState } from 'react';
import {
  fetchPacientes,
  fetchConsultas,
  fetchMedicos,
  fetchMedicoInfo,
  deletePaciente,
  deleteConsulta,
  deleteMedico
} from './apiService';
import DashboardCharts from './DashboardCharts';
import './Dashboard.css';
import { PacientesTable, ConsultasTable, MedicosTable } from './Tables';

function Dashboard() {
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [pacientesData, consultasData, medicosData] = await Promise.all([
          fetchPacientes(),
          fetchConsultas(),
          fetchMedicos()
        ]);

        setPacientes(pacientesData);
        setMedicos(medicosData);

        const consultasComMedicosInfo = await Promise.all(
          consultasData.map(async (consulta) => {
            const medicoId = consulta.medico?._id || consulta.medico;
            const medicoInfo = medicoId ? await fetchMedicoInfo(medicoId) : { nome: "Sem nome", especialidade: "Não informada" };
            return {
              ...consulta,
              medicoNome: medicoInfo.nome,
              medicoEspecialidade: medicoInfo.especialidade,
              sala: consulta.sala || "Não informada"
            };
          })
        );
        setConsultas(consultasComMedicosInfo);
      } catch (err) {
        setError('Erro ao carregar dados');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function excluirPaciente(id) {
    try {
      await deletePaciente(id);
      setPacientes(old => old.filter(p => p._id !== id));
    } catch (error) {
      console.error("Erro ao deletar paciente:", error);
      alert("Não foi possível deletar o paciente. Tente novamente.");
    }
  }

  async function excluirConsulta(id) {
    try {
      await deleteConsulta(id);
      setConsultas(old => old.filter(c => c._id !== id));
    } catch (error) {
      console.error("Erro ao deletar consulta:", error);
      alert("Não foi possível deletar a consulta. Tente novamente.");
    }
  }

  async function excluirMedico(id) {
    try {
      await deleteMedico(id);
      setMedicos(old => old.filter(m => m._id !== id));
    } catch (error) {
      console.error("Erro ao deletar médico:", error);
      alert("Não foi possível deletar o médico. Tente novamente.");
    }
  }

  const mesesUnicos = Array.from(new Set(consultas.map(c => c.dataConsulta.slice(0,7)))).sort();

  function formatarMes(yyyyMM) {
    const [year, month] = yyyyMM.split('-');
    const mesesPtBr = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${mesesPtBr[parseInt(month, 10) -1]}/${year}`;
  }

  const consultasFiltradas = selectedMonth
    ? consultas.filter(c => c.dataConsulta.startsWith(selectedMonth))
    : consultas;

  const consultasPorMesMap = consultas.reduce((acc, c) => {
    const mes = c.dataConsulta.slice(0, 7);
    acc[mes] = (acc[mes] || 0) + 1;
    return acc;
  }, {});
  const consultasPorMes = Object.entries(consultasPorMesMap)
    .map(([mes, count]) => ({ mes, count }))
    .sort((a,b) => a.mes.localeCompare(b.mes));

  const hojeStr = new Date().toISOString().slice(0,10);
  const consultasHoje = consultas.filter(c => c.dataConsulta.startsWith(hojeStr)).length;

  const consultasPorEspecialidadeMap = consultasFiltradas.reduce((acc, c) => {
    const esp = c.medicoEspecialidade || 'Não informada';
    acc[esp] = (acc[esp] || 0) + 1;
    return acc;
  }, {});
  const consultasPorEspecialidade = Object.entries(consultasPorEspecialidadeMap)
    .map(([especialidade, count]) => ({ especialidade, count }));

  const consultasPorMedicoMap = consultasFiltradas.reduce((acc, c) => {
    const nome = c.medicoNome || 'Sem nome';
    acc[nome] = (acc[nome] || 0) + 1;
    return acc;
  }, {});
  const consultasPorMedico = Object.entries(consultasPorMedicoMap)
    .map(([medico, count]) => ({ medico, count }));

  if (loading) return <div>Carregando dados...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <h2>Painel de Controle</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Filtrar consultas por mês:{' '}
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          >
            <option value="">Todos</option>
            {mesesUnicos.map(mes => (
              <option key={mes} value={mes}>
                {formatarMes(mes)}
              </option>
            ))}
          </select>
          <button onClick={() => setSelectedMonth('')} style={{ marginLeft: '10px' }}>
            Limpar filtro
          </button>
        </label>
      </div>

      <DashboardCharts
        consultasPorMes={consultasPorMes}
        consultasHoje={consultasHoje}
        consultasPorEspecialidade={consultasPorEspecialidade}
        consultasPorMedico={consultasPorMedico}
      />
{/* 
      <PacientesTable pacientes={pacientes} excluirPaciente={excluirPaciente} />
      <ConsultasTable consultas={consultas} excluirConsulta={excluirConsulta} />
      <MedicosTable medicos={medicos} excluirMedico={excluirMedico} /> */}
    </div>
  );
}

export default Dashboard;
