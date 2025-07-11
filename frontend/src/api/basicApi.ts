import { AxiosError } from 'axios'

export const basicApi = (endpoint: string) => {
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

    return { headers, url, handleRequest }
}
