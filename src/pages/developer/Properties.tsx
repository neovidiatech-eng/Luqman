"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  MapPin,
  Building2,
  ChevronDown,
  RefreshCcw,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import StatusBadge from "@/components/developer/StatusBadge";
import ConfirmModal from "@/components/shared/ConfirmModal";
import {
  PROPERTY_TYPE_OPTIONS as propertyTypes,
  SAUDI_CITIES as saudiCities,
} from "@/services/developer/Propertiesservice";
import { formatPrice } from "@/lib/utils";
import {
  useGetDeveloperProperties,
  useDeleteDeveloperProperty,
  useResubmitDeveloperProperty,
} from "@/hooks/deveoper/Useproperties";
import {
  GetPropertiesParams,
  Property,
} from "@/services/developer/Propertiesservice";
import { ViewPropertyModal } from "@/components/developer/ViewPropertyModal";
import { EditPropertyModal } from "@/components/developer/EditPropertyModal";

export default function Properties() {
  const [filters, setFilters] = useState<GetPropertiesParams>({
    page: 1,
    limit: 10,
  });
  const [searchInput, setSearchInput] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  // ─── Modals State ─────────────────────────────────────────────────────────
  const [viewProperty, setViewProperty] = useState<Property | null>(null);
  const [editProperty, setEditProperty] = useState<Property | null>(null);

  const { data, isLoading, isError } = useGetDeveloperProperties(filters);
  const { mutate: deleteProperty, isPending: isDeleting } =
    useDeleteDeveloperProperty();
  const { mutate: resubmitProperty, isPending: isResubmitting } =
    useResubmitDeveloperProperty();
  const properties = data?.data?.properties ?? [];
  const pagination = data?.data?.pagination;

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setFilters((prev) => ({ ...prev, search: searchInput, page: 1 }));
    }
  };

  const handleFilterChange = (
    key: keyof GetPropertiesParams,
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined, // ← "" تبقى undefined مش string فاضية
      page: 1,
    }));
  };

  const handleDeleteClick = (id: string) => {
    setPropertyToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (propertyToDelete) {
      deleteProperty(propertyToDelete, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setPropertyToDelete(null);
        },
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-[var(--primary)] mb-2">
            إدارة العقارات
          </h1>
          <p className="text-[var(--text-muted)] font-medium">
            يمكنك إضافة، تعديل ومتابعة حالة عقاراتك هنا
          </p>
        </div>
        <Link
          href="/developer/properties/add"
          className="bg-[var(--primary)] text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all"
        >
          <Plus size={20} />
          <span>إضافة عقار جديد</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Approval Status Filter */}
        <div className="relative">
          <select
            className="w-full h-full bg-[var(--bg)] px-4 py-2.5 rounded-xl border border-[var(--border)] appearance-none text-sm font-bold text-[var(--primary)] outline-none focus:border-[var(--secondary)] transition-all cursor-pointer"
            value={filters.approvalStatus ?? ""}
            onChange={(e) =>
              handleFilterChange("approvalStatus", e.target.value)
            }
          >
            <option value="">كل حالات الاعتماد</option>
            <option value="approved">منشور (مقبول)</option>
            <option value="pending">قيد المراجعة</option>
            <option value="rejected">مرفوض</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]"
          />
        </div>

        {/* Property Status Filter */}
        <div className="relative">
          <select
            className="w-full h-full bg-[var(--bg)] px-4 py-2.5 rounded-xl border border-[var(--border)] appearance-none text-sm font-bold text-[var(--primary)] outline-none focus:border-[var(--secondary)] transition-all cursor-pointer"
            value={filters.status ?? ""}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">كل حالات العقار</option>
            <option value="available">متاح</option>
            <option value="reserved">محجوز</option>
            <option value="sold">مباع</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]/50 text-[var(--text-muted)] text-[11px] font-black uppercase tracking-widest border-b border-[var(--border)]">
                <th className="px-8 py-5">العقار</th>
                <th className="px-4 py-5">الموقع</th>
                <th className="px-4 py-5">النوع</th>
                <th className="px-4 py-5">السعر</th>
                <th className="px-4 py-5">الحالة</th>
                <th className="px-4 py-5">التاريخ</th>
                <th className="px-8 py-5 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-8 py-20 text-center text-red-500 font-bold"
                  >
                    حدث خطأ في تحميل البيانات، حاول مرة أخرى.
                  </td>
                </tr>
              ) : properties.length > 0 ? (
                properties.map((prop) => (
                  <tr
                    key={prop.id}
                    className="group hover:bg-slate-50/70 transition-all duration-300"
                  >
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-[var(--border)]">
                          {prop.images?.[0] ? (
                            <Image
                              src={prop.images[0]}
                              alt=""
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                              لا صورة
                            </div>
                          )}
                          {prop.status === "sold" && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[10px] font-bold">
                              بـيـع
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                          <span className="text-sm font-bold text-[var(--primary)] truncate group-hover:text-[var(--secondary)] transition-colors">
                            {prop.title}
                          </span>
                          {prop.approvalStatus === "rejected" &&
                            prop.rejectionReason && (
                              <div className="flex items-start gap-1.5 mt-1 bg-red-50 border border-red-100 px-2 py-1 rounded-lg">
                                <AlertTriangle
                                  size={12}
                                  className="text-red-500 mt-0.5 shrink-0"
                                />
                                <span className="text-[10px] text-red-600 font-medium line-clamp-2">
                                  {prop.rejectionReason}
                                </span>
                              </div>
                            )}
                          <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-medium">
                            <span className="bg-slate-100 px-2 py-0.5 rounded-md">
                              {prop.area} م²
                            </span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span>{prop.bedrooms} غرف</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-bold">
                        <MapPin size={14} className="text-[var(--secondary)]" />
                        <span>{prop.city}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-[var(--primary)] font-bold">
                        <Building2 size={14} className="opacity-50" />
                        <span>
                          {
                            propertyTypes.find((t) => t.value === prop.type)
                              ?.label
                          }
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-black text-[var(--primary)]">
                        {formatPrice(prop.price)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={prop.approvalStatus} />
                    </td>
                    <td
                      className="px-4 py-4 text-[10px] text-[var(--text-muted)] font-bold"
                      dir="ltr"
                    >
                      {new Date(prop.createdAt).toLocaleDateString("ar-SA")}
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* زر المعاينة → يفتح ViewPropertyModal */}
                        <button
                          onClick={() => setViewProperty(prop)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
                          title="معاينة"
                        >
                          <Eye size={16} />
                        </button>
                        {/* زر التعديل → يفتح EditPropertyModal */}
                        <button
                          onClick={() =>
                            prop.approvalStatus !== "approved" &&
                            setEditProperty(prop)
                          }
                          disabled={prop.approvalStatus === "approved"}
                          className={`p-2 rounded-lg transition-colors border
    ${
      prop.approvalStatus === "approved"
        ? "text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
        : "text-amber-600 border-amber-100 hover:bg-amber-50"
    }`}
                          title={
                            prop.approvalStatus === "approved"
                              ? "لا يمكن تعديل عقار مقبول"
                              : "تعديل"
                          }
                        >
                          <Edit2 size={16} />
                        </button>
                        {prop.approvalStatus === "rejected" && (
                          <button
                            onClick={() => resubmitProperty({ id: prop.id })}
                            disabled={isResubmitting}
                            className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors border border-amber-100 disabled:opacity-50"
                            title="إعادة التقديم"
                          >
                            {isResubmitting ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <RefreshCcw size={16} />
                            )}
                          </button>
                        )}
                        <button
                          onClick={() =>
                            prop.approvalStatus !== "approved" &&
                            handleDeleteClick(prop.id)
                          }
                          disabled={prop.approvalStatus === "approved"}
                          className={`p-2 rounded-lg transition-colors border
    ${
      prop.approvalStatus === "approved"
        ? "text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
        : "text-red-600 border-red-100 hover:bg-red-50"
    }`}
                          title={
                            prop.approvalStatus === "approved"
                              ? "لا يمكن حذف عقار مقبول"
                              : "حذف"
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-8 py-20 text-center text-[var(--text-muted)] font-bold italic"
                  >
                    لا يوجد نتائج تطابق بحثك...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-8 py-4 border-t border-[var(--border)]">
            <span className="text-xs text-[var(--text-muted)] font-medium">
              إجمالي النتائج: {pagination.total}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={!pagination.hasPrevPage}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    page: (prev.page ?? 1) - 1,
                  }))
                }
                className="px-3 py-1.5 rounded-lg text-sm font-bold border border-[var(--border)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                السابق
              </button>
              <span className="text-sm font-bold text-[var(--primary)]">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                disabled={!pagination.hasNextPage}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    page: (prev.page ?? 1) + 1,
                  }))
                }
                className="px-3 py-1.5 rounded-lg text-sm font-bold border border-[var(--border)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {viewProperty && (
        <ViewPropertyModal
          property={viewProperty}
          onClose={() => setViewProperty(null)}
        />
      )}

      {editProperty && (
        <EditPropertyModal
          property={editProperty}
          onClose={() => setEditProperty(null)}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setPropertyToDelete(null);
        }}
        message="هل أنت متأكد من حذف هذا العقار؟ هذا الإجراء لا يمكن التراجع عنه."
      />
    </div>
  );
}
