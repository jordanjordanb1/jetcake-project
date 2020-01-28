import * as ActionTypes from '../ActionTypes'

export const user = (state = {
    isAuthenticated: false,
    token: null,
    email: null
}, action) => {
    switch (action.type) {
        case ActionTypes.AUTHENTICATE_USER:
            return { ...state, isAuthenticated: true, token: action.payload.token, email: action.payload.email }
        default:
            return state;
    }
}