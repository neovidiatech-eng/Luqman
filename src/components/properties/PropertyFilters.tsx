'use client'
import { ChevronDown } from 'lucide-react'
import { propertyTypes } from '@/lib/mock-data'
import { useGetCities } from '@/hooks/public/useSettings'

interface PropertyFiltersProps {
  filters: any
  setFilters: (filters: any) => void
  onClear: () => void
}

export default function PropertyFilters({ filters, setFilters, onClear }: PropertyFiltersProps) {
  const { data: citiesData } = useGetCities()

  // The API returns data.data.cities as an array of strings
  const citiesList = Array.isArray(citiesData?.data?.cities)
    ? citiesData.data.cities
    : []

  const selectedType = filters.types && filters.types.length > 0 ? filters.types[0] : ''

  return (
    <div className="bg-white w-[280px] p-4 rounded-[20px] shadow-[0_8px_20px_rgb(0,0,0,0.04)] border border-gray-100/50 h-fit sticky top-24">      {/* Title */}
      <span className="block text-[#c9a84c] text-xs font-black mb-4 text-right">
        فلترة العقارات
      </span>

      <div className="space-y-4">
        {/* Type Select */}
        <div className="relative">
          <select
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-right font-bold text-sm text-[#133c2e] outline-none transition-all focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] appearance-none cursor-pointer"
            value={selectedType}
            onChange={(e) => setFilters({ ...filters, types: e.target.value ? [e.target.value] : [] })}
          >
            <option value="">اختر نوع العقار</option>
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#133c2e]/60 pointer-events-none" />
        </div>

        {/* City Select */}
        <div className="relative">
          <select
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-right font-bold text-sm text-[#133c2e] outline-none transition-all focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] appearance-none cursor-pointer"
            value={filters.city || ''}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          >
            <option value="">اختر المدينة</option>
            {citiesList.map((city: string) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#133c2e]/60 pointer-events-none" />
        </div>

        {/* Search Button */}
        <button
          type="button"
          onClick={() => {
            // Smooth scroll to the results section for better mobile experience
            const resultsSection = document.getElementById('results-grid')
            if (resultsSection) {
              resultsSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className="w-full bg-[#c9a84c] text-[#133c2e] font-black text-sm py-3.5 rounded-xl hover:bg-[#b8973b] transition-all shadow-sm active:scale-[0.98] cursor-pointer text-center"
        >
          ابحث الآن
        </button>
      </div>
    </div>
  )
}
