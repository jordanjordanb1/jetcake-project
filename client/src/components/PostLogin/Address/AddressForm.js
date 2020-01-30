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
        [formMsg, setFormMsg] = useState(),
        USStates = [
            'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
            'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
            'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
            'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
            'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
        ]

    const AddressSchema = Yup.object().shape({
        address: Yup.object().shape({
            street: Yup.string()
                .min(5, "Street address is too short")
                .max(25, "Street address is too long")
                .required("Street address is required"),
            city: Yup.string()
                .min(5, "City is too short")
                .max(25, "City is too long")
                .required("City is required"),
            state: Yup.string()
                .min(2, "State is invalid")
                .max(2, "State is invalid")
                .oneOf(USStates, "State is invalid")
                .required("Please choose a state"),
            zip: Yup.string()
                .min(4, "Zip code is invalid")
                .max(5, "Zip code is invalid")
                .required("Zip code is required")
        }),
    })


    return (
        <Formik
            initialValues={{
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zip: ''
                }
            }}

            validationSchema={AddressSchema}

            onSubmit={
                async ({ address: { street, city, state, zip } }, { setSubmitting }) => {
                    const { _id } = jwt_decode(token)

                    setSubmitting(true)

                    await axios.put(`/users/${_id}`, { address: `${street}|${city}|${state}|${zip}` }, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data: { success } }) => {
                        if (success) {
                            setFormStatus(true)
                            setFormMsg("Address updated")
                            setTimeout(history.push('/dashboard'), 500)

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
                                <h3>Please enter your address</h3>
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
                                <ErrorMessage name="address.street">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="user-check-inputs">
                                    <Field className="form-control" disabled={isSubmitting} type="text" name="address.street" placeholder="Street Address" />
                                </InputGroup>
                            </FormGroup>


                            <FormGroup>
                                <ErrorMessage name="address.city">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                <InputGroup className="user-check-inputs">
                                    <Field className="form-control" disabled={isSubmitting} type="text" name="address.city" placeholder="City" />
                                </InputGroup>
                            </FormGroup>

                            <Row>
                                <FormGroup as={Col}>
                                    <ErrorMessage name="address.state">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                    <InputGroup className="user-check-inputs">
                                        <Field as="select" className="form-control" disabled={isSubmitting} type="text" name="address.state" placeholder="State">
                                            <option>State...</option>
                                            {
                                                USStates.map(state => {
                                                    return (
                                                        <option key={state} value={state}>{state}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                    </InputGroup>
                                </FormGroup>

                                <FormGroup as={Col}>
                                    <ErrorMessage name="address.zip">{msg => <Alert className="mb-1 form-error text-center" variant="danger">{msg}</Alert>}</ErrorMessage>

                                    <InputGroup className="user-check-inputs">
                                        <Field className="form-control" disabled={isSubmitting} type="number" name="address.zip" placeholder="Zip Code" min="00000" max="99999" />
                                    </InputGroup>
                                </FormGroup>
                            </Row>
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
