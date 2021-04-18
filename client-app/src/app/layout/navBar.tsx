import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from "semantic-ui-react";


export default function NavBar() {

    //const { activityStore } = useStore(); 
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                <Menu.Item as={NavLink} to='/activities' name='Activities' />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity'
                        /* onClick={() => activityStore.openForm()} */ positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu >
    )
}