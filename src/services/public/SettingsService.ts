import api from '@/lib/axios'

export interface GetCitiesResponse {
  success: boolean
  message: string
  data: string[] | { name: string }[] | any
}

export const getCities = async (): Promise<GetCitiesResponse> => {
  const response = await api.get<GetCitiesResponse>('/api/v1/settings/cities')
  return response.data
}
