'use client'
import SectionTitle from '@/components/shared/SectionTitle'
import ContactForm from '@/components/shared/ContactForm'
import MapPlaceholder from '@/components/shared/MapPlaceholder'
import { MessageCircle, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react'
import { companyInfo } from '@/lib/mock-data'

export default function Contact() {
  return (
    <main className="pt-32 pb-20 bg-bg min-h-screen">
      <div className="container">
        <SectionTitle 
          center 
          title="تواصل معنا" 
          subtitle="نحن هنا للإجابة على جميع استفساراتك ومساعدتك في رحلة البحث عن عقارك" 
        />

        <div className="flex flex-col lg:flex-row gap-12 mt-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-primary text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-12">معلومات التواصل</h3>
                
                <div className="space-y-10">
                  <a 
                    href={`https://wa.me/${companyInfo.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-6 group"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-whatsapp group-hover:scale-110 transition-all">
                      <Phone className="w-6 h-6 text-secondary group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">واتساب مباشر</p>
                      <p className="text-xl font-bold ltr">+{companyInfo.whatsapp}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">البريد الإلكتروني</p>
                      <p className="text-xl font-bold">{companyInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">المكتب الرئيسي</p>
                      <p className="text-lg font-bold">{companyInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">أوقات العمل</p>
                      <p className="text-lg font-bold">{companyInfo.workingHours}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-16 pt-10 border-t border-white/10">
                  <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Facebook className="w-6 h-6" /></a>
                  <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Twitter className="w-6 h-6" /></a>
                  <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Instagram className="w-6 h-6" /></a>
                </div>
              </div>

              {/* Decorative circle */}
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:w-2/3">
            <div className="bg-white p-8 md:p-16 rounded-[4rem] border border-border shadow-2xl h-full">
              <h3 className="text-3xl font-black text-primary mb-4">أرسل لنا رسالة</h3>
              <p className="text-text-muted mb-12">فريقنا متواجد للرد على جميع استفساراتكم خلال ساعات العمل.</p>
              
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20 max-w-6xl mx-auto rounded-[3rem] overflow-hidden border border-border shadow-sm">
          <MapPlaceholder location={companyInfo.address} height="500px" />
        </div>
      </div>
    </main>
  )
}
