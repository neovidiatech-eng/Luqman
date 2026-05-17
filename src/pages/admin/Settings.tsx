'use client'
import { useState } from 'react'
import { Save, User, Building, Shield, Bell } from 'lucide-react'
import { mockSiteSettings } from '@/lib/mock-data'
import { showToast } from '@/components/shared/Toast'

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'social'>('general')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showToast('تم حفظ الإعدادات بنجاح', 'success')
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-[var(--text)]">إعدادات المنصة</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'general' ? 'bg-[var(--primary)] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'}`}
          >
            <Building size={18} /> إعدادات عامة
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'contact' ? 'bg-[var(--primary)] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'}`}
          >
            <Shield size={18} /> بيانات التواصل
          </button>
          <button 
            onClick={() => setActiveTab('social')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'social' ? 'bg-[var(--primary)] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'}`}
          >
            <User size={18} /> روابط التواصل الاجتماعي
          </button>
        </div>

        <div className="flex-1">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-lg text-[var(--text)]">
                {activeTab === 'general' && 'الإعدادات العامة'}
                {activeTab === 'contact' && 'بيانات التواصل'}
                {activeTab === 'social' && 'روابط التواصل الاجتماعي'}
              </h3>
            </div>

            <div className="p-6 space-y-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">اسم الموقع</label>
                      <input type="text" defaultValue={mockSiteSettings.seoTitle} required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">وصف الموقع</label>
                      <input type="text" defaultValue={mockSiteSettings.seoDescription} required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
                    </div>
                    <div className="col-span-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">عن الشركة (يظهر في صفحة من نحن)</label>
                      <textarea rows={5} defaultValue={mockSiteSettings.seoKeywords} required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"></textarea>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف (الرئيسي)</label>
                    <input type="text" defaultValue={mockSiteSettings.phone} required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رقم الواتساب</label>
                    <input type="text" defaultValue={mockSiteSettings.whatsapp} required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                    <input type="email" defaultValue={mockSiteSettings.email} required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">عنوان المقر الرئيسي</label>
                    <input type="text" defaultValue={mockSiteSettings.address} required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" />
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رابط تويتر (X)</label>
                    <input type="url" defaultValue={''} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رابط إنستغرام</label>
                    <input type="url" defaultValue={''} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رابط سناب شات</label>
                    <input type="url" defaultValue={''} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رابط لينكد إن</label>
                    <input type="url" defaultValue={''} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" dir="ltr" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <button type="submit" className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                <Save size={18} /> حفظ الإعدادات
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
