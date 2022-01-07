import axios from 'axios'

const API = axios.create({ baseURL: 'https://apiopennews.herokuapp.com/' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});




export const getProfile = (id) => API.get(`/user/${id}`)
export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)
export const googleLogIn = (res) => API.post('/user/googlelogin', res)

export const addArticle = (formData) => API.post('/article', formData)
export const editArticle = (id, formData) => API.put(`/article/${id}`, formData)
export const getArticleById = (id) => API.get(`/article/${id}`)
export const getArticles = (page) => API.get(`/article?page=${page}`)
export const getTopArticles = () => API.get(`/article/query?top=-1`)
export const deleteArticle = (id) => API.delete(`/article/${id}`)


export const likeArticle = (id) => API.put(`/article/${id}/like`)

export const addComment = (id, formData) => API.post(`/article/${id}/comment`, formData)
export const editComment = (id, cmntId, formData) => API.put(`/article/${id}/comment/${cmntId}`, formData)
export const deleteComment = (id, cmntId) => API.delete(`/article/${id}/comment/${cmntId}`)

export const searchInput = (searchValue) => API.get(`/article/query?search=${searchValue}`)
