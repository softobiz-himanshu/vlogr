export interface User {
  id: string
  name: string
  type: string
  password: string
  email: string
  token: string
}

export interface SigninDto {
  email: string
  password: string
}

export interface SignupDto {
  email: string
  password: string
}
