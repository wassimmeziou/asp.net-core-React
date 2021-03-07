import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import Loading from '../../../app/layout/Loading';
import { useStore } from '../../../app/stores/store';

export default function ActivityDetails() {

    const { activityStore } = useStore();
    const { selectedActivity: activity,openForm,cancelSelectedActivity } = activityStore;
    if (!activity) return <Loading></Loading>;
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
                <Button onClick={()=>openForm(activity.id)} basic color='blue' content='Edit' />
                <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel' />
            </Card.Content>
        </Card>
    )
}