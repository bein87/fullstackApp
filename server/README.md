# simple app with user authentication, showing table of performers taken from PostgreSQL DB, using Apollo, Sequelize and graphql

Built with the help of:

- [Node.js with Express + PostgreSQL](https://github.com/the-road-to-graphql/fullstack-apollo-express-postgresql-boilerplate)
- [React Client](https://github.com/the-road-to-graphql/fullstack-apollo-react-boilerplate)

## Features of Client

- React (create-react-app) with Apollo Client
- Queries, Mutations, Subscriptions
- bootstrap

## Features of server

- Node.js + Express + Apollo
  - cursor-based Pagination
- PostgreSQL + Sequelize
  - entities: users, performers
- Authentication
  - powered by JWT and local storage
  - Sign Up, Sign In, Sign Out
- Authorization
  - protected endpoint (e.g. verify valid session)
  - protected resolvers (e.g. e.g. session-based, role-based)
  - protected routes (e.g. session-based, role-based)
- performance optimizations
  - example of using Facebook's dataloader
- E2E testing

## Installation

- `git clone repository app from github`
- open server folder and run commands in
- `docker-compose up`
- `npm install`
- `npm start`
- open client folder and run commands
- `npm install`
- `npm start`

## Usage

- app > `http://localhost:3000`
- graphql > `http://localhost:8080`
