"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0F172A] px-6">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

      {/* Animated Container */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 12,
          }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/15"
        >
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-4 text-4xl font-black tracking-tight text-white"
        >
          حدث خطأ غير متوقع
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-6 leading-8 text-slate-300"
        >
          نعتذر، حدثت مشكلة أثناء تحميل الصفحة أو البيانات.
          <br />
          يمكنك إعادة المحاولة أو العودة للرئيسية.
        </motion.p>

        {/* Error Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-right"
        >
          <p className="mb-2 text-sm font-bold text-red-400">تفاصيل الخطأ:</p>

          <p className="break-words text-sm text-slate-300">
            {error.message || "حدث خطأ غير معروف"}
          </p>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Retry */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => reset()}
            className="flex items-center gap-2 rounded-2xl bg-red-500 px-6 py-3 font-bold text-white shadow-lg shadow-red-500/30 transition-all hover:bg-red-600"
          >
            <RefreshCcw className="h-5 w-5" />
            إعادة المحاولة
          </motion.button>

          {/* Home */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white transition-all hover:bg-white/10"
            >
              <Home className="h-5 w-5" />
              العودة للرئيسية
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
