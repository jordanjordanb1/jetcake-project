import React, { PureComponent, Suspense } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { checkUser } from '../../redux/ActionCreators'
import Address from './Address/Address'
import './PostLogin.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

class PostLogin extends PureComponent {
    async componentDidMount() {
        const { token, email, checkUser } = this.props

        await checkUser(token, email)
    }

    render() {
        const { hasAddress, hasSecurity, token } = this.props

        const SecurityQuestions = React.lazy(
            () => import('./SecurityQuestions/SecurityQuestions')
        )

        return (
            <Container>
                <Row className="mt-xs-2 mt-4">
                    <Col xs='12' md={{ span: 6, offset: 3 }}>
                        {(() => {
                            if (!hasSecurity) {
                                return (
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <SecurityQuestions token={token} />
                                    </Suspense>
                                )
                            } else if (hasSecurity && !hasAddress) {
                                return <Address token={token} />
                            } else {
                                return <Redirect to='/dashboard' />
                            }
                        })()}
                    </Col>
                </Row>
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    email: state.user.email,
    token: state.user.token,
    hasAddress: state.user.hasAddress,
    hasSecurity: state.user.hasSecurity,
})

const mapDispatchToProps = dispatch => ({
    checkUser: (token, email) => dispatch(checkUser(token, email))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostLogin)
