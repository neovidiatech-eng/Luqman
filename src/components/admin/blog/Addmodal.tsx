"use client";
import { useState } from "react";
import Image from "next/image";
import { X, Save, Upload } from "lucide-react";
import { showToast } from "@/components/shared/Toast";
import { blogCategories } from "@/lib/mock-data";
import { CreateBlogPayload } from "@/services/admin/Blogservice";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: CreateBlogPayload) => void;
  isSaving?: boolean;
}

interface InternalForm {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tagsInput: string; // "new, invest, realestate"
  isPublished: boolean;
  coverImage: File | null;
  author: string;
}

const defaultForm: InternalForm = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  category: "",
  tagsInput: "",
  isPublished: false,
  coverImage: null,
  author: "",
};

function generateSlug(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "");
}

export function AddModal({
  isOpen,
  onClose,
  onSave,
  isSaving = false,
}: AddModalProps) {
  const [form, setForm] = useState<InternalForm>(defaultForm);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "title") updated.slug = generateSlug(value);
      return updated;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, coverImage: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleClose = () => {
    setForm(defaultForm);
    setImagePreview(null);
    onClose();
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      showToast("عنوان المقال مطلوب", "error");
      return;
    }
    if (!form.category) {
      showToast("التصنيف مطلوب", "error");
      return;
    }
    if (!form.content.trim()) {
      showToast("محتوى المقال مطلوب", "error");
      return;
    }

    // ✅ تحويل "new, invest, realestate" → ["new","invest","realestate"]
    const tagsArray = form.tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: CreateBlogPayload = {
      title: form.title,
      slug: form.slug,
      content: form.content,
      excerpt: form.excerpt,
      category: form.category,
      tags: tagsArray, // ✅ string[] — الـ service يتولى FormData
      isPublished: form.isPublished,
      coverImage: form.coverImage,
    };

    onSave(payload);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-base font-bold text-[var(--text)]">
            إضافة مقال جديد
          </h2>
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[var(--text)]">
              عنوان المقال <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="أدخل عنوان المقال"
              className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)]"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[var(--text)]">
              Slug{" "}
              <span className="text-xs text-gray-400 font-normal">
                (يتولد تلقائياً)
              </span>
            </label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="best-investment-areas"
              className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)] font-mono text-gray-500"
              dir="ltr"
            />
          </div>

          {/* Author & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[var(--text)]">
                الكاتب
              </label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="اسم الكاتب"
                className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[var(--text)]">
                التصنيف <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)]"
              >
                <option value="">اختر تصنيف</option>
                {blogCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[var(--text)]">
              التاقات{" "}
              <span className="text-xs text-gray-400 font-normal">
                (مفصولة بفاصلة — مثال: new, invest, realestate)
              </span>
            </label>
            <input
              type="text"
              name="tagsInput"
              value={form.tagsInput}
              onChange={handleChange}
              placeholder="new, invest, realestate"
              className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)]"
              dir="ltr"
            />
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[var(--text)]">
              الحالة
            </label>
            <select
              value={form.isPublished ? "true" : "false"}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  isPublished: e.target.value === "true",
                }))
              }
              className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)]"
            >
              <option value="false">مسودة</option>
              <option value="true">منشور</option>
            </select>
          </div>

          {/* Cover Image */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[var(--text)]">
              صورة الغلاف
            </label>
            <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-lg py-4 px-4 cursor-pointer hover:border-[var(--primary)] transition-colors">
              <Upload size={18} className="text-gray-400 shrink-0" />
              <span className="text-sm text-gray-500">
                {form.coverImage
                  ? (form.coverImage as File).name
                  : "اضغط لاختيار صورة"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {imagePreview && (
              <div className="relative w-full h-36 rounded-lg overflow-hidden border border-gray-100 mt-2">
                <Image
                  src={imagePreview}
                  alt="preview"
                  fill
                  className="object-cover"
                  sizes="640px"
                />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setForm((p) => ({ ...p, coverImage: null }));
                  }}
                  className="absolute top-2 left-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[var(--text)]">
              المقتطف
            </label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={3}
              placeholder="وصف مختصر للمقال..."
              className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)] resize-none"
            />
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[var(--text)]">
              المحتوى <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={7}
              placeholder="محتوى المقال (HTML مدعوم)..."
              className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)] resize-none font-mono"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex items-center justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={isSaving}
            className="px-5 py-2 text-sm font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            <Save size={16} />
            {isSaving ? "جاري النشر..." : "نشر المقال"}
          </button>
        </div>
      </div>
    </div>
  );
}
