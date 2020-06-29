import React from 'react';
import withSession from '../Session/withSession';
import Container from 'react-bootstrap/Container';
import Performers from '../Performer/Performer';
import PerformerCreate from '../Performer/PerformerCreate';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

const Home = ({ session }) => (
  <Container>
    {session && session.me ? (
      <>
        <div className={'d-flex w-100 justify-content-between'}>
          <h1>Performers</h1>
          {session.me.role === 'ADMIN' ? <PerformerCreate /> : <></>}
        </div>
        <hr />
        <Performers session={session} />
      </>
    ) : (
      <NotAuthenticatedMessage />
    )}
  </Container>
);

const NotAuthenticatedMessage = () => {
  const image = require('../../assets/empty.png');
  return (
    <>
      <h1>Welcome to my solution!</h1>
      <hr />
      <div className="d-flex justify-content-center align-items-center flex-column w-100 mt-5">
        <h3>
          Wish to view performers table?<br></br>
        </h3>
        <h5>
          you must be <Link to={routes.SIGN_IN}>logged in</Link>!
        </h5>
        <img
          className="w-50 mt-3"
          src={image}
          title="not authenticated"
          alt="you are not authenticated"
        />
      </div>
    </>
  );
};
export default withSession(Home);
