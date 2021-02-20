import jwtDecode from 'jwt-decode'
import authService from '../../services/authService'

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const LOGOUT = 'LOGOUT'
export const SET_USER = 'SET_USER'

const authSuccess = (user) => {
  return {
    type: AUTH_SUCCESS,
    user
  }
}

const setUserAction = (user) => {
  return {
    type: SET_USER,
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
    dispatch(setUserAction(user))
  }
}

export const auth = (authData) => (dispatch) => {
  return Promise.resolve(
    authService
      .Authenticate(authData)
      .then((data) => {
        if (data.hasError) dispatch(authError(data.Error))
        else {
          dispatch(authSuccess(jwtDecode(data.token)))
          return data
        }
      })
      .catch((err) => dispatch(authError(err)))
  )
}

export const logout = () => {
  authService.Logout()
  return {
    type: LOGOUT
  }
}
