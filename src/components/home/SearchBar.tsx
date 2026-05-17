'use client'
import { useState } from 'react'
import { Search, MapPin, Building2, ArrowLeftRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { saudiCities, propertyTypes } from '@/lib/mock-data'

export default function SearchBar() {
  const [city, setCity] = useState('')
  const [type, setType] = useState('')
  const [purpose, setPurpose] = useState('للبيع')
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (city) params.append('city', city)
    if (type) params.append('type', type)
    if (purpose) params.append('purpose', purpose === 'للبيع' ? 'sale' : 'rent')
    
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-end border border-border animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex-1 w-full">
        <label className="block text-[10px] text-gray-400 mb-2 font-black uppercase tracking-widest text-right">المدينة</label>
        <div className="relative group">
          <MapPin className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary group-focus-within:text-primary transition-colors" />
          <select 
            className="w-full border-b border-gray-100 pr-8 py-3 text-sm font-bold text-primary focus:outline-none focus:border-secondary transition-all appearance-none bg-transparent cursor-pointer"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">كل المدن</option>
            {saudiCities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="flex-1 w-full">
        <label className="block text-[10px] text-gray-400 mb-2 font-black uppercase tracking-widest text-right">نوع العقار</label>
        <div className="relative group">
          <Building2 className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary group-focus-within:text-primary transition-colors" />
          <select 
            className="w-full border-b border-gray-100 pr-8 py-3 text-sm font-bold text-primary focus:outline-none focus:border-secondary transition-all appearance-none bg-transparent cursor-pointer"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">كل الأنواع</option>
            {propertyTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex-1 w-full">
        <label className="block text-[10px] text-gray-400 mb-2 font-black uppercase tracking-widest text-right">الغرض</label>
        <div className="relative group">
          <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary group-focus-within:text-primary transition-colors" />
          <select 
            className="w-full border-b border-gray-100 pr-8 py-3 text-sm font-bold text-primary focus:outline-none focus:border-secondary transition-all appearance-none bg-transparent cursor-pointer"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value="للبيع">للبيع</option>
            <option value="للإيجار">للإيجار</option>
          </select>
        </div>
      </div>

      <button 
        onClick={handleSearch}
        className="bg-secondary text-primary font-black px-12 py-4 rounded-xl text-sm hover:bg-accent hover:shadow-lg active:scale-95 transition-all shadow-md whitespace-nowrap w-full md:w-auto"
      >
        ابحث الآن
      </button>
    </div>
  )
}
