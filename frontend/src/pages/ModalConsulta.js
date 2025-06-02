import React, { useEffect, useState } from 'react';
import './Modal.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ModalConsulta({ onClose, consulta }) {
  const initialFormData = {
    dataConsulta: null,
    motivo: '',
    diagnostico: '',
    tratamento: '',
    medico: '',
    paciente: '',
    prescricao: '',
    horarioConsulta: {
      horaInicio: '',
      horaFim: '',
    },
    sala: '',
    observacoes: '',
  };

  useEffect(() => {
    if (consulta) {
      setFormData(consulta);
    }
  }, [consulta]);

  const [formData, setFormData] = useState(initialFormData);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  useEffect(() => {
    async function fetchDados() {
      try {
        const resMedicos = await fetch('http://localhost:3000/medicos');
        const medicosData = await resMedicos.json();
        setMedicos(medicosData);

        const resPacientes = await fetch('http://localhost:3000/pacientes');
        const pacientesData = await resPacientes.json();
        setPacientes(pacientesData);
      } catch (error) {
        alert('Erro ao carregar médicos ou pacientes: ' + error.message);
      }
    }

    fetchDados();
    gerarHorarios();
  }, []);

  function gerarHorarios() {
    const horarios = [];
    const inicio = 7 * 60;
    const fim = 19 * 60;
    for (let m = inicio; m < fim; m += 15) {
      const hora = String(Math.floor(m / 60)).padStart(2, '0');
      const minuto = String(m % 60).padStart(2, '0');
      horarios.push(`${hora}:${minuto}`);
    }
    setHorariosDisponiveis(horarios);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleHorarioChange(e) {
    const { value } = e.target;
    const [h, m] = value.split(':').map(Number);
    const inicioMin = h * 60 + m;
    const fimMin = inicioMin + 15;
    const fimHora = String(Math.floor(fimMin / 60)).padStart(2, '0');
    const fimMinuto = String(fimMin % 60).padStart(2, '0');

    setFormData(prev => ({
      ...prev,
      horarioConsulta: {
        horaInicio: value,
        horaFim: `${fimHora}:${fimMinuto}`
      }
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let dataConsultaFormatada = null;
    if (formData.dataConsulta) {
      const data =
        typeof formData.dataConsulta === 'string'
          ? new Date(formData.dataConsulta)
          : formData.dataConsulta;
      dataConsultaFormatada = data.toISOString().split('T')[0];
    }

    const dadosParaEnviar = {
      ...formData,
      dataConsulta: dataConsultaFormatada,
    };

    if (dadosParaEnviar.prescricao === "") {
      delete dadosParaEnviar.prescricao;
    }

    try {
      let response;

      if (consulta && consulta._id) {
        response = await fetch(`http://localhost:3000/consultas/${consulta._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosParaEnviar),
        });
      } else {
        response = await fetch('http://localhost:3000/consultas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosParaEnviar),
        });
      }

      const data = await response.json();

      if (response.ok) {
        alert(consulta ? 'Consulta atualizada com sucesso!' : 'Consulta registrada com sucesso!');
        setFormData(initialFormData);
        onClose();
      } else {
        alert(`Erro ao ${consulta ? 'atualizar' : 'registrar'} consulta: ${data.message || JSON.stringify(data)}`);
      }
    } catch (error) {
      alert('Erro de rede: ' + error.message);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Registrar Consulta</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Data da Consulta</label>
              <DatePicker
                selected={formData.dataConsulta}
                onChange={(date) =>
                  setFormData(prev => ({
                    ...prev,
                    dataConsulta: date
                  }))
                }
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Selecione a data"
                required
              />
            </div>

            <div className="form-group">
              <label>Hora de início</label>
              <select
                name="horaInicio"
                value={formData.horarioConsulta.horaInicio}
                onChange={handleHorarioChange}
                required
                className={formData.horarioConsulta.horaInicio === '' ? 'placeholder-select' : ''}
              >
                <option value="" disabled hidden>Selecione um horário</option>
                {horariosDisponiveis.map((hora) => (
                  <option key={hora} value={hora}>{hora}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Sala</label>
              <select
                name="sala"
                value={formData.sala}
                onChange={handleChange}
                required
                className={formData.sala === '' ? 'placeholder-select' : ''}
              >
                <option value="" disabled hidden>Selecione a sala</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Sala {i + 1}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Médico</label>
              <select
                name="medico"
                value={formData.medico}
                onChange={handleChange}
                required
                className={formData.medico === '' ? 'placeholder-select' : ''}
              >
                <option value="" disabled hidden>Selecione um médico</option>
                {medicos.map((medico) => (
                  <option key={medico._id} value={medico._id}>
                    {medico.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Paciente</label>
              <select
                name="paciente"
                value={formData.paciente}
                onChange={handleChange}
                required
                className={formData.paciente === '' ? 'placeholder-select' : ''}
              >
                <option value="" disabled hidden>Selecione um paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente._id} value={paciente._id}>
                    {paciente.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Observações</label>
            <textarea
              name="observacoes"
              placeholder="Observações"
              value={formData.observacoes}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalConsulta;