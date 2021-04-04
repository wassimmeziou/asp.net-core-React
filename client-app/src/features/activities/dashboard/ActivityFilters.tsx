import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export function ActivityFilters() {
    return (
        <>
            <Menu vertical  size='large' style={{marginTop:27 ,width: '100%' }}>
            <Header icon='filter' attached color='teal' content='Filters' />
            <Menu.Item content="All Activities" />
            <Menu.Item content="I'am going" />
            <Menu.Item content="I'am hosting" />
        </Menu>
            <Calendar></Calendar>
        </>
    )
}