import * as api from '../api/api.js'
import { CREATE_ARTICLE, DELETE_ARTICLE, EDIT_ARTICLE, GET_ALL, GET_BY_ID, START_LOADING, STOP_LOADING } from './actionTypes.js'

export const addArticle = (formData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.addArticle(formData)
        dispatch({ type: CREATE_ARTICLE, payload: data })
        dispatch({ type: START_LOADING })
        navigate(`/news/${data._id}`)
    } catch (error) {
        console.log(error)
    }
}
export const editArticle = (id, formData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.editArticle(id, formData)
        dispatch({ type: EDIT_ARTICLE, payload: data })
        dispatch({ type: START_LOADING })
        navigate(`/news/${data._id}`)
    } catch (error) {
        console.log(error)
    }
}
export const getArticles = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.getArticles(page)

        dispatch({ type: GET_ALL, payload: data })
        dispatch({ type: STOP_LOADING })
    } catch (error) {
        console.log(error)
    }
}
export const getTopArticles = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.getTopArticles()
        dispatch({ type: GET_ALL, payload: data })
        dispatch({ type: STOP_LOADING })
    } catch (error) {
        console.log(error)
    }
}
export const getArticleById = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.getArticleById(id)
        dispatch({ type: GET_BY_ID, payload: data })
        dispatch({ type: STOP_LOADING })
    } catch (error) {
        console.log(error)
    }
}
export const deleteArticle = (id, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        await api.deleteArticle(id)
        dispatch({ type: DELETE_ARTICLE, payload: id })
        dispatch({ type: STOP_LOADING })
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}
export const likeArticle = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeArticle(id)
        dispatch({ type: GET_BY_ID, payload: data })

    } catch (error) {
        console.log(error)
    }
}
export const addComment = (id, formData) => async (dispatch) => {
    try {
        const { data } = await api.addComment(id, formData)
        dispatch({ type: GET_BY_ID, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const editComment = (id, cmntId, formData) => async (dispatch) => {
    try {

        const { data } = await api.editComment(id, cmntId, formData)
        dispatch({ type: GET_BY_ID, payload: data })

    } catch (error) {
        console.log(error)
    }
}
export const deleteComment = (id, cmntId) => async (dispatch) => {
    try {
        const { data } = await api.deleteComment(id, cmntId)
        dispatch({ type: GET_BY_ID, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const searchInput = (searchValue) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.searchInput(searchValue)
        dispatch({ type: GET_ALL, payload: data })
        dispatch({ type: STOP_LOADING })
    } catch (error) {
        console.log(error)
    }
}