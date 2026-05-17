/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

type Status = 'pending' | 'approved' | 'rejected' | 'available' | 'reserved' | 'sold'

const config: Record<Status, { label: string; bg: string; text: string }> = {
  approved:  { label: 'منشور',       bg: '#D1FAE5', text: '#065F46' },
  pending:   { label: 'قيد المراجعة', bg: '#FEF3C7', text: '#92400E' },
  rejected:  { label: 'مرفوض',       bg: '#FEE2E2', text: '#991B1B' },
  available: { label: 'متاح',        bg: '#D1FAE5', text: '#065F46' },
  reserved:  { label: 'محجوز',       bg: '#FEF3C7', text: '#92400E' },
  sold:      { label: 'مباع',        bg: '#E5E7EB', text: '#374151' },
}

interface StatusBadgeProps {
  status: Status
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, bg, text } = config[status] || { label: status, bg: '#E5E7EB', text: '#374151' }

  return (
    <span 
      className="px-3 py-1 rounded-full text-xs font-bold inline-block"
      style={{ backgroundColor: bg, color: text }}
    >
      {label}
    </span>
  )
}
