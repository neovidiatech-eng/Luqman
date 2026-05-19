'use client'
import { Search, MapPin, X } from 'lucide-react'
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

  const toggleType = (value: string) => {
    const currentTypes = filters.types || []
    const nextTypes = currentTypes.includes(value)
      ? currentTypes.filter((t: string) => t !== value)
      : [...currentTypes, value]
    setFilters({ ...filters, types: nextTypes })
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-border h-fit sticky top-24">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-primary">تصفية النتائج</h3>
        <button 
          onClick={onClear}
          className="text-xs font-bold text-text-muted hover:text-error flex items-center gap-1 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          <span>مسح الكل</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* Search */}
        <div>
          <label className="block text-sm font-black text-primary mb-3">بحث بالحي</label>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="مثال: ياسمين، نرجس..." 
              className="w-full pr-10 pl-4 py-2.5 bg-bg rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none text-sm transition-all"
              value={filters.district || ''}
              onChange={(e) => setFilters({ ...filters, district: e.target.value })}
            />
          </div>
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-sm font-black text-primary mb-3">المدينة</label>
          <select 
            className="w-full px-4 py-2.5 bg-bg rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none text-sm transition-all appearance-none cursor-pointer"
            value={filters.city || ''}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          >
            <option value="">كل المدن</option>
            {citiesList.map((city: string) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-black text-primary mb-3">نوع العقار</label>
          <div className="grid grid-cols-1 gap-2">
            {propertyTypes.map(type => (
              <label key={type.value} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={filters.types?.includes(type.value)}
                  onChange={() => toggleType(type.value)}
                />
                <div className={`w-5 h-5 rounded border ${filters.types?.includes(type.value) ? 'bg-secondary border-secondary' : 'border-gray-300 group-hover:border-secondary'} transition-all flex items-center justify-center`}>
                  {filters.types?.includes(type.value) && <div className="w-2.5 h-2.5 bg-primary rounded-ss-full rounded-ee-full"></div>}
                </div>
                <span className={`text-sm ${filters.types?.includes(type.value) ? 'text-primary font-bold' : 'text-text-muted hover:text-primary'} transition-colors`}>
                  {type.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-black text-primary mb-3">السعر (ر.س)</label>
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="number" 
              placeholder="من" 
              className="w-full px-4 py-2.5 bg-bg rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none text-sm transition-all"
              value={filters.minPrice || ''}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
            <input 
              type="number" 
              placeholder="إلى" 
              className="w-full px-4 py-2.5 bg-bg rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none text-sm transition-all"
              value={filters.maxPrice || ''}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-black text-primary mb-3">عدد الغرف</label>
          <div className="flex gap-2">
            {['1', '2', '3', '4', '5+'].map(num => (
              <button 
                key={num}
                onClick={() => setFilters({ ...filters, bedrooms: filters.bedrooms === num ? '' : num })}
                className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                  filters.bedrooms === num ? 'bg-secondary border-secondary text-primary' : 'border-gray-200 text-text-muted hover:border-secondary hover:text-primary'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <button 
          className="w-full btn btn-secondary mt-4 py-4 uppercase tracking-widest text-xs"
          onClick={() => {}} // Usually filters are reactive so this just confirms visually
        >
          تطبيق الفلاتر
        </button>
      </div>
    </div>
  )
}
