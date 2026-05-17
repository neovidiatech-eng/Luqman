"use client";
import { useState } from "react";
import Link from "next/link";

export default function DeveloperRegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "var(--bg)" }}
        dir="rtl"
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--primary)" }}
          >
            تم إرسال طلبك!
          </h2>
          <p style={{ color: "var(--text-muted)" }} className="mb-6">
            سيتم مراجعة طلبك خلال 24 ساعة وسيصلك إشعار على بريدك الإلكتروني.
          </p>
          <Link
            href="/"
            className="block py-3 rounded-xl text-white font-bold mb-2"
            style={{ background: "var(--primary)" }}
          >
            العودة للرئيسية
          </Link>
          <Link
            href="/login"
            className="block py-3 rounded-xl font-bold border"
            style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--bg)" }}
      dir="rtl"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1
            className="text-3xl font-black"
            style={{ color: "var(--secondary)" }}
          >
            لقمان
          </h1>
          <p className="font-semibold mt-1" style={{ color: "var(--primary)" }}>
            إنشاء حساب مطور عقاري
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              k: "companyName",
              l: "اسم الشركة",
              t: "text",
              p: "مجموعة ... للتطوير",
            },
            {
              k: "email",
              l: "البريد الإلكتروني",
              t: "email",
              p: "info@company.sa",
            },
            { k: "phone", l: "رقم الجوال", t: "tel", p: "05xxxxxxxx" },
            { k: "password", l: "كلمة المرور", t: "password", p: "••••••••" },
          ].map((f) => (
            <div key={f.k}>
              <label className="block text-sm font-medium mb-1">{f.l}</label>
              <input
                type={f.t}
                placeholder={f.p}
                required
                value={form[f.k as keyof typeof form]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [f.k]: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border text-right outline-none"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg)",
                }}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">
              السجل التجاري
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              className="w-full px-4 py-3 rounded-xl border"
              style={{ borderColor: "var(--border)", background: "var(--bg)" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-bold"
            style={{
              background: loading ? "var(--text-muted)" : "var(--primary)",
            }}
          >
            {loading ? "جاري الإرسال..." : "إنشاء الحساب"}
          </button>
        </form>

        <p
          className="text-center text-sm mt-4"
          style={{ color: "var(--text-muted)" }}
        >
          لديك حساب؟{" "}
          <Link
            href="/login"
            className="font-bold"
            style={{ color: "var(--secondary)" }}
          >
            سجّل دخول
          </Link>
        </p>
      </div>
    </div>
  );
}
