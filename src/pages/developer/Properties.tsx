"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Plus, Search, Filter, Edit2, Trash2, Eye, MapPin, Building2, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import StatusBadge from '@/components/developer/StatusBadge'
import ConfirmModal from '@/components/shared/ConfirmModal'
import { useToast } from '@/components/shared/Toast'
import { mockProperties, propertyTypes, saudiCities } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'

export default function Properties() {
  const [properties, setProperties] = useState(mockProperties)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null)
  const { showToast } = useToast()

  const handleDeleteClick = (id: string) => {
    setPropertyToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (propertyToDelete) {
      setProperties(properties.filter(p => p.id !== propertyToDelete))
      showToast('تم حذف العقار بنجاح', 'success')
      setIsDeleteModalOpen(false)
      setPropertyToDelete(null)
    }
  }

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.approvalStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-[var(--primary)] mb-2">إدارة العقارات</h1>
          <p className="text-[var(--text-muted)] font-medium">يمكنك إضافة، تعديل ومتابعة حالة عقاراتك هنا</p>
        </div>
        <Link 
          href="/developer/properties/add"
          className="bg-[var(--primary)] text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all"
        >
          <Plus size={20} />
          <span>إضافة عقار جديد</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--border)] grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 bg-[var(--bg)] px-4 py-2.5 rounded-xl border border-[var(--border)] focus-within:border-[var(--secondary)] transition-all md:col-span-1">
          <Search size={18} className="text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="بحث بالاسم..." 
            className="bg-transparent border-none outline-none text-sm w-full font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative group">
          <select 
            className="w-full h-full bg-[var(--bg)] px-4 py-2.5 rounded-xl border border-[var(--border)] appearance-none text-sm font-bold text-[var(--primary)] outline-none focus:border-[var(--secondary)] transition-all cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">كل الحالات</option>
            <option value="approved">منشور (مقبول)</option>
            <option value="pending">قيد المراجعة</option>
            <option value="rejected">مرفوض</option>
          </select>
          <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]" />
        </div>

        <div className="relative group">
          <select className="w-full h-full bg-[var(--bg)] px-4 py-2.5 rounded-xl border border-[var(--border)] appearance-none text-sm font-bold text-[var(--primary)] outline-none focus:border-[var(--secondary)] transition-all cursor-pointer">
            <option value="">كل الأنواع</option>
            {propertyTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]" />
        </div>

        <div className="relative group">
          <select className="w-full h-full bg-[var(--bg)] px-4 py-2.5 rounded-xl border border-[var(--border)] appearance-none text-sm font-bold text-[var(--primary)] outline-none focus:border-[var(--secondary)] transition-all cursor-pointer">
            <option value="">كل المدن</option>
            {saudiCities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]" />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]/50 text-[var(--text-muted)] text-[11px] font-black uppercase tracking-widest border-b border-[var(--border)]">
                <th className="px-8 py-5">العقار</th>
                <th className="px-4 py-5">الموقع</th>
                <th className="px-4 py-5">النوع</th>
                <th className="px-4 py-5">السعر</th>
                <th className="px-4 py-5 font-center">الحالة</th>
                <th className="px-4 py-5">التاريخ</th>
                <th className="px-8 py-5 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredProperties.length > 0 ? filteredProperties.map((prop) => (
                <tr key={prop.id} className="group hover:bg-slate-50/70 transition-all duration-300">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-[var(--border)]">
                        <Image src={prop.images[0]} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                        {prop.status === 'sold' && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[10px] font-bold">بـيـع</div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="text-sm font-bold text-[var(--primary)] truncate group-hover:text-[var(--secondary)] transition-colors">{prop.title}</span>
                        <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-medium">
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md">{prop.area} م²</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span>{prop.bedrooms} غرف</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-bold">
                      <MapPin size={14} className="text-[var(--secondary)]" />
                      <span>{prop.city}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--primary)] font-bold">
                      <Building2 size={14} className="opacity-50" />
                      <span>{propertyTypes.find(t => t.value === prop.type)?.label}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-black text-[var(--primary)]">{formatPrice(prop.price)}</span>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={prop.approvalStatus} />
                  </td>
                  <td className="px-4 py-4 text-[10px] text-[var(--text-muted)] font-bold" dir="ltr">
                    {prop.createdAt}
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center justify-center gap-2">
                       <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100" title="معاينة">
                        <Eye size={16} />
                      </button>
                      <Link 
                        href={`/developer/properties/${prop.id}/edit`}
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors border border-amber-100" 
                        title="تعديل"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDeleteClick(prop.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100" 
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center text-[var(--text-muted)] font-bold italic">
                    لا يوجد نتائج تطابق بحثك... جرب كلمات أخرى
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        message="هل أنت متأكد من حذف هذا العقار؟ هذا الإجراء لا يمكن التراجع عنه وسيتم حذفه نهائياً من المنصة."
      />
    </div>
  )
}
