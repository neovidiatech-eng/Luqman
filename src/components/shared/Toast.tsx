'use client'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, AlertCircle, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: -50 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        "fixed bottom-8 left-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl min-w-[300px]",
        type === 'success' ? "bg-white text-primary border-r-4 border-success" : "bg-white text-primary border-r-4 border-error"
      )}
    >
      {type === 'success' ? (
        <CheckCircle className="text-success w-6 h-6" />
      ) : (
        <AlertCircle className="text-error w-6 h-6" />
      )}
      <p className="font-bold flex-1">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
        <X className="w-4 h-4 text-gray-400" />
      </button>
    </motion.div>
  )
}

// Utility to handle toast state globally if needed, but for now we'll pass props
import { cn } from '@/lib/utils'

export function useToast() {
  const showToast = (message: string, type: 'success' | 'error') => {
    // Basic fallback since ToastProvider is not yet implemented
    alert(message)
  }
  
  return { showToast }
}

export const showToast = (message: string, type: 'success' | 'error') => {
  alert(message)
}
