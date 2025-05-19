# EXPRESS-BANCO - Frontend

Este repositório contém a interface frontend de um sistema de cadastro, login e gerenciamento de tarefas, desenvolvido com **React + Vite**.

## 📌 Funcionalidades Implementadas

### Telas Públicas
- **Tela de Cadastro**
  - Campos: nome, e-mail, senha
  - Requisição POST para `/register`
  - Feedback visual (mensagem de erro/sucesso)

- **Tela de Login**
  - Campos: e-mail, senha
  - Requisição POST para `/login`
  - Armazenamento do token JWT
  - Redirecionamento para a área logada

---

### Tela Protegida (Área Logada)
- Simulação da listagem de tarefas
- Funcionalidades simuladas:
  - Criar, editar e excluir tarefas
- Botão de logout
- Roteamento protegido por token

> ⚠️ **Importante:** A integração com o backend **não pôde ser testada** até o momento devido a problemas técnicos enfrentados na aplicação Express durante a fase final.  
> A interface, no entanto, está preparada para se conectar a um backend funcional, e o objetivo é concluir essa integração assim que os problemas forem resolvidos.

---

## 🖥️ Sobre o Projeto

A navegação está organizada com rotas públicas e privadas, e o estado de autenticação é gerenciado com token JWT.

