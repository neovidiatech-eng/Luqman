'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { companyInfo } from '@/lib/mock-data'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    // Always visible for now to match the screenshot, or we can keep the scroll logic
    setVisible(true) 
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-8 left-8 z-50 flex flex-col items-center gap-2"
        >
          <div className="bg-[#133c2e] text-white text-xs font-bold px-3 py-1.5 rounded shadow-lg opacity-90">
            عقارك بضغطة زر
          </div>
          <a
            href={`https://wa.me/${companyInfo.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 bg-[#0b7a4d] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform font-bold text-sm"
            aria-label="تواصل عبر واتساب"
          >
            واتس
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
