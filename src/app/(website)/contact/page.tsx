'use client'
import ContactForm from '@/components/shared/ContactForm'
import { companyInfo } from '@/lib/mock-data'

export default function Contact() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row p-30 " style={{ paddingTop: '200px' }}>

      {/* Info Side - Left (dark green) */}
      <div className="lg:w-[42%] bg-[#133c2e] flex flex-col items-center justify-center px-10 py-16 relative overflow-hidden rounded-r-3xl">

        {/* Logo */}
        <div className="bg-white rounded-2xl p-4 mb-10 shadow-lg">
          <img
            src="/logo.webp"
            alt="لقمان للتسويق العقاري"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h2 className="text-2xl font-black text-white mb-10 text-center">
          بيانات التواصل المباشر
        </h2>

        <div className="space-y-6 w-full max-w-xs text-right">
          <div className="flex items-center justify-end gap-3">
            <div>
              <span className="text-white font-bold">+{companyInfo.whatsapp}</span>
              <span className="text-[#c9a84c] font-bold"> :واتساب</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <div>
              <span className="text-white font-bold">+{companyInfo.phone || companyInfo.whatsapp}</span>
              <span className="text-[#c9a84c] font-bold"> :هاتف</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <div>
              <span className="text-white font-bold">{companyInfo.email}</span>
              <span className="text-[#c9a84c] font-bold"> :البريد الإلكتروني</span>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/3 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Form Side - Right (white) */}
      <div className="flex-1 bg-white flex items-center justify-center px-8 md:px-16 lg:px-20 py-16 rounded-l-3xl">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl md:text-4xl font-black text-[#133c2e] mb-12 text-right leading-tight">
            نتشرف بتواصلك معنا
          </h1>
          <ContactForm compact />
        </div>
      </div>

    </main>
  )
}
