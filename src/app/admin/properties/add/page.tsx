"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Save } from "lucide-react";
import ImageUploader from "@/components/shared/ImageUploader";
import { propertyTypes, saudiCities, propertyFeatures } from "@/lib/mock-data";
import { showToast } from "@/components/shared/Toast";

export default function AddPropertyPage() {
  const router = useRouter();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [videoLinks, setVideoLinks] = useState([""]);

  const addVideoLink = () => {
    setVideoLinks((prev) => [...prev, ""]);
  };

  const updateVideoLink = (index: number, value: string) => {
    const updated = [...videoLinks];
    updated[index] = value;
    setVideoLinks(updated);
  };
  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("تمت إضافة العقار بنجاح", "success");
    router.push("/admin/properties");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/properties"
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <ArrowRight size={20} />
          </Link>
          <h2 className="text-xl font-bold text-[var(--text)]">
            إضافة عقار جديد
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h3 className="font-bold text-lg border-b border-gray-100 pb-3 text-[var(--text)]">
            المعلومات الأساسية
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                عنوان العقار
              </label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                placeholder="مثال: فيلا فاخرة في حي النرجس"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                النوع
              </label>
              <select
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
              >
                <option value="">اختر النوع...</option>
                {propertyTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                السعر (ريال)
              </label>
              <input
                type="number"
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المساحة (م²)
              </label>
              <input
                type="number"
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  غرف النوم
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  دورات المياه
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h3 className="font-bold text-lg border-b border-gray-100 pb-3 text-[var(--text)]">
            الموقع
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المدينة
              </label>
              <select
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
              >
                <option value="">اختر المدينة...</option>
                {saudiCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحي
              </label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                placeholder="مثال: حي الملقا"
              />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العنوان التفصيلي
              </label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                placeholder="مثال: شارع الأمير محمد بن سعد"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h3 className="font-bold text-lg border-b border-gray-100 pb-3 text-[var(--text)]">
            التفاصيل والصور
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              وصف العقار
            </label>
            <textarea
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
              placeholder="اكتب وصفاً جذاباً ومفصلاً للعقار..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              المميزات
            </label>
            <div className="flex flex-wrap gap-2">
              {propertyFeatures.map((feature) => (
                <button
                  type="button"
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    selectedFeatures.includes(feature)
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "bg-white text-gray-600 border-gray-300 hover:border-[var(--primary)]"
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              صور العقار
            </label>
            <ImageUploader />
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                روابط الفيديو (اختياري)
              </label>

              <button
                type="button"
                onClick={addVideoLink}
                className="w-8 h-8 cursor-pointer rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                +
              </button>
            </div>

            <div className="space-y-3">
              {videoLinks.map((link, index) => (
                <input
                  key={index}
                  type="url"
                  value={link}
                  onChange={(e) => updateVideoLink(index, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                  placeholder={`https://youtube.com/...`}
                />
              ))}
            </div>
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رابط فيديو (اختياري)
            </label>
            <input
              type="url"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
              placeholder="https://youtube.com/..."
            />
          </div> */}
        </div>

        <div className="flex justify-end gap-3 pb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Save size={18} /> حفظ العقار
          </button>
        </div>
      </form>
    </div>
  );
}
