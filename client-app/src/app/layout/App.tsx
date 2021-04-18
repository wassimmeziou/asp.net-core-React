import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import ActivityDashborad from '../../features/activities/dashboard/ActivityDashborad';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import TestErrors from '../../features/Errors/errors';
import { NotFound } from '../../features/Errors/notFound';
import serverError from '../../features/Errors/serverError';
import HomePage from '../../features/home/HomePage';
import NavBar from './navBar';

function App() {

  const location = useLocation();

  return (
    <>
      <ToastContainer position="bottom-right" />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashborad} />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={serverError} />
                <Route key={location.key} path={['/createActivity', '/editActivity/:id']} component={ActivityForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />

    </>
  );
}

export default observer(App);
