import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../../Loading';
import { PerformersTable } from './PerformersTable';
import { PerformersEmptyAlert } from './PerformersEmptyAlert';

export const LIMIT = { limit: 100 };

//Apollo-GraphQL calls (queries/mutations/subscriptions)
const GET_PAGINATED_PERFORMERS = gql`
  query($cursor: String, $limit: Int!) {
    performers(cursor: $cursor, limit: $limit)
      @connection(key: "PerformersConnection") {
      edges {
        id
        name
        age
        category
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
const PERFORMER_CREATED = gql`
  subscription {
    performerCreated {
      id
      name
      age
      category
    }
  }
`;

const Performers = ({ session }) => {
  return (
    <Query query={GET_PAGINATED_PERFORMERS} variables={LIMIT}>
      {({ data, loading, error, fetchMore, subscribeToMore }) => {
        if (loading) {
          return <Loading />;
        }

        if (
          data &&
          data.performers &&
          data.performers.edges.length > 0
        ) {
          return (
            <Fragment>
              <subscribeToMorePerformers
                subscribeToMore={subscribeToMore}
              />

              <PerformersTable
                data={data}
                session={session}
                fetchMore={fetchMore}
              />
            </Fragment>
          );
        } else {
          return <PerformersEmptyAlert />;
        }
      }}
    </Query>
  );
};

//subscribing for performers (used to update performers list)
const subscribeToMorePerformers = ({ subscribeToMore }) => {
  subscribeToMore({
    document: PERFORMER_CREATED,
    updateQuery: (previousResult, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return previousResult;
      }

      const { performerCreated } = subscriptionData.data;

      return {
        ...previousResult,
        performers: {
          ...previousResult.performers,
          edges: [
            performerCreated.performer,
            ...previousResult.performers.edges,
          ],
        },
      };
    },
  });
};

export default Performers;
