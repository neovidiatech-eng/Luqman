'use client'
import React, { useState } from 'react'
import { Send, Phone, User, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Toast from './Toast'

interface ContactFormProps {
  compact?: boolean
  propertyTitle?: string
}

export default function ContactForm({ compact = false, propertyTitle }: ContactFormProps) {
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: propertyTitle || '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowToast(true)
      setFormData({
        name: '',
        phone: '',
        subject: propertyTitle || '',
        message: ''
      })
    }, 1500)
  }

  return (
    <div className={compact ? "" : "bg-white p-8 rounded-2xl shadow-xl border border-border"}>
      {!compact && <h3 className="text-2xl font-bold text-primary mb-6">تواصل معنا</h3>}
      {propertyTitle && compact && <p className="text-sm text-text-muted mb-4">الاستفسار عن: <span className="text-primary font-bold">{propertyTitle}</span></p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            required
            type="text"
            placeholder="الاسم الكامل"
            className="w-full pr-12 pl-4 py-3 bg-bg rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="relative">
          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            required
            type="tel"
            placeholder="رقم الجوال"
            className="w-full pr-12 pl-4 py-3 bg-bg rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        {!compact && (
          <div className="relative">
            <MessageSquare className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              className="w-full pr-12 pl-4 py-3 bg-bg rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all appearance-none"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            >
              <option value="">اختر الموضوع</option>
              <option value="طلب شراء">طلب شراء</option>
              <option value="طلب استئجار">طلب استئجار</option>
              <option value="عرض عقار للبيع">عرض عقار للبيع</option>
              <option value="استفسار عام">استفسار عام</option>
            </select>
          </div>
        )}

        <div className="relative">
          <textarea
            required
            rows={compact ? 3 : 5}
            placeholder="رسالتك..."
            className="w-full px-4 py-3 bg-bg rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all resize-none"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full btn btn-secondary flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span>إرسال الرسالة</span>
              <Send className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <AnimatePresence>
        {showToast && (
          <Toast
            message="تم إرسال رسالتك بنجاح. سنتواصل معك قريباً."
            type="success"
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
