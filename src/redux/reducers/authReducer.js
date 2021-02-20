import { AUTH_SUCCESS, LOGOUT, SET_USER } from '../actions/authAction'

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
