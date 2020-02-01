import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import './Setup.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const SecurityQuestions = React.lazy(() => import('./SecurityQuestions/SecurityQuestions'))
const Address = React.lazy(() => import('./Address/Address'))
const ProfilePicture = React.lazy(() => import('./ProfilePicture/ProfilePicture'))

export default function Setup() {
    const { token, hasSecurity, hasAddress, hasProfilePic } = useSelector(state => state.user)

    return (
        <Container>
            <Row className="mt-xs-2 mt-4">
                <Col xs='12' md={{ span: 6, offset: 3 }}>
                    {
                        !hasSecurity ?
                            (
                                <Suspense fallback={<div>Loading...</div>}>
                                    <SecurityQuestions token={token} />
                                </Suspense>
                            )
                            : (hasSecurity && !hasAddress) ?
                                (
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Address token={token} />
                                    </Suspense>
                                )
                                : (hasSecurity && hasAddress && !hasProfilePic) ?
                                    (
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <ProfilePicture token={token} />
                                        </Suspense>
                                    ) :
                                    ''
                    }
                </Col>
            </Row>
        </Container>
    )
}
