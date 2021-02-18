import jwtDecode from 'jwt-decode'
import authService from '../../services/authService'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const LOGOUT = 'LOGOUT'

const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    error
  }
}

const authSuccess = (user) => {
  return {
    type: AUTH_SUCCESS,
    user
  }
}

const authError = (error) => {
  return {
    type: AUTH_ERROR,
    error
  }
}

export const setUser = (user) => {
  return (dispatch) => {
    dispatch(authSuccess(user))
  }
}

export const auth = (authData) => {
  return (dispatch) => {
    authService
      .Authenticate(authData)
      .then((data) => {
        data.hasError
          ? dispatch(authError(data.Error))
          : dispatch(authSuccess(jwtDecode(data.token)))
      })
      .catch((err) => dispatch(authError(err)))
  }
}

// export const login = (username, password) => {
//   return (dispatch) => {
//     authService
//       .login(username, password)
//       .then((data) => {
//         data.hasError
//           ? dispatch(loginError(data.Error))
//           : dispatch(loginSuccess(data))
//       })
//       .catch((err) => dispatch(loginError(err)))
//   }
// }

export const logout = () => {
  authService.logout()
  return {
    type: LOGOUT
  }
}
