"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, ArrowLeftRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { companyInfo } from "@/lib/mock-data";

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
    { name: "المدونة", path: "/blog" },
    { name: "من نحن", path: "/about" },
    { name: "اتصل بنا", path: "/contact" },
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
          <div className="text-2xl font-black text-primary tracking-tighter">
            لقمان <span className="text-secondary">العقاري</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-black text-xs uppercase tracking-widest transition-colors ${
                pathname === link.path
                  ? "text-secondary"
                  : "text-primary hover:text-secondary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/admin/login"
            className="px-4 py-2 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all shadow-sm"
          >
            دخول المشرف
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 border border-primary text-primary rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
          >
            بوابة المطور
          </Link>
          <a
            href={`https://wa.me/${companyInfo.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-whatsapp text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all"
          >
            تواصل معنا
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-primary" : pathname === "/" ? "text-white" : "text-primary"}`}
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
                  <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg">
                    <span className="text-secondary font-black text-xl">ل</span>
                  </div>
                  <span className="text-xl font-black text-primary">
                    لقمان العقارية
                  </span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-primary"
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
                      pathname === link.path ? "text-secondary" : "text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                <a
                  href={`https://wa.me/${companyInfo.whatsapp}`}
                  className="flex items-center justify-center gap-2 bg-whatsapp text-white w-full py-4 rounded-xl font-bold text-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>تواصل عبر واتساب</span>
                </a>
                <Link
                  href="/admin/login"
                  className="flex justify-center w-full bg-primary text-white py-4 rounded-xl font-bold text-lg"
                >
                  دخول المشرف
                </Link>
                <Link
                  href="/login"
                  className="flex justify-center w-full border-2 border-primary text-primary py-4 rounded-xl font-bold text-lg"
                >
                  بوابة المطورين
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
