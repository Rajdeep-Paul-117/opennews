import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import article from '../reducers/article'
import auth from '../reducers/auth'
import info from '../reducers/info'

const store = createStore(combineReducers({ article, auth, info }), {}, compose(applyMiddleware(thunk)))

export default store