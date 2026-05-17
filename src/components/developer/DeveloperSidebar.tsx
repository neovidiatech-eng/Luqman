"use client"

import React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Home, 
  Layers, 
  Bell, 
  User, 
  LogOut,
  Building2
} from 'lucide-react'
import { mockDeveloper, mockNotifications } from '@/lib/mock-data'

export default function DeveloperSidebar() {
  const unreadCount = mockNotifications.filter(n => !n.isRead).length
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    router.push('/developer/login')
  }

  const menuItems = [
    { label: 'الداشبورد', path: '/developer/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'عقاراتي', path: '/developer/properties', icon: <Home size={20} /> },
    { label: 'مشاريعي', path: '/developer/projects', icon: <Layers size={20} /> },
    { 
      label: 'الإشعارات', 
      path: '/developer/notifications', 
      icon: <Bell size={20} />,
      badge: unreadCount > 0 ? unreadCount : null
    },
    { label: 'ملفي الشخصي', path: '/developer/profile', icon: <User size={20} /> },
  ]

  return (
    <aside 
      className="fixed top-0 right-0 h-screen w-[260px] bg-[var(--sidebar-bg)] flex flex-col z-50 text-white border-l border-white/10"
    >
      {/* Brand */}
      <div className="p-8 border-b border-white/10">
        <h1 className="text-2xl font-bold text-[var(--secondary)] mb-1">لقمان</h1>
        <p className="text-[10px] opacity-80 font-medium">{mockDeveloper.companyName}</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-6 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.path || pathname?.startsWith(item.path + '/')
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                flex items-center gap-3 px-6 py-3 mx-3 my-1 rounded-lg transition-all text-[0.95rem]
                ${isActive 
                  ? 'bg-[var(--secondary)] text-white' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-[var(--secondary)] text-white text-[10px] px-2 py-0.5 rounded-lg">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-6">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-6 py-3 rounded-xl text-red-300 hover:bg-red-400/10 transition-colors text-sm font-medium"
        >
          <LogOut size={18} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  )
}
