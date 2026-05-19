'use client'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import PropertyCard from '@/components/properties/PropertyCard'
import { useHomeData } from '@/hooks/public/useProperties'
import { Property } from '@/lib/types'

export default function FeaturedProperties() {
  const { data, isLoading, error } = useHomeData()

  const allProperties = data?.data?.latestProperties || []
  const properties = allProperties.filter((p: any) => p.isFeatured === true || p.featured === true)
  console.log("=== Featured Properties ===", properties);

  if (isLoading) {
    return <div className="text-center py-24 font-bold text-primary">جاري التحميل...</div>
  }

  if (error) {
    return <div className="text-center py-24 font-bold text-red-500">حدث خطأ أثناء تحميل العقارات</div>
  }

  if (!data) {
    return null
  }

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

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.slice(0, 4).map((property: Property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <h3 className="text-xl font-bold text-gray-500">لا توجد عقارات لعرضها في الوقت الحالي</h3>
          </div>
        )}

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
