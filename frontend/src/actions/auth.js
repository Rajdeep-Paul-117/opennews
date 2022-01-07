import { AUTH, ERROR, SUCCESS, GET_PROFILE } from './actionTypes'
import * as api from '../api/api'

export const signIn = (formData) => async (dispatch) => {

    try {
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH, payload: data })
        dispatch({ type: SUCCESS, payload: "Successfully Signed In" })
    } catch (error) {
        console.log(error)
        if (error.response) {
            dispatch({ type: ERROR, payload: error.response.data.message })
        }
    }
}
export const signUp = (formData) => async (dispatch) => {

    try {
        const { data } = await api.signUp(formData)
        dispatch({ type: AUTH, payload: data })
        dispatch({ type: SUCCESS, payload: "Successfully Registered" })
    } catch (error) {
        console.log(error)
        dispatch({ type: ERROR, payload: error.response.data.message })
    }
}
export const googleLogIn = (res) => async (dispatch) => {
    try {
        const { data } = await api.googleLogIn(res)
        dispatch({ type: AUTH, payload: data })
        dispatch({ type: SUCCESS, payload: "Successfully Registered" })
    } catch (error) {
        console.error();
    }
}
export const getProfile = (id) => async (dispatch) => {
    try {
        const { data } = await api.getProfile(id)
        dispatch({ type: GET_PROFILE, payload: data })
    } catch (error) {
        console.log(error)
    }
}