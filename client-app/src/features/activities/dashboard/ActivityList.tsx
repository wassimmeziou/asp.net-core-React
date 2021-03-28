import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityList() {

    const [target, setTarget] = useState('');
    const { activityStore } = useStore();
    const { loading, deleteActivity, activitiesByDate } = activityStore;

    function HandleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(act => (
                    <Item key={act.id}>
                        <Item.Content>
                            <Item.Header as='a'>{act.title}</Item.Header>
                            <Item.Meta>{act.date}</Item.Meta>
                            <Item.Description>
                                <div>{act.description}</div>
                                <div>{act.city},{act.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button /*onClick={() => { activityStore.selectActivity(act.id); }}*/ as={Link} to={`/activities/${act.id}`} floated='right' content='View' color='blue' />
                                {/* <Button onClick={cancelSelectActivity} floated='right' content='Hide' color='olive' /> */}
                                <Button name={act.id} loading={loading && target === act.id} onClick={(e) => { HandleActivityDelete(e, act.id) }} floated='right' content='Delete' color='red' />
                                <Label basic content={act.category}></Label>
                            </Item.Extra>
                        </Item.Content>

                    </Item>

                ))}
            </Item.Group>

        </Segment>

    )
})