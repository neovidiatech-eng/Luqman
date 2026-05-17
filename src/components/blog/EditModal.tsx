"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  Calendar,
  User,
  Clock,
  Tag,
} from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { showToast } from "@/components/shared/Toast";
import { mockBlogPosts, blogCategories } from "@/lib/mock-data";
import { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { PreviewModal } from "@/components/blog/PreviewModal";
export function EditModal({
  post,
  onClose,
  onSave,
}: {
  post: BlogPost | null;
  onClose: () => void;
  onSave: (updated: BlogPost) => void;
}) {
  // const [form, setForm] = useState<BlogPost | null>(post);

  const [form, setForm] = useState<BlogPost | null>(null);

  useEffect(() => {
    setForm(post);
  }, [post]);

  if (!post) return null;
  if (!post || !form) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
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

          {/* Reading time & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[var(--text)]">
                وقت القراءة (دقائق)
              </label>
              <input
                type="number"
                name="readingTime"
                value={form.readingTime}
                onChange={handleChange}
                min={1}
                className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[var(--text)]">
                الحالة
              </label>
              <select
                name="status"
                value={form.status ?? "draft"}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)]"
              >
                <option value="published">منشور</option>
                <option value="draft">مسودة</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[var(--text)]">
              رابط الصورة
            </label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[var(--primary)]"
            />
            {form.image && (
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-100 mt-2">
                <Image
                  src={form.image}
                  alt="preview"
                  fill
                  className="object-cover"
                  sizes="640px"
                />
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
            className="px-5 py-2 text-sm font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <Save size={16} />
            حفظ التعديلات
          </button>
        </div>
      </div>
    </div>
  );
}
