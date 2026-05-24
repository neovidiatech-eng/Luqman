"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Trash2, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmModal from "@/components/shared/ConfirmModal";
import {
  useDeleteDeveloper,
  useGetDevelopers,
  useToggleDeveloperStatus,
} from "@/hooks/admin/usedevelopers";
import { Developer } from "@/services/admin/Developersservice";

const PLACEHOLDER_LOGO = "/images/placeholder-company.png";

export default function Developers() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const { mutate: deleteDeveloper, isPending: isDeleting } =
    useDeleteDeveloper();

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteDeveloper(itemToDelete);
    }
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };
  const { data, isLoading, isError } = useGetDevelopers({
    page,
    limit: 10,
    search: searchTerm || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const { mutate: toggleStatus, isPending: isToggling } =
    useToggleDeveloperStatus();

  const developers = data?.data.developers ?? [];
  const pagination = data?.data.pagination;

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const columns = [
    {
      header: "المطور العقاري",
      render: (item: Developer) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
            <Image
              src={item.logoUrl ?? PLACEHOLDER_LOGO}
              alt={item.companyName}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <p className="font-bold text-sm text-[var(--text)]">
              {item.companyName}
            </p>
            <a
              href={item.commercialRegFile}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-500 hover:underline font-mono"
            >
              السجل التجاري
            </a>
          </div>
        </div>
      ),
    },
    {
      header: "تاريخ التسجيل",
      render: (item: Developer) => (
        <p className="text-sm text-gray-500">
          {new Date(item.createdAt).toLocaleDateString("ar-EG")}
        </p>
      ),
    },
    {
      header: "التواصل",
      render: (item: Developer) => (
        <div>
          <p className="text-sm">{item.email}</p>
          <p className="text-xs text-gray-500" dir="ltr">
            {item.phone}
          </p>
        </div>
      ),
    },
    {
      header: "حالة الحساب",
      render: (item: Developer) => <StatusBadge status={item.accountStatus} />,
    },
    {
      header: "إجراءات",
      render: (item: Developer) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/developers/${item.id}`}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="عرض الملف"
          >
            <Eye size={18} />
          </Link>

          <button
            onClick={() =>
              toggleStatus({ id: item.id, currentStatus: item.accountStatus })
            }
            disabled={isToggling}
            className={`p-1.5 rounded cursor-pointer transition-colors disabled:opacity-50 ${
              item.accountStatus === "active"
                ? "text-orange-600 hover:bg-orange-50"
                : "text-green-600 hover:bg-green-50"
            }`}
            title={
              item.accountStatus === "active" ? "إيقاف الحساب" : "تفعيل الحساب"
            }
          >
            {item.accountStatus === "active" ? (
              <ToggleRight size={18} />
            ) : (
              <ToggleLeft size={18} />
            )}
          </button>

          <button
            onClick={() => handleDeleteClick(item.id)}
            className="p-1.5 text-red-600 cursor-pointer hover:bg-red-50 rounded transition-colors"
            title="حذف المطور"
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
              placeholder="بحث باسم الشركة، البريد..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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
            <option value="active">نشط</option>
            <option value="pending">بانتظار الموافقة</option>
            <option value="suspended">موقوف</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          data={developers}
          columns={columns}
          keyExtractor={(item) => item.id}
        />
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>
            عرض {developers.length} من {pagination?.total ?? 0} مطور
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
        title="حذف مطور"
        message="هل أنت متأكد من رغبتك في حذف هذا المطور؟ سيتم إخفاء جميع عقاراته المرتبطة به. هذا الإجراء لا يمكن التراجع عنه."
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
