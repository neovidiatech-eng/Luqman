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
import { EditModal } from "@/components/blog/EditModal";


// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Blog() {
  const [articles, setArticles] = useState<BlogPost[]>(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);

  const filteredArticles = articles.filter((a: BlogPost) => {
    const matchSearch =
      a.title.includes(searchTerm) || a.author.includes(searchTerm);
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setArticles((prev: BlogPost[]) =>
        prev.filter((a: BlogPost) => a.id !== itemToDelete),
      );
      showToast("تم حذف المقال بنجاح", "success");
    }
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleSaveEdit = (updated: BlogPost) => {
    setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    showToast("تم تحديث المقال بنجاح", "success");
    setEditPost(null);
  };

  const columns = [
    {
      header: "المقال",
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-12 rounded overflow-hidden shrink-0 border border-gray-100">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="max-w-[250px]">
            <p
              className="font-bold text-sm text-[var(--text)] truncate"
              title={item.title}
            >
              {item.title}
            </p>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {item.excerpt}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "الكاتب",
      accessor: "author" as keyof (typeof mockBlogPosts)[0],
      render: (item: any) => (
        <span className="text-sm font-medium">{item.author}</span>
      ),
    },
    {
      header: "تاريخ النشر",
      render: (item: any) => (
        <span className="text-sm text-gray-500">
          {formatDate(item.publishedAt)}
        </span>
      ),
    },
    {
      header: "وقت القراءة",
      render: (item: any) => (
        <span className="text-sm font-mono">{item.readingTime} د</span>
      ),
    },
    {
      header: "الحالة",
      render: (item: any) => <StatusBadge status={item.status} />,
    },
    {
      header: "إجراءات",
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewPost({ ...item })}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="معاينة"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => setEditPost({ ...item })}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="تعديل"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => handleDeleteClick(item.id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
            title="حذف"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1">
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="بحث بعنوان المقال، الكاتب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-[var(--primary)] sm:w-48"
          >
            <option value="all">كل الحالات</option>
            <option value="published">منشور</option>
            <option value="draft">مسودة</option>
          </select>
        </div>
        <button className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shrink-0">
          <Plus size={18} />
          إضافة مقال
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          data={filteredArticles}
          columns={columns}
          keyExtractor={(item) => item.id}
        />
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>
            عرض 1 إلى {Math.min(10, filteredArticles.length)} من{" "}
            {filteredArticles.length} مقال
          </div>
          <div className="flex gap-1">
            <button
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              السابق
            </button>
            <button className="px-3 py-1 bg-[var(--primary)] text-white rounded">
              1
            </button>
            <button
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              التالي
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PreviewModal post={previewPost} onClose={() => setPreviewPost(null)} />

      <EditModal
        post={editPost}
        onClose={() => setEditPost(null)}
        onSave={handleSaveEdit}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="حذف مقال"
        message="هل أنت متأكد من رغبتك في حذف هذا المقال؟ هذا الإجراء لا يمكن التراجع عنه."
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        confirmLabel="حذف نهائياً"
      />
    </div>
  );
}
