import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    act: Activity
}
export   function  ActivityListItem({ act }: Props) {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src="/assets/user.png" />
                        <Item.Content>
                            <Item.Header as={Link} to={`{/activities/${act.id}`}>
                                {act.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted by Bob
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' />{format( act.date!,'dd MMM yyyy hh:mm aa')}
                    <Icon floated='right' style={{ marginLeft: '10px' }} name='marker' />{act.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendee go here
            </Segment>
            <Segment clearing>
                <span>{act.description}</span>
                <Button 
                    as={Link}
                    to={`/activities/${act.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>

        </Segment.Group>
    )
}