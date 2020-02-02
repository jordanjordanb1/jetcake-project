import React from 'react'
import { Route, Redirect } from 'react-router'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AuthGuard({ children, ...rest }) {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated),
        token = useSelector(state => state.user.token),
        email = useSelector(state => state.user.email),
        hasSecurity = useSelector(state => state.user.hasSecurity),
        hasAddress = useSelector(state => state.user.hasAddress),
        hasProfilePic = useSelector(state => state.user.hasProfilePic),
        location = useLocation()

    return (
        <Route
            {...rest}
            render={() => {
                if (isAuthenticated && token && email) {
                    if (!hasSecurity || !hasAddress || !hasProfilePic) {
                        if (location.pathname !== '/setup') {
                            return <Redirect to="/setup" />
                        } else { return children }
                    } else {
                        return children
                    }
                } else {
                    return <Redirect to="/" />
                }
            }}
        />
    )
}
