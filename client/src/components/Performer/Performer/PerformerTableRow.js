import React from 'react';
import PerformerEdit from '../PerformerEdit';
import PerformerDelete from '../PerformerDelete';

//table row
export const PerformerTableRow = ({ performer, session }) => {
  return (
    <tr>
      <td>{performer.id}</td>
      <td>{performer.name}</td>
      <td>{performer.age}</td>
      <td>{performer.category}</td>
      {session.me.role === 'ADMIN' ? (
        <td>
          <PerformerEdit performer={performer} />
          <PerformerDelete performer={{ id: performer.id }} />
        </td>
      ) : (
        <></>
      )}
    </tr>
  );
};
