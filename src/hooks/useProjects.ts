import { mockProperties } from '@/lib/mock-data'
import type { Property } from '@/lib/types'

export function useProjects() {
  return { properties: mockProperties as Property[] }
}
