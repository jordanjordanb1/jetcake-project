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
