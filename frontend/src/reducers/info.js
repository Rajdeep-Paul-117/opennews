import { ERROR, SUCCESS, RESET } from '../actions/actionTypes'
const info = (state = { successMessage: null, errorMessage: null }, action) => {
    switch (action.type) {
        case ERROR:
            return { ...state, errorMessage: action.payload }
        case SUCCESS:
            return { ...state, successMessage: action.payload }
        case RESET:
            return { ...state, successMessage: null, errorMessage: null }
        default:
            return state
    }
}
export default info