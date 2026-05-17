"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Plus, Trash2, Edit2, MapPin, Calendar, Building2, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import StatusBadge from '@/components/developer/StatusBadge'
import ConfirmModal from '@/components/shared/ConfirmModal'
import { useToast } from '@/components/shared/Toast'
import { mockProjects } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'

export default function Projects() {
  const [projects, setProjects] = useState(mockProjects)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
  const { showToast } = useToast()

  const handleDeleteClick = (id: string) => {
    setProjectToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (projectToDelete) {
      setProjects(projects.filter(p => p.id !== projectToDelete))
      showToast('تم حذف المشروع بنجاح', 'success')
      setIsDeleteModalOpen(false)
      setProjectToDelete(null)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-[var(--primary)] mb-2">إدارة المشاريع العقارية</h1>
          <p className="text-[var(--text-muted)] font-medium">مشاريعك الكبرى والكمبوندات السكنية تحت الإنشاء</p>
        </div>
        <Link 
          href="/developer/projects/add"
          className="bg-[var(--primary)] text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all"
        >
          <Plus size={20} />
          <span>إضافة مشروع جديد</span>
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="group bg-white rounded-[2rem] shadow-sm border border-[var(--border)] overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
            {/* Top Image */}
            <div className="relative h-56 overflow-hidden">
              <Image 
                src={project.images[0]} 
                alt={project.name} 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute top-4 left-4">
                <StatusBadge status={project.approvalStatus || 'pending'} />
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 text-[10px] font-bold text-[var(--primary)] shadow-sm">
                <MapPin size={12} className="text-[var(--secondary)]" />
                <span>{project.city}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--primary)] mb-2 group-hover:text-[var(--secondary)] transition-colors">{project.name}</h3>
                <p className="text-xs text-[var(--text-muted)] font-bold line-clamp-2 leading-relaxed h-10">
                  {project.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest flex items-center gap-1">
                    <TrendingUp size={12} className="text-[var(--success)]" />
                    نسبة الإنجاز
                  </span>
                  <span className="text-sm font-black text-[var(--primary)]">{project.completionPercentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-[var(--bg)] rounded-full overflow-hidden border border-[var(--border)] p-0.5">
                  <div 
                    className="h-full bg-[var(--secondary)] rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(201,168,76,0.3)]"
                    style={{ width: `${project.completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-[var(--border)]">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] font-bold">
                    <Users size={12} />
                    <span>الوحدات المتاحة</span>
                  </div>
                  <p className="text-sm font-black text-[var(--primary)]">{project.availableUnits} / {project.totalUnits}</p>
                </div>
                <div className="space-y-1">
                   <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] font-bold">
                    <Calendar size={12} />
                    <span>تاريخ التسليم</span>
                  </div>
                  <p className="text-sm font-black text-[var(--primary)]">{project.deliveryDate}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                 <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[var(--text-muted)]">يبدأ من</span>
                  <span className="text-base font-black text-[var(--primary)]">{formatPrice(project.startingPrice)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-3 bg-[var(--bg)] text-[var(--primary)] rounded-xl border border-[var(--border)] hover:bg-slate-100 transition-all font-bold"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(project.id)}
                    className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 hover:bg-red-100 transition-all font-bold"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
         <div className="py-24 text-center bg-white rounded-[3rem] border border-[var(--border)] border-dashed">
            <Building2 size={64} className="mx-auto text-[var(--border)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--primary)] mb-2">لا يوجد مشاريع حتى الآن</h3>
            <p className="text-[var(--text-muted)] font-medium mb-6">ابدأ بإضافة أول مشروع ضخم لك على المنصة</p>
            <Link href="/developer/projects/add" className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl font-bold">أضف مشروعك الأول</Link>
         </div>
      )}

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        message="هل أنت متأكد من حذف هذا المشروع بالكامل؟ سيتم حذف جميع الوحدات والبيانات المرتبطة به."
      />
    </div>
  )
}
