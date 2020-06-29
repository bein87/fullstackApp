import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
const Navigation = ({ session }) => (
  <Navbar
    bg="dark"
    variant="dark"
    expand="lg"
    className="justify-content-between"
  >
    <Container>
      <div>
        <Link to={routes.HOME}>
          <Navbar.Brand>Home</Navbar.Brand>
        </Link>
        <Link to={routes.NOTES}>
          <Navbar.Brand>Notes</Navbar.Brand>
        </Link>
      </div>
      {session && session.me ? (
        <>
          <Navbar.Brand>{session.me.username}</Navbar.Brand>
          <SignOutButton />
        </>
      ) : (
        <Link to={routes.SIGN_IN}>
          <Navbar.Brand>Sign In</Navbar.Brand>
        </Link>
      )}
    </Container>
  </Navbar>
);

export default Navigation;
