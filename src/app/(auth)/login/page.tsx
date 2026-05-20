"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginSchema } from "@/lib/Schemas/Loginschema";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    login(data);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--bg)" }}
      dir="rtl"
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl p-8"
        style={{ boxShadow: "var(--shadow-sleek-lg)" }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-black"
            style={{ color: "var(--secondary)" }}
          >
            لقمان
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            للتسويق العقاري
          </p>
          <div
            className="w-16 h-1 mx-auto mt-3 rounded-full"
            style={{ background: "var(--secondary)" }}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              placeholder="example@company.sa"
              {...register("email")}
              className="w-full px-4 py-3 rounded-xl border outline-none text-right"
              style={{
                borderColor: errors.email ? "var(--error)" : "var(--border)",
                background: "var(--bg)",
              }}
            />
            {errors.email && (
              <p className="text-xs mt-1" style={{ color: "var(--error)" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full px-4 py-3 rounded-xl border outline-none text-right"
              style={{
                borderColor: errors.password ? "var(--error)" : "var(--border)",
                background: "var(--bg)",
              }}
            />
            {errors.password && (
              <p className="text-xs mt-1" style={{ color: "var(--error)" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary w-full py-3"
            style={{ opacity: isPending ? 0.7 : 1 }}
          >
            {isPending ? "جاري التحقق..." : "دخول"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            مطور جديد؟{" "}
            <Link
              href="/register"
              className="font-bold"
              style={{ color: "var(--secondary)" }}
            >
              سجّل الآن
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
