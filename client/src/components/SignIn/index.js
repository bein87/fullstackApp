import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Container from 'react-bootstrap/Container';

import { SignUpLink } from '../SignUp';
import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;
const INITIAL_STATE = {
  login: '',
  password: '',
};

const SignInPage = ({ history, refetch }) => (
  <Container>
    <h1>Sign In</h1>
    <h6>
      Create a 'simple' user by signin up,<br></br> or use admin
      credentials: admin, adminPassword
    </h6>
    <SignInForm history={history} refetch={refetch} />
    <SignUpLink />
  </Container>
);

//form for signing in
const SignInForm = ({ history, refetch }) => {
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState(INITIAL_STATE);
  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setIsValid(values.login.length > 2 && values.password.length > 2);
  };

  const onSubmit = (signIn) => {
    signIn().then(async ({ data }) => {
      setValues(INITIAL_STATE);
      localStorage.setItem('token', data.signIn.token);
      await refetch();
      history.push(routes.HOME);
    });
  };

  return (
    <Mutation mutation={SIGN_IN} variables={values}>
      {(signIn, { data, loading, error }) => (
        <Form>
          <Form.Row>
            <Col sm={8} md={6} lg={4}>
              <Form.Group>
                <Form.Control
                  name="login"
                  value={values.login}
                  onChange={onChange}
                  type="text"
                  placeholder="Email or Username"
                />{' '}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  name="password"
                  value={values.password}
                  onChange={onChange}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="d-flex justify-content-end">
                <Button
                  onClick={() => onSubmit(signIn)}
                  disabled={!isValid || loading}
                  type="submit"
                >
                  Sign In
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

export default withRouter(SignInPage);

export { SignInForm };
