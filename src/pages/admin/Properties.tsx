"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, Trash2, Eye, Star } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { showToast } from "@/components/shared/Toast";
import {
  useDeleteProperty,
  useFeatureProperty,
  useGetProperties,
  useUpdatePropertyStatus,
} from "@/hooks/admin/Useproperties";
import { Property, PropertyStatus } from "@/services/admin/Propertiesservice";
import PropertyDetailsModal from "@/components/admin/Propertydetailsmodal";

const TYPE_MAP: Record<string, string> = {
  apartment: "شقة",
  villa: "فيلا",
  land: "أرض",
  office: "مكتب",
  shop: "محل تجاري",
  warehouse: "مستودع",
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(price);

export default function Properties() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { mutate: toggleFeature, isPending: isToggling } = useFeatureProperty();
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdatePropertyStatus();
  const { mutate: deleteProperty, isPending: isDeleting } = useDeleteProperty();

  // عدّل confirmDelete
  const confirmDelete = () => {
    if (itemToDelete) deleteProperty(itemToDelete);
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );

  const { data, isLoading, isError } = useGetProperties({
    page,
    limit: 10,
    search: searchTerm || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    type: typeFilter !== "all" ? typeFilter : undefined,
  });

  const properties = data?.data.properties ?? [];
  const pagination = data?.data.pagination;

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  // ─── Columns ───────────────────────────────────────────────────────────────

  const columns = [
    {
      header: "العقار",
      render: (item: Property) => (
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded overflow-hidden shrink-0 border border-gray-100">
            {item.images[0] ? (
              <Image
                src={item.images[0]}
                alt={item.title}
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
              title={item.title}
            >
              {item.title}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {item.district}، {item.city}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "المطور",
      render: (item: Property) => (
        <span className="text-sm font-medium">
          {item.developer.companyName}
        </span>
      ),
    },
    {
      header: "النوع",
      render: (item: Property) => (
        <span className="text-sm">{TYPE_MAP[item.type] ?? item.type}</span>
      ),
    },
    {
      header: "السعر",
      render: (item: Property) => (
        <span className="font-bold text-[var(--secondary)]">
          {formatPrice(item.price)}
        </span>
      ),
    },
    {
      header: "حالة العقار",
      render: (item: Property) => <StatusBadge status={item.status} />,
    },
    {
      header: "حالة النشر",
      render: (item: Property) => <StatusBadge status={item.approvalStatus} />,
    },

    {
      header: "تاريخ الإضافة",
      render: (item: Property) => (
        <p className="text-sm text-gray-500">
          {new Date(item.createdAt).toLocaleDateString("ar-EG")}
        </p>
      ),
    },
    {
      header: "مميز",
      render: (item: Property) => (
        <input
          type="checkbox"
          checked={item.isFeatured}
          disabled={isToggling}
          onChange={() => toggleFeature(item.id)}
          className="w-4 h-4 accent-[var(--primary)] cursor-pointer disabled:opacity-50"
        />
      ),
    },
    {
      header: "حالة العقار",
      render: (item: Property) => (
        <select
          value={item.status}
          disabled={isUpdatingStatus}
          onChange={(e) =>
            updateStatus({
              id: item.id,
              status: e.target.value as PropertyStatus,
            })
          }
          className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[var(--primary)] disabled:opacity-50 bg-white"
        >
          <option value="available">متاح</option>
          <option value="reserved">محجوز</option>
          <option value="sold">مباع</option>
        </select>
      ),
    },

    {
      header: "إجراءات",
      render: (item: Property) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedPropertyId(item.id)}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="عرض التفاصيل"
          >
            <Eye size={18} />
          </button>
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

  // ─── States ────────────────────────────────────────────────────────────────

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

  // ─── Render ────────────────────────────────────────────────────────────────

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
              placeholder="بحث باسم العقار، المطور..."
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
            className="bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-[var(--primary)] sm:w-40"
          >
            <option value="all">كل الحالات</option>
            <option value="available">متاح</option>
            <option value="reserved">محجوز</option>
            <option value="sold">مباع</option>
            <option value="pending">قيد المراجعة</option>
            <option value="approved">معتمد</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            className="bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-[var(--primary)] sm:w-40"
          >
            <option value="all">كل الأنواع</option>
            {Object.entries(TYPE_MAP).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          data={properties}
          columns={columns}
          keyExtractor={(item) => item.id}
        />

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>
            عرض {properties.length} من {pagination?.total ?? 0} عقار
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

      {/* Property Details Modal */}
      <PropertyDetailsModal
        propertyId={selectedPropertyId}
        onClose={() => setSelectedPropertyId(null)}
      />

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="حذف عقار"
        message="هل أنت متأكد من رغبتك في حذف هذا العقار؟ هذا الإجراء لا يمكن التراجع عنه."
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
