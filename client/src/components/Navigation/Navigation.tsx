import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/auth";
import axios from "axios";

const Navigation = () => {
    const { isAuthenticated, user } = useRecoilValue(authState);
    const [dropdownShown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef();

    useEffect(() => {
        if (isAuthenticated !== null) {
            setLoading(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [user]);

    const handleLogout = async () => {
        try {
            axios.interceptors.request.use(
                (config) => {
                    config.withCredentials = true;
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/logout`);
        } catch (error) {
            console.error(error);
        }
    };

    function handleDropdownToggle(): void {
        setShowDropdown(!dropdownShown);
    }

    return (
        <Navbar variant="dark" expand="lg" className="p-0">
            <Container>
                <Navbar.Brand href="/" className="d-flex align-items-center">
                    <img src="/logo.png" width="50" height="50" className="d-inline-block align-top" alt="Logo" />{" "}
                    <div>Melody</div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="text-decoration-none text-white mx-2">
                            Home
                        </Link>
                        <Link to="/artists" className="text-decoration-none text-white mx-2">
                            Artists
                        </Link>
                    </Nav>

                    {loading ? (
                        <>
                            <div className="bg-dark me-2" style={{ width: 35, height: 35, borderRadius: 12 }}></div>
                            <div className="bg-dark me-2" style={{ width: 75, height: 35, borderRadius: 12 }}></div>
                            <div className="bg-dark" style={{ width: 60, height: 35, borderRadius: 12 }}></div>
                        </>
                    ) : isAuthenticated ? (
                        <NavDropdown
                            title={
                                <span onClick={handleDropdownToggle}>
                                    {user.photo !== "" ? (
                                        <img
                                            className="rounded-circle"
                                            src={user.photo}
                                            alt="Profile"
                                            width={20}
                                            height={20}
                                        />
                                    ) : (
                                        <FaUser />
                                    )}
                                </span>
                            }
                            show={dropdownShown}
                            drop={"down-centered"}
                            className="me-5"
                            ref={dropdownRef}
                        >
                            <NavDropdown.Item>
                                <Link className="text-decoration-none text-white" to="/profile/edit">
                                    Edit profile
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link className="text-decoration-none text-white" to="/soundtrack/edit">
                                    Upload soundtrack
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <span onClick={() => handleLogout()}>Logout</span>
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <Nav className="d-flex flex-row align-items-center justify-content-between">
                            <Link to="/cart">
                                <Button className="rounded-circle" variant="dark">
                                    <FaShoppingCart />
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="info" className="rounded-pill mx-2">
                                    Register
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="dark" className="rounded-pill">
                                    Login
                                </Button>
                            </Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
