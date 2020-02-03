import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/ActionCreators'
import './Navbar.scss'

export default function NavbarComponent() {
    const dispatch = useDispatch()

    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Nav>
                        <NavLink className="nav-link" to="/dashboard"><i className="fas fa-home"></i> Home</NavLink>
                        <NavLink className="nav-link" to="/settings"><i className="fas fa-cog"></i> Settings</NavLink>
                    </Nav>

                    <Nav className="ml-auto">
                        <NavLink className="nav-link" onClick={() => dispatch(logOut())} to="/"><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
                    </Nav>
                </Container>
            </Navbar>
            <br />
        </>
    )
}
