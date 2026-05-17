'use client'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import PropertyCard from '@/components/properties/PropertyCard'
import { mockProperties } from '@/lib/mock-data'

export default function FeaturedProperties() {
  const featured = mockProperties.filter(p => p.featured).slice(0, 4)

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle 
            title="أبرز العقارات المتاحة" 
            subtitle="مجموعة مختارة بعناية من أفضل الفرص السكنية والاستثمارية"
          />
          <Link 
            href="/properties" 
            className="hidden md:flex items-center gap-2 text-primary font-black hover:text-secondary transition-colors group mb-12"
          >
            <span>عرض جميع العقارات</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link 
            href="/properties" 
            className="btn btn-primary w-full"
          >
            عرض جميع العقارات
          </Link>
        </div>
      </div>
    </section>
  )
}
