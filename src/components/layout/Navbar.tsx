"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { companyInfo } from "@/lib/mock-data";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "العقارات", path: "/properties" },
    { name: "المشاريع", path: "/projects" },
    { name: "من نحن", path: "/about" },
    { name: "المدونة", path: "/blog" },
    { name: "تواصل معنا", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white border-b border-border ${
        scrolled ? "py-3 shadow-md" : "py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
        <img src="logo.webp" alt="logo" width={60} height={60}/>
          <div className="text-lg font-black text-[#133c2e] tracking-tighter flex items-center gap-2">
            لقمان
           </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-bold text-sm transition-colors ${
                pathname === link.path
                  ? "text-[#133c2e]"
                  : "text-[#133c2e]/80 hover:text-[#133c2e]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3">
          
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-[#c9a84c] text-[#133c2e] rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md hover:bg-[#b8973b]"
          >
            عقارك بضغطة زر
          </Link>
          <Link
            href="/login"
            className="px-5 py-2.5 border border-[#133c2e] text-[#133c2e] rounded-xl text-sm font-bold transition-all hover:bg-[#133c2e] hover:text-white flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            تسجيل الدخول
          </Link>
          
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-2 rounded-lg text-[#133c2e]`}
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-8 h-8" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-70 p-8 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl font-black text-[#133c2e]">
                    لقمان العقارية
                  </span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#133c2e]"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-xl font-bold ${
                      pathname === link.path ? "text-[#c9a84c]" : "text-[#133c2e]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                <Link
                  href="/login"
                  className="flex justify-center items-center gap-2 w-full border-2 border-[#133c2e] text-[#133c2e] py-4 rounded-xl font-bold text-lg"
                >
                  <LogIn className="w-5 h-5" />
                  تسجيل الدخول
                </Link>
                <Link
                  href="/contact"
                  className="flex justify-center w-full bg-[#c9a84c] text-[#133c2e] py-4 rounded-xl font-bold text-lg"
                >
                  عقارك بضغطة زر
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
