import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Alert, Navbar, Nav, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons/faArrowLeftLong';
import api from "../../config/api";
import { decodeToken } from "../../config/auth";
import Loading from "../../components/Loading";
import checkerB from "../../assets/img/checkerboard.png";

export default class Login extends Component {
    state = {
        user: [],
        error: false,
        load: false,
        errorMessage: '',
        session: decodeToken(localStorage.getItem('TEST_KEY')),
    }
    
    componentDidMount() {
        const {session} = this.state
        if(session) window.location.href = "/dashboard";
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

    save = async (event) => {
        event.preventDefault();
        this.setState({ load: true, error: false, errorMessage: '' });
        await api.post("/auth/login", this.state.user)
            .then(res => {
                this.setState({ load: false });
                localStorage.setItem("TEST_KEY", res.data.token);
                window.location.href = "/dashboard";
            }).catch(err => {
                this.setState({ error: true, load: false, errorMessage: err.response.data.error });
            });
    }

    render() {
        const { load, error, errorMessage } = this.state;

        return (
        <div className="h-100 bg-color-app">
            <Navbar className="justify-content-start bg-color-app" fixed="top">
                <Nav.Item className="py-3 px-4">
                    <Nav.Item>
                        <a href="/">
                            <Button className="btn-pages">
                                LEAD
                                <FontAwesomeIcon icon={faArrowLeftLong} className="ps-2" />
                            </Button>
                        </a>
                    </Nav.Item>
                </Nav.Item>
            </Navbar>
            <Container className="h-100">
                <Row className="h-100 align-items-center">
                    <Col xs={12} md={12} className="d-flex justify-content-center">
                        <Card className="card-login">
                            <div className="d-flex justify-content-center mb-5">
                                <div className="checkerboard-border">
                                    <img src={checkerB} alt="checkerboard" className="img-fluid" />
                                </div>
                            </div>
                            <Form onSubmit={this.save}>
                                <Row className="mb-2">
                                    <Col xs={12} md={12}>
                                        <Form.Group className="mb-5">
                                            <Form.Label className="color-white fw-bold">E-mail</Form.Label>
                                            <Form.Control type="email" name="email" onChange={this.myChangeHandler} required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="color-white fw-bold">Senha</Form.Label>
                                            <Form.Control type="password" name="password" onChange={this.myChangeHandler} required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="d-flex justify-content-center align-items-center">
                                        <Button variant="primary" type="submit">
                                            LOGIN 
                                        </Button>
                                    </Col>
                                    {error &&
                                        <Col xs={12} className="d-flex justify-content-center align-items-center">
                                            <Alert variant={"danger"} className="mt-3 mb-0 text-center small">{errorMessage}</Alert>
                                        </Col>
                                    }
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                    <Col className="fixed-bottom d-flex justify-content-center pb-3">
                        <span className="small color-pantonef">&copy; Gustavo Troquilho {new Date().getFullYear()} - All Rights Reserved</span>
                    </Col>
                </Row>
            </Container>
            <Loading show={load} />
        </div>
        );
    }
}
