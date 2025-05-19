// Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/usuarios/register', { username, email, password });
      setSucesso('Usuário cadastrado com sucesso!');
      setErro('');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setErro('Erro ao cadastrar. Tente outro email.');
      setSucesso('');
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nome" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
      {erro && <p className="erro">{erro}</p>}
      {sucesso && <p className="sucesso">{sucesso}</p>}
    </div>
  );
}

export default Register;
