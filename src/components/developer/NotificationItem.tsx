"use client"

import React from 'react'
import { CheckCircle2, XCircle, Info, Clock } from 'lucide-react'
import { Notification } from '@/lib/types'
import { timeAgo } from '@/lib/utils'

interface NotificationItemProps {
  notification: Notification
  onRead?: (id: string) => void
}

export default function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const { id, type, title, message, createdAt, isRead } = notification

  const Icon = type === 'approval' ? CheckCircle2 : type === 'rejection' ? XCircle : Info

  return (
    <div 
      onClick={() => onRead?.(id)}
      className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
        isRead ? 'bg-white border-[var(--border)]' : 'bg-[var(--accent)]/10 border-[var(--accent)]'
      }`}
    >
      <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${
        type === 'approval' ? 'bg-emerald-50 text-emerald-600' :
        type === 'rejection' ? 'bg-red-50 text-red-600' :
        'bg-blue-50 text-blue-600'
      }`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-[var(--primary)]">{title}</h4>
          <span className="text-[10px] text-[var(--text-muted)] font-medium flex items-center gap-1">
            <Clock size={10} />
            {timeAgo(createdAt)}
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">{message}</p>
      </div>
    </div>
  )
}
