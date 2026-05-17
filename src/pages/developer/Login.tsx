"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, Mail, Lock } from 'lucide-react'

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      router.push('/developer/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-6" dir="rtl">
      <div className="w-full max-w-md bg-white p-8 rounded-[2rem] shadow-lg border border-[var(--border)] animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--primary)] text-[var(--secondary)] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} />
          </div>
          <h1 className="text-2xl font-black text-[var(--primary)] mb-2">تسجيل الدخول للمطورين</h1>
          <p className="text-[var(--text-muted)] font-medium">أدخل بياناتك للوصول إلى لوحة التحكم الخاصة بك</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[var(--primary)] mr-1">البريد الإلكتروني</label>
            <div className="flex items-center gap-3 bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus-within:border-[var(--secondary)] transition-all">
              <Mail size={18} className="text-[var(--text-muted)]" />
              <input type="email" required placeholder="name@company.com" className="bg-transparent border-none outline-none w-full text-sm font-bold text-left" dir="ltr" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[var(--primary)] mr-1">كلمة المرور</label>
            <div className="flex items-center gap-3 bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus-within:border-[var(--secondary)] transition-all">
              <Lock size={18} className="text-[var(--text-muted)]" />
              <input type="password" required placeholder="••••••••" className="bg-transparent border-none outline-none w-full text-sm font-bold" />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white py-4 rounded-2xl font-black hover:opacity-95 shadow-xl shadow-blue-900/10 transition-all disabled:opacity-50"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : 'تسجيل الدخول'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm font-bold text-[var(--text-muted)]">
          ليس لديك حساب مطور؟ <Link href="/developer/register" className="text-[var(--secondary)] hover:underline">سجل الآن</Link>
        </p>
      </div>
    </div>
  )
}
