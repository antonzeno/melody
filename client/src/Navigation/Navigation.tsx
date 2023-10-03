import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Navigation = () => {
    return (
        <Navbar variant='dark' expand="lg">
            <Container>
                <Navbar.Brand href="/" className='d-flex align-items-center'>
                    <img
                        src="/logo.png"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="Logo"
                    /> <div>Melody</div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='mt-1'>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/albums">Albums</Nav.Link>
                    </Nav>
                    <Nav className='d-flex align-items-center'>
                        <Button className='rounded-circle' variant='dark'>C</Button>
                        <Nav.Link href="/register"><Button variant='info' className='rounded-pill' >Register</Button></Nav.Link>
                        <Nav.Link href="/login"><Button variant='dark' className='rounded-pill' >Login</Button></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation