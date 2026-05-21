"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Phone,
  Calendar,
  Building2,
  Home,
  MapPin,
  Star,
  TrendingUp,
  BedDouble,
  Bath,
  Maximize2,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import DataTable from "@/components/admin/DataTable";
import { formatDate, formatPrice } from "@/lib/utils";
import { useGetDeveloperProfile } from "@/hooks/admin/usedevelopers";
import {
  DeveloperProperty,
  DeveloperProject,
} from "@/services/admin/Developersservice";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl bg-gray-100 ${className ?? ""}`} />
);

const projectStatusMap: Record<string, { label: string; color: string }> = {
  under_development: {
    label: "تحت التطوير",
    color: "bg-blue-100 text-blue-700",
  },
  under_construction: {
    label: "تحت الإنشاء",
    color: "bg-amber-100 text-amber-700",
  },
  completed: { label: "مكتمل", color: "bg-green-100 text-green-700" },
};

const typeLabel: Record<string, string> = {
  villa: "فيلا",
  apartment: "شقة",
  duplex: "دوبلكس",
  studio: "ستوديو",
};

// ─── Projects columns ─────────────────────────────────────────────────────────

const projectColumns = [
  {
    header: "المشروع",
    render: (item: DeveloperProject) => (
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
          {item.images[0] ? (
            <Image
              src={item.images[0]}
              alt={item.name}
              fill
              className="object-cover"
              sizes="48px"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 size={18} className="text-gray-300" />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-sm text-[var(--text)]">
              {item.name}
            </p>
            {item.isFeatured && (
              <Star
                size={12}
                className="text-amber-400 shrink-0 fill-amber-400"
              />
            )}
          </div>
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
            <MapPin size={10} /> {item.city}
          </p>
        </div>
      </div>
    ),
  },
  {
    header: "الحالة",
    render: (item: DeveloperProject) => {
      const s = projectStatusMap[item.status] ?? {
        label: item.status,
        color: "bg-gray-100 text-gray-600",
      };
      return (
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${s.color}`}
        >
          {s.label}
        </span>
      );
    },
  },
  {
    header: "الإنجاز",
    render: (item: DeveloperProject) => (
      <div className="w-24">
        <p className="text-xs font-semibold text-[var(--primary)] mb-1">
          {item.completionPercent}%
        </p>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-[var(--primary)] h-1.5 rounded-full"
            style={{ width: `${item.completionPercent}%` }}
          />
        </div>
      </div>
    ),
  },
  {
    header: "الوحدات",
    render: (item: DeveloperProject) => (
      <p className="text-sm font-medium text-[var(--text)]">
        {item.totalUnits}
      </p>
    ),
  },
  {
    header: "السعر يبدأ من",
    render: (item: DeveloperProject) => (
      <p className="font-bold text-[var(--secondary)] text-sm whitespace-nowrap">
        {formatPrice(item.startingPrice)}
      </p>
    ),
  },
  {
    header: "التسليم",
    render: (item: DeveloperProject) => (
      <p className="text-sm text-gray-500 whitespace-nowrap">
        {formatDate(item.deliveryDate)}
      </p>
    ),
  },
];

// ─── Properties columns ───────────────────────────────────────────────────────

