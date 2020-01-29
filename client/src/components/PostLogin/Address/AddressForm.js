import React, { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/FormGroup'
import Alert from 'react-bootstrap/Alert'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { withRouter } from 'react-router'
import jwt_decode from 'jwt-decode'

const AddressForm = ({ token, history }) => {
    const [formStatus, setFormStatus] = useState(),
        [formMsg, setFormMsg] = useState()

    const AddressSchema = Yup.object().shape({
        questions: Yup.object().shape({

        }),
    })


    return (
        <Formik
            initialValues={{
                address: {

                }
            }}

            validationSchema={AddressSchema}

            onSubmit={
                async ({ address }, { setSubmitting }) => {
                    const { _id } = jwt_decode(token)

                    setSubmitting(true)

                    await axios.put(`/users/${_id}`, { 'address': '' }, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data: { success } }) => {
                        console.log(success)

                        if (success) {
                            setFormStatus(true)
                            setFormMsg("Address updated")
                            setTimeout(history.push('/login'), 500)

                            return true
                        }


                        setFormStatus(false)
                        setFormMsg("An unknown error occured")
                        setSubmitting(false) // Sets submitting to false so inputs can be editted

                        return false
                    })

                    setSubmitting(false) // Sets submitting to false so inputs can be editted
                }
            }
        >

            {({ isSubmitting }) => (
                <Form>
                    <Row>
                        <Col xs={{ span: 10, offset: 1 }}>
                            <hr />
                            <div className="text-center form-reason">
                                <h3>Please add your address</h3>
                            </div>
                            <hr />

                            {
                                formMsg ?
                                    (formStatus) ?
                                        (<Alert className="mb-2 form-success text-center">{formMsg}</Alert>) :
                                        (<Alert className="mb-2 form-error text-center">{formMsg}</Alert>)
                                    : null
                            }

                            <FormGroup>
                                <ErrorMessage name="questions.one.question">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="user-check-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-question"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" disabled={isSubmitting} type="text" name="questions.one.question" placeholder="Please enter a question..." />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <ErrorMessage name="questions.one.answer">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="user-check-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i style={{ color: 'transparent' }} className="fas fa-at"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" disabled={isSubmitting} type="text" name="questions.one.answer" placeholder="Please enter your answer..." />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup className="m-0">
                        <Button className="user-check-button" type="submit" disabled={isSubmitting}>SUBMIT</Button>
                    </FormGroup>
                </Form>
            )
            }
        </Formik >
    )
}

export default withRouter(AddressForm)
