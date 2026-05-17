"use client";
import React from "react";
import { motion } from "motion/react";
import { Home, Search, MessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-luxury-navy flex items-center justify-center p-6 sm:p-12 overflow-hidden relative"
      dir="rtl"
    >
      {/* Background Radiant Glows */}
      <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-luxury-gold rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-250px] left-[-150px] w-[600px] h-[600px] bg-luxury-navy-light rounded-full blur-[120px] opacity-40 pointer-events-none" />

      {/* Subtle Background Graphic */}
      <div className="absolute top-[10%] right-[10%] opacity-5 pointer-events-none hidden lg:block">
        <svg
          width="400"
          height="400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
        >
          <path d="M3 21h18M3 10l9-7 9 7v11H3V10z" />
          <path d="M9 21V12h6v9" />
        </svg>
      </div>

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl w-full bg-glass backdrop-blur-[30px] border border-glass-border rounded-[48px] p-10 md:p-16 shadow-luxury flex flex-col items-center text-center relative z-10"
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-10 opacity-90 transition-opacity hover:opacity-100 cursor-default">
          <div className="w-10 h-10 bg-luxury-gold rounded-lg rotate-45 flex items-center justify-center shadow-lg">
            <div className="w-5 h-5 border-2 border-luxury-navy -rotate-45" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            لقمان للتسويق العقاري
          </span>
        </div>

        {/* 404 Display */}
        <div className="relative mb-8">
          <h1 className="text-[120px] md:text-[160px] font-extrabold leading-none tracking-tighter bg-linear-to-br from-white to-luxury-gold bg-clip-text text-transparent select-none">
            404
          </h1>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-luxury-gold rounded-full" />
        </div>

        {/* Messaging */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            عفواً، الصفحة التي تبحث عنها غير موجودة
          </h2>
          <p className="text-lg text-white/60 max-w-lg leading-relaxed mx-auto">
            ربما تم نقل العقار أو انتهت صلاحية الرابط. دعنا نساعدك في العودة
            للمسار الصحيح للعثور على منزلك المثالي.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <a
            href="/"
            className="group px-9 py-4 bg-luxury-gold text-luxury-navy rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
          >
            <Home size={20} className="stroke-[2.5]" />
            العودة للرئيسية
          </a>
          <a
            href="/properties"
            className="group px-9 py-4 border-2 border-luxury-gold text-luxury-gold rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:bg-luxury-gold/5 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
          >
            <Search size={20} className="stroke-[2.5]" />
            تصفح العقارات
          </a>
        </div>
      </motion.div>

      {/* WhatsApp Floating FAB */}
      <motion.a
        href="https://wa.me/your-number"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-10 left-10 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform active:scale-95 z-50"
      >
        <MessageSquare fill="currentColor" className="w-8 h-8" />
      </motion.a>
    </div>
  );
}
