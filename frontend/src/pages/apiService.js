import axios from 'axios';

const API_BASE = 'http://localhost:3000';

const medicosCache = {};

export async function fetchPacientes() {
  const res = await axios.get(`${API_BASE}/pacientes`);
  return res.data;
}

export async function fetchConsultas() {
  const res = await axios.get(`${API_BASE}/consultas`);
  return res.data;
}

export async function fetchMedicos() {
  const res = await axios.get(`${API_BASE}/medicos`);
  return res.data;
}

export async function fetchMedicoInfo(medicoId) {
  if (medicosCache[medicoId]) {
    return medicosCache[medicoId];
  }
  try {
    const res = await axios.get(`${API_BASE}/medicos/${medicoId}`);
    const medicoInfo = {
      nome: res.data.nome || "Sem nome",
      especialidade: res.data.especialidade || "Não informada"
    };
    medicosCache[medicoId] = medicoInfo;
    return medicoInfo;
  } catch {
    return { nome: "Sem nome", especialidade: "Não informada" };
  }
}

export async function deletePaciente(id) {
  return axios.delete(`${API_BASE}/pacientes/${id}`);
}

export async function deleteConsulta(id) {
  return axios.delete(`${API_BASE}/consultas/${id}`);
}

export async function deleteMedico(id) {
  return axios.delete(`${API_BASE}/medicos/${id}`);
}
