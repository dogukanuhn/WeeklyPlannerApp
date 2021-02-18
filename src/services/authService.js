import axios from 'axios'
import { setAuthorizationToken } from 'helpers/setAuthorizationToken'

const Authenticate = (authData) => {
  return axios
    .post(`https://localhost:5001/api/user/Authenticate`, {
      accessCode: authData.accessCode,
      email: authData.email,
      accessGuid: authData.accessGuid
    })
    .then((x) => {
      if (!x.data.hasError) {
        localStorage.setItem('jwtToken', x.data.token)
        setAuthorizationToken(x.data.token)
      }
      return x.data
    })
}

const Logout = () => {
  localStorage.removeItem('jwtToken')
  setAuthorizationToken(false)
}

export default { Authenticate, Logout }
