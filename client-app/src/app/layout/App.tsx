import React, { useEffect, useState } from 'react';
import { Container, List } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import ActivityDashborad from '../../features/activities/dashboard/ActivityDashborad';
import agent from '../api/agent';
import { Activity } from '../models/activity';
import Loading from './Loading';
import NavBar from './navBar';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setsubmitting] = useState(false);

  useEffect(() => {
    // axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
    //   console.log("resp:" + response);
    //   setActivities(response.data);
    // })
    agent.Activities.List().then(response => {
      const acts = [];
      response.forEach(a => a.date = a.date.split('T')[0]);
      setActivities(response);
      setLoading(false);
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleEditOrCreate(activity: Activity) {
    setsubmitting(true);
    if (activity.id) {
      agent.Activities.Update(activity).then(() => {
        setSelectedActivity(activity);
        setEditMode(false);
        setActivities([activity, ...activities.filter(a => a.id !== activity.id)])
        setsubmitting(false);
      })

    } else {
      activity.id = uuid();
      agent.Activities.Create(activity).then(() => {
        setActivities([activity, ...activities]);
        setSelectedActivity(activity);
        setEditMode(false);
        setsubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setsubmitting(true);
    agent.Activities.Delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
      setsubmitting(false);
    })

  }

  if (loading) return <Loading content='Loading app..' />
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <List>
          <ActivityDashborad
            activities={activities}
            selectedActivity={selectActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            editMode={editMode}
            edotOrCreate={handleEditOrCreate}
            deleteActivity={handleDeleteActivity}
            submitting={submitting}
          />
        </List>

      </Container>

    </>
  );
}

export default App;
