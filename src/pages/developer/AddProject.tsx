"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Save,
  Loader2,
  Upload,
  X,
  ImageIcon,
  MapPin,
  Building2,
  DollarSign,
  Calendar,
  TrendingUp,
  Users,
  Plus,
} from "lucide-react";
import { saudiCities } from "@/lib/mock-data";
import { useCreateDeveloperProject } from "@/hooks/deveoper/Useprojects";
import {
  CreateProjectPayload,
  ProjectStatus,
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
  completionPercent: z.coerce.number().min(0).max(100).default(0),
  deliveryDate: z.string().min(1, "حدد تاريخ التسليم"),
});

type FormValues = z.infer<typeof schema>;

// ─── UI Helpers ───────────────────────────────────────────────────────────────

const inputCls = (error?: boolean) =>
  `w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 bg-white text-[var(--primary)] font-medium transition-all ${
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
    <div className="space-y-2">
      <label className="block text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-[1.5rem] shadow-sm border border-[var(--border)] p-8 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-[var(--border)]">
        <div className="p-2 bg-[var(--bg)] rounded-xl text-[var(--primary)]">
          {icon}
        </div>
        <h3 className="font-black text-lg text-[var(--primary)]">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ─── Image Picker ─────────────────────────────────────────────────────────────

function ImagePicker({
  label,
  multiple,
  files,
  onChange,
}: {
  label: string;
  multiple?: boolean;
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const arr = Array.from(incoming);
    onChange(multiple ? [...files, ...arr] : [arr[0]]);
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">
        {label}
      </label>
      <div
        onClick={() => ref.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="border-2 border-dashed border-[var(--border)] rounded-2xl p-6 text-center cursor-pointer hover:border-[var(--primary)] hover:bg-blue-50/30 transition-all group"
      >
        <Upload
          size={24}
          className="mx-auto mb-2 text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors"
        />
        <p className="text-sm font-bold text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">
          اسحب وأفلت أو اضغط للاختيار
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-1">PNG, JPG, WEBP</p>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {files.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {files.map((file, i) => (
            <div
              key={i}
              className="relative group/img aspect-square rounded-xl overflow-hidden border border-[var(--border)]"
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => onChange(files.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover/img:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AddProject() {
  const router = useRouter();
  const { mutate: createProject, isPending } = useCreateDeveloperProject();

  // Files & features live outside RHF (File objects aren't serializable by zod)
  const [images, setImages] = useState<File[]>([]);
  const [logo, setLogo] = useState<File[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: { status: "under_construction", completionPercent: 0 },
  });

  const completionPercent = watch("completionPercent");

  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures((prev) => [...prev, trimmed]);
      setFeatureInput("");
    }
  };

  const onSubmit = (values: FormValues) => {
    const payload: CreateProjectPayload = {
      ...values,
      images: images.length ? images : undefined,
      logo: logo[0] ?? undefined,
      features: features.length ? features : undefined,
    };
    createProject(payload, {
      onSuccess: () => router.push("/developer/projects"),
    });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/developer/projects"
          className="p-2.5 bg-white rounded-full shadow-sm hover:bg-[var(--bg)] text-[var(--text-muted)] transition-colors border border-[var(--border)]"
        >
          <ArrowRight size={18} />
        </Link>
        <div>
          <h2 className="text-2xl font-black text-[var(--primary)]">
            إضافة مشروع جديد
          </h2>
          <p className="text-sm text-[var(--text-muted)] font-medium">
            أضف تفاصيل مشروعك العقاري الجديد
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ─ Basic Info ─ */}
        <Section title="معلومات المشروع" icon={<Building2 size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <Field label="اسم المشروع">
                <input
                  {...register("name")}
                  placeholder="مثال: كمبوند الشيخ زايد"
                  className={inputCls(!!errors.name)}
                />
                <ErrorMsg msg={errors.name?.message} />
              </Field>
            </div>

            <Field label="المدينة">
              <select {...register("city")} className={inputCls(!!errors.city)}>
                <option value="">اختر المدينة...</option>
                {saudiCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ErrorMsg msg={errors.city?.message} />
            </Field>

            <Field label="حالة المشروع">
              <select
                {...register("status")}
                className={inputCls(!!errors.status)}
              >
                <option value="under_development">قيد التطوير</option>
                <option value="under_construction">قيد الإنشاء</option>
                <option value="completed">مكتمل</option>
              </select>
            </Field>

            <div className="col-span-full">
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
          </div>
        </Section>

        {/* ─ Numbers ─ */}
        <Section title="الأرقام والمواعيد" icon={<TrendingUp size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </Section>

        {/* ─ Description & Features ─ */}
        <Section title="الوصف والمميزات" icon={<Building2 size={18} />}>
          <Field label="الوصف التفصيلي">
            <textarea
              rows={4}
              {...register("description")}
              placeholder="اكتب وصفاً شاملاً للمشروع..."
              className={inputCls(!!errors.description)}
            />
            <ErrorMsg msg={errors.description?.message} />
          </Field>

          <div className="space-y-3">
            <label className="block text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">
              مميزات المشروع
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                placeholder="مثال: مسبح، جيم، أمن 24 ساعة..."
                className={`${inputCls()} flex-1`}
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-3 bg-[var(--primary)] text-white rounded-xl font-bold hover:opacity-90 transition-all"
              >
                <Plus size={16} />
              </button>
            </div>
            {features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {features.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold"
                  >
                    {f}
                    <button
                      type="button"
                      onClick={() =>
                        setFeatures((prev) => prev.filter((x) => x !== f))
                      }
                      className="hover:text-red-500 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* ─ Media ─ */}
        <Section title="الصور والشعار" icon={<ImageIcon size={18} />}>
          <ImagePicker
            label="صور المشروع (يمكن اختيار أكثر من صورة)"
            multiple
            files={images}
            onChange={setImages}
          />
          <ImagePicker label="شعار المشروع" files={logo} onChange={setLogo} />
        </Section>

        {/* ─ Actions ─ */}
        <div className="flex justify-end gap-3 pb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl border border-[var(--border)] bg-white text-[var(--text-muted)] hover:bg-[var(--bg)] font-bold transition-all"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-8 py-3 rounded-xl bg-[var(--primary)] text-white font-bold flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-60 shadow-lg shadow-blue-900/10"
          >
            {isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {isPending ? "جارٍ الحفظ..." : "حفظ المشروع"}
          </button>
        </div>
      </form>
    </div>
  );
}
