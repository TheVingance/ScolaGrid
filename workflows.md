# Workflows de Desenvolvimento e Validação

Este documento descreve os fluxos de trabalho e boas práticas para o ciclo de vida de desenvolvimento do **ScolaGrid**.

---

## 🛠️ Fluxo de Trabalho Git & Branches

1. **Branch Principal (`main`):**
   - Contém código estável e pronto para produção.
   - Todo código novo deve entrar via Pull Request aprovado e testado.

2. **Feature Branches (`feat/...` ou `fix/...`):**
   - Crie sempre uma branch a partir da `main` atualizada.
   - Mantenha commits atômicos com mensagens no padrão Conventional Commits.

---

## 🧪 Validação Local

Antes de abrir um Pull Request, execute localmente:

```bash
# Executar a verificação de linter (ESLint)
npm run lint

# Executar a build de produção para checagem de integridade
npm run build
```

---

## 🤝 Pair Programming e Co-autoria

Ao colaborar em conjunto com assistentes de IA ou outros desenvolvedores, adicione o trailer `Co-Authored-By:` no final do corpo da mensagem do commit, separado por uma linha em branco.
