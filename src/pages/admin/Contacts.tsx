'use client'
import { useState } from 'react'
import { Search, Mail, Phone, Calendar, Check, Trash2, Eye } from 'lucide-react'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'
import ConfirmModal from '@/components/shared/ConfirmModal'
import { showToast } from '@/components/shared/Toast'
import { mockContactRequests } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function Contacts() {
  const [contacts, setContacts] = useState(mockContactRequests)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<any>(null)

  const filteredContacts = contacts.filter(c => {
    const matchSearch = c.name.includes(searchTerm) || c.email.includes(searchTerm) || c.phone.includes(searchTerm)
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      setContacts(prev => prev.filter(c => c.id !== itemToDelete))
      showToast('تم حذف طلب التواصل بنجاح', 'success')
    }
    setDeleteModalOpen(false)
    setItemToDelete(null)
  }

  const handleView = (contact: any) => {
    setSelectedContact(contact)
    setViewModalOpen(true)
    if (contact.status === 'new') {
      setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, status: 'read' as any } : c))
    }
  }

  const markAsReplied = (id: string) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status: 'replied' as any } : c))
    showToast('تم تحديد الطلب كـ "تم الرد"', 'success')
    setViewModalOpen(false)
  }

  const columns = [
    {
      header: 'المرسل',
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold">
            {item.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-sm text-[var(--text)]">{item.name}</p>
            <p className="text-xs text-gray-500">{item.propertyId ? 'استفسار عن عقار' : 'استفسار عام'}</p>
          </div>
        </div>
      )
    },
    {
      header: 'معلومات التواصل',
      render: (item: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={14} className="text-gray-400" /> <span dir="ltr">{item.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={14} className="text-gray-400" /> <span dir="ltr">{item.phone}</span>
          </div>
        </div>
      )
    },
    {
      header: 'تاريخ الطلب',
      render: (item: any) => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={14} className="text-gray-400" />
          <span>{formatDate(item.createdAt)}</span>
        </div>
      )
    },
    {
      header: 'الحالة',
      render: (item: any) => <StatusBadge status={item.status} />
    },
    {
      header: 'إجراءات',
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleView(item)}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="عرض التفاصيل"
          >
            <Eye size={18} />
          </button>
          {item.status !== 'replied' && (
            <button 
              onClick={() => markAsReplied(item.id)}
              className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
              title="تحديد كتم الرد"
            >
              <Check size={18} />
            </button>
          )}
          <button 
            onClick={() => handleDeleteClick(item.id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
            title="حذف الطلب"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="بحث بالاسم، البريد، الجوال..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-[var(--primary)] sm:w-48"
          >
            <option value="all">كل الحالات</option>
            <option value="new">جديد</option>
            <option value="read">تمت القراءة</option>
            <option value="replied">تم الرد</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable 
          data={filteredContacts}
          columns={columns}
          keyExtractor={item => item.id}
        />
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>
            عرض 1 إلى {Math.min(10, filteredContacts.length)} من {filteredContacts.length} طلب
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>السابق</button>
            <button className="px-3 py-1 bg-[var(--primary)] text-white rounded">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>التالي</button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="حذف طلب التواصل"
        message="هل أنت متأكد من رغبتك في حذف هذا الطلب؟ هذا الإجراء لا يمكن التراجع عنه."
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false)
          setItemToDelete(null)
        }}
        confirmLabel="حذف نهائياً"
      />

      {viewModalOpen && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
              <div>
                <h3 className="font-bold text-lg text-[var(--text)] mb-1">تفاصيل طلب التواصل</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar size={12} /> {formatDate(selectedContact.createdAt)}
                </p>
              </div>
              <StatusBadge status={selectedContact.status} />
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-white border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  {selectedContact.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[var(--text)]">{selectedContact.name}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                    <span dir="ltr" className="flex items-center gap-1"><Phone size={12} className="text-blue-400" /> {selectedContact.phone}</span>
                    <span dir="ltr" className="flex items-center gap-1"><Mail size={12} className="text-blue-400" /> {selectedContact.email}</span>
                  </div>
                </div>
              </div>

              {selectedContact.propertyId && (
                <div className="text-sm p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                  <span className="text-gray-500">رقم مرجع العقار المرتبط: </span>
                  <Link href={`/admin/properties/${selectedContact.propertyId}/edit`} className="font-mono font-medium text-[var(--primary)] hover:underline">
                    {selectedContact.propertyId}
                  </Link>
                </div>
              )}

              <div>
                <h4 className="font-bold text-sm text-[var(--text)] mb-2 flex items-center gap-2">
                  <Mail size={16} className="text-[var(--primary)]" /> نص الرسالة:
                </h4>
                <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-700 whitespace-pre-wrap leading-relaxed border border-gray-100">
                  {selectedContact.message}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-between gap-3 bg-gray-50/80">
              <button 
                onClick={() => setViewModalOpen(false)}
                className="px-4 py-2 border bg-white rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm"
              >
                إغلاق
              </button>
              <div className="flex gap-2 text-sm">
                <a 
                  href={`mailto:${selectedContact.email}`}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-gray-700 transition-colors"
                >
                  <Mail size={16} /> رد عبر البريد
                </a>
                {selectedContact.status !== 'replied' && (
                  <button 
                    onClick={() => markAsReplied(selectedContact.id)}
                    className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm shadow-[var(--primary)]/20"
                  >
                    <Check size={16} /> تحديد كتم الرد
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
