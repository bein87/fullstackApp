import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ErrorMessage from '../../Error';

//Apollo-GraphQL calls (queries/mutations/subscriptions)
const CREATE_PERFORMER = gql`
  mutation($name: String!, $age: Int!, $category: String!) {
    createPerformer(name: $name, age: $age, category: $category) {
      name
      age
      category
    }
  }
`;

const PerformerCreate = () => {
  //init variables and states
  const INITIAL_STATE = {
    name: '',
    age: 0,
    category: '',
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState(INITIAL_STATE);
  //form behavior
  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setIsValid(
      values.name.length > 2 &&
        values.age > 18 &&
        values.category.length > 2,
    );
  };

  //creating new performer + init form after successful call
  const onSubmit = async (createPerformer) => {
    try {
      await createPerformer();
      setValues(INITIAL_STATE);
    } catch (error) {
      console.log(`something went wrong! ${error}`);
    }
  };

  return (
    <>
      <Button variant="outline-info" size="sm" onClick={handleShow}>
        Add Performer
      </Button>
      <Mutation mutation={CREATE_PERFORMER} variables={values}>
        {(createPerformer, { data, loading, error }) => (
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
                onClick={() => onSubmit(createPerformer)}
                disabled={!isValid || loading}
                type="submit"
              >
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Mutation>{' '}
    </>
  );
};

export default PerformerCreate;
