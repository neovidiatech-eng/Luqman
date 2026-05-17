'use client'
import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  Clock
} from 'lucide-react'
import { companyInfo } from '@/lib/mock-data'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8 text-primary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Bio */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-black text-primary tracking-tighter">لقمان <span className="text-secondary">العقاري</span></span>
            </Link>
            <p className="text-text-muted mb-6 leading-relaxed text-xs font-bold">
              شريككم الموثوق في البحث عن العقارات في المملكة العربية السعودية. نوفر حلولاً عقارية متكاملة تلبي تطلعاتكم وتضمن استثماراتكم.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-bg flex items-center justify-center hover:bg-secondary hover:text-primary transition-all text-primary shadow-sm">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-primary">روابط سريعة</h4>
            <ul className="space-y-3 text-[11px] font-bold">
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
                    className="text-text-muted hover:text-secondary transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-primary">تواصل معنا</h4>
            <ul className="space-y-4 text-[11px]">
              <li className="flex gap-4">
                <MapPin className="text-secondary shrink-0 w-4 h-4" />
                <span className="text-text-muted font-bold">{companyInfo.address}</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-secondary shrink-0 w-4 h-4" />
                <span className="text-text-muted font-bold">{companyInfo.email}</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-secondary shrink-0 w-4 h-4" />
                <span className="text-text-muted font-bold ltr">{companyInfo.phone}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-primary">النشرة الإخبارية</h4>
            <p className="text-text-muted text-[11px] mb-6 font-bold leading-relaxed">اشترك لتصلك أحدث العروض والمشاريع الحصرية.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                className="bg-bg border border-border rounded-lg px-4 py-2 text-xs flex-1 outline-none focus:border-secondary shadow-inner" 
              />
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all">
                اشترك
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-text-muted text-[10px] font-black uppercase tracking-[0.1em]">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لمنصة لقمان العقارية</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-secondary transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-secondary transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
