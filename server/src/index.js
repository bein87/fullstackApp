import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';
import express from 'express';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import loaders from './loaders';

const app = express();

app.use(cors());

app.use(morgan('dev'));

const getMe = async (req) => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.'
      );
    }
  }
};

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: (error) => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader((keys) =>
            loaders.user.batchUsers(keys, models)
          ),
        },
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader((keys) =>
            loaders.user.batchUsers(keys, models)
          ),
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
const port = process.env.PORT || 8000;
const isLocal = port === 8000;

sequelize.sync({ force: isLocal }).then(async () => {
  if (isLocal) {
    createUser(new Date());
  }

  httpServer.listen({ port }, () => {
    console.log(`Apollo Server is up`);
  });
});

const createUser = async (date) => {
  await models.User.create({
    username: 'admin',
    email: 'admin@task.com',
    password: 'adminPassword',
    role: 'ADMIN',
  });
  await models.User.create({
    username: 'user',
    email: 'user@task.com',
    password: 'userPassword',
    role: 'USER',
  });
  await models.Performer.create({
    name: 'michael angelo',
    age: 24,
    category: 'adult',
  });
};
