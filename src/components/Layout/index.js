
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Accordion, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import MaterialIcon from 'material-icons-react';
import { decodeToken } from "../../config/auth";
import checker from '../../assets/img/checkerboard.png';

export default class Sidebar extends Component {

    state = {
        session: decodeToken(localStorage.getItem('TEST_KEY')),
        sidebar: true
    }

    toggleSidebar = () => this.setState({ sidebar: !this.state.sidebar });

    logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    render() {
        const sidebar = this.state.sidebar;
        const user = this.state.session.tokenObj;

        return (
            <div className={(sidebar) ? "d-flex" : "d-flex toggled"} id="wrapper">
                <div id="sidebar-wrapper">
                    <div className="sidebar-heading d-flex align-items-center justify-content-center flex-column">
                        <a href="/dashboard"><img src={checker} alt="" className="img-fluid mb-2" width={100} /></a>
                    </div>
                    <Accordion>
                        {/* DASHBOARD */}
                        <Card className="border-0">
                            <Card.Header className="p-0 border-0 bg-white">
                                <NavItem icon={"dashboard"} name={"Dashboard"} link="/dashboard" />
                                <NavItem icon={"diversity_1"} name={"Leads"} link="/leads" />
                                {user.role === 'admin' &&
                                    <>
                                        <NavItem icon={"person"} name={"Usuários"} link="/usuarios" />
                                    </>
                                }
                            </Card.Header>
                        </Card>
                    </Accordion>
                </div>
                <div id="page-content-wrapper" className="d-flex justify-content-between flex-column">
                    <div className="d-flex flex-column w-100 h-100 overflow-auto justify-content-between">
                        <div>
                            <Navbar collapseOnSelect expand="lg" className="py-3 bg-color-app justify-content-between">
                                <div className="ms-3 d-flex justify-content-center align-items-center">
                                    <MaterialIcon icon="reorder" onClick={this.toggleSidebar} />
                                    <h6 className="ms-3 mt-1 mb-0 lh-1">
                                        <a href={this.props.pageUrl} className="text-decoration-none me-2 color-pantonef fw-bold">
                                            {this.props.pageName}
                                        </a>
                                    </h6>
                                </div>
                                <Nav className="ml-auto p-0">
                                    <Nav.Link className="p-0 d-flex d-sm-none" href="#" onClick={this.logout}>Sair</Nav.Link>
                                    <DropdownButton
                                        align={{ lg: 'end' }}
                                        title={
                                            <>
                                                <img src={checker} alt={user.name} width={30} height={30} className="me-2 rounded-circle" />
                                                <span className="color-purple me-3">Olá, <strong>{user.name}</strong>!</span>
                                            </>
                                        }
                                        id="dropdown-menu-align-right" className="p-0 d-none d-sm-flex">
                                        <Dropdown.Item eventKey="4" onClick={this.logout}>Sair</Dropdown.Item>
                                    </DropdownButton>
                                </Nav>
                            </Navbar>
                            <div className="p-sm-4 px-md-0 py-md-4">
                                {this.props.children}
                            </div>
                        </div>
                        <div className="w-100 py-3 text-center small text-muted">
                            &copy; Gustavo Troquilho {new Date()} - All Rights Reserved
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

function NavItem(props) {
    return (
        <div className="list-group list-group-flush">
            <Link className="list-group-item list-group-item-action" to={props.link}>
                <span className="d-flex align-items-center">
                    <MaterialIcon icon={props.icon} /> <span className="name-list">{props.name}</span>
                </span>
            </Link>
        </div>
    );
}