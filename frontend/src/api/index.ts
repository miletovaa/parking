import { authApi } from './authApi'
import { crudApi } from "./crudApi"

// AUTH API
export { authApi }

// DATA APIs
export const parkingApi = () => crudApi('/parkings')
export const reservationApi = () => crudApi('/reservations')

// TODO: export const userApi = () => crudApi('/users')