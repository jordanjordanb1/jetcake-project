import * as ActionTypes from './ActionTypes'
import axios from 'axios'
import { config } from '../config'

axios.defaults.baseURL = config.url // Sets base URL in axios

export const authenticate = (token, email) => ({
    type: ActionTypes.AUTHENTICATE_USER,
    payload: {
        token,
        email,
    }
})

export const setHasSecurity = boolean => ({
    type: ActionTypes.SET_HAS_SECURITY,
    payload: boolean
})

export const setHasAddress = boolean => ({
    type: ActionTypes.SET_HAS_ADDRESS,
    payload: boolean
})

export const checkUser = (token, email) => (dispatch, getState) => {
    const { hasSecurity, hasAddress } = getState().user

    if (!hasSecurity && !hasAddress) {
        axios.get('/users/check', { params: { email }, headers: { 'Authorization': `Bearer ${token}` } }).then(({ data: { security_questions, address } }) => {
            if (!security_questions) {
                dispatch(setHasSecurity(false))
                dispatch(setHasAddress(false))
            } else if (!address) {
                dispatch(setHasSecurity(true))
                dispatch(setHasAddress(false))
            } else {
                dispatch(setHasSecurity(true))
                dispatch(setHasAddress(true))
            }
        })
    }

    return true
}