# ScolaGrid 📅

O **ScolaGrid** é um sistema moderno de gerenciamento de horários escolares construído com **React**, **Vite** e **Supabase**. Ele possui uma interface premium focada em facilidade de uso, permitindo o cadastro de disciplinas, professores e turmas, além de gerar e validar uma grade escolar inteligente que impede o choque de horários.

---

## 🚀 Funcionalidades

- **CRUD Completo:** Cadastre Disciplinas, Professores (e o que lecionam) e Turmas (por turno).
- **Gerador de Grade Anti-Colisão:** A interface visual alerta e impede que um mesmo professor seja agendado para dar aula em duas turmas diferentes no exato mesmo horário.
- **Exportação (PDF/PNG):** Exporte a grade semanal das turmas em alta resolução como Imagem (PNG) ou como Documento PDF, pronto para impressão.
- **Armazenamento na Nuvem:** Todos os dados são salvos em tempo real no Supabase.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React, Vite
- **Estilização:** Vanilla CSS (Glassmorphism UI)
- **Banco de Dados (BaaS):** Supabase (PostgreSQL)
- **Exportação:** html2canvas, jsPDF

---

## ⚙️ Como executar o projeto localmente

Siga os passos abaixo para baixar e rodar o projeto na sua máquina:

### 1. Pré-requisitos
Você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (Versão 18 ou superior)
- Git

### 2. Clonando e Instalando
Abra seu terminal e execute:
```bash
# Clone este repositório
git clone https://github.com/TheVingance/ScolaGrid.git

# Acesse a pasta do projeto
cd ScolaGrid

# Instale as dependências
npm install
```

### 3. Configurando o Banco de Dados (Supabase)
O ScolaGrid precisa de um banco de dados para salvar os professores e os horários.

1. Crie uma conta gratuita em [Supabase](https://supabase.com/).
2. Clique em **New Project** para criar seu banco de dados em nuvem.
3. Com o projeto criado, vá no menu lateral e procure por **SQL Editor**.
4. Copie todo o conteúdo do arquivo `supabase_setup.sql` que está na raiz deste repositório.
5. Cole no SQL Editor do Supabase e clique em **Run**. *(Isso criará as tabelas de subjects, teachers, classes e schedules automaticamente).*
6. Agora, vá até as configurações do seu projeto Supabase: **Project Settings > API**.
7. Copie a `Project URL` e a `anon / public API Key`.

### 4. Configurando as Variáveis de Ambiente
Na raiz do seu projeto (junto do arquivo `package.json`), crie um arquivo chamado **`.env.local`** e adicione as chaves que você copiou no passo anterior:

```env
VITE_SUPABASE_URL=cole_sua_url_aqui
VITE_SUPABASE_ANON_KEY=cole_sua_anon_key_aqui
```

### 5. Rodando o Sistema
Com tudo configurado, basta iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o seu navegador no endereço exibido no terminal (geralmente `http://localhost:5173`) e comece a utilizar o ScolaGrid!
