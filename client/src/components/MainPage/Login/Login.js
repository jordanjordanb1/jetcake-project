import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Login.scss'
import LoginForm from './LoginForm'

export default function Login({ container, setContainer, authenticate, checkUser }) {
    const defaultClasses = 'login-container card-containers home-cards'

    return (
        <div className={(container === 1) ? `${defaultClasses} hide-login` : (container === 0) ? `${defaultClasses} show-login` : defaultClasses}>
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
