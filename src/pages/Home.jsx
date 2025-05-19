// Home.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Home.css';

function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      const resposta = await api.get('/tarefas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const tarefasComEstado = resposta.data.map((t) => ({ ...t, editando: false }));
      setTarefas(tarefasComEstado);
    } catch (err) {
      setErro('Erro ao carregar tarefas.');
    }
  };

  const criarTarefa = async (e) => {
    e.preventDefault();
    try {
      const resposta = await api.post('/tarefas', { titulo: novaTarefa }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTarefas([...tarefas, { ...resposta.data, editando: false }]);
      setNovaTarefa('');
      setSucesso('Tarefa criada com sucesso!');
      setErro('');
    } catch (err) {
      setErro('Erro ao criar tarefa.');
      setSucesso('');
    }
  };

  const salvarEdicao = async (tarefa) => {
    try {
      const resposta = await api.put(`/tarefas/${tarefa._id}`, { titulo: tarefa.titulo }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTarefas((tarefasAtuais) => tarefasAtuais.map((t) =>
        t._id === tarefa._id ? { ...resposta.data, editando: false } : t
      ));
      setSucesso('Tarefa atualizada.');
      setErro('');
    } catch (err) {
      setErro('Erro ao atualizar tarefa.');
      setSucesso('');
    }
  };

  const excluirTarefa = async (id) => {
    try {
      await api.delete(`/tarefas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTarefas((tarefasAtuais) => tarefasAtuais.filter((t) => t._id !== id));
      setSucesso('Tarefa excluída.');
      setErro('');
    } catch (err) {
      setErro('Erro ao excluir tarefa.');
      setSucesso('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const ativarEdicao = (id) => {
    setTarefas((tarefasAtuais) => tarefasAtuais.map((t) =>
      t._id === id ? { ...t, editando: true } : { ...t, editando: false }
    ));
  };

  return (
    <div className="home-container">
      <button onClick={handleLogout} className="logout">Sair</button>
      <h2>Área Logada</h2>

      <form onSubmit={criarTarefa}>
        <input
          type="text"
          placeholder="Nova tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          required
        />
        <button type="submit">Adicionar</button>
      </form>

      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul>
          {tarefas.map((t) => (
            <li key={t._id}>
              {t.editando ? (
                <>
                  <input
                    type="text"
                    value={t.titulo}
                    onChange={(e) => setTarefas((tarefasAtuais) =>
                      tarefasAtuais.map((task) =>
                        task._id === t._id ? { ...task, titulo: e.target.value } : task
                      ))}
                  />
                  <button onClick={() => salvarEdicao(t)}>Salvar</button>
                </>
              ) : (
                <>
                  {t.titulo}
                  <button onClick={() => ativarEdicao(t._id)}>Editar</button>
                </>
              )}
              <button onClick={() => excluirTarefa(t._id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}

      {erro && <p className="erro">{erro}</p>}
      {sucesso && <p className="sucesso">{sucesso}</p>}
    </div>
  );
}

export default Home;
