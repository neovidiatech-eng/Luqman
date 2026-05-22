'use client'
import React, { useState } from 'react'
import { Send, Phone, User, MessageSquare, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Toast from './Toast'
import { useSubmitContact } from '@/hooks/public/useContact'
import { useSubmitPropertyContact } from '@/hooks/public/usePropertyContact'
import { useSubmitProjectContact } from '@/hooks/public/useProjectContact'

interface ContactFormProps {
  compact?: boolean
  propertyTitle?: string
  propertyId?: string | null
  projectId?: string | null
}

export default function ContactForm({
  compact = false,
  propertyTitle,
  propertyId = null,
  projectId = null
}: ContactFormProps) {
  const generalContact = useSubmitContact()
  const propertyContact = useSubmitPropertyContact()
  const projectContact = useSubmitProjectContact()

  const isPending = propertyId
    ? propertyContact.isPending
    : projectId
      ? projectContact.isPending
      : generalContact.isPending

  const [toastConfig, setToastConfig] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: propertyTitle || '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Build a type-safe message that includes the subject/context at the top so it's not lost
      let finalMessage = formData.message

      if (propertyId && propertyTitle) {
        finalMessage = `[الاستفسار عن عقار: ${propertyTitle}]\n${formData.message}`
      } else if (projectId && propertyTitle) {
        finalMessage = `[الاستفسار عن مشروع: ${propertyTitle}]\n${formData.message}`
      } else if (formData.subject) {
        finalMessage = `[الموضوع: ${formData.subject}]\n${formData.message}`
      }

      const baseData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        message: finalMessage,
      }

      let response

      if (propertyId) {
        response = await propertyContact.mutateAsync({
          propertyId,
          data: baseData,
        })
      } else if (projectId) {
        response = await projectContact.mutateAsync({
          projectId,
          data: baseData,
        })
      } else {
        response = await generalContact.mutateAsync(baseData)
      }

      if (response.success) {
        setToastConfig({
          message: "تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.",
          type: "success"
        })
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: propertyTitle || '',
          message: ''
        })
      } else {
        setToastConfig({
          message: response.message || "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.",
          type: "error"
        })
      }
    } catch (error: any) {
      console.error('Error submitting contact form:', error)
      
      // Improved error handling based on server response
      const serverMessage = error.response?.data?.message || error.response?.data?.error
      
      if (error.response?.status === 429) {
        setToastConfig({
          message: "لقد تجاوزت الحد المسموح به من المحاولات. يرجى الانتظار قليلاً قبل المحاولة مرة أخرى.",
          type: "error"
        })
      } else if (error.response?.status === 400) {
        setToastConfig({
          message: serverMessage || "يرجى التحقق من صحة البيانات المدخلة (مثال: رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام).",
          type: "error"
        })
      } else {
        setToastConfig({
          message: serverMessage || "حدث خطأ أثناء الاتصال بالخادم. يرجى التحقق من اتصالك والمحاولة مرة أخرى.",
          type: "error"
        })
      }
    }
  }

  return (
    <div className={compact ? "" : "bg-white p-8 rounded-2xl shadow-xl border border-border"}>
      {!compact && <h3 className="text-2xl font-bold text-primary mb-6">تواصل معنا</h3>}
      {propertyTitle && compact && (
        <p className="text-sm text-text-muted mb-4 font-bold">
          الاستفسار عن: <span className="text-primary">{propertyTitle}</span>
        </p>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            required
            type="text"
            placeholder="اسمك الكريم"
            className="w-full pr-12 pl-4 py-3 bg-bg rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-sm"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="relative">
          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            required
            type="tel"
            placeholder="رقم جوالك (05XXXXXXXX)"
            className="w-full pr-12 pl-4 py-3 bg-bg rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-sm"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="relative">
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            placeholder="بريدك الإلكتروني (اختياري)"
            className="w-full pr-12 pl-4 py-3 bg-bg rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-sm"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {!compact && (
          <div className="relative">
            <MessageSquare className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              className="w-full pr-12 pl-4 py-3 bg-bg rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all appearance-none font-bold text-sm"
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
            placeholder="أخبرنا كيف يمكننا مساعدتك..."
            className="w-full px-4 py-3 bg-bg rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all resize-none font-bold text-sm"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="w-full btn btn-secondary flex items-center justify-center gap-2 group font-bold text-sm"
        >
          {isPending ? (
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span>أرسل رسالتك</span>
              <Send className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <AnimatePresence>
        {toastConfig && (
          <Toast
            message={toastConfig.message}
            type={toastConfig.type}
            onClose={() => setToastConfig(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
