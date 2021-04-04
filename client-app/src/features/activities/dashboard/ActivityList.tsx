import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { ActivityListItem } from './ActivityListItem';

export default observer(function ActivityList() {

    const { activityStore } = useStore();
    const { groupActivities } = activityStore;

    return (
        <>
            {
                groupActivities.map(([group, activities]) =>
                (
                    <Fragment key={group}>
                        <Header sub color='teal'>
                            {group}
                        </Header>
                        {activities.map(act => (
                            <ActivityListItem key={act.id} act={act} />
                        ))}
                    </Fragment >
                ))
            }
        </>
    )
})