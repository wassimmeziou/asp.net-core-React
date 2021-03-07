import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { SyntheticExpression } from 'typescript';
import { Activity } from '../../../app/models/activity'
interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    closeForm: () => void;
    submitting: boolean;
}
export default function ActivityList({ activities, selectActivity,submitting,
    cancelSelectActivity, closeForm, deleteActivity }: Props) {
    
    const [target, setTarget] = useState('');
    function HandleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        
        setTarget(e.currentTarget.name);
        deleteActivity(id);

    }
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(act =>(
                    <Item key={act.id}>
                        <Item.Content>
                            <Item.Header as='a'>{act.title}</Item.Header>
                            <Item.Meta>{act.date}</Item.Meta>
                            <Item.Description>
                                <div>{act.description}</div>
                                <div>{act.city},{ act.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => {selectActivity(act.id);closeForm() }} floated='right' content='View' color='blue' />
                                {/* <Button onClick={cancelSelectActivity} floated='right' content='Hide' color='olive' /> */}
                                <Button name={act.id} loading={submitting && target==act.id} onClick={(e) => {HandleActivityDelete(e,act.id) }} floated='right' content='Delete' color='red' />
                                <Label basic content={act.category}></Label>
                            </Item.Extra>
                        </Item.Content>

                    </Item>
                
                ))}
            </Item.Group>

        </Segment>

    )
}