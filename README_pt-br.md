# Gerenciador de partidas de futebol

---

## Descrição

Este é um projeto de um site informativo sobre partidas e classificações de futebol, desenvolvido por [Lucas Ximenes](inkedin.com/in/lucasdximenes) que seguiu os princípios SOLID e TDD. O objetivo é fornecer uma aplicação completa e integrada, consumindo uma base de dados e oferecendo uma API REST para ser consumida pelo front-end.

---

## Tecnologias

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Docker e Docker Compose](https://www.docker.com/)
- [JWT](https://jwt.io/) (Autenticação)
- [Mocha, Chai e Sinon](https://mochajs.org/) (Testes)
- [ESLint, Aibnb Style Guide e SonarJS](https://eslint.org/) (Padronização de código)
- [MySQL](https://www.mysql.com/) (Banco de dados)

---

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Instalação

1. Clone o repositório

```bash
git clone git@github.com:lucasdximenes/football-match-manager.git
```

2. Entre na pasta do projeto

```bash
cd football-match-manager
```

3. Instale as dependências

> Este comando irá instalar as dependências do front-end e do back-end simultaneamente (pode demorar um pouco).

```bash
npm install
```

4. Após a instalação das dependências, rode um dos comandos abaixo:

> Para rodar o projeto em modo de desenvolvimento:

```bash
npm run compose:up:dev
```

> Para rodar o projeto em modo de produção:

```bash
npm run compose:up
```

> NOTA: Os comandos estão descritos no arquivo `package.json` na raiz do projeto.

5. Acesse o site

> O site estará disponível em [http://localhost:3000](http://localhost:3000)

> A API estará disponível em [http://localhost:3001](http://localhost:3001)

> O banco de dados estará disponível em [http://localhost:3002](http://localhost:3002)

---

## Como rodar os testes

### Acessando o container

```bash
docker exec -it app_backend bash
```

### Rodando os testes

```bash
npm run test
```

---

## Documentação da API

### Autenticação

`/login` POST - Autentica o usuário e retorna um token JWT.
`/login/validate` GET - Valida o token JWT e retorna o tipo de usuário (admin ou user).
`/teams` GET - Retorna todos os times cadastrados
`/teams/:id` GET - Retorna um time por ID
`/matches` GET - Retorna todas as partidas cadastradas
`/matches` POST - Cadastra uma partida
`/matches/:id` PATCH - Atualiza os gols de uma partida
`/matches/:id/finish` PATCH - Finaliza uma partida
`/leaderboard` GET - Retorna a classificação geral
`/leaderboard/home` GET - Retorna a classificação do time da casa
`/leaderboard/away` GET - Retorna a classificação do time visitante

---

## Preview Front-end

![Preview](./preview.png)

---
