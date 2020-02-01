import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FormGroup from 'react-bootstrap/FormGroup'
import Alert from 'react-bootstrap/Alert'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export default function SecurityQuestionsForm({ token }) {
    const [formStatus, setFormStatus] = useState(),
        [formMsg, setFormMsg] = useState(),
        history = useHistory(),
        dispatch = useDispatch()

    const SecurityQuestionsSchema = Yup.object({
        questions: Yup.object({
            one: Yup.object().shape({
                question: Yup.string()
                    .min(6, "Question is too short!")
                    .max(50, "Question is too long!")
                    .required("Question is required!"),
                answer: Yup.string()
                    .required("Answer is required!")
            }),
            two: Yup.object().shape({
                question: Yup.string()
                    .min(6, "Question is too short!")
                    .max(50, "Question is too long!")
                    .required("Question is required!"),
                answer: Yup.string()
                    .required("Answer is required!")
            }),
            three: Yup.object().shape({
                question: Yup.string()
                    .min(6, "Question is too short!")
                    .max(50, "Question is too long!")
                    .required("Question is required!"),
                answer: Yup.string()
                    .required("Answer is required!")
            }),
        }),
    })


    return (
        <Formik
            initialValues={{
                questions: {
                    one: {
                        question: '',
                        answer: ''
                    },
                    two: {
                        question: '',
                        answer: ''
                    },
                    three: {
                        question: '',
                        answer: ''
                    },
                }
            }}

            validationSchema={SecurityQuestionsSchema}

            onSubmit={
                ({ questions }, { setSubmitting }) => {
                    const { _id } = jwt_decode(token)

                    setSubmitting(true)

                    axios.put(`/users/${_id}`, { 'security_questions': [questions.one, questions.two, questions.three] }, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data: { success } }) => {
                        if (success) {
                            setFormStatus(true)
                            setFormMsg("Security questions updated")

                            // Sets user in store to have security questions filled out so next stepp will appear
                            dispatch({
                                type: 'SET_HAS_SECURITY',
                                payload: true
                            })

                            return history.push('/dashboard')
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
                                <h3>Please create 3 security questions</h3>
                            </div>
                            <hr />

                            {
                                formMsg ?
                                    (formStatus) ?
                                        (<Alert className="mb-2 form-success text-center">{formMsg}</Alert>) :
                                        (<Alert className="mb-2 form-error text-center">{formMsg}</Alert>)
                                    : null
                            }

                            {/* QUESTION ONE */}

                            <FormGroup>
                                <ErrorMessage name="questions.one.question">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <span className="question-number">#1</span>

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

                            <br /><hr />

                            {/* QUESTION TWO */}

                            <FormGroup>
                                <ErrorMessage name="questions.two.question">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <span className="question-number">#2</span>

                                <InputGroup className="user-check-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-question"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" disabled={isSubmitting} type="text" name="questions.two.question" placeholder="Please enter a question..." />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <ErrorMessage name="questions.two.answer">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="user-check-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i style={{ color: 'transparent' }} className="fas fa-at"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" disabled={isSubmitting} type="text" name="questions.two.answer" placeholder="Please enter your answer..." />
                                </InputGroup>
                            </FormGroup>

                            <br /><hr />

                            {/* QUESTION THREE */}

                            <FormGroup>
                                <ErrorMessage name="questions.three.question">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <span className="question-number">#3</span>

                                <InputGroup className="user-check-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-question"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" disabled={isSubmitting} type="text" name="questions.three.question" placeholder="Please enter a question..." />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <ErrorMessage name="questions.three.answer">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="user-check-inputs">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i style={{ color: 'transparent' }} className="fas fa-at"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field className="form-control" disabled={isSubmitting} type="text" name="questions.three.answer" placeholder="Please enter your answer..." />
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
