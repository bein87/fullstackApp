import React from 'react';
import Button from 'react-bootstrap/Button';
import { LIMIT } from './index';

//button for showing more rows in table
export const PerformersShowMoreButton = ({
  pageInfo,
  fetchMore,
  children,
}) => (
  <Button
    type="button"
    onClick={() =>
      fetchMore({
        variables: {
          cursor: pageInfo.endCursor,
          LIMIT,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          return {
            performers: {
              ...fetchMoreResult.performers,
              edges: [
                ...previousResult.performers.edges,
                ...fetchMoreResult.performers.edges,
              ],
            },
          };
        },
      })
    }
  >
    {children}
  </Button>
);
