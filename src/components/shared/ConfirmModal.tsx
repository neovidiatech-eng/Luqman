'use client'
import { X } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  title?: string
  message: React.ReactNode
  onConfirm: () => void
  onCancel: () => void
  confirmLabel?: string
  confirmColor?: string
}

export default function ConfirmModal({
  isOpen, title = 'تأكيد الإجراء', message, onConfirm, onCancel,
  confirmLabel = 'تأكيد', confirmColor = 'var(--error)'
}: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="font-bold text-lg">{title}</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 text-gray-600 text-sm">
          {message}
        </div>
        <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white hover:bg-gray-100 transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-lg text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: confirmColor }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
