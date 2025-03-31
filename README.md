# 🧪 Testes Automatizados da API [Serverest.dev](https://serverest.dev)

Este projeto tem como objetivo testar de forma automatizada os principais endpoints da API RESTful [https://serverest.dev](https://serverest.dev), garantindo cobertura total das operações de `usuários`.

---

## 📂 Estrutura do Projeto

```
project-root/
├── src/                    # Código utilitário e de suporte
│   ├── connector/          # Conector genérico de requisições
│   └── helper/             # Schemas, payloads e utilitários
│       ├── response-schema/
│       ├── endpoint-path.js
│       ├── payload.js
│       ├── auth.js         # Autenticação e criação automática de usuário
│       └── reporter.js
├── tests/
│   ├── features/           # Cenários BDD (Gherkin)
│   └── steps-definition/   # Step definitions em JS
├── .gitlab-ci.yml          # Pipeline GitLab CI
├── .env                    # Variáveis de ambiente (opcional)
├── package.json            # Dependências e scripts
└── README.md               # Este arquivo
```

---

## 🚀 Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/raulbatalha/carrefour-solucoes-financeiras.git
cd carrefour-solucoes-financeiras
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure seu `.env` (opcional)

O projeto já funciona automaticamente, mas você pode ajustar a URL da API:

```bash
BASE_URL=https://serverest.dev
```

### 4. Execute os testes

```bash
npm run test
```

### 5. Gerar e abrir o relatório Allure (opcional)

```bash
npm run report
```

---

## ✅ Funcionalidades Testadas

Todos os testes são escritos em BDD com [Cucumber.js](https://cucumber.io/). Os principais fluxos cobertos:

- [x] **POST /usuarios**: Criação de usuários
- [x] **GET /usuarios**: Listagem de usuários
- [ ] **GET /usuarios/:id**
- [ ] **PUT /usuarios/:id**
- [ ] **DELETE /usuarios/:id**
- [x] **Autenticação via POST /login** (automática)

Cada cenário verifica:
- Status Code
- Validação com JSON Schema
- Conteúdo do corpo da resposta
- Comportamento com payloads variados (strings vazias, inteiros negativos, caracteres especiais, etc.)

> ⚙️ **Os testes criam automaticamente um usuário válido e usam este usuário para login e autenticação JWT.**

---

## 📊 Relatórios

Este projeto está pronto para gerar relatórios com o **Allure**. Após a execução dos testes, os dados ficam salvos em `allure-results`. Use o comando abaixo para gerar e visualizar o relatório:

```bash
npm run report
```

---

## ⚙️ Integração Contínua (GitLab CI)

Um arquivo `.gitlab-ci.yml` está incluído para execução automatizada dos testes em pipelines GitLab. Ele roda os testes e pode gerar relatórios como artefato.

---

## 📚 Tecnologias Usadas

- Node.js
- Cucumber.js
- Chai + Chai HTTP
- AJV (validação de JSON Schema)
- Faker.js (geração de dados dinâmicos)
- Allure Reports

---

## 🧑‍💻 Autor

Desenvolvido por **Raul Batalha** – contato: [raulbatalh@gmail.com]

---

## 📃 Licença

Este projeto está licenciado sob a licença MIT.