import axios, { AxiosError } from 'axios'
import { DefaultParams, Id, Payload } from '@/types/api'

export const crudApi = (endpoint: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`
    if (!url) {
        throw new Error('API URL is not defined. Please check your environment variables.')
    }

    const token = localStorage.getItem('token') || null
    const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {}

    const handleRequest = async <T>(promise: Promise<{ data: T }>) => {
        try {
            const response = await promise
            return response.data
        } catch (error) {
            const err = error as AxiosError
            if (err.response) {
                console.error(err.response.data)
                throw new Error('API Error')
            } else if (err.request) {
                console.error(err.request)
                throw new Error('Network error or no response received')
            } else {
                throw new Error(err.message)
            }
        }
    }

    const list = (params?: DefaultParams) =>
        handleRequest(axios.get(url, { headers, params }))

    const view = (id: Id) =>
        handleRequest(axios.get(`${url}/${id}`, { headers }))

    const create = (data: Payload) =>
        handleRequest(axios.post(url, data, { headers }))

    const update = (id: Id, data: Payload) =>
        handleRequest(axios.put(`${url}/${id}`, data, { headers }))

    const destroy = (id: Id) =>
        handleRequest(axios.delete(`${url}/${id}`, { headers }))

    return { list, view, create, update, destroy }
}
