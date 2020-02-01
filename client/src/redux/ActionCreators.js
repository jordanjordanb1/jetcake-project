import * as ActionTypes from './ActionTypes'
import axios from 'axios'
import { config } from '../config'

axios.defaults.baseURL = config.url // Sets base URL in axios

export const setHasSecurity = boolean => ({
    type: ActionTypes.SET_HAS_SECURITY,
    payload: boolean
})

export const setHasAddress = boolean => ({
    type: ActionTypes.SET_HAS_ADDRESS,
    payload: boolean
})

export const setHasProfilePic = boolean => ({
    type: ActionTypes.SET_HAS_PROFILE_PIC,
    payload: boolean
})

export const authenticate = (token, email, security_questions, address, profileImg) => dispatch => {
    dispatch({
        type: ActionTypes.AUTHENTICATE_USER,
        payload: {
            token,
            email,
        }
    })

    // Checks if user has set security questions
    if (!security_questions) {
        dispatch(setHasSecurity(false))
    } else {
        dispatch(setHasSecurity(true))
    }

    // Checks if user has set an address
    if (!address) {
        dispatch(setHasAddress(false))
    } else {
        dispatch(setHasAddress(true))
    }

    // Checks if user has a profile image
    if (!profileImg) {
        dispatch(setHasProfilePic(false))
    } else {
        dispatch(setHasProfilePic(true))
    }
}
