"use client";
import Image from "next/image";
import {
  X,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Layers,
  Eye,
  Star,
  FileText,
  Phone,
  Building2,
} from "lucide-react";
import { useGetProperty } from "@/hooks/admin/Useproperties";
import StatusBadge from "@/components/admin/StatusBadge";

interface Props {
  propertyId: string | null;
  onClose: () => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(price);

const TYPE_MAP: Record<string, string> = {
  apartment: "شقة",
  villa: "فيلا",
  land: "أرض",
  office: "مكتب",
  shop: "محل تجاري",
  warehouse: "مستودع",
};

export default function PropertyDetailsModal({ propertyId, onClose }: Props) {
  const { data, isLoading, isError } = useGetProperty(propertyId);
  const property = data?.data.property;

  if (!propertyId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-[var(--text)]">
            تفاصيل العقار
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center h-64 text-gray-400">
            جاري التحميل...
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex items-center justify-center h-64 text-red-500">
            حدث خطأ في تحميل البيانات
          </div>
        )}

        {/* Content */}
        {property && (
          <div className="p-5 space-y-6">
            {/* Image */}
            {property.images.length > 0 && (
              <div className="relative w-full h-52 rounded-xl overflow-hidden">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                  sizes="672px"
                />
              </div>
            )}

            {/* Title + Badges */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-[var(--text)]">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <MapPin size={14} />
                  {property.district}، {property.city}
                </p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <StatusBadge status={property.status} />
                <StatusBadge status={property.approvalStatus} />
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-[var(--secondary)]">
                {formatPrice(property.price)}
              </p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: <BedDouble size={18} />,
                  label: "غرف",
                  value: property.bedrooms,
                },
                {
                  icon: <Bath size={18} />,
                  label: "حمامات",
                  value: property.bathrooms,
                },
                {
                  icon: <Maximize2 size={18} />,
                  label: "المساحة",
                  value: `${property.area} م²`,
                },
                {
                  icon: <Layers size={18} />,
                  label: "الدور",
                  value: property.floor,
                },
                {
                  icon: <Eye size={18} />,
                  label: "المشاهدات",
                  value: property.viewsCount,
                },
                {
                  icon: <Building2 size={18} />,
                  label: "النوع",
                  value: TYPE_MAP[property.type] ?? property.type,
                },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl p-3 text-center"
                >
                  <span className="text-[var(--primary)]">{spec.icon}</span>
                  <span className="text-xs text-gray-500">{spec.label}</span>
                  <span className="font-bold text-sm">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <p className="text-sm font-semibold text-[var(--text)] mb-1">
                  الوصف
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>
            )}

            {/* Developer */}
            <div className="border border-gray-100 rounded-xl p-4 flex items-center gap-3">
              {property.developer.logoUrl && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
                  <Image
                    src={property.developer.logoUrl}
                    alt={property.developer.companyName}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="font-bold text-sm">
                  {property.developer.companyName}
                </p>
                <p
                  className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"
                  dir="ltr"
                >
                  <Phone size={12} />
                  {property.developer.phone}
                </p>
              </div>
              {property.isFeatured && (
                <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  <Star size={12} fill="currentColor" /> مميز
                </span>
              )}
            </div>

            {/* Project */}
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">المشروع</p>
              <p className="font-bold text-sm">{property.project.name}</p>
              <p className="text-xs text-gray-500">{property.project.city}</p>
            </div>

            {/* Files */}
            {property.files.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-[var(--text)] mb-2">
                  المستندات
                </p>
                <div className="space-y-2">
                  {property.files.map((file) => (
                    <a
                      key={file.url}
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <FileText size={18} className="text-red-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Address */}
            <div className="text-xs text-gray-400 flex items-start gap-1">
              <MapPin size={13} className="shrink-0 mt-0.5" />
              {property.address}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
