import React, { useEffect, useState } from 'react';
import './Form.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ModalConsulta from './ModalConsulta';
import {
  fetchPacientes,
  fetchConsultas,
  fetchMedicos,
  fetchMedicoInfo,
  deletePaciente,
  deleteConsulta,
  deleteMedico
} from './apiService';
import { PacientesTable, ConsultasTable, MedicosTable } from './Tables';

function RegistrarConsulta() {
  const [showModal, setShowModal] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [consultaSelecionado, setConsultaSelecionado] = useState(null);

  function handleEditarConsulta(consulta) {
    setConsultaSelecionado(consulta);
    setShowModal(true);
  }
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

  return (
    <>
      <div className="form-card">
        <div className="header-row">
          <h2>Painel de consultas</h2>
          <button onClick={() => setShowModal(true)}>+ Nova Consulta</button>
        </div>
        {showModal && (
          <ModalConsulta
            onClose={() => {
              setShowModal(false);
              setConsultaSelecionado(null);
            }}
            consulta={consultaSelecionado}
          />
        )}
        <ConsultasTable
          consultas={consultas}
          excluirConsulta={excluirConsulta}
          editarConsulta={handleEditarConsulta}
        />

      </div>

    </>
  );
}

export default RegistrarConsulta;
