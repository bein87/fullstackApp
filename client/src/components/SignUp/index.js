import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

//Apollo-GraphQL calls (queries/mutations/subscriptions)
const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const SignUpPage = ({ history, refetch }) => (
  <Container>
    <h1>SignUp</h1>
    <SignUpForm history={history} refetch={refetch} />
  </Container>
);

const SignUpForm = ({ history, refetch }) => {
  //init variables and states
  const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState({ INITIAL_STATE });

  //form behavior
  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setIsValid(
      values.password !== values.passwordConfirmation ||
        values.password === '' ||
        values.email === '' ||
        values.username === '',
    );
  };
  //creating new user + init form after successful call
  const onSubmit = (signUp) => {
    signUp().then(async ({ data }) => {
      setValues({ ...INITIAL_STATE });
      localStorage.setItem('token', data.signUp.token);
      await refetch();
      history.push(routes.HOME);
    });
  };

  return (
    <Mutation mutation={SIGN_UP} variables={values}>
      {(signUp, { data, loading, error }) => (
        <Form>
          <Form.Row>
            <Col sm={8} md={6} lg={4}>
              <Form.Group>
                <Form.Control
                  name="username"
                  value={values.username}
                  onChange={onChange}
                  type="text"
                  placeholder="Full Name"
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col sm={8} md={6} lg={4}>
              <Form.Group>
                <Form.Control
                  name="email"
                  value={values.email}
                  onChange={onChange}
                  type="text"
                  placeholder="Email Address"
                />{' '}
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={8} md={6} lg={4}>
              <Form.Group>
                <Form.Control
                  name="password"
                  value={values.password}
                  onChange={onChange}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={8} md={6} lg={4}>
              <Form.Group>
                <Form.Control
                  name="passwordConfirmation"
                  value={values.passwordConfirmation}
                  onChange={onChange}
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={8} md={6} lg={4}>
              <Form.Group className="d-flex justify-content-end">
                <Button
                  onClick={() => onSubmit(signUp)}
                  disabled={!isValid || loading}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form.Group>
            </Col>
          </Form.Row>
          <Col sm={8} md={6} lg={4}>
            {error && <ErrorMessage error={error} />}
          </Col>
        </Form>
      )}
    </Mutation>
  );
};

const SignUpLink = () => (
  <Col sm={8} md={6} lg={4}>
    <hr />
    <p className="d-flex justify-content-center">
      <span>Don't have an account? </span>
      {'  '}
      <Link to={routes.SIGN_UP}> Sign Up</Link>
    </p>
  </Col>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
