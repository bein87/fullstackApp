import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    performers(cursor: String, limit: Int): PerformerConnection!
    performer(id: ID!): Performer!
  }

  extend type Mutation {
    createPerformer(
      name: String!
      age: Int!
      category: String!
    ): Performer!
    deletePerformer(id: ID!): Boolean!
    updatePerformer(
      id: ID!
      name: String!
      age: Int!
      category: String!
    ): Performer!
  }

  type PerformerConnection {
    edges: [Performer!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Performer {
    id: ID!
    name: String!
    age: Int!
    category: String!
    createdAt: Date!
  }

  extend type Subscription {
    performerCreated: PerformerCreated!
  }

  type PerformerCreated {
    performer: Performer!
  }
`;
