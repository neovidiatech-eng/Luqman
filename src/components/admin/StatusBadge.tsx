interface StatusBadgeProps {
  status: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig: Record<string, { label: string, bg: string, text: string }> = {
    pending: { label: 'قيد المراجعة', bg: '#FEF3C7', text: '#92400E' },
    approved: { label: 'معتمد', bg: '#D1FAE5', text: '#065F46' },
    rejected: { label: 'مرفوض', bg: '#FEE2E2', text: '#B91C1C' },
    available: { label: 'متاح', bg: '#D1FAE5', text: '#065F46' },
    reserved: { label: 'محجوز', bg: '#FFEDD5', text: '#C2410C' },
    sold: { label: 'مباع', bg: '#F3F4F6', text: '#374151' },
    under_construction: { label: 'قيد الإنشاء', bg: '#DBEAFE', text: '#1E40AF' },
    completed: { label: 'مكتمل', bg: '#D1FAE5', text: '#065F46' },
    development: { label: 'قيد التطوير', bg: '#FEF3C7', text: '#92400E' },
    new: { label: 'جديد', bg: '#FEE2E2', text: '#B91C1C' },
    contacted: { label: 'تم التواصل', bg: '#DBEAFE', text: '#1E40AF' },
    closed: { label: 'مغلق', bg: '#F3F4F6', text: '#374151' },
    active: { label: 'نشط', bg: '#D1FAE5', text: '#065F46' },
    suspended: { label: 'موقوف', bg: '#FEE2E2', text: '#B91C1C' },
  }

  const config = statusConfig[status] || { label: status, bg: '#F3F4F6', text: '#374151' }

  return (
    <span 
      className="px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  )
}
