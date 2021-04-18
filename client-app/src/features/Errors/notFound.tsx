import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export function NotFound() {
    return (
        <Segment placeholder>
            <Header icon >
                <Icon name="question" />
                Oops! - We've looked everywhere but we didn't find this one!
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/"  >
                    Dashboard
                </Button>
            </Segment.Inline>
        </Segment>
    )
}