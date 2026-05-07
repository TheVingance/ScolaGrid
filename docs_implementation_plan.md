# Atualização do Sistema: Nuvem e Novos Horários

Este plano detalha a transição do armazenamento de dados atual (Local Storage) para um banco de dados em nuvem, bem como o ajuste dos turnos e horários escolares.

## User Review Required

> [!IMPORTANT]
> **Aprovação da Plataforma em Nuvem (Supabase)**
> Para atender ao requisito de gratuidade e banco em nuvem, proponho o uso do **Supabase** (uma excelente alternativa gratuita ao Firebase). Ele permite salvar dados estruturados com segurança.
> **Como funcionará:** Eu prepararei todo o código do sistema para se conectar ao Supabase. Você precisará apenas criar uma conta gratuita no site deles (supabase.com), criar um projeto e me passar as "chaves de acesso" (URL e ANON KEY) para que eu coloque no sistema. Está de acordo com essa abordagem?

## Open Questions

> [!NOTE]
> 1. **Divisão dos Horários:** Você mencionou que a Manhã vai das 07:10 às 12:30 e a Tarde das 13:30 às 18:20. Como os horários exatos de cada "aula" devem aparecer na grade? Exemplo para a manhã: Aula 1 (07:10), Aula 2 (08:00), Aula 3 (08:50), Intervalo, Aula 4 (10:00), Aula 5 (10:50), Aula 6 (11:40). Você pode me listar a divisão exata dos horários de "início" de cada aula para eu colocar nas tabelas?
> 2. O turno da **Noite** ainda existirá no sistema, ou podemos remover e deixar apenas Manhã e Tarde?

## Proposed Changes

### Banco de Dados na Nuvem (Supabase)
- **Instalar o SDK:** Instalarei a biblioteca `@supabase/supabase-js`.
- **Configuração (`src/supabaseClient.js`):** Arquivo responsável por iniciar a conexão.
- **Refatoração do Contexto (`src/context/StoreContext.jsx`):** 
  - Remover a lógica de `localStorage`.
  - Criar funções assíncronas para ler e gravar dados diretamente nas tabelas do Supabase (`subjects`, `teachers`, `classes`, `schedules`).

### Ajuste de Horários e Turnos
- **Atualização das Constantes:** Atualizar as variáveis `SHIFT_TIMES` nos arquivos `ScheduleManager.jsx` e `Reports.jsx` para os novos intervalos de horários, substituindo a grade padrão antiga pelos blocos da manhã (07:10 - 12:30) e tarde (13:30 - 18:20).
- **Turmas (`Classes.jsx`):** Ajustar as descrições de turnos na tela de criação de turmas.

## Verification Plan

### Testes Manuais
- Verificar se a aplicação consegue ler e escrever dados no Supabase.
- Acessar a página de Grade Escolar e verificar se as colunas e linhas da tabela refletem os novos horários (ex: começando às 07:10).
- Testar a exportação do PDF para garantir que os novos horários caibam corretamente no layout do documento.
