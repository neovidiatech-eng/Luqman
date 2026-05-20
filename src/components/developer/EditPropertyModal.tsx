"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Save,
  Loader2,
  ChevronDown,
  MapPin,
  Building2,
  Upload,
  Trash2,
  Plus,
} from "lucide-react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { saudiCities, propertyTypes, propertyFeatures } from "@/lib/mock-data";
import { useUpdateDeveloperProperty } from "@/hooks/deveoper/Useproperties";
import {
  Property,
  UpdatePropertyPayload,
} from "@/services/developer/Propertiesservice";

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  title: z.string().min(3, "العنوان يجب أن يكون 3 أحرف على الأقل"),
  description: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),
  type: z.enum([
    "apartment",
    "villa",
    "duplex",
    "land",
    "commercial",
    "office",
    "warehouse",
  ]),
  price: z.coerce.number().positive("السعر يجب أن يكون أكبر من 0"),
  area: z.coerce.number().positive("المساحة يجب أن تكون أكبر من 0"),
  status: z.enum(["available", "sold", "reserved"]),
  bedrooms: z.coerce.number().int().min(0).optional(),
  bathrooms: z.coerce.number().int().min(0).optional(),
  floor: z.coerce.number().int().optional(),
  city: z.string().min(1, "اختر المدينة"),
  district: z.string().min(2, "الحي مطلوب"),
  address: z.string().min(5, "العنوان يجب أن يكون 5 أحرف على الأقل"),
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

