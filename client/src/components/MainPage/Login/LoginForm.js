import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/FormGroup'
import Alert from 'react-bootstrap/Alert'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const LoginForm = ({ setContainer }) => {
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
                (values, { setSubmitting }) => {
                    setSubmitting(false)
                    console.log(values)
                }
            }
        >

            {({ isSubmitting, resetForm }) => (
                <Form>
                    <Row className="mb-2">
                        <Col xs="12" md={{ span: 10, offset: 1 }}>
                            <FormGroup>
                                <ErrorMessage name="login.email">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="login-inputs home-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-at"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" type="email" name="login.email" placeholder="Enter email..." />
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
                                    <Field className="form-control" type="password" name="login.password" placeholder="Enter password..." />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup className="m-0">
                        <ButtonGroup className="login-buttons home-buttons">
                            <Button type="submit" disabled={isSubmitting}>LOGIN</Button>
                            <Button onClick={() => { setContainer(1); resetForm() }}>SIGNUP &nbsp;<i className="fas fa-arrow-right"></i></Button>
                        </ButtonGroup>
                    </FormGroup>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm
