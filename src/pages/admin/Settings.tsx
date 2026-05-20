"use client";
import { useState, useEffect } from "react";
import { Save, Plus, X, Loader2 } from "lucide-react";
import {
  useGetSettings,
  useUpdateSettings,
  useAddCity,
  useDeleteCity,
  useAddFeature,
  useDeleteFeature,
} from "@/hooks/admin/Usesettings";
import { UpdateSettingsPayload } from "@/services/admin/Settingsservice";

// ─── Types ────────────────────────────────────────────────────────────────────

const EMPTY_FORM: UpdateSettingsPayload = {
  whatsappNumber: "",
  phoneNumber: "",
  email: "",
  officeLocation: "",
  facebookUrl: "",
  instagramUrl: "",
  twitterUrl: "",
  linkedinUrl: "",
  seoTitle: "",
  seoDescription: "",
};

// ─── Tag Manager ──────────────────────────────────────────────────────────────

function TagManager({
  items,
  onAdd,
  onDelete,
  placeholder,
  isAdding,
  isDeleting,
}: {
  items: string[];
  onAdd: (v: string) => void;
  onDelete: (v: string) => void;
  placeholder: string;
  isAdding: boolean;
  isDeleting: boolean;
}) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const val = input.trim();
    if (!val) return;
    onAdd(val);
    setInput("");
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), handleAdd())
          }
          placeholder={placeholder}
          className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={isAdding || !input.trim()}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-60 transition-opacity shrink-0"
        >
          {isAdding ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Plus size={15} />
          )}
          إضافة
        </button>
      </div>
      <div className="flex flex-wrap gap-2 min-h-[52px] p-3 bg-gray-50 rounded-xl border border-gray-100">
        {items.length === 0 && (
          <p className="text-sm text-gray-400 m-auto">لا توجد عناصر بعد</p>
        )}
        {items.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm"
          >
            {item}
            <button
              type="button"
              onClick={() => onDelete(item)}
              disabled={isDeleting}
              className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
            >
              <X size={13} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100">
      {children}
    </h3>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Settings() {
  const [form, setForm] = useState<UpdateSettingsPayload>(EMPTY_FORM);

  const { data: settingsData, isLoading } = useGetSettings();
  const raw = settingsData?.data?.settings;

  useEffect(() => {
    if (!raw) return;
    setForm({
      whatsappNumber: raw.whatsappNumber ?? "",
      phoneNumber: raw.phoneNumber ?? "",
      email: raw.email ?? "",
      officeLocation: raw.officeLocation ?? "",
      facebookUrl: raw.facebookUrl ?? "",
      instagramUrl: raw.instagramUrl ?? "",
      twitterUrl: raw.twitterUrl ?? "",
      linkedinUrl: raw.linkedinUrl ?? "",
      seoTitle: raw.seoTitle ?? "",
      seoDescription: raw.seoDescription ?? "",
    });
  }, [raw]);

  const cities = raw?.cities ?? [];
  const features = raw?.propertyFeatures ?? [];

  const { mutate: saveSettings, isPending: isSaving } = useUpdateSettings();
  const { mutate: addCity, isPending: isAddingCity } = useAddCity();
  const { mutate: removeCity, isPending: isDeletingCity } = useDeleteCity();
  const { mutate: addFeature, isPending: isAddingFeature } = useAddFeature();
  const { mutate: removeFeature, isPending: isDeletingFeature } =
    useDeleteFeature();

  const field = (key: keyof UpdateSettingsPayload) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(form);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={28} className="animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text)]">إعدادات المنصة</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── بطاقة واحدة تجمع كل الإعدادات ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {/* بيانات التواصل */}
          <div className="p-6 space-y-4">
            <SectionHeading>بيانات التواصل</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>رقم الهاتف الرئيسي</label>
                <input
                  type="text"
                  {...field("phoneNumber")}
                  className={inputClass}
                  dir="ltr"
                  placeholder="+966XXXXXXXXX"
                />
              </div>
              <div>
                <label className={labelClass}>رقم الواتساب</label>
                <input
                  type="text"
                  {...field("whatsappNumber")}
                  className={inputClass}
                  dir="ltr"
                  placeholder="+966XXXXXXXXX"
                />
              </div>
              <div>
                <label className={labelClass}>البريد الإلكتروني</label>
                <input
                  type="email"
                  {...field("email")}
                  className={inputClass}
                  dir="ltr"
                  placeholder="info@example.com"
                />
              </div>
              <div>
                <label className={labelClass}>عنوان المقر الرئيسي</label>
                <input
                  type="text"
                  {...field("officeLocation")}
                  className={inputClass}
                  placeholder="المدينة، الحي"
                />
              </div>
            </div>
          </div>

          {/* التواصل الاجتماعي */}
          <div className="p-6 space-y-4">
            <SectionHeading>التواصل الاجتماعي</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>رابط فيسبوك</label>
                <input
                  type="url"
                  {...field("facebookUrl")}
                  className={inputClass}
                  dir="ltr"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className={labelClass}>رابط إنستغرام</label>
                <input
                  type="url"
                  {...field("instagramUrl")}
                  className={inputClass}
                  dir="ltr"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label className={labelClass}>رابط تويتر (X)</label>
                <input
                  type="url"
                  {...field("twitterUrl")}
                  className={inputClass}
                  dir="ltr"
                  placeholder="https://x.com/..."
                />
              </div>
              <div>
                <label className={labelClass}>رابط لينكد إن</label>
                <input
                  type="url"
                  {...field("linkedinUrl")}
                  className={inputClass}
                  dir="ltr"
                  placeholder="https://linkedin.com/..."
                />
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="p-6 space-y-4">
            <SectionHeading>تحسين محركات البحث (SEO)</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>عنوان الموقع</label>
                <input
                  type="text"
                  {...field("seoTitle")}
                  className={inputClass}
                  placeholder="اسم الشركة - شعار مختصر"
                />
              </div>
              <div>
                <label className={labelClass}>وصف الموقع</label>
                <input
                  type="text"
                  {...field("seoDescription")}
                  className={inputClass}
                  placeholder="وصف قصير يظهر في نتائج البحث"
                />
              </div>
            </div>
          </div>

          {/* زر الحفظ */}
          <div className="px-6 py-4 bg-gray-50/60 flex justify-end">
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
                  حفظ الإعدادات
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* المدن */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-[var(--text)]">إدارة المدن</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            المدن المتاحة عند إضافة العقارات والمشاريع
          </p>
        </div>
        <div className="p-6">
          <TagManager
            items={cities}
            onAdd={addCity}
            onDelete={removeCity}
            placeholder="اسم المدينة..."
            isAdding={isAddingCity}
            isDeleting={isDeletingCity}
          />
        </div>
      </div>

      {/* المميزات */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-[var(--text)]">إدارة المميزات</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            المميزات المتاحة عند إضافة العقارات
          </p>
        </div>
        <div className="p-6">
          <TagManager
            items={features}
            onAdd={addFeature}
            onDelete={removeFeature}
            placeholder="اسم الميزة..."
            isAdding={isAddingFeature}
            isDeleting={isDeletingFeature}
          />
        </div>
      </div>
    </div>
  );
}
