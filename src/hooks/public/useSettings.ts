import { useQuery } from '@tanstack/react-query'
import { getCities } from '@/services/public/SettingsService'

export const useGetCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: getCities,
  })
}
