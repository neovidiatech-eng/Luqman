"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, Trash2 } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { formatPrice } from "@/lib/utils";
import {
  useGetProjects,
  useFeatureProject,
  useDeleteProject,
} from "@/hooks/admin/Useprojects";
import { Project } from "@/services/admin/Projectsservice";

export default function Projects() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetProjects({
    page,
    limit: 10,
    search: searchTerm || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const { mutate: featureProject, isPending: isFeturing } = useFeatureProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const projects = data?.data.projects ?? [];
  const pagination = data?.data.pagination;

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) deleteProject(itemToDelete);
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const columns = [
    {
      header: "المشروع",
      render: (item: Project) => (
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded overflow-hidden shrink-0 border border-gray-100">
            {item.images[0] ? (
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                لا صورة
              </div>
            )}
          </div>
          <div className="max-w-[180px]">
            <p
              className="font-bold text-sm text-[var(--text)] truncate"
              title={item.name}
            >
              {item.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{item.city}</p>
          </div>
        </div>
      ),
    },
    {
      header: "المطور",
      render: (item: Project) => (
        <span className="text-sm font-medium">
          {item.developer.companyName}
        </span>
      ),
    },
    {
      header: "نسبة الإنجاز",
      render: (item: Project) => (
        <div className="w-24">
          <span className="text-xs">{item.completionPercent}%</span>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-[var(--secondary)] rounded-full"
              style={{ width: `${item.completionPercent}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      header: "الوحدات",
      render: (item: Project) => (
        <span className="text-sm font-medium">{item.totalUnits} وحدة</span>
      ),
    },
    {
      header: "يبدأ من",
      render: (item: Project) => (
        <span className="font-bold text-[var(--secondary)]">
          {formatPrice(item.startingPrice)}
        </span>
      ),
    },
    {
      header: "حالة المشروع",
      render: (item: Project) => <StatusBadge status={item.status} />,
    },
    {
      header: "حالة النشر",
      render: (item: Project) => <StatusBadge status={item.approvalStatus} />,
    },
    {
      header: "مميز",
      render: (item: Project) => (
        <input
          type="checkbox"
          checked={item.isFeatured}
          disabled={isFeturing}
          onChange={() => featureProject(item.id)}
          className="w-4 h-4 accent-[var(--primary)] cursor-pointer disabled:opacity-50"
        />
      ),
    },
    {
      header: "إجراءات",
      render: (item: Project) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDeleteClick(item.id)}
            disabled={isDeleting}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
            title="حذف"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        جاري التحميل...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        حدث خطأ في تحميل البيانات
      </div>
    );
  }

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
              placeholder="بحث باسم المشروع، المطور، المدينة..."
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
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-[var(--primary)] sm:w-48"
          >
            <option value="all">كل الحالات</option>
            <option value="development">قيد التطوير</option>
            <option value="under_construction">قيد الإنشاء</option>
            <option value="completed">مكتمل</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          data={projects}
          columns={columns}
          keyExtractor={(item) => item.id}
        />
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>
            عرض {projects.length} من {pagination?.total ?? 0} مشروع
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={!pagination?.hasPrevPage}
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              السابق
            </button>
            <button className="px-3 py-1 bg-[var(--primary)] text-white rounded">
              {pagination?.page ?? 1}
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination?.hasNextPage}
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              التالي
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="حذف مشروع"
        message="هل أنت متأكد من رغبتك في حذف هذا المشروع؟ هذا الإجراء لا يمكن التراجع عنه."
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
