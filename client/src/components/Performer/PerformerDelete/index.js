import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'react-bootstrap/Button';

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

const DELETE_PERFORMER = gql`
  mutation($id: ID!) {
    deletePerformer(id: $id)
  }
`;

const PerformerDelete = ({ message, performer }) => (
  <Mutation
    mutation={DELETE_PERFORMER}
    variables={{ id: performer.id }}
    update={(cache) => {
      const data = cache.readQuery({
        query: GET_PAGINATED_PERFORMERS,
      });

      cache.writeQuery({
        query: GET_PAGINATED_PERFORMERS,
        data: {
          ...data,
          performers: {
            ...data.performers,
            edges: data.performers.edges.filter(
              (node) => node.id !== performer.id,
            ),
            pageInfo: data.performers.pageInfo,
          },
        },
      });
    }}
  >
    {(deletePerformer, { data, loading, error }) => (
      <Button variant="danger" onClick={deletePerformer}>
        Delete
      </Button>
    )}
  </Mutation>
);

export default PerformerDelete;
