import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProfilePictureForm from './ProfilePictureForm'

export default function ProfilePicture({ token }) {
    return (
        <div className='card-containers user-check-cards'>
            <Row className="text-center">
                <Col xs="12" className=" mt-4 mb-2">
                    <h1>PROFILE PICTURE</h1>
                </Col>
            </Row>


            <Row>
                <Col xs="12">
                    <ProfilePictureForm token={token} />
                </Col>
            </Row>
        </div>
    )
}
