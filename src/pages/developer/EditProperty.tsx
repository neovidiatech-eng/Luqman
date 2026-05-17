"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import StepperForm from '@/components/developer/StepperForm'
import ImageUploader from '@/components/developer/ImageUploader'
import { propertyTypes, saudiCities } from '@/lib/mock-data'
import { useToast } from '@/components/shared/Toast'

export default function EditProperty() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const steps = ['المعلومات الأساسية', 'الصور والوسائط', 'مراجعة وتحديث']

  const handleNext = () => setStep(s => Math.min(s + 1, 2))
  const handlePrev = () => setStep(s => Math.max(s - 1, 0))

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      showToast('تم تحديث العقار بنجاح وبانتظار المراجعة', 'success')
      router.push('/developer/properties')
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div>
        <h1 className="text-2xl font-black text-[var(--primary)] mb-1">تعديل عقار</h1>
        <p className="text-[var(--text-muted)] font-medium">قم بتحديث تفاصيل العقار هنا</p>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[var(--border)]">
        <StepperForm steps={steps} currentStep={step} />

        <div className="mt-8">
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">عنوان العقار</label>
                <input type="text" defaultValue="فيلا فاخرة بتصميم عصري" className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">نوع العقار</label>
                <select className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm font-bold">
                  {propertyTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">المدينة</label>
                <select className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm font-bold">
                  {saudiCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">السعر (ريال سعودي)</label>
                <input type="number" defaultValue="2500000" className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">المساحة (م²)</label>
                <input type="number" defaultValue="450" className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm font-bold" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">الوصف</label>
                <textarea rows={4} defaultValue="فيلا فخمة بتصميم عصري في أرقى أحياء الرياض" className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm font-bold" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <ImageUploader onImagesChange={() => {}} />
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)] text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--primary)] mb-2">تأكيد التحديث</h3>
                  <p className="text-[var(--text-muted)] text-sm">سيتم مراجعة التحديثات المضافة من قبل الإدارة قبل نشرها.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-10 pt-6 border-t border-[var(--border)]">
          <button 
            onClick={handlePrev}
            disabled={step === 0}
            className="px-6 py-3 rounded-xl font-bold text-[var(--primary)] hover:bg-[var(--bg)] disabled:opacity-30 flex items-center gap-2 transition-colors"
          >
            <ArrowRight size={18} />
            السابق
          </button>
          
          {step < 2 ? (
            <button 
              onClick={handleNext}
              className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 flex items-center gap-2 transition-all shadow-lg shadow-blue-900/10"
            >
              التالي
              <ArrowLeft size={18} />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[var(--secondary)] text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 flex items-center gap-2 transition-all shadow-lg shadow-amber-900/10 disabled:opacity-50"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'حفظ التحديثات'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
