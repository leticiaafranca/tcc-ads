import React, { useEffect, useState } from 'react';
import './Modal.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function ModalPaciente({ onClose }) {
    const [formData, setFormData] = useState({
        id: '',
        nome: '',
        dataNascimento: '',
        sexo: '',
        cpf: '',
        endereco: {
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
        },
        telefone: '',
        email: '',
    });

    const [status, setStatus] = useState(null);

    function formatarCPF(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .slice(0, 14);
    }

    function formatarCEP(value) {
        return value
            .replace(/\D/g, '')
            .replace(/^(\d{5})(\d)/, '$1-$2')
            .slice(0, 9);
    }

    function formatarTelefone(value) {
        return value
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/g, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'cpf') {
            newValue = formatarCPF(value);
        } else if (name === 'telefone') {
            newValue = formatarTelefone(value);
        }

        setFormData(prev => ({ ...prev, [name]: newValue }));
    }

    function handleCEPChange(e) {
        const value = e.target.value;
        const cepFormatado = formatarCEP(value);
        setFormData(prev => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                cep: cepFormatado,
            }
        }));
    }

    function handleEnderecoChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                [name]: value,
            }
        }));
    }

    function handleDateChange(e, part) {
        const dateParts = (formData.dataNascimento || '----').split('-');
        let [year = '', month = '', day = ''] = dateParts;

        if (part === 'day') day = e.target.value;
        if (part === 'month') month = e.target.value;
        if (part === 'year') year = e.target.value;

        if (day && month && year) {
            setFormData(prev => ({
                ...prev,
                dataNascimento: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                dataNascimento: `${year}-${month}-${day}`,
            }));
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/pacientes', formData);
            if (response.status >= 200 && response.status < 300) {
                alert('Paciente cadastrado com sucesso!');
                setFormData({
                    id: '',
                    nome: '',
                    dataNascimento: '',
                    sexo: '',
                    cpf: '',
                    endereco: {
                        rua: '',
                        numero: '',
                        bairro: '',
                        cidade: '',
                        estado: '',
                        cep: '',
                    },
                    telefone: '',
                    email: '',
                });
            } else {
                alert('Erro ao cadastrar paciente: ' + response.statusText);
            }
        } catch (error) {
            if (error.response) {
                alert('Erro ao cadastrar paciente: ' + (error.response.data.message || error.response.statusText));
            } else if (error.request) {
                alert('Erro de rede: sem resposta do servidor.');
            } else {
                alert('Erro: ' + error.message);
            }
        }
    }

    const anos = Array.from({ length: 100 }, (_, i) => `${new Date().getFullYear() - i}`);
    const meses = Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'));
    const dias = Array.from({ length: 31 }, (_, i) => `${i + 1}`.padStart(2, '0'));

    const [ano = '', mes = '', dia = ''] = (formData.dataNascimento || '----').split('-');



    return (

        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Registrar Paciente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nome</label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                                placeholder="Digite o nome completo"
                            />
                        </div>

                        <div className="form-group">
                            <label>Data de nascimento</label>
                            <div className="form-row">
                                <select
                                    value={dia}
                                    onChange={(e) => handleDateChange(e, 'day')}
                                    required
                                    className={dia === '' ? 'placeholder-select' : ''}
                                >
                                    <option value="" disabled hidden>Dia</option>
                                    {dias.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                                <select
                                    value={mes}
                                    onChange={(e) => handleDateChange(e, 'month')}
                                    required
                                    className={mes === '' ? 'placeholder-select' : ''}
                                >
                                    <option value="" disabled hidden>Mês</option>
                                    {meses.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                                <select
                                    value={ano}
                                    onChange={(e) => handleDateChange(e, 'year')}
                                    required
                                    className={ano === '' ? 'placeholder-select' : ''}
                                >
                                    <option value="" disabled hidden>Ano</option>
                                    {anos.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>CPF</label>
                            <input
                                type="text"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                                required
                                placeholder="Digite o CPF"
                                maxLength={14}
                            />
                        </div>

                        <div className="form-group">
                            <label>Sexo</label>
                            <select
                                name="sexo"
                                value={formData.sexo}
                                onChange={handleChange}
                                required
                                className={formData.sexo === '' ? 'placeholder-select' : ''}
                            >
                                <option value="">Selecione o sexo</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Rua</label>
                            <input
                                type="text"
                                name="rua"
                                value={formData.endereco.rua}
                                onChange={handleEnderecoChange}
                                placeholder="Digite o nome da rua"
                            />
                        </div>
                        <div className="form-group">
                            <label>Digite o número</label>
                            <input
                                type="text"
                                name="numero"
                                value={formData.endereco.numero}
                                onChange={handleEnderecoChange}
                                placeholder="123"
                            />
                        </div>
                        <div className="form-group">
                            <label>Digite o bairro</label>
                            <input
                                type="text"
                                name="bairro"
                                value={formData.endereco.bairro}
                                onChange={handleEnderecoChange}
                                placeholder="Digite o bairro"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input
                                type="text"
                                name="cidade"
                                value={formData.endereco.cidade}
                                onChange={handleEnderecoChange}
                                placeholder="Digite a cidade"
                            />
                        </div>
                        <div className="form-group">
                            <label>Estado</label>
                            <input
                                type="text"
                                name="estado"
                                value={formData.endereco.estado}
                                onChange={handleEnderecoChange}
                                placeholder="Digite o estado"
                            />
                        </div>
                        <div className="form-group">
                            <label>CEP</label>
                            <input
                                type="text"
                                name="cep"
                                value={formData.endereco.cep}
                                onChange={handleCEPChange}
                                placeholder="Digite o CEP"
                                maxLength={9}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Telefone</label>
                            <input
                                type="tel"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                placeholder="Digite o telefone"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Digite o email"
                            />
                        </div>
                    </div>

                    <button type="submit">Cadastrar Paciente</button>
                </form>
            </div>
        </div>
    );
}

export default ModalPaciente;