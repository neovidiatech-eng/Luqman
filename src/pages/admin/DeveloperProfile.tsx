"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Phone,
  FileText,
  Calendar,
  Building,
  ExternalLink,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import DataTable from "@/components/admin/DataTable";
import { formatDate, formatPrice } from "@/lib/utils";
import { useGetDeveloperProfile } from "@/hooks/admin/usedevelopers";
import { DeveloperProperty } from "@/services/admin/Developersservice";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl bg-gray-100 ${className ?? ""}`} />
);

export default function DeveloperProfile({ id }: { id: string }) {
  const { data: developer, isLoading, isError } = useGetDeveloperProfile(id);

  const columns = [
    {
      header: "العقار",
      render: (item: DeveloperProperty) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded overflow-hidden shrink-0 border border-gray-100">
            <Image
              src={item.images[0]}
              alt={item.title}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="max-w-[200px]">
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
      header: "النوع",
      render: (item: DeveloperProperty) => (
        <span className="text-sm font-medium">{item.type}</span>
      ),
    },
    {
      header: "السعر",
      render: (item: DeveloperProperty) => (
        <span className="font-bold text-[var(--secondary)]">
          {formatPrice(item.price)}
        </span>
      ),
    },
    {
      header: "الحالة",
      render: (item: DeveloperProperty) => (
        <StatusBadge status={item.approvalStatus} />
      ),
    },
    {
      header: "تاريخ الإضافة",
      render: (item: DeveloperProperty) => (
        <span className="text-sm text-gray-500">
          {formatDate(item.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/developers"
          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-500 transition-colors"
        >
          <ArrowRight size={20} />
        </Link>
        <h2 className="text-xl font-bold text-[var(--text)]">ملف المطور</h2>
      </div>

      {/* Error */}
      {isError && (
        <div className="p-8 text-center text-red-500">
          حدث خطأ في تحميل بيانات المطور
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── Sidebar ─── */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            {/* Logo */}
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-50 bg-gray-100 flex items-center justify-center">
              {isLoading ? (
                <Skeleton className="w-full h-full rounded-full" />
              ) : developer?.logoUrl ? (
                <Image
                  src={developer.logoUrl}
                  alt={developer.companyName}
                  fill
                  className="object-cover"
                  sizes="96px"
                  unoptimized
                />
              ) : (
                <span className="text-2xl font-black text-gray-400">
                  {developer?.companyName?.charAt(0) ?? "؟"}
                </span>
              )}
            </div>

            {/* Name + Status */}
            {isLoading ? (
              <>
                <Skeleton className="h-6 w-2/3 mx-auto mb-3" />
                <Skeleton className="h-5 w-1/3 mx-auto mb-6" />
              </>
            ) : (
              <>
                <h3 className="font-bold text-xl text-[var(--text)] mb-2">
                  {developer?.companyName}
                </h3>
                <div className="mb-6">
                  <StatusBadge status={developer?.accountStatus ?? ""} />
                </div>
              </>
            )}

            {/* Contact icons */}
            {!isLoading && developer && (
              <div className="flex justify-center gap-2 mb-6">
                <a
                  href={`mailto:${developer.email}`}
                  className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Mail size={18} />
                </a>
                <a
                  href={`tel:${developer.phone}`}
                  className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Phone size={18} />
                </a>
              </div>
            )}

            {/* Details list */}
            <div className="space-y-4 text-sm text-right border-t border-gray-100 pt-6">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))
              ) : (
                <>
                  {developer?.commercialRegFile && (
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-gray-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-gray-500">السجل التجاري</p>
                        <a
                          href={developer.commercialRegFile}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-blue-500 hover:underline font-medium text-xs"
                        >
                          عرض الملف
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gray-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-gray-500">البريد الإلكتروني</p>
                      <p
                        className="font-medium text-[var(--text)] truncate"
                        dir="ltr"
                      >
                        {developer?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-400 shrink-0" />
                    <div>
                      <p className="text-gray-500">رقم الهاتف</p>
                      <p className="font-medium text-[var(--text)]" dir="ltr">
                        {developer?.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-gray-400 shrink-0" />
                    <div>
                      <p className="text-gray-500">تاريخ الانضمام</p>
                      <p className="font-medium text-[var(--text)]">
                        {developer?.createdAt
                          ? formatDate(developer.createdAt)
                          : "—"}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            {isLoading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Building size={20} className="text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-[var(--primary)]">
                    {developer?._count?.properties ?? 0}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    إجمالي العقارات
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── Properties Table ─── */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-lg text-[var(--text)]">
                عقارات المطور
              </h3>
            </div>

            {isLoading ? (
              <div className="p-6 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : (developer?.properties?.length ?? 0) === 0 ? (
              <div className="p-8 text-center text-gray-500">
                لا توجد عقارات مضافة لهذا المطور
              </div>
            ) : (
              <DataTable
                data={developer!.properties}
                columns={columns}
                keyExtractor={(item) => item.id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
