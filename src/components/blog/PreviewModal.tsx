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
export function PreviewModal({
  post,
  onClose,
}: {
  post: BlogPost | null;
  onClose: () => void;
}) {
  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-base font-bold text-[var(--text)]">
            معاينة المقال
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {/* Cover Image */}
          <div className="relative w-full h-52">
            <Image
              src={post.coverImage || post.image || '/placeholder.svg'}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 672px) 100vw, 672px"
            />
            {post.status && (
              <span
                className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full ${
                  post.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {post.status === "published" ? "منشور" : "مسودة"}
              </span>
            )}
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4">
            <h3 className="text-xl font-bold text-[var(--text)] leading-snug">
              {post.title}
            </h3>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {(post.publishedAt || post.createdAt) ? formatDate(post.publishedAt || post.createdAt!) : 'غير محدد'}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readingTime} دقائق قراءة
              </span>
              <span className="flex items-center gap-1.5">
                <Tag size={14} />
                {post.category}
              </span>
            </div>

            {/* Excerpt */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 leading-relaxed border-r-4 border-[var(--primary)]">
              {post.excerpt}
            </div>

            {/* Content preview */}
            <div
              className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
