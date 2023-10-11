import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

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
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className='text-decoration-none text-white mx-2'>Home</Link>
                        <Link to="/albums" className='text-decoration-none text-white mx-2'>Artists</Link>
                    </Nav>
                    <Nav className='d-flex flex-row align-items-center justify-content-betweeen'>
                        <Link to="/cart"><Button className='rounded-circle' variant='dark'><FaShoppingCart /></Button></Link>
                        <Link to="/register"><Button variant='info' className='rounded-pill mx-2' >Register</Button></Link>
                        <Link to="/login"><Button variant='dark' className='rounded-pill' >Login</Button></Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation