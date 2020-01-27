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

const RegisterForm = ({ setContainer }) => {
    const RegisterSchema = Yup.object().shape({
        register: Yup.object().shape({
            email: Yup.string().trim()
                .required('Email is required')
                .email("Email must be valid"),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be longer than 6 characters')
                .max(12, 'Password must be shorter than 12 characters')
                .matches(/^(?=.*[a-z])/, "Password must contain at least 1 lowercase letter")
                .matches(/^(?=.*[A-Z])/, "Password must contain at least 1 uppercase letter")
                .matches(/^(?=.*[0-9])/, "Password must contain at least 1 number"),
            passwordConf: Yup.string()
                .required('Please re-enter password')
                .oneOf([Yup.ref('password')], 'Passwords must match'),
            phone: Yup.string()
                .required('Phone number is required')
                .min(10, "Phone number is invalid")
                .max(11, "Phone number is invalid")
                .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is invalid'),
            dob: Yup.string()
                .required('DOB is required')
                .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, 'DOB is invalid')
        }),
    })

    return (
        <Formik
            initialValues={{
                register: {
                    email: '',
                    password: '',
                    passwordConf: '',
                    phone: '',
                    dob: '',
                }
            }}

            validationSchema={RegisterSchema}

            onSubmit={
                async ({ register }, { setSubmitting }) => {
                    console.log(register)

                    setSubmitting(false)
                }
            }
        >

            {({ isSubmitting, resetForm }) => (
                <Form>
                    <Row>
                        <Col xs="12" md={{ span: 10, offset: 1 }}>
                            <FormGroup>
                                <ErrorMessage name="register.email">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="register-inputs home-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-at"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" type="email" name="register.email" placeholder="Enter email..." />
                                </InputGroup>
                            </FormGroup>


                            <FormGroup className="mb-3">
                                <ErrorMessage name="register.password">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="login-inputs home-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <i className="fas fa-key"></i>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" type="password" name="register.password" placeholder="Enter password..." />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup className="mb-4">
                                <ErrorMessage name="register.passwordConf">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="login-inputs home-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <i className="fas fa-shield-alt"></i>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" type="password" name="register.passwordConf" placeholder="Re-enter password..." />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup className="mb-4">
                                <ErrorMessage name="register.phone">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="login-inputs home-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <i className="fas fa-phone"></i>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" type="tel" name="register.phone" placeholder="Enter phone number..." />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup className="mb-4">
                                <ErrorMessage name="register.dob">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="login-inputs home-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <i className="fas fa-birthday-cake"></i>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" type="date" name="register.dob" placeholder="Enter DOB..." min="1950-01-01" max="2005-12-31" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup className="m-0">
                        <ButtonGroup className="register-buttons home-buttons">
                            <Button onClick={() => { setContainer(0); resetForm() }}><i className="fas fa-arrow-left"></i> &nbsp; BACK</Button>
                            <Button type="submit" disabled={isSubmitting}>SUBMIT</Button>
                        </ButtonGroup>
                    </FormGroup>
                </Form>
            )}
        </Formik>
    )
}

export default RegisterForm
