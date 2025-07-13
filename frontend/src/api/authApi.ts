import axios, { AxiosResponse } from 'axios'
import { RegisterPayload, LoginPayload, LoginResponse } from '@/types/auth'
import { basicApi } from './basicApi'
import { User } from '@/types/user'

export const authApi = () => {
    const { headers, apiUrl, handleRequest } = basicApi()

    const register = (data: RegisterPayload): Promise<LoginResponse> =>
        handleRequest(axios.post(`${apiUrl}/register`, data, { headers }))

    const login = (data: LoginPayload): Promise<LoginResponse> =>
        handleRequest(axios.post(`${apiUrl}/login`, data, { headers }))

    const logout = async () => {
        localStorage.removeItem('token')
        handleRequest(axios.post(`${apiUrl}/logout`, {}, { headers }))
    }

    const me = async () => {
        const response = await handleRequest<AxiosResponse<User>>(axios.get(`${apiUrl}/me`, { headers }))
        return response?.data
    }

    return { register, login, logout, me}
}
