import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import Loading from '../../../app/layout/Loading';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityForm() {
    const history = useHistory();

    const { activityStore } = useStore();
    const { /*  closeForm, */ loading, editOrCreate, loadActivity } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState({
        id: '',
        category: '',
        city: '',
        date: '',
        description: '',
        title: '',
        venue: '',
    });

    useEffect(() => {
        if (id) loadActivity(id).then(act => setActivity(act!)

        )
    }, [id, loadActivity])

    function handleSubmit() {
        editOrCreate(activity);
        history.push(`/activities/${activity.id}`);

    }

    function handleOnChangeInput(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });



        if (activityStore.loadingInitial) return <Loading content='Loading activity..' />
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
                <Button /* onClick={closeForm} */ as={Link} to={"/activities"} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )

})