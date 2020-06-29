import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import performerResolvers from './performer';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  performerResolvers,
];
