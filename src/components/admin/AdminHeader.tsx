'use client'
import { usePathname } from 'next/navigation'
import { Bell, Menu, Search } from 'lucide-react'

const pageNames: Record<string, string> = {
  '/admin/dashboard':  'الرئيسية',
  '/admin/properties': 'إدارة العقارات',
  '/admin/projects':   'إدارة المشاريع',
  '/admin/approvals':  'طلبات الموافقة',
  '/admin/developers': 'إدارة المطورين',
  '/admin/contacts':   'طلبات التواصل',
  '/admin/blog':       'المدونة',
  '/admin/settings':   'الإعدادات',
}

export default function AdminHeader() {
  const pathname = usePathname()
  
  let title = 'لوحة التحكم'
  const matchedKey = Object.keys(pageNames).find(key => pathname === key || (pathname && pathname.startsWith(key + '/')))
  if (matchedKey) {
    title = pageNames[matchedKey]
  }

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500 hover:text-[var(--primary)]">
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-bold text-[var(--text)]">{title}</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="بحث سريع..." 
            className="bg-gray-100 rounded-full py-2 pr-10 pl-4 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </div>
        
        <button className="relative text-gray-500 hover:text-[var(--primary)] transition-colors">
          <Bell size={24} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 border-r border-gray-200 pr-6">
          <div className="text-left hidden sm:block">
            <p className="text-sm font-bold text-[var(--text)]">مرحباً، المدير العام</p>
            <p className="text-xs text-gray-500">مدير النظام</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-lg">
            م
          </div>
        </div>
      </div>
    </header>
  )
}
