/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title = 'تأكيد الإجراء',
  message,
  confirmLabel = 'تأكيد',
  cancelLabel = 'إلغاء',
  variant = 'danger'
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onCancel}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden text-right"
          dir="rtl"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-full ${
                variant === 'danger' ? 'bg-red-50 text-red-600' :
                variant === 'warning' ? 'bg-amber-50 text-amber-600' :
                'bg-blue-50 text-blue-600'
              }`}>
                <AlertTriangle className="w-6 h-6" />
              </div>
              <button 
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              {message}
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={onConfirm}
                className={`flex-1 py-3 font-bold rounded-xl transition-all ${
                  variant === 'danger' ? 'bg-red-600 hover:bg-red-700 text-white' :
                  variant === 'warning' ? 'bg-amber-600 hover:bg-amber-700 text-white' :
                  'bg-primary hover:opacity-90 text-white text-[var(--sidebar-text)]'
                }`}
              >
                {confirmLabel}
              </button>
              <button
                onClick={onCancel}
                className="flex-1 py-3 font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all"
              >
                {cancelLabel}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
