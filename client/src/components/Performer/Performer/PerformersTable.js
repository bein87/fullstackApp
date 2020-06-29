import React from 'react';
import Table from 'react-bootstrap/Table';
import { LIMIT } from './index';
import { PerformerTableRow } from './PerformerTableRow';
import { PerformersShowMoreButton } from './PerformersShowMoreButton';

//performers table
export const PerformersTable = ({ data, session, fetchMore }) => {
  const { pageInfo } = data;
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>category</th>
            {session.me.role === 'ADMIN' ? <th>actions</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {data.performers.edges.map((performer) => (
            <PerformerTableRow
              key={`performer-row-${performer.id}`}
              session={session}
              performer={performer}
            />
          ))}
        </tbody>
      </Table>

      {pageInfo && pageInfo.hasNextPage && (
        <PerformersShowMoreButton
          limit={LIMIT}
          pageInfo={pageInfo}
          fetchMore={fetchMore}
        >
          More
        </PerformersShowMoreButton>
      )}
    </>
  );
};