const propertyColumns = [
  {
    header: "العقار",
    render: (item: DeveloperProperty) => (
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
          {item.images?.[0] ? (
            <Image
              src={item.images[0]}
              alt={item.title}
              fill
              className="object-cover"
              sizes="48px"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Home size={18} className="text-gray-300" />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-sm text-[var(--text)] max-w-[160px] truncate">
              {item.title}
            </p>
            {item.isFeatured && (
              <Star
                size={12}
                className="text-amber-400 shrink-0 fill-amber-400"
              />
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            {item.district}، {item.city}
          </p>
        </div>
      </div>
    ),
  },
  {
    header: "النوع",
    render: (item: DeveloperProperty) => (
      <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
        {typeLabel[item.type] ?? item.type}
      </span>
    ),
  },
  {
    header: "المواصفات",
    render: (item: DeveloperProperty) => (
      <div className="flex flex-col gap-1 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <BedDouble size={12} className="text-gray-400" />
          {item.bedrooms} غرف نوم
        </span>
        <span className="flex items-center gap-1.5">
          <Bath size={12} className="text-gray-400" />
          {item.bathrooms} حمام
        </span>
        <span className="flex items-center gap-1.5">
          <Maximize2 size={12} className="text-gray-400" />
          {item.area} م²
          {item.floor ? ` — دور ${item.floor}` : ""}
        </span>
      </div>
    ),
  },
  {
    header: "السعر",
    render: (item: DeveloperProperty) => (
      <p className="font-bold text-[var(--secondary)] text-sm whitespace-nowrap">
        {formatPrice(item.price)}
      </p>
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
      <p className="text-sm text-gray-500 whitespace-nowrap">
        {formatDate(item.createdAt)}
      </p>
    ),
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DeveloperProfile({ id }: { id: string }) {
  const { data, isLoading, isError } = useGetDeveloperProfile(id);
  const [activeTab, setActiveTab] = useState<"projects" | "properties">(
    "projects",
  );

  const developer = data?.developer;
  const projects: DeveloperProject[] = data?.projects ?? [];
  const properties: DeveloperProperty[] = data?.properties ?? [];

  return (
    <div className="space-y-6" dir="rtl">
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

      {isError && (
        <div className="p-8 text-center text-red-500">
          حدث خطأ في تحميل بيانات المطور
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── Sidebar ─── */}
        <div className="lg:col-span-1 space-y-4">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
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

            {isLoading ? (
              <Skeleton className="h-6 w-2/3 mx-auto mb-6" />
            ) : (
              <h3 className="font-bold text-xl text-[var(--text)] mb-6">
                {developer?.companyName}
              </h3>
            )}

            <div className="space-y-4 text-sm text-right border-t border-gray-100 pt-5">
              {isLoading ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))
              ) : (
                <>
                  {developer?.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={17} className="text-gray-400 shrink-0" />
                      <div>
                        <p className="text-gray-400 text-xs">رقم الهاتف</p>
                        <a
                          href={`tel:${developer.phone}`}
                          className="font-medium text-[var(--text)] hover:text-[var(--primary)] transition-colors"
                          dir="ltr"
                        >
                          {developer.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Calendar size={17} className="text-gray-400 shrink-0" />
                    <div>
                      <p className="text-gray-400 text-xs">تاريخ الانضمام</p>
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
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: Building2,
                label: "المشاريع",
                value: developer?._count?.projects ?? 0,
              },
              {
                icon: Home,
                label: "العقارات",
                value: developer?._count?.properties ?? 0,
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center"
              >
                {isLoading ? (
                  <Skeleton className="h-12 w-full" />
                ) : (
                  <>
                    <p className="text-2xl font-bold text-[var(--primary)]">
                      {value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                      <Icon size={12} /> {label}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Avg completion */}
          {!isLoading && projects.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <TrendingUp size={13} /> متوسط نسبة الإنجاز
                </p>
                <p className="text-sm font-bold text-[var(--primary)]">
                  {Math.round(
                    projects.reduce((a, p) => a + p.completionPercent, 0) /
                      projects.length,
                  )}
                  %
                </p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[var(--primary)] h-2 rounded-full"
                  style={{
                    width: `${Math.round(projects.reduce((a, p) => a + p.completionPercent, 0) / projects.length)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ─── Main Content ─── */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {(["projects", "properties"] as const).map((tab) => {
                const isActive = activeTab === tab;
                const count =
                  tab === "projects" ? projects.length : properties.length;
                const label = tab === "projects" ? "المشاريع" : "العقارات";
                const Icon = tab === "projects" ? Building2 : Home;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                      isActive
                        ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                    <span className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Content */}
            {isLoading ? (
              <div className="p-6 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : activeTab === "projects" ? (
              projects.length === 0 ? (
                <div className="p-10 text-center text-gray-400">
                  <Building2 size={32} className="mx-auto mb-2 opacity-20" />
                  <p className="text-sm">لا توجد مشاريع مضافة لهذا المطور</p>
                </div>
              ) : (
                <DataTable
                  data={projects}
                  columns={projectColumns}
                  keyExtractor={(item) => item.id}
                />
              )
            ) : properties.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                <Home size={32} className="mx-auto mb-2 opacity-20" />
                <p className="text-sm">لا توجد عقارات مضافة لهذا المطور</p>
              </div>
            ) : (
              <DataTable
                data={properties}
                columns={propertyColumns}
                keyExtractor={(item) => item.id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
