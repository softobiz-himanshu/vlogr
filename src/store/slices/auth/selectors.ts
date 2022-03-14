import { RootState } from '@store/rootReducer'

export const selectToken = (state: RootState) => state.auth.token
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectAuthErrors = (state: RootState) => state.auth.errors
export const selectUser = (state: RootState) => state.auth.user
