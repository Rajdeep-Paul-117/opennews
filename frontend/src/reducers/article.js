import { CREATE_ARTICLE, DELETE_ARTICLE, EDIT_ARTICLE, GET_ALL, GET_BY_ID, START_LOADING, STOP_LOADING } from '../actions/actionTypes'
export const articleReducer = (state = { articles: [], isLoading: false }, action) => {

    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case STOP_LOADING:
            return { ...state, isLoading: false }
        case CREATE_ARTICLE:
            return { ...state, articles: [...state.articles, action.payload] }
        case EDIT_ARTICLE:
            return { ...state, articles: [state.articles.map((article) => (article._id === action.payload._id ? action.payload : article))] }
        case GET_ALL:
            return { ...state, articles: action.payload }
        case GET_BY_ID:
            return { ...state, article: action.payload }
        case DELETE_ARTICLE:
            return { ...state, articles: [state.articles.filter((article) => article._id !== action.payload)] }
        default:
            return state;
    }

}
export default articleReducer