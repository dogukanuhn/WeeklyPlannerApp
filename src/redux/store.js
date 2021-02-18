import { applyMiddleware, createStore } from 'redux'
import { RootReducer } from './reducers'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger()
export const store = createStore(
  RootReducer,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
)
