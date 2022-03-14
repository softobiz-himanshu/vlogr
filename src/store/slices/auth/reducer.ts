import { User } from '@/interfaces/app'
import { createReducer } from '@reduxjs/toolkit'
import { setAuthenticated, setToken, setUser } from './actions'

export interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: Partial<User> | null
  errors: string[]
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  errors: [],
}

export const authReducer = createReducer(initialState, builder => {
  builder.addCase(setAuthenticated, (state, { payload }) => {
    state.isAuthenticated = payload
  })
  builder.addCase(setToken, (state, { payload }) => {
    state.token = payload
  })
  builder.addCase(setUser, (state, { payload }) => {
    state.user = payload
  })
})
