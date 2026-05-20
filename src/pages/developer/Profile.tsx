"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Save,
  Mail,
  Phone,
  Lock,
  Building2,
  Calendar,
  CheckCircle2,
  Upload,
  Loader2,
  FileText,
  ExternalLink,
  Shield,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetDeveloperProfile,
  useUpdateDeveloperProfile,
  useChangePassword,
} from "@/hooks/deveoper/Useprofile";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const ProfileSkeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-8 rounded-[2rem] border border-[var(--border)] flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-gray-100" />
          <div className="h-5 bg-gray-100 rounded w-2/3" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="w-full grid grid-cols-2 gap-2">
            <div className="h-16 bg-gray-100 rounded-2xl" />
            <div className="h-16 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="bg-white p-10 rounded-[2rem] border border-[var(--border)] space-y-6">
          <div className="h-6 bg-gray-100 rounded w-1/3" />
          <div className="h-12 bg-gray-100 rounded-2xl" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-100 rounded-2xl" />
            <div className="h-12 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function Profile() {
  const { data: profile, isLoading } = useGetDeveloperProfile();
  const { mutate: updateProfile, isPending: updating } =
    useUpdateDeveloperProfile();
  const { mutate: changePasswordMutate, isPending: changingPassword } =
    useChangePassword();

  const logoInputRef = useRef<HTMLInputElement>(null);
  const regFileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    companyName: "",
    email: "",
    phone: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [regFile, setRegFile] = useState<File | null>(null);

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        companyName: profile.companyName ?? "",
        email: profile.email ?? "",
        phone: profile.phone ?? "",
      });
    }
  }, [profile]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleRegFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setRegFile(file);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("companyName", form.companyName);
    formData.append("phone", form.phone);
    if (logoFile) formData.append("logo", logoFile);
    if (regFile) formData.append("commercialRegFile", regFile);

    updateProfile(formData);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("كلمة المرور الجديدة غير متطابقة");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error("كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    changePasswordMutate(
      {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      },
      {
        onSuccess: () => {
          setPasswordForm({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        },
      },
    );
  };

  if (isLoading) return <ProfileSkeleton />;

  const displayLogo = logoPreview ?? profile?.logoUrl ?? null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div>
        <h1 className="text-2xl font-black text-[var(--primary)] mb-1">
          إعدادات الملف الشخصي
        </h1>
        <p className="text-[var(--text-muted)] font-medium">
          أدر بيانات شركتك وكلمات المرور الخاصة بك
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ─── Sidebar ─── */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Card */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[var(--border)] flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-[var(--accent)] p-1 relative overflow-hidden">
                {displayLogo ? (
                  <Image
                    src={displayLogo}
                    alt=""
                    fill
                    className="rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[var(--bg)] flex items-center justify-center">
                    <Building2 size={40} className="text-[var(--text-muted)]" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="absolute bottom-2 right-2 w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center border-4 border-white hover:scale-110 transition-transform"
              >
                <Upload size={16} />
              </button>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </div>

            <h3 className="text-xl font-black text-[var(--primary)] mb-1">
              {profile?.companyName}
            </h3>
            <span className="text-[10px] font-black text-[var(--success)] bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest mb-6">
              مشاركة برونزية
            </span>

            <div className="w-full grid grid-cols-2 gap-2">
              <div className="bg-[var(--bg)] p-4 rounded-2xl text-center">
                <p className="text-lg font-black text-[var(--primary)]">—</p>
                <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase">
                  عقار
                </p>
              </div>
              <div className="bg-[var(--bg)] p-4 rounded-2xl text-center">
                <p className="text-lg font-black text-[var(--primary)]">
                  ٤.٨ ألف
                </p>
                <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase">
                  مشاهدة
                </p>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="bg-[var(--sidebar-bg)] p-8 rounded-[2rem] shadow-lg text-white space-y-5">
            <h4 className="text-lg font-bold text-[var(--secondary)]">
              ملخص النشاط
            </h4>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-white/40 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-white/40 uppercase">
                  البريد الإلكتروني
                </span>
                <span className="text-sm font-bold truncate" dir="ltr">
                  {profile?.email ?? "—"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-white/40 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white/40 uppercase">
                  رقم التواصل
                </span>
                <span className="text-sm font-bold" dir="ltr">
                  {profile?.phone ?? "—"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-white/40 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white/40 uppercase">
                  تاريخ الانضمام
                </span>
                <span className="text-sm font-bold">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString("ar-EG")
                    : "—"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-white/40 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white/40 uppercase">
                  حالة الحساب
                </span>
                <span className="text-sm font-bold text-[var(--success)]">
                  {profile?.accountStatus === "active"
                    ? "نشط ومعتمد"
                    : profile?.accountStatus}
                </span>
              </div>
            </div>

            {profile?.commercialRegFile && (
              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] font-bold text-white/40 uppercase block mb-2">
                  السجل التجاري
                </span>
                <a
                  href={profile.commercialRegFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors px-4 py-3 rounded-2xl group"
                >
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Shield size={16} className="text-[var(--secondary)]" />
                  </div>
                  <span className="text-sm font-bold flex-1 truncate">
                    عرض الملف
                  </span>
                  <ExternalLink
                    size={15}
                    className="text-white/40 group-hover:text-white transition-colors shrink-0"
                  />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ─── Forms ─── */}
        <div className="lg:col-span-8 space-y-8">
          {/* Company Info */}
          <form
            onSubmit={handleUpdate}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-[var(--border)] space-y-8"
          >
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-6">
              <div className="w-10 h-10 bg-[var(--accent)] text-[var(--primary)] rounded-xl flex items-center justify-center">
                <Building2 size={24} />
              </div>
              <h2 className="text-xl font-black text-[var(--primary)]">
                بيانات الشركة
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">
                  اسم المنشأة العقارية
                </label>
                <div className="flex items-center gap-3 bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus-within:border-[var(--secondary)] transition-all">
                  <Building2 size={18} className="text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={(e) =>
                      setForm({ ...form, companyName: e.target.value })
                    }
                    className="bg-transparent border-none outline-none w-full text-sm font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">
                  البريد الإلكتروني
                </label>
                <div className="flex items-center gap-3 bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] opacity-60 cursor-not-allowed">
                  <Mail size={18} className="text-[var(--text-muted)]" />
                  <input
                    type="email"
                    value={form.email}
                    readOnly
                    className="bg-transparent border-none outline-none w-full text-sm font-bold text-left cursor-not-allowed"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">
                  رقم التواصل
                </label>
                <div className="flex items-center gap-3 bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus-within:border-[var(--secondary)] transition-all">
                  <Phone size={18} className="text-[var(--text-muted)]" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="bg-transparent border-none outline-none w-full text-sm font-bold text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">
                  السجل التجاري (PDF)
                </label>
                <div
                  onClick={() => regFileInputRef.current?.click()}
                  className="flex items-center gap-3 bg-[var(--bg)] px-5 py-4 rounded-2xl border border-dashed border-[var(--border)] hover:border-[var(--secondary)] transition-all cursor-pointer"
                >
                  <FileText size={18} className="text-[var(--text-muted)]" />
                  <span className="text-sm font-bold text-[var(--text-muted)] flex-1 truncate">
                    {regFile
                      ? regFile.name
                      : profile?.commercialRegFile
                        ? "تم رفع ملف — اضغط لتغييره"
                        : "اضغط لرفع ملف PDF"}
                  </span>
                  <Upload size={16} className="text-[var(--text-muted)]" />
                </div>
                <input
                  ref={regFileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleRegFileChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={updating}
              className="bg-[var(--primary)] text-white px-12 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-blue-900/10 transition-all disabled:opacity-50"
            >
              {updating ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Save size={20} />
                  <span>حفظ التغييرات</span>
                </>
              )}
            </button>
          </form>

          {/* Change Password */}
          <form
            onSubmit={handleChangePassword}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-[var(--border)] space-y-8"
          >
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-6">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                <Lock size={24} />
              </div>
              <h2 className="text-xl font-black text-[var(--primary)]">
                تغيير كلمة المرور
              </h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--primary)] mr-1">
                  كلمة المرور الحالية
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordForm.oldPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      oldPassword: e.target.value,
                    })
                  }
                  className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--primary)] mr-1">
                    كلمة المرور الجديدة
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--primary)] mr-1">
                    تأكيد كلمة المرور
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--bg)] px-5 py-4 rounded-2xl border border-[var(--border)] focus:border-[var(--secondary)] outline-none text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={changingPassword}
              className="bg-[var(--primary)] text-white px-12 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-blue-900/10 transition-all disabled:opacity-50"
            >
              {changingPassword ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Lock size={20} />
                  <span>تحديث كلمة المرور</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
