import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export default function ProfilePictureForm({ token }) {
    const [formStatus, setFormStatus] = useState(),
        [formMsg, setFormMsg] = useState(),
        [image, setImage] = useState(),
        history = useHistory(),
        dispatch = useDispatch()

    const handleSubmit = async e => {
        e.preventDefault()

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        const { _id } = jwt_decode(token),
            imageConverted = await toBase64(image),
            data = {
                image: imageConverted
            }

        axios.post(`/users/profilepicture/${_id}`, data, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data: { success } }) => {
            if (success) {
                setFormStatus(true)
                setFormMsg("Profile image successfully uploaded")

                dispatch({
                    type: 'SET_HAS_PROFILE_PIC',
                    payload: true
                })

                return setTimeout(() => {
                    history.push('/dashboard')
                }, 500)
            }

            setFormStatus(false)
            setFormMsg("An unknown error occured")

            return false
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col xs={{ span: 10, offset: 1 }}>
                    <hr />
                    <div className="text-center form-reason">
                        <h3>Please upload a profile picture</h3>
                    </div>
                    <hr />

                    {
                        formMsg ?
                            (formStatus) ?
                                (<Alert className="mb-2 form-success text-center">{formMsg}</Alert>) :
                                (<Alert className="mb-2 form-error text-center">{formMsg}</Alert>)
                            : null
                    }

                    <Form.Group>
                        <InputGroup className="user-check-inputs">
                            <Form.Control onChange={e => setImage(e.target.files[0])} className="form-control-file" type="file" name="picture.image" accept=".jpg,.jpeg,.png" />
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="m-0">
                <Button className="user-check-button" type="submit">SUBMIT</Button>
            </Form.Group>
        </Form>
    )
}
