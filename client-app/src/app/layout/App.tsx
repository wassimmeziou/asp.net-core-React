import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Container, List } from 'semantic-ui-react';
import ActivityDashborad from '../../features/activities/dashboard/ActivityDashborad';
import { useStore } from '../stores/store';
import Loading from './Loading';
import NavBar from './navBar';

function App() {

  const { activityStore } = useStore();

  useEffect(() => {
    // axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
    //   console.log("resp:" + response);
    //   setActivities(response.data);
    // })
    activityStore.loadActivities();
  }, [activityStore])


  if (activityStore.loadingInitial) return <Loading content='Loading app..' />
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <List>
          <ActivityDashborad />
        </List>
      </Container>
    </>
  );
}

export default observer(App);
