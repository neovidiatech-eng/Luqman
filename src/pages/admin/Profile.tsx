"use client";
import { useState, useEffect, useRef } from "react";
import { Save, Loader2, Camera, User, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  useGetProfile,
  useUpdateProfile,
  useChangePassword,
} from "@/hooks/admin/Useprofile";
import {
  UpdateProfilePayload,
  ChangePasswordPayload,
} from "@/services/admin/Profileservice";

const EMPTY_FORM: UpdateProfilePayload = {
  name: "",
  phone: "",
  whatsapp: "",
  avatar: null,
};

function AvatarUpload({
  currentUrl,
  onFileSelect,
}: {
  currentUrl: string | null;
  onFileSelect: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl);

  useEffect(() => {
    setPreview(currentUrl);
  }, [currentUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onFileSelect(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="الصورة الشخصية"
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={40} className="text-gray-400" />
          )}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute bottom-0 left-0 w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
        >
          <Camera size={15} className="text-white" />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>
      <p className="text-xs text-gray-400">PNG, JPG — حد أقصى 2MB</p>
    </div>
  );
}

// ─── Password Field ───────────────────────────────────────────────────────────

function PasswordInput({
  placeholder,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        {...props}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] bg-white pl-10"
        dir="ltr"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Profile() {
  const [form, setForm] = useState<UpdateProfilePayload>(EMPTY_FORM);

  const { data: profileData, isLoading } = useGetProfile();
  const raw = profileData?.data?.admin;

  useEffect(() => {
    if (!raw) return;
    setForm({
      name: raw.name ?? "",
      phone: raw.phone ?? "",
      whatsapp: raw.whatsapp ?? "",
      avatar: null,
    });
  }, [raw]);

  const { mutate: saveProfile, isPending: isSaving } = useUpdateProfile();
  const { mutate: changePass, isPending: isChanging } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordPayload & { confirmPassword: string }>();

  const field = (key: keyof Omit<UpdateProfilePayload, "avatar">) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(form);
  };

  const handlePasswordSubmit = (
    data: ChangePasswordPayload & { confirmPassword: string },
  ) => {
    changePass(
      { oldPassword: data.oldPassword, newPassword: data.newPassword },
      { onSuccess: () => reset() },
    );
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] bg-white";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-[var(--text)]">الملف الشخصي</h2>

      {/* ─── Profile Form ─── */}
      <form onSubmit={handleProfileSubmit}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-8 flex flex-col items-center gap-1 border-b border-gray-100 bg-gray-50/40">
            <AvatarUpload
              currentUrl={raw?.avatarUrl ?? null}
              onFileSelect={(file) =>
                setForm((prev) => ({ ...prev, avatar: file }))
              }
            />
            <p className="text-base font-semibold text-[var(--text)] mt-1">
              {raw?.name ?? "—"}
            </p>
            <p className="text-sm text-gray-400">{raw?.email ?? "—"}</p>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <label className={labelClass}>الاسم</label>
              <input
                type="text"
                {...field("name")}
                className={inputClass}
                placeholder="الاسم الكامل"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>رقم الهاتف</label>
                <input
                  type="text"
                  {...field("phone")}
                  className={inputClass}
                  dir="ltr"
                  placeholder="+966XXXXXXXXX"
                />
              </div>
              <div>
                <label className={labelClass}>رقم الواتساب</label>
                <input
                  type="text"
                  {...field("whatsapp")}
                  className={inputClass}
                  dir="ltr"
                  placeholder="+966XXXXXXXXX"
                />
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/60 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium flex items-center gap-2 hover:opacity-90 disabled:opacity-60 transition-opacity"
            >
              {isSaving ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save size={17} />
                  حفظ التغييرات
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* ─── Change Password Form ─── */}
      <form onSubmit={handleSubmit(handlePasswordSubmit)}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Lock size={18} className="text-[var(--primary)]" />
            <h3 className="font-bold text-[var(--text)]">تغيير كلمة المرور</h3>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className={labelClass}>كلمة المرور الحالية</label>
              <PasswordInput
                placeholder="أدخل كلمة المرور الحالية"
                error={errors.oldPassword?.message}
                {...register("oldPassword", { required: "هذا الحقل مطلوب" })}
              />
            </div>
            <div>
              <label className={labelClass}>كلمة المرور الجديدة</label>
              <PasswordInput
                placeholder="أدخل كلمة المرور الجديدة"
                error={errors.newPassword?.message}
                {...register("newPassword", {
                  required: "هذا الحقل مطلوب",
                  minLength: { value: 8, message: "8 أحرف على الأقل" },
                })}
              />
            </div>
            <div>
              <label className={labelClass}>تأكيد كلمة المرور</label>
              <PasswordInput
                placeholder="أعد إدخال كلمة المرور الجديدة"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword", {
                  required: "هذا الحقل مطلوب",
                  validate: (val) =>
                    val === watch("newPassword") || "كلمة المرور غير متطابقة",
                })}
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/60 flex justify-end">
            <button
              type="submit"
              disabled={isChanging}
              className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium flex items-center gap-2 hover:opacity-90 disabled:opacity-60 transition-opacity"
            >
              {isChanging ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Lock size={17} />
                  تغيير كلمة المرور
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
