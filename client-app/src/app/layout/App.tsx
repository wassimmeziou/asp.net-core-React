import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, useLocation } from 'react-router';
import { Container } from 'semantic-ui-react';
import ActivityDashborad from '../../features/activities/dashboard/ActivityDashborad';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import HomePage from '../../features/home/HomePage';
import NavBar from './navBar';

function App() {

  const location = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/activities' component={ActivityDashborad} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/editActivity/:id']} component={ActivityForm} />
            </Container>
          </>
        )}
      />

    </>
  );
}

export default observer(App);
