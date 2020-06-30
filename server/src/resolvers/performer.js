import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';

import pubsub, { EVENTS } from '../subscription';
import { isAuthenticated } from './authorization';

const toCursorHash = (string) =>
  Buffer.from(string).toString('base64');

const fromCursorHash = (string) =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    performers: async (
      parent,
      { cursor, limit = 100 },
      { models }
    ) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor),
              },
            },
          }
        : {};

      const performers = await models.Performer.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });

      const hasNextPage = performers.length > limit;
      const edges = hasNextPage
        ? performers.slice(0, -1)
        : performers;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString()
          ),
        },
      };
    },
    performer: async (parent, { id }, { models }) => {
      return await models.Performer.findByPk(id);
    },
  },

  Mutation: {
    createPerformer: combineResolvers(
      isAuthenticated,
      async (parent, { name, age, category }, { models, me }) => {
        const performer = await models.Performer.create({
          name,
          age,
          category,
        });

        pubsub.publish(EVENTS.PERFORMER.CREATED, {
          performerCreated: { performer },
        });

        return performer;
      }
    ),
    updatePerformer: combineResolvers(
      async (parent, { id, name, age, category }, { models }) => {
        const performer = await models.Performer.findByPk(id);
        return await performer.update({
          id: id,
          name: name,
          age: age,
          category: category,
        });
      }
    ),

    deletePerformer: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
        return await models.Performer.destroy({ where: { id } });
      }
    ),
  },

  //todo: check?
  // Performer: {
  //   user: async (performer, args, { loaders }) => {
  //     return await loaders.user.load(performer.userId);
  //   },
  // },

  Subscription: {
    performerCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.PERFORMER.CREATED),
    },
  },
};
