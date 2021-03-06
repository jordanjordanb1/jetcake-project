import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './Settings.scss'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Alert from 'react-bootstrap/Alert'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { setHasSecurity, setHasAddress, setHasProfilePic } from '../../redux/ActionCreators'
import Card from 'react-bootstrap/Card'

export default function Settings() {
    const email = useSelector(state => state.user.email),
        token = useSelector(state => state.user.token),
        dispatch = useDispatch(),
        history = useHistory(),
        { _id } = jwt_decode(token),
        [phone, setPhone] = useState('Loading...'),
        [dob, setDob] = useState('Loading...'),
        [dbPass, setDbPass] = useState('Loading...'),
        [formStatus, setFormStatus] = useState(),
        [formMsg, setFormMsg] = useState()

    useEffect(() => {
        axios.get(`/users/${_id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data }) => {
            setPhone(data.phone)
            setDbPass(data.phone)
            setDob(data.dob)
        })
    }, [_id, token])

    const redirectTo = path => {
        setTimeout(() => {
            history.push(path)
        }, 1000)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (phone !== dbPass) {
            if (!isNaN(phone)) {

                if (phone.toString().length >= 10 && phone.toString().length <= 11) {

                    axios.put(`/users/${_id}`, { tel: phone }, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data: { success } }) => {
                        if (success) {
                            setFormStatus(true)
                            setFormMsg("Phone number updated")
                        } else {
                            setFormStatus(false)
                            setFormMsg("An error occured")
                        }
                    })

                } else {
                    setFormStatus(false)
                    setFormMsg("Phone number is invalid")
                }

            } else {
                setFormStatus(false)
                setFormMsg("An error occurred")
            }
        }
    }

    return (
        <>
            <div>
                <Navbar />
                <Container>
                    <Card className="card-containers settings-container">
                        <Card.Body>
                            <Row className="text-center">
                                <Col xs="12" className=" mt-4 mb-2">
                                    <h1>SETTINGS</h1>
                                </Col>
                            </Row>

                            <hr />

                            <Row>
                                <Col xs="12" md={{ span: 6, offset: 3 }}>
                                    {
                                        formMsg ?
                                            (formStatus) ?
                                                (<Alert className="mb-3 form-success text-center">{formMsg}</Alert>) :
                                                (<Alert className="mb-3 form-error text-center">{formMsg}</Alert>)
                                            : null
                                    }

                                    <Form onSubmit={handleSubmit}>
                                        {/* Email */}
                                        <Form.Group as={Row}>
                                            <Form.Label column xs="2" className="text-center">Email</Form.Label>
                                            <Col xs={9}>
                                                <Form.Control className="settings-input" readOnly disabled type="email" value={email} />
                                            </Col>
                                        </Form.Group><br />

                                        {/* Phone */}
                                        <Form.Group as={Row}>
                                            <Form.Label column xs="2" className="text-center">Phone</Form.Label>
                                            <Col xs={9}>
                                                <Form.Control className="settings-input" type="tel" onChange={e => setPhone(e.target.value)} value={phone} />
                                            </Col>
                                        </Form.Group><br />

                                        {/* DOB */}
                                        <Form.Group as={Row}>
                                            <Form.Label column xs="2" className="text-center">DOB</Form.Label>
                                            <Col xs={9}>
                                                <Form.Control className="settings-input" readOnly disabled type="date" value={dob} />
                                            </Col>
                                        </Form.Group><br />

                                        <Form.Group className="m-0">
                                            <Button className="settings-button" type="submit">SUBMIT</Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={{ span: 10, offset: 1 }}>
                                    <hr className="mt-5 mb-5" />
                                </Col>
                            </Row>

                            <Row>
                                <Col xs="12" md={{ span: 10, offset: 1 }}>
                                    <ButtonGroup className="settings-button-group">
                                        <Button onClick={() => {
                                            dispatch(setHasSecurity(false))
                                            redirectTo('/setup')
                                        }}>Reset security questions</Button>
                                        <Button onClick={() => {
                                            dispatch(setHasAddress(false))
                                            redirectTo('/setup')
                                        }}>Reset address</Button>
                                        <Button onClick={() => {
                                            dispatch(setHasProfilePic(false))
                                            redirectTo('/setup')
                                        }}>Reset profile picture</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row><br />
                        </Card.Body>
                    </Card>
                </Container>
                <Footer />
            </div>
        </>
    )
}
