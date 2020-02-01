import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Login.scss'
import LoginForm from './LoginForm'

export default function Login({ container, setContainer, authenticate, checkUser }) {
    return (
        <div className={(container === 1) ? 'login-container home-cards hide-login' : (container === 0) ? 'login-container home-cards show-login' : 'login-container home-cards'}>
            <Row className="text-center mt-4 mb-2">
                <Col xs="12">
                    <h1>LOGIN</h1>
                </Col>
            </Row>


            <Row>
                <Col xs="12">
                    <LoginForm setContainer={setContainer} authenticate={authenticate} checkUser={checkUser} />
                </Col>
            </Row>
        </div>
    )
}
