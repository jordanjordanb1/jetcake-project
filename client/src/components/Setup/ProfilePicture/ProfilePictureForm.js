import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setHasProfilePic } from '../../../redux/ActionCreators'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export default function ProfilePictureForm({ token }) {
    const [formStatus, setFormStatus] = useState(),
        [formMsg, setFormMsg] = useState(),
        [image, setImage] = useState(),
        [server, setServer] = useState(false),
        [label, setLabel] = useState('Select an image...'),
        [changed, setChanged] = useState(false),
        hasProfilePic = useSelector(state => state.user.hasProfilePic),
        { _id } = jwt_decode(token),
        history = useHistory(),
        dispatch = useDispatch()

    useEffect(() => {
        if (hasProfilePic !== null && hasProfilePic === false) {
            axios.get(`/users/${_id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data }) => {
                if (data.profileImg) {
                    setServer(true)
                    setLabel(data.profileImg)
                    setImage(data.profileImg)
                } else {
                    return true
                }
            })
        }
    }, [_id, hasProfilePic, token])

    const handleSubmit = async e => {
        e.preventDefault()

        if (changed) {
            const toBase64 = file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });

            const imageConverted = await toBase64(image),
                data = {
                    image: imageConverted
                }

            axios.post(`/users/profilepicture/${_id}`, data, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data: { success } }) => {
                if (success) {
                    setFormStatus(true)
                    setFormMsg("Profile image successfully uploaded")

                    dispatch(setHasProfilePic(true))

                    return setTimeout(() => {
                        history.push('/dashboard')
                    }, 500)
                }

                setFormStatus(false)
                setFormMsg("An unknown error occured")

                return false
            })
        }

        return false
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
                        <InputGroup className="file-input">
                            <Form.Control onChange={e => {
                                setChanged(true); setServer(false); setImage(e.target.files[0]); setLabel(e.target.value.split('\\').pop());
                            }} className="form-control-file" type="file" id="picture.image" name="picture.image" accept=".jpg,.jpeg,.png" />
                            <Form.Label className="file-label" htmlFor="picture.image">
                                <i className="fas fa-upload"></i>
                                <span className="ml-2 mr-2" style={{ fontSize: "1.1em" }}>|</span>
                                {label}
                            </Form.Label>
                        </InputGroup>
                    </Form.Group>

                    <Row>
                        <Col xcs="12" md={{ span: 6, offset: 3 }}>
                            {
                                image ?
                                    server ?
                                        <Image className="mb-3 file-image" rounded fluid src={`/images/profileimage/${image}`} /> :
                                        <Image className="mb-3 file-image" rounded fluid src={URL.createObjectURL(image)} /> :
                                    null
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Form.Group className="m-0">
                <Button className="user-check-button" type="submit">SUBMIT</Button>
            </Form.Group>
        </Form >
    )
}
