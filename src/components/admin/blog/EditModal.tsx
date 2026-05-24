"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Save } from "lucide-react";
import { BlogPost } from "@/services/admin/Blogservice";
import { showToast } from "@/components/shared/Toast";
import { blogCategories } from "@/lib/mock-data";

export function EditModal({
  post,
  onClose,
  onSave,
  isSaving = false,
}: {
  post: BlogPost | null;
  onClose: () => void;
  onSave: (updated: BlogPost) => void;
  isSaving?: boolean;
}) {
  const [form, setForm] = useState<BlogPost | null>(null);

  useEffect(() => {
    setForm(post);
  }, [post]);

  if (!post || !form) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : value,
          }
        : prev,
    );
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // tags مخزنة كـ array — بنعرضها كـ string مفصول بفاصلة للتعديل
    const raw = e.target.value;
    setForm((prev) =>
      prev
        ? {
            ...prev,
            tags: raw
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          }
        : prev,
    );
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      showToast("عنوان المقال مطلوب", "error");
      return;
    }
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-base font-bold text-[var(--text)]">
            تعديل المقال
          </h2>
          <button
            onClick={onClose}
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
            <label className="text-sm font-bold text-[var(--text)]">Slug</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="best-investment-areas"
              className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)] font-mono"
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
                التصنيف
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)]"
              >
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
              التاقات (مفصولة بفاصلة)
            </label>
            <input
              type="text"
              value={form.tags.join(", ")}
              onChange={handleTagsChange}
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
              name="isPublished"
              value={form.isPublished ? "true" : "false"}
              onChange={(e) =>
                setForm((prev) =>
                  prev
                    ? { ...prev, isPublished: e.target.value === "true" }
                    : prev,
                )
              }
              className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)]"
            >
              <option value="true">منشور</option>
              <option value="false">مسودة</option>
            </select>
          </div>

          {/* Cover Image preview (read-only — upload not supported in edit) */}
          {form.coverImage && (
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[var(--text)]">
                الصورة الحالية
              </label>
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-100">
                <Image
                  src={form.coverImage}
                  alt="cover"
                  fill
                  className="object-cover"
                  sizes="640px"
                />
              </div>
            </div>
          )}

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
              المحتوى
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              placeholder="محتوى المقال (HTML مدعوم)..."
              className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)] resize-none font-mono"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
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
            {isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>
        </div>
      </div>
    </div>
  );
}
