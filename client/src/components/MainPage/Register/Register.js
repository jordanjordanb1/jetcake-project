import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Register.scss'
import RegisterForm from './RegisterForm'

export default function Register({ container, setContainer }) {
    return (
        <div className={(container === 1) ? 'register-container home-cards show-register' : (container === 0) ? 'register-container home-cards hide-register' : 'register-container home-cards'}>
            <Row className="text-center mt-4 mb-4">
                <Col xs="12">
                    <h1>REGISTER</h1>
                </Col>
            </Row>

            <Row>
                <Col xs="12">
                    <RegisterForm setContainer={setContainer} />
                </Col>
            </Row>
        </div>
    )
}
