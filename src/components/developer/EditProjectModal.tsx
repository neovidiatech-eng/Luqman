"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Save,
  Loader2,
  ChevronDown,
  Upload,
  MapPin,
  Building2,
  DollarSign,
  Calendar,
  TrendingUp,
  Users,
} from "lucide-react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { saudiCities } from "@/lib/mock-data";
import { useUpdateDeveloperProject } from "@/hooks/deveoper/Useprojects";
import {
  Project,
  UpdateProjectPayload,
} from "@/services/developer/Projectsservice";

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  description: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),
  city: z.string().min(1, "اختر المدينة"),
  address: z.string().min(5, "العنوان يجب أن يكون 5 أحرف على الأقل"),
  status: z.enum(["under_development", "under_construction", "completed"]),
  startingPrice: z.coerce.number().positive("السعر يجب أن يكون أكبر من 0"),
  totalUnits: z.coerce
    .number()
    .int()
    .positive("عدد الوحدات يجب أن يكون أكبر من 0"),
  completionPercent: z.coerce.number().min(0).max(100),
  deliveryDate: z.string().min(1, "حدد تاريخ التسليم"),
});

type FormValues = z.infer<typeof schema>;

// ─── UI Helpers ───────────────────────────────────────────────────────────────

const inputCls = (error?: boolean) =>
  `w-full border rounded-xl p-2.5 text-sm focus:outline-none focus:ring-1 bg-white text-[var(--primary)] font-medium transition-all ${
    error
      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
      : "border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
  }`;

function ErrorMsg({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-red-500 font-bold mt-1">{msg}</p>;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EditProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { mutate: updateProject, isPending } = useUpdateDeveloperProject();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      name: project.name,
      description: project.description,
      city: project.city,
      address: project.address,
      status: project.status,
      startingPrice: project.startingPrice,
      totalUnits: project.totalUnits,
      completionPercent: project.completionPercent,
      deliveryDate: project.deliveryDate
        ? project.deliveryDate.slice(0, 10)
        : "",
    },
  });

  const completionPercent = watch("completionPercent");

  const onSubmit = (values: FormValues) => {
    const payload: UpdateProjectPayload = {
      ...values,
      ...(newImage && { image: newImage }),
    };
    updateProject({ id: project.id, payload }, { onSuccess: onClose });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImage(file);
    setNewImagePreview(URL.createObjectURL(file));
  };

  const removeNewImage = () => {
    setNewImage(null);
    setNewImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md flex items-center justify-between p-6 border-b border-[var(--border)] rounded-t-[2rem] z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--bg)] rounded-xl text-[var(--primary)]">
              <Building2 size={18} />
            </div>
            <h2 className="text-xl font-black text-[var(--primary)]">
              تعديل المشروع
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--bg)] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 space-y-6">
            {/* ─ Basic Info ─ */}
            <div className="space-y-4">
              <p className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border)] pb-2 flex items-center gap-2">
                <Building2 size={12} /> معلومات المشروع
              </p>

              <Field label="اسم المشروع">
                <input
                  {...register("name")}
                  placeholder="مثال: كمبوند الشيخ زايد"
                  className={inputCls(!!errors.name)}
                />
                <ErrorMsg msg={errors.name?.message} />
              </Field>

              <Field label="الوصف">
                <textarea
                  rows={3}
                  {...register("description")}
                  placeholder="اكتب وصفاً شاملاً للمشروع..."
                  className={inputCls(!!errors.description)}
                />
                <ErrorMsg msg={errors.description?.message} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="المدينة">
                  <div className="relative">
                    <select
                      {...register("city")}
                      className={`${inputCls(!!errors.city)} appearance-none`}
                    >
                      <option value="">اختر المدينة</option>
                      {saudiCities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
                    />
                  </div>
                  <ErrorMsg msg={errors.city?.message} />
                </Field>

                <Field label="حالة المشروع">
                  <div className="relative">
                    <select
                      {...register("status")}
                      className={`${inputCls(!!errors.status)} appearance-none`}
                    >
                      <option value="under_development">قيد التطوير</option>
                      <option value="under_construction">قيد الإنشاء</option>
                      <option value="completed">مكتمل</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
                    />
                  </div>
                </Field>
              </div>

              <Field label="العنوان التفصيلي">
                <div className="relative">
                  <input
                    {...register("address")}
                    placeholder="الحي، المنطقة، الشارع..."
                    className={`${inputCls(!!errors.address)} pr-10`}
                  />
                  <MapPin
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  />
                </div>
                <ErrorMsg msg={errors.address?.message} />
              </Field>
            </div>

            {/* ─ Numbers ─ */}
            <div className="space-y-4">
              <p className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border)] pb-2 flex items-center gap-2">
                <TrendingUp size={12} /> الأرقام والمواعيد
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Field label="يبدأ السعر من (ريال)">
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      {...register("startingPrice")}
                      placeholder="2000000"
                      className={`${inputCls(!!errors.startingPrice)} pr-10`}
                    />
                    <DollarSign
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                  </div>
                  <ErrorMsg msg={errors.startingPrice?.message} />
                </Field>

                <Field label="إجمالي الوحدات">
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      {...register("totalUnits")}
                      placeholder="125"
                      className={`${inputCls(!!errors.totalUnits)} pr-10`}
                    />
                    <Users
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                  </div>
                  <ErrorMsg msg={errors.totalUnits?.message} />
                </Field>

                <Field label="تاريخ التسليم المتوقع">
                  <div className="relative">
                    <input
                      type="date"
                      {...register("deliveryDate")}
                      className={`${inputCls(!!errors.deliveryDate)} pr-10`}
                    />
                    <Calendar
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                  </div>
                  <ErrorMsg msg={errors.deliveryDate?.message} />
                </Field>

                <Field label="نسبة الإنجاز الحالية (%)">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    {...register("completionPercent")}
                    placeholder="0"
                    className={inputCls(!!errors.completionPercent)}
                  />
                  <ErrorMsg msg={errors.completionPercent?.message} />
                  {!!completionPercent && (
                    <div className="w-full h-2 bg-[var(--bg)] rounded-full overflow-hidden border border-[var(--border)] mt-2">
                      <div
                        className="h-full bg-[var(--secondary)] rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(Number(completionPercent), 100)}%`,
                        }}
                      />
                    </div>
                  )}
                </Field>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white/90 backdrop-blur-md flex items-center justify-end gap-3 p-6 border-t border-[var(--border)] rounded-b-[2rem]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text-muted)] font-bold hover:bg-[var(--bg)] transition-all"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white font-bold flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-60"
            >
              {isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
