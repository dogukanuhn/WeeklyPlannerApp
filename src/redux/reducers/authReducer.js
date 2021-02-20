import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGOUT,
  SET_USER
} from '../actions/authAction'

const initState = {
  user: null,
  isAuthenticated: false
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true
      }
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true
      }
    case AUTH_ERROR:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }

    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }
    default:
      return state
  }
}

export default authReducer
