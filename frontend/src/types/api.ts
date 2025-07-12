type Id = string | number

type DefaultParams = {
  page?: number
  per_page?: number
  sort?: 'asc' | 'desc'
}

type Payload = Record<string, any>

export type { 
  Id, 
  DefaultParams, 
  Payload,
}