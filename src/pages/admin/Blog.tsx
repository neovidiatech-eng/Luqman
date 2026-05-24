"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { formatDate } from "@/lib/utils";
import { PreviewModal } from "@/components/admin/blog/PreviewModal";
import { EditModal } from "@/components/admin/blog/EditModal";
import { AddModal } from "@/components/admin/blog/Addmodal";
import { BlogPost } from "@/services/admin/Blogservice";
import {
  useDeleteBlogPost,
  useGetBlogPosts,
  useUpdateBlogPost,
  useCreateBlogPost,
} from "@/hooks/admin/Useblog";

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");
  const [page, setPage] = useState(1);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);

  // ─── Hooks ──────────────────────────────────────────────────────────────────
  const { data, isLoading } = useGetBlogPosts({
    page,
    limit: 10,
    search: searchTerm || undefined,
    // فقط نبعت isPublished لو الفلتر مش "all"
    isPublished:
      statusFilter === "published"
        ? true
        : statusFilter === "draft"
          ? false
          : undefined,
  });

  const { mutate: deletePost, isPending: isDeleting } = useDeleteBlogPost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdateBlogPost();
  const { mutate: createPost, isPending: isCreating } = useCreateBlogPost();

  const posts = data?.data?.posts ?? [];
  const pagination = data?.data?.pagination;

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) deletePost(itemToDelete);
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleSaveEdit = (updated: BlogPost) => {
    updatePost(
      {
        id: updated.id,
        payload: {
          title: updated.title,
          slug: updated.slug,
          content: updated.content,
          excerpt: updated.excerpt,
          category: updated.category,
          tags: updated.tags, // ✅ string[] مباشرة
          isPublished: updated.isPublished,
        },
      },
      { onSuccess: () => setEditPost(null) },
    );
  };

  // ─── Columns ─────────────────────────────────────────────────────────────────
  const columns = [
    {
      header: "المقال",
      render: (item: BlogPost) => (
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-12 rounded overflow-hidden shrink-0 border border-gray-100">
            <Image
              src={item.coverImage || "/placeholder.svg"}
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
      render: (item: BlogPost) => (
        <span className="text-sm font-medium">{item.author}</span>
      ),
    },
    {
      header: "التصنيف",
      render: (item: BlogPost) => (
        <span className="text-sm text-gray-500">{item.category}</span>
      ),
    },
    {
      header: "تاريخ النشر",
      render: (item: BlogPost) => (
        <span className="text-sm text-gray-500">
          {formatDate(item.createdAt)}
        </span>
      ),
    },
    {
      header: "الحالة",
      render: (item: BlogPost) => (
        <StatusBadge status={item.isPublished ? "published" : "draft"} />
      ),
    },
    {
      header: "إجراءات",
      render: (item: BlogPost) => (
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

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Filters */}
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full bg-white border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "all" | "published" | "draft");
              setPage(1);
            }}
            className="bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-[var(--primary)] sm:w-48"
          >
            <option value="all">كل الحالات</option>
            <option value="published">منشور</option>
            <option value="draft">مسودة</option>
          </select>
        </div>

        {/* ── زرار إضافة مقال ── */}
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shrink-0"
        >
          <Plus size={18} />
          إضافة مقال
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 text-sm">
            جاري التحميل...
          </div>
        ) : (
          <DataTable
            data={posts}
            columns={columns}
            keyExtractor={(item) => item.id}
          />
        )}

        {/* Pagination */}
        {pagination && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <div>
              عرض {posts.length} من {pagination.total} مقال
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={!pagination.hasPrevPage}
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
              >
                السابق
              </button>
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded ${
                    p === pagination.page
                      ? "bg-[var(--primary)] text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!pagination.hasNextPage}
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Modals ── */}

      {/* Add */}
      <AddModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        isSaving={isCreating}
        onSave={(payload) =>
          createPost(payload, { onSuccess: () => setAddModalOpen(false) })
        }
      />

      {/* Preview */}
      <PreviewModal post={previewPost} onClose={() => setPreviewPost(null)} />

      {/* Edit */}
      <EditModal
        post={editPost}
        onClose={() => setEditPost(null)}
        onSave={handleSaveEdit}
        isSaving={isUpdating}
      />

      {/* Delete confirm */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="حذف مقال"
        message="هل أنت متأكد من رغبتك في حذف هذا المقال؟ هذا الإجراء لا يمكن التراجع عنه."
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        confirmLabel={isDeleting ? "جاري الحذف..." : "حذف نهائياً"}
      />
    </div>
  );
}
