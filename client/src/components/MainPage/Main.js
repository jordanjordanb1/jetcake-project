import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Main.scss'
import Login from './Login/Login'
import Register from './Register/Register'

export default function Main() {
    const [container, setContainer] = useState(2) // 0 for login container, 1 for register container TODO: Change to more understable way

    return (
        <Container>
            <Row className="mt-xs-2 mt-4">
                <Col xs={{ span: 10, offset: 1 }} md={{ span: 4, offset: 4 }}>
                    <Login container={container} setContainer={setContainer} />
                    <Register container={container} setContainer={setContainer} />
                </Col>
            </Row>
        </Container>
    )
}
