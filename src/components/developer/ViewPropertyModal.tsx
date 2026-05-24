"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Building2,
  BedDouble,
  Bath,
  Layers,
  DollarSign,
  SquareStack,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Star,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Property } from "@/services/developer/Propertiesservice";
import { propertyTypes } from "@/lib/mock-data";
import { useGetDeveloperProjects } from "@/hooks/deveoper/Useprojects";

// ─── Label Maps ───────────────────────────────────────────────────────────────

const approvalColor: Record<string, string> = {
  approved: "text-emerald-600 bg-emerald-50 border-emerald-200",
  rejected: "text-red-600 bg-red-50 border-red-200",
  pending: "text-amber-600 bg-amber-50 border-amber-200",
};

const approvalIcon: Record<string, React.ReactNode> = {
  approved: <CheckCircle2 size={14} />,
  rejected: <XCircle size={14} />,
  pending: <Clock size={14} />,
};

const approvalLabel: Record<string, string> = {
  approved: "مقبول",
  rejected: "مرفوض",
  pending: "قيد المراجعة",
};

const statusLabel: Record<string, string> = {
  available: "متاح",
  sold: "مباع",
  reserved: "محجوز",
};

const statusColor: Record<string, string> = {
  available: "text-emerald-600 bg-emerald-50 border-emerald-200",
  sold: "text-slate-600 bg-slate-50 border-slate-200",
  reserved: "text-blue-600 bg-blue-50 border-blue-200",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ViewPropertyModal({
  property,
  onClose,
}: {
  property: Property;
  onClose: () => void;
}) {
  const typeLabel =
    propertyTypes.find((t) => t.value === property.type)?.label ??
    property.type;
  const { data: projectsData } = useGetDeveloperProjects({ limit: 100 });
  const projectName = projectsData?.data?.projects.find(
    (p) => p.id === property.projectId,
  )?.name;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        {property.images?.[0] ? (
          <div className="relative h-56 rounded-t-[2rem] overflow-hidden">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
            >
              <X size={18} />
            </button>
            <div className="absolute bottom-4 right-4">
              <h2 className="text-xl font-black text-white drop-shadow">
                {property.title}
              </h2>
              <p className="text-xs text-white/80 font-medium mt-0.5">
                {typeLabel}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--bg)] rounded-xl text-[var(--primary)]">
                <Building2 size={18} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[var(--primary)]">
                  {property.title}
                </h2>
                <p className="text-xs text-[var(--text-muted)]">{typeLabel}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[var(--bg)] transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="p-8 space-y-6">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${approvalColor[property.approvalStatus]}`}
            >
              {approvalIcon[property.approvalStatus]}
              {approvalLabel[property.approvalStatus]}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${statusColor[property.status]}`}
            >
              {statusLabel[property.status]}
            </span>
            {property.isFeatured && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                <Star size={12} fill="currentColor" /> مميز
              </span>
            )}
          </div>

          {/* Rejection Reason */}
          {property.approvalStatus === "rejected" &&
            property.rejectionReason && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <AlertTriangle
                  size={18}
                  className="text-red-500 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="text-xs font-black text-red-700 mb-1">
                    سبب الرفض
                  </p>
                  <p className="text-sm text-red-600">
                    {property.rejectionReason}
                  </p>
                </div>
              </div>
            )}

          {/* Description */}
          <div>
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">
              وصف العقار
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin
              size={16}
              className="text-[var(--secondary)] mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="text-xs font-bold text-[var(--primary)]">
                {property.city} — {property.district}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {property.address}
              </p>
            </div>
          </div>
          {property.projectId && (
            <div className="flex items-center gap-2 p-3 bg-[var(--bg)] rounded-2xl border border-[var(--border)]">
              <Building2 size={15} className="text-[var(--primary)]" />
              <div>
                <p className="text-[10px] font-black text-[var(--text-muted)]">
                  تابع لمشروع
                </p>
                <p className="text-sm font-bold text-[var(--primary)]">
                  {projectName ?? "..."}
                </p>
              </div>
            </div>
          )}
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              {
                label: "السعر",
                value: formatPrice(property.price),
                icon: <DollarSign size={14} />,
              },
              {
                label: "المساحة",
                value: `${property.area} م²`,
                icon: <SquareStack size={14} />,
              },
              {
                label: "النوع",
                value: typeLabel,
                icon: <Building2 size={14} />,
              },
              ...(property.bedrooms != null
                ? [
                    {
                      label: "غرف النوم",
                      value: `${property.bedrooms} غرف`,
                      icon: <BedDouble size={14} />,
                    },
                  ]
                : []),
              ...(property.bathrooms != null
                ? [
                    {
                      label: "دورات المياه",
                      value: `${property.bathrooms}`,
                      icon: <Bath size={14} />,
                    },
                  ]
                : []),
              ...(property.floor != null
                ? [
                    {
                      label: "الطابق",
                      value: `الطابق ${property.floor}`,
                      icon: <Layers size={14} />,
                    },
                  ]
                : []),
            ].map(({ label, value, icon }) => (
              <div
                key={label}
                className="bg-[var(--bg)] rounded-2xl p-4 space-y-1 border border-[var(--border)]"
              >
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] font-bold">
                  {icon}
                  <span>{label}</span>
                </div>
                <p className="text-sm font-black text-[var(--primary)]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Extra Images */}
          {property.images?.length > 1 && (
            <div>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-3">
                صور إضافية
              </p>
              <div className="grid grid-cols-3 gap-3">
                {property.images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="relative h-24 rounded-xl overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`صورة ${i + 2}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="flex gap-4 text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
            <span>
              تاريخ الإضافة:{" "}
              <strong className="text-[var(--primary)]" dir="ltr">
                {new Date(property.createdAt).toLocaleDateString("ar-EG")}
              </strong>
            </span>
            <span>
              آخر تحديث:{" "}
              <strong className="text-[var(--primary)]" dir="ltr">
                {new Date(property.updatedAt).toLocaleDateString("ar-EG")}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
