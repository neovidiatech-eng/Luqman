import { mockProperties } from '@/lib/mock-data'
import type { Property } from '@/lib/types'

export function useFilters() {
  return { properties: mockProperties as Property[] }
}
