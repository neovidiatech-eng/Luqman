"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, ArrowRight, ArrowLeft, Plus, Trash2 } from 'lucide-react'
import StepperForm from '@/components/developer/StepperForm'
import ImageUploader from '@/components/developer/ImageUploader'
import { saudiCities } from '@/lib/mock-data'
import { useToast } from '@/components/shared/Toast'

export default function AddProject() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const [units, setUnits] = useState([{ id: 1, type: '', area: '', price: '', count: '' }])

  const steps = ['المعلومات الأساسية', 'الوحدات والتسعير', 'الصور والوسائط', 'مراجعة ونشر']

  const handleNext = () => setStep(s => Math.min(s + 1, 3))
  const handlePrev = () => setStep(s => Math.max(s - 1, 0))

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      showToast('تمت إضافة المشروع بنجاح وبانتظار المراجعة', 'success')
      router.push('/developer/projects')
    }, 1500)
  }

  const addUnit = () => setUnits([...units, { id: Date.now(), type: '', area: '', price: '', count: '' }])
  const removeUnit = (id: number) => setUnits(units.filter(u => u.id !== id))

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div>
        <h1 className="text-2xl font-black text-[var(--primary)] mb-1">إضافة مشروع جديد</h1>
        <p className="text-[var(--text-muted)] font-medium">أدخل تفاصيل المشروع الاستثماري الجديد</p>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[var(--border)]">
        <StepperForm steps={steps} currentStep={step} />

        <div className="mt-8">
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">اسم المشروع</label>
                <input type="text" placeholder="مشروع تلال الرياض..." className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">المدينة</label>
                <select className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm font-bold">
                  {saudiCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">تاريخ التسليم المتوقع</label>
                <input type="month" className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm font-bold" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">وصف المشروع</label>
                <textarea rows={4} placeholder="اكتب وصفاً جذاباً ومفصلاً للمشروع..." className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm font-bold" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-in fade-in zoom-in-95 duration-300 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--primary)]">الوحدات السكنية</h3>
                <button onClick={addUnit} className="bg-[var(--primary)] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90">
                  <Plus size={16} /> إضافة وحدة
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse min-w-[600px]">
                  <thead className="bg-[var(--bg)]/50 text-[var(--text-muted)] text-[11px] font-black uppercase tracking-widest border-b border-[var(--border)]">
                    <tr>
                      <th className="px-4 py-3">نوع الوحدة</th>
                      <th className="px-4 py-3">المساحة (م²)</th>
                      <th className="px-4 py-3">السعر المتوقع</th>
                      <th className="px-4 py-3">العدد المتوفر</th>
                      <th className="px-4 py-3 text-center">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {units.map((unit, idx) => (
                      <tr key={unit.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3">
                          <input type="text" placeholder="فيلا مستقلة..." className="w-full bg-[var(--bg)] px-3 py-2 rounded-lg border border-[var(--border)] outline-none text-sm" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" placeholder="300" className="w-full bg-[var(--bg)] px-3 py-2 rounded-lg border border-[var(--border)] outline-none text-sm" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" placeholder="2000000" className="w-full bg-[var(--bg)] px-3 py-2 rounded-lg border border-[var(--border)] outline-none text-sm" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" placeholder="10" className="w-full bg-[var(--bg)] px-3 py-2 rounded-lg border border-[var(--border)] outline-none text-sm" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          {units.length > 1 && (
                            <button onClick={() => removeUnit(unit.id)} className="text-red-500 hover:text-red-700 p-2">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <ImageUploader onImagesChange={() => {}} />
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)] text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--primary)] mb-2">مراجعة نهائية للمشروع</h3>
                  <p className="text-[var(--text-muted)] text-sm">تأكد من صحة بيانات الوحدات والأسعار قبل التقديم.</p>
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
          
          {step < 3 ? (
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
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'اعتماد المشروع'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
