import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

import { FiCalendar } from 'react-icons/fi';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF', '#FF6E6E'];

const meses = {
  '01': 'jan',
  '02': 'fev',
  '03': 'mar',
  '04': 'abr',
  '05': 'mai',
  '06': 'jun',
  '07': 'jul',
  '08': 'ago',
  '09': 'set',
  '10': 'out',
  '11': 'nov',
  '12': 'dez'
};

export default function DashboardCharts({
  consultasPorMes,
  consultasHoje,
  consultasPorEspecialidade,
  consultasPorMedico
}) {
  const consultasPorMesComNome = consultasPorMes.map(item => {
    const [ano, mesNumero] = item.mes.split('-');
    return {
      ...item,
      mes: `${meses[mesNumero] || mesNumero}/${ano.slice(2)}`
    };
  });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
      <div style={{ flex: '0 0 100%', backgroundColor: '#fff', padding: '20px', borderRadius: '18px' }}>
        <h3>Número de consultas por mês (próximos 12 meses)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={consultasPorMesComNome}>
            <XAxis dataKey="mes" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Consultas" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/*
      <div style={{ flex: '0 0 250px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '18px' }}>
        <h3>Consultas hoje</h3>
        <p style={{ fontSize: '2em', fontWeight: 'bold', margin: 0 }}>{consultasHoje}</p>
      </div> */}

      <div style={{ flex: '0 0 300px', backgroundColor: '#fff', padding: '20px', borderRadius: '18px' }}>
        <h3>Consultas por especialidade</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart width={400} height={400}>
            <Pie
              data={consultasPorEspecialidade}
              dataKey="count"
              nameKey="especialidade"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {consultasPorEspecialidade.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ flex: '1 1 200px', minWidth: 300, backgroundColor: '#fff', padding: '20px', borderRadius: '18px' }}>
        <h3>Consultas por médico</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={consultasPorMedico}>
            <XAxis dataKey="medico" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" name="Consultas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
