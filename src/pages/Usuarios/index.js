import React, { Component } from "react";
import { Container, Row, Table } from "react-bootstrap"
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import api from "../../config/api";

export default class Usuarios extends Component {
    state = {
        data: [],
        dataInfo: [],
        load: false
    }

    componentDidMount() {
        this.getData();
    }

    getData = async (page = 1) => {
        this.setState({ load: true });
        await api.get(`/admin-user?paginate=true&page=${page}&sortBy=price&order=asc`)
            .then(res => {
                const { docs, ...dataInfo } = res.data;
                this.setState({ load: false, dataInfo, data: docs });
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        const { data = [], load } = this.state;
        return (
            <>
                <Layout pageName="Usuários" pageUrl="/usuarios">
                    <Container fluid>
                        <Row>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">Hierarquia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {data.map((data, index) => (
                                    <tr>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.role}</td>
                                    </tr>
                                ))}
                                {(data.length === 0) &&
                                    <tr>
                                        <td colSpan={3} className="text-center">Não foram encontrados resultados.</td>
                                    </tr>
                                }
                                </tbody>
                            </Table>
                        </Row>
                    </Container>
                </Layout>
                <Loading show={load} />
            </>
        );
    }
}