import { mockProperties } from '@/lib/mock-data'
import type { Property } from '@/lib/types'

export function useDeveloper() {
  return { properties: mockProperties as Property[] }
}
