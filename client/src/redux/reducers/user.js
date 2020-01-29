import * as ActionTypes from '../ActionTypes'

export const user = (state = {
    isAuthenticated: false,
    token: null,
    email: null,
    hasAddress: null,
    hasSecurity: null
}, action) => {
    switch (action.type) {
        case ActionTypes.AUTHENTICATE_USER:
            return { ...state, isAuthenticated: true, token: action.payload.token, email: action.payload.email }
        case ActionTypes.SET_HAS_SECURITY:
            return { ...state, hasSecurity: action.payload }
        case ActionTypes.SET_HAS_ADDRESS:
            return { ...state, hasAddress: action.payload }
        default:
            return state;
    }
}