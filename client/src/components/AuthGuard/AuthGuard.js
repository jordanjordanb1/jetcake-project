import React from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

const AuthGuard = ({ children, isAuthenticated, token, email, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => {
                if (isAuthenticated && token && email) {
                    return children
                } else {
                    return <Redirect to="/" />
                }
            }}
        />
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    token: state.user.token,
    email: state.user.email,
})

export default connect(mapStateToProps)(AuthGuard)
