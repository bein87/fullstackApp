import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ErrorMessage from '../../Error';

const UPDATE_PERFORMER = gql`
  mutation($id: ID!, $name: String!, $age: Int!, $category: String!) {
    updatePerformer(
      id: $id
      name: $name
      age: $age
      category: $category
    ) {
      id
      name
      age
      category
    }
  }
`;
const PerformerEdit = ({ performer }) => {
  //init variables and states
  const INITIAL_STATE = {
    id: performer.id,
    name: performer.name,
    age: performer.age,
    category: performer.category,
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState(INITIAL_STATE);
  //form behavior
  const onChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: name === 'age' ? Number(value) : value,
    });
    setIsValid(
      values.name.length > 2 &&
        values.age > 0 &&
        values.category.length > 2,
    );
  }; //creating new performer + init form after successful call
  const onSubmit = async (updatePerformer) => {
    try {
      await updatePerformer();
      handleClose();
    } catch (error) {
      console.log(`something went wrong! ${error}`);
    }
  };
  return (
    <>
      <Button className="mr-2" variant="info" onClick={handleShow}>
        Edit
      </Button>
      <Mutation mutation={UPDATE_PERFORMER} variables={values}>
        {(updatePerformer, { data, loading, error }) => (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create new performer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Row>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Control
                        name="name"
                        value={values.name}
                        onChange={onChange}
                        type="text"
                        placeholder="Full Name"
                      />
                    </Form.Group>
                  </Col>
                </Form.Row>

                <Form.Row>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Control
                        name="age"
                        value={values.age}
                        onChange={onChange}
                        type="number"
                        placeholder="age"
                      />{' '}
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Control
                        name="category"
                        value={values.category}
                        onChange={onChange}
                        type="text"
                        placeholder="category"
                      />
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Col sm={9}>
                  {error && <ErrorMessage error={error} />}
                </Col>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={() => onSubmit(updatePerformer)}
                disabled={!isValid || loading}
                type="submit"
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Mutation>
    </>
  );
};

export default PerformerEdit;
