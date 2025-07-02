# API Restaurante

API para gerenciar pedidos de mesas de um restaurante.

Desenvolvida por **Pedro Ernesto** durante o curso Fullstack da Rocketseat.

## Stack Utilizada

- **Node.js** + **Express**: Backend HTTP
- **TypeScript**: Tipagem estática
- **Knex.js**: Query builder SQL
- **SQLite3**: Banco de dados relacional
- **Zod**: Validação de dados

## Funcionalidades

- Cadastro, listagem, atualização e remoção de produtos
- Listagem de mesas
- Abertura e fechamento de sessões de mesas
- Criação e listagem de pedidos por sessão de mesa
- Cálculo do total de pedidos por sessão

## Scripts

- `npm run dev` — Inicia o servidor em modo desenvolvimento
- `npm run knex` — Executa comandos do Knex (migrations, seeds, etc)

## Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd API-Restaurante
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Rode as migrations para criar as tabelas:**
   ```bash
   npm run knex -- migrate:latest
   ```
4. **(Opcional) Rode as seeds para popular o banco de dados:**
   ```bash
   npm run knex -- seed:run
   ```
5. **Inicie o servidor em modo desenvolvimento:**
   ```bash
   npm run dev
   ```

O servidor estará disponível em `http://localhost:3333`.

> **Obs:**
> - O banco de dados SQLite será criado automaticamente em `src/database/database.db`.
> - Para testar os endpoints, utilize o arquivo `Rotas_Insomnia.yaml` no Insomnia ou outra ferramenta de API.

## Boas práticas

- Validação de dados com Zod
- Tratamento centralizado de erros (`AppError` e middleware)
- Organização por controllers, rotas e models
- Tipagem forte com TypeScript

## Documentação de Rotas

Você pode importar o arquivo `Rotas_Insomnia.yaml` no Insomnia para testar todos os endpoints rapidamente.

---

Desenvolvido por **Pedro Ernesto** — Rocketseat Fullstack 