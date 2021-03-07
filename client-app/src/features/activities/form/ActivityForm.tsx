import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { selectedActivity, closeForm, loading, editOrCreate } = activityStore;

    const initialeState = selectedActivity ?? {
        id: '',
        category: '',
        city: '',
        date: '',
        description: '',
        title: '',
        venue: '',
    };

    const [activity, setActivity] = useState(initialeState);

    function handleSubmit() {
        editOrCreate(activity);
    }

    function handleOnChangeInput(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });

    }
    return (

        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleOnChangeInput} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleOnChangeInput} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleOnChangeInput} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleOnChangeInput} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleOnChangeInput} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleOnChangeInput} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )

})