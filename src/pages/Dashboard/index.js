import React, { Component } from "react";
import { Container, Row } from "react-bootstrap"
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default class Dashboard extends Component {
    state = {
        data: [],
        load: false
    }

    render() {
        const { load } = this.state;
        return (
            <>
                <Layout pageName="Dashboard" pageUrl="/dashboard">
                    <Container fluid>
                        <Row>

                        </Row>
                    </Container>
                </Layout>
                <Loading show={load} />
            </>
        );
    }
}