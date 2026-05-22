'use client'
import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  MapPin, 
  Phone, 
  Mail, 
} from 'lucide-react'
import { companyInfo } from '@/lib/mock-data'

export default function Footer() {
  return (
    <footer className="bg-[#133c2e] pt-16 pb-8 text-white border-t border-white/10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Bio */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-black tracking-tighter text-white">لقمان للتسويق العقاري</span>
            </Link>
            <p className="text-white/80 mb-6 leading-relaxed text-sm">
              وسيط عقاري مرخص يعمل لمصلحتك.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c9a84c] hover:text-[#133c2e] transition-all text-white shadow-sm">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#c9a84c]">روابط سريعة</h4>
            <ul className="space-y-4 text-sm">
              {[
                { name: 'الرئيسية', path: '/' },
                { name: 'العقارات', path: '/properties' },
                { name: 'المشاريع', path: '/projects' },
                { name: 'من نحن', path: '/about' },
                { name: 'تواصل معنا', path: '/contact' }
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.path}
                    className="text-white/80 hover:text-[#c9a84c] transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#c9a84c]">تواصل معنا</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-4">
                <MapPin className="text-[#c9a84c] shrink-0 w-5 h-5" />
                <span className="text-white/80">{companyInfo.address}</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-[#c9a84c] shrink-0 w-5 h-5" />
                <span className="text-white/80">{companyInfo.email}</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-[#c9a84c] shrink-0 w-5 h-5" />
                <span className="text-white/80 ltr">{companyInfo.phone}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#c9a84c]">النشرة الإخبارية</h4>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">اشترك لتصلك أحدث العروض والمشاريع الحصرية.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm flex-1 outline-none focus:border-[#c9a84c] text-white placeholder-white/50 transition-all" 
              />
              <button className="bg-[#c9a84c] text-[#133c2e] px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#b8973b] transition-all">
                اشترك
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/60 text-sm">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لمنصة لقمان العقارية</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#c9a84c] transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-[#c9a84c] transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
