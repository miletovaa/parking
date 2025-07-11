import axios from 'axios'
import { DefaultParams, Id, Payload } from '@/types/api'
import { basicApi } from './basicApi'

export const crudApi = (endpoint: string) => {
    const { headers, url, handleRequest } = basicApi(endpoint)

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
