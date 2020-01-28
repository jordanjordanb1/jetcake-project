import React, { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/FormGroup'
import Alert from 'react-bootstrap/Alert'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { withRouter } from 'react-router'

const LoginForm = ({ setContainer, history, authenticate }) => {
    const [formStatus, setFormStatus] = useState(),
        [formMsg, setFormMsg] = useState()

    const LoginSchema = Yup.object().shape({
        login: Yup.object().shape({
            email: Yup.string().email("Email must be valid").required('Email is required'),
            password: Yup.string().required('Password is required'),
        })
    })

    return (
        <Formik
            initialValues={{
                login: {
                    email: '',
                    password: '',
                }
            }}

            validationSchema={LoginSchema}

            onSubmit={
                async ({ login: { email, password } }, { setSubmitting }) => {
                    setSubmitting(true) // Sets submitting to true so inputs can't be editted
                    await axios.post('/users/login', { email, password }).then(({ data: { success, token } }) => {
                        if (success) {
                            setFormStatus(true)
                            setFormMsg("Logged in successfully")
                            setSubmitting(false) // Sets submitting to true so inputs can be editted

                            authenticate(token, email) // Adds token and email to redux store for easy access

                            setTimeout(history.push('/login'), 200)

                            return true
                        }

                        setFormStatus(false)
                        setFormMsg("Email or password is incorrect")
                        setSubmitting(false) // Sets submitting to true so inputs can be editted

                        return false
                    })
                }
            }
        >

            {({ isSubmitting, resetForm }) => (
                <Form>
                    <Row className="mb-2">
                        <Col xs="12" md={{ span: 10, offset: 1 }}>
                            {
                                formMsg ?
                                    (formStatus) ?
                                        (<Alert className="mb-2 form-success text-center">{formMsg}</Alert>) :
                                        (<Alert className="mb-2 form-error text-center">{formMsg}</Alert>)
                                    : null
                            }

                            <FormGroup>
                                <ErrorMessage name="login.email">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="login-inputs home-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-at"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" disabled={isSubmitting} type="email" name="login.email" placeholder="Enter email..." />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup className="mb-3">
                                <ErrorMessage name="login.password">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="login-inputs home-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <i className="fas fa-key"></i>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" disabled={isSubmitting} type="password" name="login.password" placeholder="Enter password..." />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup className="m-0">
                        <ButtonGroup className="login-buttons home-buttons">
                            <Button type="submit" disabled={isSubmitting}>LOGIN</Button>
                            <Button disabled={isSubmitting} onClick={() => { setContainer(1); resetForm(); setFormMsg(); setFormStatus() }}>SIGNUP &nbsp;<i className="fas fa-arrow-right"></i></Button>
                        </ButtonGroup>
                    </FormGroup>
                </Form>
            )}
        </Formik >
    )
}

export default withRouter(LoginForm)
