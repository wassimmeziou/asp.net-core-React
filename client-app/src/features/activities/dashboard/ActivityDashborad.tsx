import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
    edotOrCreate : (activity : Activity) => void;
    deleteActivity : (id :string) => void;
    editMode: boolean;
    submitting: boolean;
}
export default function ActivityDashborad({ activities, selectedActivity, editMode,submitting
    , selectActivity, cancelSelectActivity, openForm, closeForm,edotOrCreate,deleteActivity  }: Props) {

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                    cancelSelectActivity={cancelSelectActivity}
                    closeForm={closeForm}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {
                    selectedActivity &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm = {openForm}
                    />
                }
                {editMode &&
                    <ActivityForm
                    closeForm={closeForm}
                    selectedActivity={selectedActivity}
                    edotOrCreate = {edotOrCreate}
                    submitting = {submitting}
                />}
            </Grid.Column>
        </Grid>
    )
}