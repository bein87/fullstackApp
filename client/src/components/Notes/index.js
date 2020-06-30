import React from 'react';

import withAuthorization from '../Session/withAuthorization';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

const NotesPage = () => {
  const image = require('../../assets/sorry.png');
  return (
    <>
      <Container>
        <h1>Please note......</h1>
        <hr />
        <div className="d-flex justify-content-start align-items-start flex-column w-100 ">
          <h3>
            There are some things you ought to know<br></br>
          </h3>
          <h6>
            So much to do, so little time.. here I will point out some
            issues that still requires attention
          </h6>
          <div className="d-flex justify-content-start align-items-start flex-column w-75">
            <hr />
            <ListGroup>
              <ListGroup.Item variant="info">
                API basic stuff
              </ListGroup.Item>
              <ListGroup.Item variant="light">
                > For simplicity, when api is running for the first
                time, a user and a performer is created in DB. at this
                point in time, it happens each time the app is
                recycling <br />
                > Managing component folder structure more clearly.
                (i.e all folders can be placed in one folder for
                simplicity reasons)
                <br />> Site is not fully responsive and in small
                devices like old iphones, the view is not perfect.(i.e
                table gets out of screen) clearly. (this page is being
                poorly viewed in mobile as well!)
                <br />> Did not try to build this solution. only
                tested on local machine.
              </ListGroup.Item>
            </ListGroup>
            <br />
            <ListGroup>
              <ListGroup.Item variant="info">
                Refactoring
              </ListGroup.Item>
              <ListGroup.Item variant="light">
                > Need to build logic for not showing page
                "flickering" at first, before all variables get
                values, meanwhile show loading gif
                <br />
                > Some of the consts could have be saved in global
                state, using state management such as context api
                <br />
                > Some of the logic is repeating itself. such as form,
                error message and other UI components.
                <br />
                some of the consts could have be saved in global
                state, using state management such as context api
                <br />
                > Managing component folder structure more
                <br />> Site is not fully responsive and in small
                devices like old iPhones, the view is not perfect.(i.e
                table gets out of screen) clearly.
                <br />> Minor UX issues. (i.e action buttons should be
                displayed only on row hover)
              </ListGroup.Item>
            </ListGroup>
            <br />
            <ListGroup>
              <ListGroup.Item variant="info">Tests</ListGroup.Item>
              <ListGroup.Item variant="light">
                > User authentication and behavior has automatic
                tests. (signup, login, logout, admin)
                <br /> > Performers CRUD testing is missing. tests
                should include getting performers list, working that
                pagination work, editing/creating/removing with admin
                and with regular user, and with unauthenticated user.
              </ListGroup.Item>
            </ListGroup>
            <br />
            <ListGroup>
              <ListGroup.Item variant="info">
                Edge cases
              </ListGroup.Item>
              <ListGroup.Item variant="light">
                > There's no data validation. if api returns a missing
                object, app can crush (i.e performer is missing name).{' '}
                <br /> > Missing fields validation for all forms.
                <br /> > Not all errors handled. (most common - when
                server crush and unable to make a query to db, a
                generic error is shown).
              </ListGroup.Item>
            </ListGroup>
            <br />
            <ListGroup>
              <ListGroup.Item variant="info">
                Known bugs
              </ListGroup.Item>
              <ListGroup.Item variant="light">
                > After creating performer, table does not rerender
                with new row
              </ListGroup.Item>
            </ListGroup>
            <img
              className="w-50 mt-3"
              src={image}
              title="not authenticated"
              alt="you are not authenticated"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default withAuthorization(
  (session) => session && session.me && session.me.role === 'ADMIN',
)(NotesPage);
