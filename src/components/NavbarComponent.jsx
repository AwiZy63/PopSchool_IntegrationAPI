import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function NavbarComponent(props) {
    const { isLogged, setIsLogged } = props;

    const handleLogout = () => {
        setIsLogged(false);
        sessionStorage.clear();
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={NavLink} to='/'>Mon projet</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to='/'>Accueil</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title="👤" id="collasible-nav-dropdown">
                            {isLogged ?
                                <>
                                    <NavDropdown.Item as={NavLink} to='/profile'>Profil</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => handleLogout()}>Déconnexion</NavDropdown.Item>
                                </>
                                :
                                <>
                                    <NavDropdown.Item as={NavLink} to='/signup'>Inscription</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={NavLink} to='/signin'>Connexion</NavDropdown.Item>
                                </>
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
