import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log("resp:" + response);
      setActivities(response.data);
    })
  }, [])


  return (
    <div>
      <Header as ='h2' icon='users' content='Learn React' />
        <List>
          {activities.map((act: any) => (
            <List.Item key={act.id}>
              {act.title}
            </List.Item>
          ))}
       </List>
    </div>
  );
}

export default App;
