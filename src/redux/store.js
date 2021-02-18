import { applyMiddleware, combineReducers, createStore } from 'redux'
import { RootReducer, UserReducer } from './reducers'

import { composeWithDevTools } from 'redux-devtools-extension'
export const store = createStore(
  combineReducers({ RootReducer, UserReducer }),
  composeWithDevTools()
)
