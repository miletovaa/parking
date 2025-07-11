import { AxiosError } from 'axios'

export const basicApi = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
        throw new Error('API URL is not defined. Please check your environment variables.')
    }

    const token = localStorage.getItem('token') || '4|ESn1Q7t27LxuAKu3x2x0v2cM8wTWjM6ILYGn1gRU65bc2ce5'
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

    return { headers, apiUrl, handleRequest }
}
