import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import Loading from '../../../app/layout/Loading';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityDetails() {

    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial/*,openForm,cancelSelectedActivity*/ } = activityStore;
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        if (id) loadActivity(id)
    })
    if (loadingInitial || !activity) return <Loading></Loading>;
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button /* onClick={()=>openForm(activity.id)} */ as={Link} to={`/editActivity/${activity.id}`} basic color='blue' content='Edit' />
                <Button /* onClick={cancelSelectedActivity} */ as={Link} to={`/activities`} basic color='grey' content='Cancel' />
            </Card.Content>
        </Card>
    )
})