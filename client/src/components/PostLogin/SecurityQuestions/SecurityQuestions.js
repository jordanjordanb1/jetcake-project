import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SecurityQuestionsForm from './SecurityQuestionsForm'

export default function SecurityQuestions({ token }) {
    return (
        <div className='user-check-cards'>
            <Row className="text-center">
                <Col xs="12" className=" mt-4 mb-2">
                    <h1>SECURITY QUESTIONS</h1>
                </Col>
            </Row>


            <Row>
                <Col xs="12">
                    <SecurityQuestionsForm token={token} />
                </Col>
            </Row>
        </div>
    )
}