export function EditPropertyModal({
  property,
  onClose,
}: {
  property: Property;
  onClose: () => void;
}) {
  const { mutate: updateProperty, isPending } = useUpdateDeveloperProperty();

  // Images state: existing URLs + new Files
  const [existingImages, setExistingImages] = useState<string[]>(
    property.images ?? [],
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Features
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Video links
  const [videoLinks, setVideoLinks] = useState<string[]>([""]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      title: property.title,
      description: property.description,
      type: property.type,
      price: property.price,
      area: property.area,
      status: property.status,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      floor: property.floor ?? undefined,
      city: property.city,
      district: property.district,
      address: property.address,
    },
  });

  const toggleFeature = (f: string) =>
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );

  const handleImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setNewImages((prev) => [...prev, ...files]);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const removeExistingImage = (url: string) =>
    setExistingImages((prev) => prev.filter((i) => i !== url));

  const removeNewImage = (idx: number) =>
    setNewImages((prev) => prev.filter((_, i) => i !== idx));

  const addVideoLink = () => setVideoLinks((prev) => [...prev, ""]);
  const updateVideoLink = (i: number, val: string) => {
    const updated = [...videoLinks];
    updated[i] = val;
    setVideoLinks(updated);
  };
  const removeVideoLink = (i: number) =>
    setVideoLinks((prev) => prev.filter((_, idx) => idx !== i));

  const onSubmit = (values: FormValues) => {
    const payload: UpdatePropertyPayload = {
      ...values,
      images: [...existingImages, ...newImages] as (string | File)[],
      features: selectedFeatures,
      videoLinks: videoLinks.filter(Boolean),
    };

    updateProperty({ id: property.id, payload }, { onSuccess: onClose });
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
              تعديل العقار
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
          <div className="p-8 space-y-8">
            {/* ─ Basic Info ─ */}
            <section className="space-y-4">
              <p className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border)] pb-2 flex items-center gap-2">
                <Building2 size={12} /> المعلومات الأساسية
              </p>

              <Field label="عنوان العقار">
                <input
                  {...register("title")}
                  placeholder="مثال: شقة فاخرة في حي النرجس"
                  className={inputCls(!!errors.title)}
                />
                <ErrorMsg msg={errors.title?.message} />
              </Field>

              <Field label="وصف العقار">
                <textarea
                  rows={3}
                  {...register("description")}
                  placeholder="اكتب وصفاً مفصلاً للعقار..."
                  className={inputCls(!!errors.description)}
                />
                <ErrorMsg msg={errors.description?.message} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="النوع">
                  <div className="relative">
                    <select
                      {...register("type")}
                      className={`${inputCls(!!errors.type)} appearance-none`}
                    >
                      {propertyTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
                    />
                  </div>
                  <ErrorMsg msg={errors.type?.message} />
                </Field>

                <Field label="حالة العقار">
                  <div className="relative">
                    <select
                      {...register("status")}
                      className={`${inputCls(!!errors.status)} appearance-none`}
                    >
                      <option value="available">متاح</option>
                      <option value="sold">مباع</option>
                      <option value="reserved">محجوز</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
                    />
                  </div>
                </Field>

                <Field label="السعر (ريال)">
                  <input
                    type="number"
                    min={0}
                    {...register("price")}
                    placeholder="0"
                    className={inputCls(!!errors.price)}
                  />
                  <ErrorMsg msg={errors.price?.message} />
                </Field>

                <Field label="المساحة (م²)">
                  <input
                    type="number"
                    min={0}
                    {...register("area")}
                    placeholder="0"
                    className={inputCls(!!errors.area)}
                  />
                  <ErrorMsg msg={errors.area?.message} />
                </Field>

                <Field label="غرف النوم">
                  <input
                    type="number"
                    min={0}
                    {...register("bedrooms")}
                    placeholder="0"
                    className={inputCls(!!errors.bedrooms)}
                  />
                </Field>

                <Field label="دورات المياه">
                  <input
                    type="number"
                    min={0}
                    {...register("bathrooms")}
                    placeholder="0"
                    className={inputCls(!!errors.bathrooms)}
                  />
                </Field>

                <Field label="رقم الطابق">
                  <input
                    type="number"
                    {...register("floor")}
                    placeholder="اختياري"
                    className={inputCls(!!errors.floor)}
                  />
                </Field>
              </div>
            </section>

            {/* ─ Location ─ */}
            <section className="space-y-4">
              <p className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border)] pb-2 flex items-center gap-2">
                <MapPin size={12} /> الموقع
              </p>

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

                <Field label="الحي">
                  <input
                    {...register("district")}
                    placeholder="مثال: حي الملقا"
                    className={inputCls(!!errors.district)}
                  />
                  <ErrorMsg msg={errors.district?.message} />
                </Field>

                <div className="col-span-2">
                  <Field label="العنوان التفصيلي">
                    <div className="relative">
                      <input
                        {...register("address")}
                        placeholder="الشارع، المنطقة..."
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
            </section>

            {/* ─ Images ─ */}
            {/* <section className="space-y-4">
              <p className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border)] pb-2">
                الصور
              </p>

              <div className="grid grid-cols-3 gap-3">
                {existingImages.map((url) => (
                  <div
                    key={url}
                    className="relative h-24 rounded-xl overflow-hidden border border-[var(--border)] group"
                  >
                    <Image
                      src={url}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(url)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {newImages.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative h-24 rounded-xl overflow-hidden border border-[var(--border)] group"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(idx)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="h-24 rounded-xl border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center gap-1 text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  <Upload size={18} />
                  <span className="text-[10px] font-bold">إضافة صورة</span>
                </button>
              </div>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageFiles}
              />
            </section> */}

            {/* ─ Features ─ */}
            <section className="space-y-4">
              <p className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border)] pb-2">
                المميزات
              </p>
              <div className="flex flex-wrap gap-2">
                {propertyFeatures.map((feature) => (
                  <button
                    type="button"
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                      selectedFeatures.includes(feature)
                        ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                        : "bg-white text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--primary)]"
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </section>

            {/* ─ Video Links ─ */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                <p className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">
                  روابط الفيديو (اختياري)
                </p>
                <button
                  type="button"
                  onClick={addVideoLink}
                  className="w-7 h-7 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="space-y-2">
                {videoLinks.map((link, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => updateVideoLink(i, e.target.value)}
                      placeholder="https://youtube.com/..."
                      className={inputCls()}
                    />
                    {videoLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVideoLink(i)}
                        className="p-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
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
