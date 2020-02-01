import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/ActionCreators'

export default function NavbarComponent() {
    const dispatch = useDispatch()

    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Nav>
                        <Link className="nav-link" to="/dashboard"><i className="fas fa-home"></i> Home</Link>
                        <Link className="nav-link" to="/settings"><i className="fas fa-cog"></i> Settings</Link>
                    </Nav>

                    <Nav className="ml-auto">
                        <Link className="nav-link" onClick={() => dispatch(logOut())} to="/"><i className="fas fa-sign-out-alt"></i> Logout</Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />
        </>
    )
}
