import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { postReducer } from './post'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  combineReducers({
    post: postReducer,
  }),
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
)

export default store
