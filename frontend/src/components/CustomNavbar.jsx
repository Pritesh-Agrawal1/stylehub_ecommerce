import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';
import ProfileInfo from '../pages/ProfileInfo';

const CustomNavbar = () => {

    let navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)

    const [login,setLogin] = useState(false)

    const [user, setUser] = useState(undefined)

    useEffect(()=>{
        setLogin(isLoggedIn())
        setUser(getCurrentUserDetail())
    },[login])

    const logout = () =>{
        doLogout(()=>{
            //logged out
            setLogin(false)
            navigate("/")

        })
    }


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={NavLink} to="/">StyleHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/mens">MENS</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/womens">WOMENS</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/kids">KIDS</NavDropdown.Item>
                        </NavDropdown>
                       <Nav.Link as={NavLink} to="/contact">Contact Us</Nav.Link>
                    </Nav>

                    <Nav>

                        {
                            login && (
                            <>
                                <Nav.Link as={NavLink} to="/user/profile-info">Profile</Nav.Link>
                                <Nav.Link>{user.email}</Nav.Link>
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </>
                            
                        )
                        }
                        {
                            !login && (
                             <>      
                                 <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                 <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                             </>
                            )
                        }


                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
