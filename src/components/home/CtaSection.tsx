'use client'
import { MessageCircle, Phone } from 'lucide-react'
import { companyInfo } from '@/lib/mock-data'

export default function CtaSection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="bg-gradient-to-br from-secondary to-accent p-12 md:p-20 rounded-[3rem] relative overflow-hidden shadow-2xl">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl"></div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-primary mb-8 leading-tight">
              هل تريد بيع أو استثمار عقارك؟
            </h2>
            <p className="text-xl md:text-2xl text-primary/80 mb-12 font-bold">
              انضم إلى آلاف المستفيدين من خدمات لقمان المتميزة في التسويق العقاري وتطوير المشاريع. نحن هنا لمساعدتك في تحقيق أفضل العوائد.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={`https://wa.me/${companyInfo.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="btn bg-white text-primary text-xl w-full sm:w-auto px-10 py-5 hover:bg-primary hover:text-white group"
              >
                <MessageCircle className="w-6 h-6 ml-2" />
                <span>تواصل معنا على واتساب</span>
              </a>
              <a 
                href={`tel:${companyInfo.phone}`}
                className="btn border-2 border-primary text-primary text-xl w-full sm:w-auto px-10 py-5 hover:bg-primary hover:text-white group"
              >
                <Phone className="w-6 h-6 ml-2" />
                <span>اتصل بنا الآن</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
