import { AUTH, GET_PROFILE, LOG_OUT } from "../actions/actionTypes"

const authReducer = (state = { authData: null, profile: {} }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify(action?.payload))
            return { ...state, authData: action.payload }
        case LOG_OUT:
            localStorage.clear()
            return { ...state, authData: null }
        case GET_PROFILE:
            return { ...state, profile: action.payload }
        default:
            return state
    }
}
export default authReducer