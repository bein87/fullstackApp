import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.')
);

//not in use at this point.
//will be used to check if the authenticated user is trying to change its own details.
export const isAuthenticatedPerformer = async (
  parent,
  { id },
  { models, me }
) => {
  const performer = await models.Performer.findById(id, {
    raw: true,
  });

  if (performer.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
