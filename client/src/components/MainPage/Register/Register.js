import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Register.scss'
import RegisterForm from './RegisterForm'

export default function Register({ container, setContainer, authenticate }) {
    const defaultClasses = 'register-container card-containers home-cards'

    return (
        <div className={(container === 1) ? `${defaultClasses} show-register` : (container === 0) ? `${defaultClasses} hide-register` : defaultClasses}>
            <Row className="text-center mt-4 mb-4">
                <Col xs="12">
                    <h1>REGISTER</h1>
                </Col>
            </Row>

            <Row>
                <Col xs="12">
                    <RegisterForm setContainer={setContainer} authenticate={authenticate} />
                </Col>
            </Row>
        </div>
    )
}
