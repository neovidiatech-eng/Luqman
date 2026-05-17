'use client'
import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { companyInfo } from '@/lib/mock-data'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={`https://wa.me/${companyInfo.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-8 left-8 z-50 bg-whatsapp text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
          aria-label="تواصل عبر واتساب"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="absolute right-full mr-4 bg-white text-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            تحدث معنا الآن
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
