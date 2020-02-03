import React from 'react'
import { useSelector } from 'react-redux'
import './Setup.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Redirect } from 'react-router'

const SecurityQuestions = React.lazy(() => import('./SecurityQuestions/SecurityQuestions'))
const Address = React.lazy(() => import('./Address/Address'))
const ProfilePicture = React.lazy(() => import('./ProfilePicture/ProfilePicture'))

export default function Setup() {
    const token = useSelector(state => state.user.token),
        hasAddress = useSelector(state => state.user.hasAddress),
        hasSecurity = useSelector(state => state.user.hasSecurity),
        hasProfilePic = useSelector(state => state.user.hasProfilePic)


    if (!hasSecurity) {
        return (
            <Container>
                <Row className="mt-xs-2 mt-4">
                    <Col xs='12' md={{ span: 6, offset: 3 }}>
                        <SecurityQuestions token={token} />
                    </Col>
                </Row>
            </Container>
        )
    }

    if (!hasAddress) {
        return (
            <Container>
                <Row className="mt-xs-2 mt-4">
                    <Col xs='12' md={{ span: 6, offset: 3 }}>
                        <Address token={token} />
                    </Col>
                </Row>
            </Container>
        )
    }


    if (!hasProfilePic) {
        return (
            <Container>
                <Row className="mt-xs-2 mt-4">
                    <Col xs='12' md={{ span: 6, offset: 3 }}>
                        <ProfilePicture token={token} />
                    </Col>
                </Row>
            </Container>
        )
    }


    return (
        <Redirect to="/dashboard" />
    )
}
