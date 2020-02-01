import React from 'react'
import './Footer.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Footer() {
    return (
        <>
            <br />
            <Row className="footer">
                <Col xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }}>
                    <div className="text-center">Created by <a href="https://jordanbarbosa.com">Jordan Barbosa</a> | <a href="https://github.com/jordanjordanb1/jetcake-project">View code</a></div>
                </Col>
            </Row>
        </>
    )
}
