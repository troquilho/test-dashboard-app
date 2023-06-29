import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Alert, Navbar, Nav } from "react-bootstrap";
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import api from "../../config/api";
import Loading from "../../components/Loading";

export default class Leads extends Component {
    state = {
        user: [],
        error: false,
        load: false,
        errorMessage: ''
    }
    

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({
            user: {
                ...this.state.user,
                [nam]: val
            }
        });
    }

    clearForm = () => {
        document.querySelectorAll("input").forEach(
            input => (input.value = "")
        );
        document.querySelectorAll("select").forEach(
            select => (select.value = "")
        );
        this.setState({ user: {} });
    }

    save = async (event) => {
        event.preventDefault();
        this.setState({ load: true, error: false, errorMessage: '' });
        await api.post("/user", this.state.user)
            .then(res => {
                this.setState({ load: false });
                this.clearForm();
                swal({
                    title: "Feito!",
                    text: "Suas informações foram salvas com sucesso.",
                    icon: "success"
                });
            }).catch(err => {
                this.setState({ error: true, load: false, errorMessage: err.response.data.error });
                this.clearForm();
            });
    }

    render() {
        const { user, load, error, errorMessage } = this.state;

        return (
        <div className="h-100 leads-h-100 bg-color-app">
            <Navbar className="justify-content-end bg-color-app" fixed="top">
                <Nav.Item className="py-3 px-4">
                    <Nav.Item>
                        <a href="/login">
                            <Button className="btn-pages">
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className="pe-2" />
                                LOGIN 
                            </Button>
                        </a>
                    </Nav.Item>
                </Nav.Item>
            </Navbar>
            <Container className="h-100 leads-h-100">
                <Row className="h-100 leads-h-100 align-items-center">
                    <Col xs={12} md={12}>
                        <Form className="margin-mobile" onSubmit={this.save}>
                            <Row className="mb-lg-5 mb-md-2">
                                <Col xs={12} md={4}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="color-white fw-bold">Nome</Form.Label>
                                        <Form.Control type="text" name="name" value={user.name || ''} onChange={this.myChangeHandler} required />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="color-white fw-bold">E-mail</Form.Label>
                                        <Form.Control type="email" name="email" value={user.email || ''} onChange={this.myChangeHandler} required />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="color-white fw-bold">Telefone</Form.Label>
                                        <Form.Control type="number" name="phone" value={user.phone || ''} onChange={this.myChangeHandler} required />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={4}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="color-white fw-bold">Endereço</Form.Label>
                                        <Form.Control type="text" name="address" value={user.address || ''} onChange={this.myChangeHandler} required />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="color-white fw-bold">Cidade</Form.Label>
                                        <Form.Control type="text" name="city" value={user.city || ''} onChange={this.myChangeHandler} required />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="color-white fw-bold">Estado</Form.Label>
                                        <Form.Control value={user.uf || ''} as="select" name="uf" onChange={this.myChangeHandler} required>
                                            <option disabled value=''></option>
                                                {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map((item, index) => (
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col xs={12} className="d-flex justify-content-center align-items-center">
                                    <Button variant="primary" type="submit">
                                        ENVIAR LEAD 
                                    </Button>
                                </Col>
                                {error &&
                                    <Col xs={12} className="d-flex justify-content-center align-items-center">
                                        <Alert variant={"danger"} className="mt-3 text-center small">{errorMessage}</Alert>
                                    </Col>
                                }
                            </Row>
                        </Form>
                    </Col>
                    <Col className="fixed-bottom d-flex justify-content-center text-center pb-3">
                        <span className="small color-pantonef">&copy; Gustavo Troquilho {new Date().getFullYear()} - All Rights Reserved</span>
                    </Col>
                </Row>
            </Container>
            <Loading show={load} />
        </div>
        );
    }
}
