'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Save } from 'lucide-react'
import ImageUploader from '@/components/shared/ImageUploader'
import { saudiCities } from '@/lib/mock-data'
import { showToast } from '@/components/shared/Toast'

export default function AddProjectPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showToast('تمت إضافة المشروع بنجاح', 'success')
    router.push('/admin/projects')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-500 transition-colors">
            <ArrowRight size={20} />
          </Link>
          <h2 className="text-xl font-bold text-[var(--text)]">إضافة مشروع جديد</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h3 className="font-bold text-lg border-b border-gray-100 pb-3 text-[var(--text)]">معلومات المشروع</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم المشروع</label>
              <input type="text" required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
              <select required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]">
                <option value="">اختر المدينة...</option>
                {saudiCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">حالة المشروع</label>
              <select required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]">
                <option value="development">قيد التطوير</option>
                <option value="under_construction">قيد الإنشاء</option>
                <option value="completed">مكتمل</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">إجمالي الوحدات</label>
              <input type="number" required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">يبدأ السعر من (ريال)</label>
              <input type="number" required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ التسليم المتوقع</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نسبة الإنجاز (%)</label>
              <input type="number" min="0" max="100" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h3 className="font-bold text-lg border-b border-gray-100 pb-3 text-[var(--text)]">وصف المشروع والصور</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الوصف التفصيلي</label>
            <textarea required rows={5} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">خطة الدفع</label>
            <textarea rows={3} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" placeholder="مثال: 20% دفعة أولى والباقي أقساط ميسرة"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">صور المشروع</label>
            <ImageUploader />
          </div>
        </div>

        <div className="flex justify-end gap-3 pb-6">
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium transition-colors">
            إلغاء
          </button>
          <button type="submit" className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Save size={18} /> حفظ المشروع
          </button>
        </div>
      </form>
    </div>
  )
}
