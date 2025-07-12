import { User } from "./user"

type RegisterPayload = {
  name: string
  email: string
  password: string
}

type LoginPayload = {
  email: string
  password: string
}

type LoginResponse = {
  user: User
  token: string
}

export type {
  RegisterPayload,
  LoginPayload,
  LoginResponse
}