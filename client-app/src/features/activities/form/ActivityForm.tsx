import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyTextInput from '../../../app/common/form/MyTextImput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import Loading from '../../../app/layout/Loading';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
export default observer(function ActivityForm() {
    const history = useHistory();

    const { activityStore } = useStore();
    const { /*  closeForm, */ loading, loadActivity, editOrCreate } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        category: '',
        city: '',
        date: null,
        description: '',
        title: '',
        venue: '',
    });

    const validationSchema = Yup.object({
        title: Yup.string().required("title is mandatory!"),
        description: Yup.string().required("description is mandatory!"),
        category: Yup.string().required(),
        venue: Yup.string().required("venue is mandatory!"),
        city: Yup.string().required("city is mandatory!"),
        date: Yup.string().required("date is mandatory!").nullable(),
    });

    useEffect(() => {
        if (id) loadActivity(id).then(act => setActivity(act!))
    }, [id, loadActivity])

    function handleFormSubmit(activity: Activity) {
        editOrCreate(activity);
        history.push(`/activities/${activity.id}`);

    }

    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setActivity({ ...activity, [name]: value }); 
    // } 

    if (activityStore.loadingInitial) return <Loading content='Loading activity..' />
    return (

        <Segment clearing>
            <Header content='Activity Details' sub color='red' />
            <Formik enableReinitialize
                validationSchema={validationSchema}
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput

                            placeholderText='Date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                            name='date' />

                        <Header content='Location Details' sub color='red' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button
                            disabled={isSubmitting || !isValid || !dirty}
                            loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button /* onClick={closeForm} */ as={Link} to={"/activities"} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )

})