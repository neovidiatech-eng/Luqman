'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Save } from 'lucide-react'
import ImageUploader from '@/components/shared/ImageUploader'
import { mockProperties, propertyTypes, saudiCities, propertyFeatures } from '@/lib/mock-data'
import { showToast } from '@/components/shared/Toast'

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [property, setProperty] = useState<any>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  useEffect(() => {
    const found = mockProperties.find(p => p.id === resolvedParams.id)
    if (found) {
      setProperty(found)
      setSelectedFeatures(found.features || [])
    }
  }, [resolvedParams.id])

  if (!property) return <div className="p-8 text-center text-gray-500">جاري التحميل...</div>

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showToast('تم تحديث العقار بنجاح', 'success')
    router.push('/admin/properties')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/properties" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-500 transition-colors">
            <ArrowRight size={20} />
          </Link>
          <h2 className="text-xl font-bold text-[var(--text)]">تعديل عقار #{property.id}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h3 className="font-bold text-lg border-b border-gray-100 pb-3 text-[var(--text)]">المعلومات الأساسية</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">عنوان العقار</label>
              <input type="text" required defaultValue={property.title} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">النوع</label>
              <select required defaultValue={property.type} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]">
                <option value="">اختر النوع...</option>
                {propertyTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">السعر (ريال)</label>
              <input type="number" required defaultValue={property.price} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المساحة (م²)</label>
              <input type="number" required defaultValue={property.area} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">غرف النوم</label>
                <input type="number" defaultValue={property.bedrooms} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">دورات المياه</label>
                <input type="number" defaultValue={property.bathrooms} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">حالة العقار</label>
              <select required defaultValue={property.status} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]">
                <option value="available">متاح</option>
                <option value="reserved">محجوز</option>
                <option value="sold">مباع</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h3 className="font-bold text-lg border-b border-gray-100 pb-3 text-[var(--text)]">الموقع</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
              <select required defaultValue={property.city} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]">
                <option value="">اختر المدينة...</option>
                {saudiCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الحي</label>
              <input type="text" required defaultValue={property.district} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">العنوان التفصيلي</label>
              <input type="text" required defaultValue={property.address} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h3 className="font-bold text-lg border-b border-gray-100 pb-3 text-[var(--text)]">التفاصيل والصور</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">وصف العقار</label>
            <textarea required rows={4} defaultValue={property.description} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">المميزات</label>
            <div className="flex flex-wrap gap-2">
              {propertyFeatures.map(feature => (
                <button
                  type="button"
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    selectedFeatures.includes(feature) 
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)]' 
                      : 'bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)]'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">صور العقار</label>
            <ImageUploader />
          </div>
        </div>

        <div className="flex justify-end gap-3 pb-6">
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium transition-colors">
            إلغاء
          </button>
          <button type="submit" className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Save size={18} /> حفظ التعديلات
          </button>
        </div>
      </form>
    </div>
  )
}
