import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAuthorizationToken } from 'helpers/setAuthorizationToken'

const initialState = {
  user: null,
  isAuthenticated: false
}

export const authUser = createAsyncThunk(
  'user/authenticate',
  async (authData, thunkAPI) => {
    axios
      .post(`https://localhost:5001/api/user/Authenticate`, {
        accessCode: authData['accessCode'],
        email: authData['email'],
        accessGuid: authData['accessGuid']
      })
      .then((x) => {
        if (!x.data.hasError) {
          localStorage.setItem('jwtToken', x.data.token)
          setAuthorizationToken(x.data.token)
          return x.data
        }
        return thunkAPI.rejectWithValue(x)
      })
      .catch((x) => {
        thunkAPI.rejectWithValue(x)
      })
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    })
  }
})

export const { authSuccess, logout } = authSlice.actions

export default authSlice.reducer
