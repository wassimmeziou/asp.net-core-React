import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, GridColumn } from 'semantic-ui-react';
import Loading from '../../../app/layout/Loading';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

export default observer(function ActivityDetails() {

    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial/*,openForm,cancelSelectedActivity*/ } = activityStore;
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        if (id) loadActivity(id)
    })
    if (loadingInitial || !activity) return <Loading></Loading>;
    return (
        <Grid>
            <GridColumn width='10'>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </GridColumn>
            <GridColumn width='6'>
                <ActivityDetailedSidebar />
            </GridColumn>
        </Grid>
    )
})