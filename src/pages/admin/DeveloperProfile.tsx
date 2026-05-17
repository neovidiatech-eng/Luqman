'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mail, Phone, FileText, Calendar, Building, Eye } from 'lucide-react'
import { mockDevelopers, mockProperties } from '@/lib/mock-data'
import StatusBadge from '@/components/admin/StatusBadge'
import DataTable from '@/components/admin/DataTable'
import { formatDate, formatPrice } from '@/lib/utils'

export default function DeveloperProfile({ id }: { id: string }) {
  const [developer, setDeveloper] = useState<any>(null)
  
  useEffect(() => {
    const found = mockDevelopers.find(d => d.id === id)
    if (found) setDeveloper(found)
  }, [id])

  if (!developer) return <div className="p-8 text-center text-gray-500">جاري التحميل...</div>

  const devProperties = mockProperties.filter(p => p.developerId === id)

  const columns = [
    {
      header: 'العقار',
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded overflow-hidden shrink-0 border border-gray-100">
            <Image src={item.images[0]} alt={item.title} fill className="object-cover" sizes="40px" />
          </div>
          <div className="max-w-[200px]">
            <p className="font-bold text-sm text-[var(--text)] truncate" title={item.title}>{item.title}</p>
            <p className="text-xs text-gray-500 truncate">{item.district}، {item.city}</p>
          </div>
        </div>
      )
    },
    {
      header: 'النوع',
      render: (item: any) => <span className="text-sm font-medium">{item.type}</span>
    },
    {
      header: 'السعر',
      render: (item: any) => <span className="font-bold text-[var(--secondary)]">{formatPrice(item.price)}</span>
    },
    {
      header: 'الحالة',
      render: (item: any) => <StatusBadge status={item.status} />
    },
    {
      header: 'تاريخ الإضافة',
      render: (item: any) => <span className="text-sm text-gray-500">{formatDate(item.createdAt)}</span>
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/developers" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-500 transition-colors">
          <ArrowRight size={20} />
        </Link>
        <h2 className="text-xl font-bold text-[var(--text)]">ملف المطور</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-50">
              <Image src={developer.logo} alt={developer.companyName} fill className="object-cover" sizes="96px" />
            </div>
            <h3 className="font-bold text-xl text-[var(--text)] mb-2">{developer.companyName}</h3>
            <div className="mb-4">
              <StatusBadge status={developer.accountStatus} />
            </div>
            
            <div className="flex justify-center gap-2 mb-6">
              <a href={`mailto:${developer.email}`} className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                <Mail size={18} />
              </a>
              <a href={`tel:${developer.phone}`} className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                <Phone size={18} />
              </a>
            </div>

            <div className="space-y-4 text-sm text-right border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-gray-400" />
                <div>
                  <p className="text-gray-500">السجل التجاري</p>
                  <p className="font-mono font-medium text-[var(--text)]">{developer.commercialRegister}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-400" />
                <div>
                  <p className="text-gray-500">البريد الإلكتروني</p>
                  <p className="font-medium text-[var(--text)]" dir="ltr">{developer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gray-400" />
                <div>
                  <p className="text-gray-500">رقم الهاتف</p>
                  <p className="font-medium text-[var(--text)]" dir="ltr">{developer.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-gray-400" />
                <div>
                  <p className="text-gray-500">تاريخ الانضمام</p>
                  <p className="font-medium text-[var(--text)]">{formatDate(developer.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <Building size={20} />
              </div>
              <p className="text-2xl font-bold text-[var(--primary)]">{developer.totalProperties}</p>
              <p className="text-xs text-gray-500 font-medium">إجمالي العقارات</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                <Eye size={20} />
              </div>
              <p className="text-2xl font-bold text-[var(--primary)]">{developer.totalViews}</p>
              <p className="text-xs text-gray-500 font-medium">إجمالي المشاهدات</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-[var(--text)]">عقارات المطور</h3>
            </div>
            <DataTable 
              data={devProperties}
              columns={columns}
              keyExtractor={item => item.id}
            />
            {devProperties.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                لا توجد عقارات مضافة لهذا المطور
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
