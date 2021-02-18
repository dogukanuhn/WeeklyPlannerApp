import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGOUT
} from '../actions/authAction'

const initState = {
  user: null,
  isAuthenticated: false,
  error: false,
  errorMessage: ''
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true
      }
    case AUTH_ERROR:
      return {
        ...state,
        user: '',
        isAuthenticated: false
      }
    case LOGOUT:
      return {
        user: ''
      }
    default:
      return state
  }
}

export default authReducer
