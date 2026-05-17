export interface Property {
  id: string
  title: string
  type: 'apartment' | 'villa' | 'land' | 'commercial' | 'offplan' | 'compound' | 'resort' | 'building'
  status: 'available' | 'reserved' | 'sold'
  approvalStatus: 'pending' | 'approved' | 'rejected'
  price: number
  area: number
  bedrooms?: number
  bathrooms?: number
  floor?: number
  city: string
  district: string
  address: string
  description: string
  images: string[]
  videoUrl?: string
  features: string[]
  featured: boolean
  views: number
  developerId?: string
  developerName: string
  rejectionReason?: string
  createdAt: string
  updatedAt?: string
}

export interface Project {
  id: string
  name: string
  description: string
  city: string
  status: 'under_construction' | 'completed' | 'development'
  completionPercentage: number
  deliveryDate: string
  totalUnits: number
  availableUnits: number
  startingPrice: number
  images: string[]
  videoUrl?: string
  features: string[]
  units: ProjectUnit[]
  paymentPlans: string
  developerId?: string
  developerName: string
  approvalStatus?: 'pending' | 'approved' | 'rejected'
  createdAt?: string
}

export interface ProjectUnit {
  type: string
  area: number
  price: number
  floor: number
  status: 'available' | 'reserved' | 'sold'
}

export interface Developer {
  id: string
  companyName: string
  email: string
  phone: string
  logo: string
  commercialRegister: string
  accountStatus: 'pending' | 'active' | 'suspended'
  totalProperties: number
  totalViews: number
  createdAt: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  author: string
  publishedAt: string
  readingTime: number
  status?: 'published' | 'draft'
}

export interface Testimonial {
  id: string
  name: string
  city: string
  text: string
  rating: number
}

export interface ContactRequest {
  id: string
  name: string
  phone: string
  email: string
  message: string
  subject: string
  propertyId?: string
  propertyTitle?: string
  status: 'new' | 'contacted' | 'closed'
  notes: string
  createdAt: string
}

export interface Notification {
  id: string
  type: 'approval' | 'rejection' | 'edit_request' | 'info'
  title: string
  message: string
  propertyId?: string
  propertyTitle?: string
  isRead: boolean
  createdAt: string
}

export interface SiteSettings {
  whatsapp: string
  phone: string
  email: string
  address: string
  workingHours: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}

export type UserRole = 'admin' | 'developer' | null
