import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UPDATE_PERFORMER = gql`
  mutation($id: ID!, $name: String!, $age: Int!, $category: String!) {
    updatePerformer(
      id: $id
      name: $name
      age: $age
      category: $category
    )
  }
`;
const PerformerEdit = ({ performer }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(performer);
  return (
    <>
      <Button className="mr-2" variant="info" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {performer.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
          <Mutation mutation={UPDATE_PERFORMER} variables={performer}>
            {(updatePerformer, { data, loading, error }) => (
              <Button variant="primary" onClick={updatePerformer}>
                Save changes
              </Button>
            )}
          </Mutation>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PerformerEdit;
