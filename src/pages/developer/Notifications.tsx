"use client"

import React, { useState } from 'react'
import { Bell, CheckCircle2, XCircle, Info, ChevronLeft, ArrowRight } from 'lucide-react'
import { mockNotifications } from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'approval' | 'rejection'>('all')

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  const filtered = notifications.filter(n => {
    if (activeTab === 'unread') return !n.isRead
    if (activeTab === 'approval') return n.type === 'approval'
    if (activeTab === 'rejection') return n.type === 'rejection'
    return true
  })

  const tabs = [
    { id: 'all', label: 'كل التنبيهات' },
    { id: 'unread', label: 'غير المقروءة' },
    { id: 'approval', label: 'القبول' },
    { id: 'rejection', label: 'الرفض' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[var(--primary)] mb-1">مركز الإشعارات</h1>
          <p className="text-[var(--text-muted)] font-medium">تابع حالة عقاراتك وطلبات المراجعة أولاً بأول</p>
        </div>
        <button 
          onClick={() => setNotifications(notifications.map(n => ({ ...n, isRead: true })))}
          className="text-xs font-bold text-[var(--secondary)] hover:underline"
        >
          تعليم الكل كمقروء
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-1 rounded-2xl shadow-sm border border-[var(--border)] overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shrink-0 ${
              activeTab === tab.id 
                ? 'bg-[var(--primary)] text-white shadow-lg shadow-blue-900/10' 
                : 'text-[var(--text-muted)] hover:bg-[var(--bg)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.length > 0 ? filtered.map((notif) => (
          <div 
            key={notif.id}
            onClick={() => markAsRead(notif.id)}
            className={`group relative p-6 rounded-3xl border transition-all cursor-pointer overflow-hidden ${
              notif.isRead 
                ? 'bg-white border-[var(--border)] hover:border-slate-300' 
                : 'bg-[var(--accent)]/20 border-[var(--accent)] shadow-sm'
            }`}
          >
            {!notif.isRead && (
              <div className="absolute top-0 right-0 w-1.5 h-full bg-[var(--secondary)]" />
            )}
            
            <div className="flex gap-6">
              <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                notif.type === 'approval' ? 'bg-emerald-100 text-emerald-600' :
                notif.type === 'rejection' ? 'bg-red-100 text-red-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {notif.type === 'approval' ? <CheckCircle2 size={28} /> : 
                 notif.type === 'rejection' ? <XCircle size={28} /> : 
                 <Info size={28} />}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-[var(--primary)]">{notif.title}</h3>
                  <span className="text-[10px] font-bold text-[var(--text-muted)] bg-[var(--bg)] px-3 py-1 rounded-full uppercase tracking-widest leading-none flex items-center h-fit">
                    {timeAgo(notif.createdAt)}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-2xl">
                  {notif.message}
                </p>
                {notif.propertyTitle && (
                  <div className="flex items-center gap-2 pt-2 group-hover:gap-4 transition-all">
                    <span className="text-xs font-bold text-[var(--secondary)]">عرض صفحة العقار</span>
                    <ArrowRight size={14} className="text-[var(--secondary)]" />
                  </div>
                )}
              </div>

              <div className="hidden lg:flex items-center">
                <ChevronLeft size={20} className="text-[var(--border)] group-hover:text-[var(--secondary)] transition-colors" />
              </div>
            </div>
          </div>
        )) : (
          <div className="py-24 text-center bg-white rounded-3xl border border-[var(--border)] border-dashed">
            <Bell size={48} className="mx-auto text-[var(--border)] mb-4" />
            <p className="text-[var(--text-muted)] font-bold italic">لا يوجد إشعارات جديدة في هذا القسم...</p>
          </div>
        )}
      </div>
    </div>
  )
}
