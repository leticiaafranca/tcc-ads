import React, { useEffect, useState } from 'react';
import './Modal.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function ModalMedico({ onClose, medico }) {
  const [formData, setFormData] = useState({
    nome: '',
    crm: '',
    especialidade: '',
  });

  useEffect(() => {
    if (medico) {
      setFormData(medico);
    }
  }, [medico]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (medico) {
        const response = await axios.put(`http://localhost:3000/medicos/${medico._id}`, formData);
        if (response.status >= 200 && response.status < 300) {
          alert('Médico atualizado com sucesso!');
          onClose();
        } else {
          alert('Erro ao atualizar médico: ' + response.statusText);
        }
      } else {
        const response = await axios.post('http://localhost:3000/medicos', formData);
        if (response.status >= 200 && response.status < 300) {
          alert('Médico cadastrado com sucesso!');
          onClose();
        } else {
          alert('Erro ao cadastrar médico: ' + response.statusText);
        }
      }
    } catch (error) {
      alert('Erro de rede: ' + error.message);
    }
  }

  return (

    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Registrar Médico</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Digite o nome do médico"
              />
            </div>

            <div className="form-group">
              <label htmlFor="crm">CRM</label>
              <input
                id="crm"
                name="crm"
                type="text"
                value={formData.crm}
                onChange={handleChange}
                required
                placeholder="Digite o CRM do médico"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="especialidade">Especialidade</label>
            <select
              id="especialidade"
              name="especialidade"
              value={formData.especialidade}
              onChange={handleChange}
              required
              className={formData.especialidade === '' ? 'placeholder-select' : ''}

            >
              <option value="">Selecione uma especialidade</option>
              <option value="Cardiologia">Cardiologia</option>
              <option value="Dermatologia">Dermatologia</option>
              <option value="Pediatria">Pediatria</option>
              <option value="Neurologia">Neurologia</option>
              <option value="Ortopedia">Ortopedia</option>
              <option value="Ginecologia">Ginecologia</option>
              <option value="Endocrinologia">Endocrinologia</option>
              <option value="Oftalmologia">Oftalmologia</option>
              <option value="Otorrinolaringologia">Otorrinolaringologia</option>
              <option value="Psiquiatria">Psiquiatria</option>
              <option value="Medicina Interna">Medicina Interna</option>
              <option value="Urologia">Urologia</option>
              <option value="Reumatologia">Reumatologia</option>
              <option value="Pneumologia">Pneumologia</option>
              <option value="Hematologia">Hematologia</option>
              <option value="Nefrologia">Nefrologia</option>
              <option value="Cirurgia Geral">Cirurgia Geral</option>
              <option value="Anestesiologia">Anestesiologia</option>
              <option value="Medicina do Trabalho">Medicina do Trabalho</option>
              <option value="Oncologia">Oncologia</option>
              <option value="Gastroenterologia">Gastroenterologia</option>
              <option value="Radiologia">Radiologia</option>
              <option value="Medicina de Familia">Medicina de Família</option>
              <option value="Pediatria Neonatal">Pediatria Neonatal</option>
              <option value="Cirurgia Plastica">Cirurgia Plástica</option>
              <option value="Cirurgia Cardiaca">Cirurgia Cardíaca</option>
              <option value="Cirurgia Vascular">Cirurgia Vascular</option>
              <option value="Cirurgia Pediatrica">Cirurgia Pediátrica</option>
              <option value="Medicina Esportiva">Medicina Esportiva</option>
              <option value="Infectologia">Infectologia</option>
              <option value="Medicina Nuclear">Medicina Nuclear</option>
              <option value="Patologia">Patologia</option>
              <option value="Fisiatria">Fisiatria</option>
              <option value="Genetica Medica">Genética Médica</option>
              <option value="Medicina Hospitalar">Medicina Hospitalar</option>
              <option value="Medicina Legal">Medicina Legal</option>
              <option value="Pneumologia Pediatrica">Pneumologia Pediátrica</option>
              <option value="Neurologia Pediatrica">Neurologia Pediátrica</option>
              <option value="Odontologia">Odontologia</option>
              <option value="Clinica Geral">Clínica Geral</option>
              <option value="Geriatria">Geriatria</option>
              <option value="Endoscopia">Endoscopia</option>
              <option value="Homeopatia">Homeopatia</option>
              <option value="Acupuntura">Acupuntura</option>
              <option value="Terapia Intensiva">Terapia Intensiva</option>
              <option value="Pneumologia Intervencionista">Pneumologia Intervencionista</option>
              <option value="Gastroenterologia Pediatrica">Gastroenterologia Pediátrica</option>
              <option value="Medicina Paliativa">Medicina Paliativa</option>
              <option value="Cirurgia Toracica">Cirurgia Torácica</option>
              <option value="Cirurgia Coloproctologica">Cirurgia Coloproctológica</option>
              <option value="Radioterapia">Radioterapia</option>
              <option value="Cirurgia de Cabeca e Pescoco">Cirurgia de Cabeça e Pescoço</option>
              <option value="Angiologia">Angiologia</option>
              <option value="Medicina Aeroespacial">Medicina Aeroespacial</option>
              <option value="Nutrologia">Nutrologia</option>
              <option value="Fonoaudiologia">Fonoaudiologia</option>
              <option value="Psicologia Medica">Psicologia Médica</option>
              <option value="Terapia Ocupacional">Terapia Ocupacional</option>


            </select>
          </div>

          <button type="submit">Criar Médico</button>
        </form>
      </div>
    </div>
  );

}

export default ModalMedico;