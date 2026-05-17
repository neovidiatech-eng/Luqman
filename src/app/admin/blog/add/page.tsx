'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Save } from 'lucide-react'
import ImageUploader from '@/components/shared/ImageUploader'
import { showToast } from '@/components/shared/Toast'

export default function AddArticlePage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showToast('تم حفظ المقال بنجاح', 'success')
    router.push('/admin/blog')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-500 transition-colors">
            <ArrowRight size={20} />
          </Link>
          <h2 className="text-xl font-bold text-[var(--text)]">إضافة مقال جديد</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">عنوان المقال</label>
              <input type="text" required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">مقتطف قصير (يظهر في القائمة)</label>
              <textarea required rows={2} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الكاتب</label>
              <input type="text" required defaultValue="إدارة لقمان العقارية" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">حالة النشر</label>
              <select className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]">
                <option value="draft">مسودة (غير منشور)</option>
                <option value="published">منشور حالاً</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">الصورة البارزة</label>
            <ImageUploader />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">محتوى المقال</label>
            <textarea required rows={12} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] font-mono leading-relaxed text-gray-700" placeholder="اكتب محتوى المقال هنا... (يدعم Markdown في النسخة الكاملة)"></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-3 pb-6">
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium transition-colors">
            إلغاء
          </button>
          <button type="submit" className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Save size={18} /> حفظ المقال
          </button>
        </div>
      </form>
    </div>
  )
}
