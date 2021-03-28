import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";


export default function HomePage() {
    return (
        <Container style={{ marginTop: '7 em' }}>
            <h1>Home Page </h1>
            <h3>Go To </h3><Link to={"/activities"}>Activities</Link>
        </Container>
    )
}