"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, Mail, Lock, User, Phone } from 'lucide-react'

export default function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      router.push('/developer/login')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-6" dir="rtl">
      <div className="w-full max-w-xl bg-white p-8 rounded-[2rem] shadow-lg border border-[var(--border)] animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--primary)] text-[var(--secondary)] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} />
          </div>
          <h1 className="text-2xl font-black text-[var(--primary)] mb-2">انضم كمطور عقاري</h1>
          <p className="text-[var(--text-muted)] font-medium">سجل شركتك لعرض مشاريعك وعقاراتك على المنصة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[var(--primary)] mr-1">اسم المنشأة</label>
              <div className="flex items-center gap-3 bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus-within:border-[var(--secondary)] transition-all">
                <Building2 size={18} className="text-[var(--text-muted)]" />
                <input type="text" required placeholder="شركة الأفق العقارية" className="bg-transparent border-none outline-none w-full text-sm font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[var(--primary)] mr-1">رقم التواصل</label>
              <div className="flex items-center gap-3 bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus-within:border-[var(--secondary)] transition-all">
                <Phone size={18} className="text-[var(--text-muted)]" />
                <input type="tel" required placeholder="0500000000" className="bg-transparent border-none outline-none w-full text-sm font-bold text-left" dir="ltr" />
              </div>
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-bold text-[var(--primary)] mr-1">البريد الإلكتروني</label>
              <div className="flex items-center gap-3 bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus-within:border-[var(--secondary)] transition-all">
                <Mail size={18} className="text-[var(--text-muted)]" />
                <input type="email" required placeholder="name@company.com" className="bg-transparent border-none outline-none w-full text-sm font-bold text-left" dir="ltr" />
              </div>
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="text-sm font-bold text-[var(--primary)] mr-1">كلمة المرور</label>
              <div className="flex items-center gap-3 bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus-within:border-[var(--secondary)] transition-all">
                <Lock size={18} className="text-[var(--text-muted)]" />
                <input type="password" required placeholder="••••••••" className="bg-transparent border-none outline-none w-full text-sm font-bold" />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white py-4 rounded-2xl font-black hover:opacity-95 shadow-xl shadow-blue-900/10 transition-all disabled:opacity-50"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : 'إنشاء حساب المطور'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm font-bold text-[var(--text-muted)]">
          لديك حساب مسبقاً؟ <Link href="/developer/login" className="text-[var(--secondary)] hover:underline">سجل الدخول</Link>
        </p>
      </div>
    </div>
  )
}
