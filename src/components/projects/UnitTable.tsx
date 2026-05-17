'use client'
import { ProjectUnit } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

interface UnitTableProps {
  units: ProjectUnit[]
}

export default function UnitTable({ units }: UnitTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-border">
      <table className="w-full text-right border-collapse">
        <thead className="bg-bg">
          <tr>
            <th className="p-6 font-black text-primary border-b border-border">نوع الوحدة</th>
            <th className="p-6 font-black text-primary border-b border-border">المساحة</th>
            <th className="p-6 font-black text-primary border-b border-border">السعر</th>
            <th className="p-6 font-black text-primary border-b border-border">الطابق</th>
            <th className="p-6 font-black text-primary border-b border-border">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit, i) => (
            <tr key={i} className="hover:bg-bg/50 transition-colors">
              <td className="p-6 border-b border-gray-100 font-bold">{unit.type}</td>
              <td className="p-6 border-b border-gray-100">{unit.area} م²</td>
              <td className="p-6 border-b border-gray-100 text-secondary font-black">{formatPrice(unit.price)}</td>
              <td className="p-6 border-b border-gray-100">{unit.floor}</td>
              <td className="p-6 border-b border-gray-100">
                <span className={`px-4 py-1 rounded-full text-xs font-bold ${
                  unit.status === 'available' ? 'bg-success/10 text-success' : 
                  unit.status === 'reserved' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                }`}>
                  {unit.status === 'available' ? 'متاح' : unit.status === 'reserved' ? 'محجوز' : 'مباع'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
