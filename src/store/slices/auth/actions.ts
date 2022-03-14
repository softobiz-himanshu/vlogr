import { SigninDto, SignupDto, User } from '@/interfaces/app'
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import api from '@services/api'

// Actions

export const setAuthenticated = createAction<boolean>('auth/setAuthenticated')
export const setToken = createAction<string>('auth/setToken')
export const removeAuth = createAction('auth/removeAuth')

export const setUser = createAction<Partial<User>>('auth/setUser')

// Thunks

export const signin = createAsyncThunk<void, SigninDto, any>('auth/signin', async (args, { dispatch }) => {
  try {
    const user = await api.signin(args)
    dispatch(setUser(user))
    dispatch(setAuthenticated(true))
    dispatch(setToken(user.token))
  } catch (err) {
    // dispatch(setErrors(['Invalid username or password']))
    // dispatch(setNotification({ type: 'error', message: 'Invalid username or password' }))
  }
})

export const signup = createAsyncThunk<void, SignupDto, any>('auth/signup', async (args, { dispatch }) => {
  try {
    const user = await api.signup(args)
    dispatch(setUser(user))
    dispatch(setAuthenticated(true))
    dispatch(setToken(user.token))
  } catch (err) {
    // const payload = (err as AxiosError).response?.data?.error.data
    // const errorMessages = Object.keys(payload).map(key => key + ': ' + payload[key])
    // dispatch(setErrors(errorMessages))
    // dispatch(
    //   setNotification({
    //     type: 'error',
    //     message: errorMessages[0] ? errorMessages[0] : 'Something went wrong',
    //   })
    // )
  }
})
