"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Save, User, Mail, Phone, Lock, Building2, TrendingUp, Calendar, Home, CheckCircle2, Upload, Eye } from 'lucide-react'
import { mockDeveloper } from '@/lib/mock-data'
import { useToast } from '@/components/shared/Toast'

export default function Profile() {
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showToast('تم تحديث البيانات بنجاح', 'success')
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div>
        <h1 className="text-2xl font-black text-[var(--primary)] mb-1">إعدادات الملف الشخصي</h1>
        <p className="text-[var(--text-muted)] font-medium">أدر بيانات شركتك وكلمات المرور الخاصة بك</p>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Card Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[var(--border)] flex flex-col items-center text-center">
             <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-[var(--accent)] p-1 relative overflow-hidden">
                  <Image src={mockDeveloper.logo} alt="" fill className="w-full h-full rounded-full object-cover" unoptimized />
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center border-4 border-white hover:scale-110 transition-transform">
                  <Upload size={16} />
                </button>
             </div>
             <h3 className="text-xl font-black text-[var(--primary)] mb-1">{mockDeveloper.companyName}</h3>
             <span className="text-[10px] font-black text-[var(--success)] bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest mb-6">مشاركة برونزية</span>
             
             <div className="w-full grid grid-cols-2 gap-2">
                <div className="bg-[var(--bg)] p-4 rounded-2xl text-center">
                   <p className="text-lg font-black text-[var(--primary)] text-center">{mockDeveloper.totalProperties}</p>
                   <p className="text-[10px] font-bold text-[var(--text-muted)] text-center uppercase">عقار</p>
                </div>
                <div className="bg-[var(--bg)] p-4 rounded-2xl text-center">
                   <p className="text-lg font-black text-[var(--primary)] text-center">٤.٨ ألف</p>
                   <p className="text-[10px] font-bold text-[var(--text-muted)] text-center uppercase">مشاهدة</p>
                </div>
             </div>
          </div>

          <div className="bg-[var(--sidebar-bg)] p-8 rounded-[2rem] shadow-lg text-white space-y-6">
            <h4 className="text-lg font-bold text-[var(--secondary)]">ملخص النشاط</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-white/40" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/40 uppercase">تاريخ الانضمام</span>
                  <span className="text-sm font-bold">{mockDeveloper.createdAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-white/40" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/40 uppercase">حالة الحساب</span>
                  <span className="text-sm font-bold text-[var(--success)]">نشط ومعتمد</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Forms Area */}
        <div className="lg:col-span-8 space-y-8">
          <form onSubmit={handleUpdate} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-[var(--border)] space-y-8">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-6 mb-2">
              <div className="w-10 h-10 bg-[var(--accent)] text-[var(--primary)] rounded-xl flex items-center justify-center">
                <Building2 size={24} />
              </div>
              <h2 className="text-xl font-black text-[var(--primary)]">بيانات الشركة</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2 col-span-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">اسم المنشأة العقارية</label>
                <div className="flex items-center gap-3 bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus-within:border-[var(--secondary)] transition-all">
                  <Building2 size={18} className="text-[var(--text-muted)]" />
                  <input type="text" defaultValue={mockDeveloper.companyName} className="bg-transparent border-none outline-none w-full text-sm font-bold" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">البريد الإلكتروني للشركة</label>
                <div className="flex items-center gap-3 bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus-within:border-[var(--secondary)] transition-all">
                  <Mail size={18} className="text-[var(--text-muted)]" />
                  <input type="email" defaultValue={mockDeveloper.email} className="bg-transparent border-none outline-none w-full text-sm font-bold text-left" dir="ltr" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">رقم التواصل</label>
                <div className="flex items-center gap-3 bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus-within:border-[var(--secondary)] transition-all">
                  <Phone size={18} className="text-[var(--text-muted)]" />
                  <input type="tel" defaultValue={mockDeveloper.phone} className="bg-transparent border-none outline-none w-full text-sm font-bold text-left" dir="ltr" />
                </div>
              </div>

               <div className="space-y-2 col-span-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">نبذة عن الشركة</label>
                <textarea rows={4} defaultValue="نحن شركة متخصصة في تطوير المجمعات السكنية الفاخرة في قلب الرياض، نهدف لتقديم حلول سكنية تجمع بين الأصالة والنمط العصري." className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm font-medium leading-relaxed" />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="bg-[var(--primary)] text-white px-12 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-blue-900/10 transition-all disabled:opacity-50"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                <>
                  <Save size={20} />
                  <span>حفظ التغييرات</span>
                </>
              )}
            </button>
          </form>

          <form className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-[var(--border)] space-y-8">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-6 mb-2">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                <Lock size={24} />
              </div>
              <h2 className="text-xl font-black text-[var(--primary)]">تغيير كلمة المرور</h2>
            </div>

            <div className="space-y-6">
               <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">كلمة المرور الحالية</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--primary)] mr-1">كلمة المرور الجديدة</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--primary)] mr-1">تأكيد كلمة المرور</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm" />
                </div>
              </div>
            </div>

            <button type="button" className="bg-[var(--primary)] text-white px-12 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-blue-900/10 transition-all">تحديث كلمة المرور</button>
          </form>
        </div>
      </div>
    </div>
  )
}
