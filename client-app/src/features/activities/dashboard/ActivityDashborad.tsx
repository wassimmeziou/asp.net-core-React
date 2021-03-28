import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import Loading from '../../../app/layout/Loading';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';

export default observer(function ActivityDashborad() {
    const { activityStore } = useStore();

    useEffect(() => {
        // axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
        //   console.log("resp:" + response);
        //   setActivities(response.data);
        // })
        if (activityStore.activities.size <= 1) activityStore.loadActivities();
    }, [activityStore])


    if (activityStore.loadingInitial) return <Loading content='Loading app..' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filters</h2>
                {/* {
                    selectedActivity &&
                    <ActivityDetails />
                }
                {editMode &&
                    <ActivityForm />} */}
            </Grid.Column>
        </Grid>
    )
})