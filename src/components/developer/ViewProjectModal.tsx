"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  X,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Building2,
  Play,
  FileText,
  ChevronLeft,
  ChevronRight,
  Home,
  CreditCard,
  ExternalLink,
  Loader2,
  BedDouble,
  Bath,
  Maximize2,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Project, ProjectProperty } from "@/services/developer/Projectsservice";
import { useGetDeveloperProject } from "@/hooks/deveoper/Useprojects";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "overview" | "properties" | "payment" | "media";

// ─── Label maps ───────────────────────────────────────────────────────────────
const approvalColor: Record<string, string> = {
  approved: "text-emerald-600 bg-emerald-50 border-emerald-200",
  rejected: "text-red-600 bg-red-50 border-red-200",
  pending: "text-amber-600 bg-amber-50 border-amber-200",
};
const approvalIcon: Record<string, React.ReactNode> = {
  approved: <CheckCircle2 size={13} />,
  rejected: <XCircle size={13} />,
  pending: <Clock size={13} />,
};
const approvalLabel: Record<string, string> = {
  approved: "معتمد",
  rejected: "مرفوض",
  pending: "قيد المراجعة",
};
const statusLabel: Record<string, string> = {
  under_development: "قيد التطوير",
  under_construction: "قيد الإنشاء",
  completed: "مكتمل",
};
const propertyTypeLabel: Record<string, string> = {
  villa: "فيلا",
  apartment: "شقة",
  land: "أرض",
  office: "مكتب",
  shop: "محل",
};
const propertyStatusLabel: Record<string, string> = {
  available: "متاح",
  sold: "مباع",
  reserved: "محجوز",
};
const propertyStatusColor: Record<string, string> = {
  available: "bg-green-50 text-green-600 border-green-200",
  sold: "bg-red-50 text-red-600 border-red-200",
  reserved: "bg-amber-50 text-amber-600 border-amber-200",
};

// ─── PropertyCard ─────────────────────────────────────────────────────────────
function PropertyCard({ prop }: { prop: ProjectProperty }) {
  return (
    <div className="flex gap-3 items-start p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-[var(--secondary)]/40 transition-colors">
      {prop.images?.[0] && (
        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-200">
          <Image
            src={prop.images[0]}
            alt={prop.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="flex-1 min-w-0 space-y-2">
        {/* Title + approval */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-black text-[var(--primary)] leading-tight">
            {prop.title}
          </p>
          <span
            className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold border ${approvalColor[prop.approvalStatus]}`}
          >
            {approvalIcon[prop.approvalStatus]}
            {approvalLabel[prop.approvalStatus]}
          </span>
        </div>

        {/* Type + status + location */}
        <div className="flex flex-wrap gap-1.5 text-[10px]">
          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-bold">
            {propertyTypeLabel[prop.type] ?? prop.type}
          </span>
          <span
            className={`px-2 py-0.5 rounded-lg font-bold border ${propertyStatusColor[prop.status] ?? "bg-gray-50 text-gray-500 border-gray-200"}`}
          >
            {propertyStatusLabel[prop.status] ?? prop.status}
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <MapPin size={10} className="text-[var(--secondary)]" />
            {prop.district}، {prop.city}
          </span>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 text-[10px] text-gray-400 font-medium">
          {prop.bedrooms != null && (
            <span className="flex items-center gap-1">
              <BedDouble size={11} />
              {prop.bedrooms} غرفة
            </span>
          )}
          {prop.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath size={11} />
              {prop.bathrooms} حمام
            </span>
          )}
          {prop.area != null && (
            <span className="flex items-center gap-1">
              <Maximize2 size={11} />
              {prop.area.toLocaleString()} م²
            </span>
          )}
        </div>

        {/* Price */}
        <p className="text-sm font-black text-[var(--secondary)]">
          {formatPrice(prop.price)}
        </p>

        {/* Rejection reason */}
        {prop.approvalStatus === "rejected" && prop.rejectionReason && (
          <div className="flex items-start gap-1.5 p-2 bg-red-50 border border-red-200 rounded-xl">
            <AlertTriangle size={11} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-[10px] text-red-600">{prop.rejectionReason}</p>
          </div>
        )}

        {/* Features */}
        {prop.features?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {prop.features.map((f, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-medium"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
export function ViewProjectModal({
  project: listProject,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [imgIndex, setImgIndex] = useState(0);

  // Fetch full detail (includes properties, paymentPlans, unitTypes, files…)
  const { data: detailData, isLoading: detailLoading } = useGetDeveloperProject(
    listProject.id,
  );

  const project = detailData?.data?.project ?? listProject;
  const properties = project.properties ?? [];
  const paymentPlans = project.paymentPlans ?? [];
  const unitTypes = project.unitTypes ?? [];
  const hasMedia =
    project.videoLinks.length > 0 ||
    !!project.videoUrl ||
    project.files.length > 0;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "نظرة عامة", icon: <Building2 size={14} /> },
    {
      key: "properties",
      label: `العقارات (${properties.length})`,
      icon: <Home size={14} />,
    },
    ...(paymentPlans.length > 0
      ? [
          {
            key: "payment" as Tab,
            label: "خطط الدفع",
            icon: <CreditCard size={14} />,
          },
        ]
      : []),
    ...(hasMedia
      ? [{ key: "media" as Tab, label: "الوسائط", icon: <Play size={14} /> }]
      : []),
  ];

  const prevImg = () =>
    setImgIndex((p) => (p === 0 ? project.images.length - 1 : p - 1));
  const nextImg = () =>
    setImgIndex((p) => (p === project.images.length - 1 ? 0 : p + 1));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Hero Image ──────────────────────────────────────────────────── */}
        {project.images.length > 0 ? (
          <div className="relative h-56 rounded-t-[2rem] overflow-hidden shrink-0">
            <Image
              src={project.images[imgIndex]}
              alt={project.name}
              fill
              className="object-cover transition-all duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-12 top-1/2 -translate-y-1/2 p-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                >
                  <ChevronRight size={16} />
                </button>
                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === imgIndex ? "bg-white w-4" : "bg-white/50 w-1.5"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
            >
              <X size={16} />
            </button>

            <div className="absolute bottom-4 right-4 flex items-center gap-2.5">
              {project.logoUrl && (
                <Image
                  src={project.logoUrl}
                  alt="logo"
                  width={38}
                  height={38}
                  className="rounded-full border-2 border-white object-cover"
                  unoptimized
                />
              )}
              <div>
                <h2 className="text-lg font-black text-white drop-shadow leading-tight">
                  {project.name}
                </h2>
                {project.developer && (
                  <p className="text-[10px] text-white/80 font-medium">
                    {project.developer.companyName}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-3">
              {project.logoUrl && (
                <Image
                  src={project.logoUrl}
                  alt="logo"
                  width={36}
                  height={36}
                  className="rounded-full border border-gray-200 object-cover"
                  unoptimized
                />
              )}
              <div>
                <h2 className="text-lg font-black text-[var(--primary)]">
                  {project.name}
                </h2>
                {project.developer && (
                  <p className="text-[10px] text-gray-400">
                    {project.developer.companyName}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* ── Developer row ───────────────────────────────────────────────── */}
        {project.developer && project.images.length > 0 && (
          <div className="px-6 pt-4 flex items-center gap-2">
            {project.developer.logoUrl && (
              <Image
                src={project.developer.logoUrl}
                alt={project.developer.companyName}
                width={26}
                height={26}
                className="rounded-full border border-gray-200 object-cover"
                unoptimized
              />
            )}
            <span className="text-xs font-bold text-gray-400">
              {project.developer.companyName}
            </span>
          </div>
        )}

        {/* ── Status badges ───────────────────────────────────────────────── */}
        <div className="px-6 pt-3 flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold border ${approvalColor[project.approvalStatus]}`}
          >
            {approvalIcon[project.approvalStatus]}
            {approvalLabel[project.approvalStatus]}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            {statusLabel[project.status] ?? project.status}
          </span>
          {project.isFeatured && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              ⭐ مميز
            </span>
          )}
        </div>

        {/* ── Rejection reason ────────────────────────────────────────────── */}
        {project.approvalStatus === "rejected" && project.rejectionReason && (
          <div className="mx-6 mt-3 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-black text-red-700 mb-1">
                سبب الرفض
              </p>
              <p className="text-sm text-red-600">{project.rejectionReason}</p>
            </div>
          </div>
        )}

        {/* ── Tabs ────────────────────────────────────────────────────────── */}
        <div className="px-6 pt-4">
          <div className="flex gap-1 bg-gray-100 rounded-2xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black transition-all ${
                  activeTab === tab.key
                    ? "bg-white text-[var(--primary)] shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Content ─────────────────────────────────────────────────── */}
        <div className="p-6 space-y-6 flex-1">
          {/* Loading overlay for detail fetch */}
          {detailLoading && (
            <div className="flex items-center justify-center gap-2 py-4 text-gray-400">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-xs font-bold">جارٍ التحميل…</span>
            </div>
          )}

          {/* ════ OVERVIEW ════ */}
          {activeTab === "overview" && (
            <>
              {project.description && (
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    وصف المشروع
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}

              <div className="flex items-start gap-2">
                <MapPin
                  size={15}
                  className="text-[var(--secondary)] mt-0.5 shrink-0"
                />
                <div>
                  <p className="text-xs font-bold text-[var(--primary)]">
                    {project.city}
                  </p>
                  {project.address && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {project.address}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    label: "إجمالي الوحدات",
                    value: project.totalUnits,
                    icon: <Users size={13} />,
                  },
                  {
                    label: "السعر يبدأ من",
                    value: formatPrice(project.startingPrice),
                    icon: <TrendingUp size={13} />,
                  },
                  {
                    label: "تاريخ التسليم",
                    value: new Date(project.deliveryDate).toLocaleDateString(
                      "ar-EG",
                    ),
                    icon: <Calendar size={13} />,
                  },
                  {
                    label: "نسبة الإنجاز",
                    value: `${project.completionPercent}%`,
                    icon: <CheckCircle2 size={13} />,
                  },
                ].map(({ label, value, icon }) => (
                  <div
                    key={label}
                    className="bg-gray-50 rounded-2xl p-3.5 space-y-1 border border-gray-100"
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
                      {icon}
                      <span>{label}</span>
                    </div>
                    <p className="text-sm font-black text-[var(--primary)]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400">
                    نسبة الإنجاز
                  </span>
                  <span className="text-sm font-black text-[var(--primary)]">
                    {project.completionPercent}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--secondary)] rounded-full transition-all duration-700"
                    style={{ width: `${project.completionPercent}%` }}
                  />
                </div>
              </div>

              {unitTypes.length > 0 && (
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    أنواع الوحدات
                  </p>
                  <div className="space-y-2">
                    {unitTypes.map((ut) => (
                      <div
                        key={ut.id}
                        className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs"
                      >
                        <span className="font-bold text-[var(--primary)]">
                          {ut.name}
                        </span>
                        <div className="flex gap-3 text-gray-400">
                          <span>{ut.area} م²</span>
                          {ut.bedrooms > 0 && <span>{ut.bedrooms} غرف</span>}
                          <span className="font-bold text-[var(--secondary)]">
                            {formatPrice(ut.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.features.length > 0 && (
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    المميزات
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((f) => (
                      <span
                        key={f}
                        className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ════ PROPERTIES ════ */}
          {activeTab === "properties" && (
            <div className="space-y-4">
              {properties.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Home size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-bold">
                    لا توجد عقارات مرتبطة بهذا المشروع
                  </p>
                </div>
              ) : (
                properties.map((prop) => (
                  <PropertyCard key={prop.id} prop={prop} />
                ))
              )}
            </div>
          )}

          {/* ════ PAYMENT PLANS ════ */}
          {activeTab === "payment" && (
            <div className="space-y-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                خطط الدفع المتاحة
              </p>
              {paymentPlans.map((plan, i) => (
                <div
                  key={plan.id ?? i}
                  className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-[var(--primary)]">
                      {plan.name ?? `خطة ${i + 1}`}
                    </p>
                    {plan.downPayment != null && (
                      <span className="text-[10px] font-bold px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg">
                        مقدم {plan.downPayment}%
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    {plan.installments > 0 && (
                      <div className="bg-white rounded-xl p-2.5 border border-gray-100">
                        <p className="text-gray-400 mb-0.5">عدد الأقساط</p>
                        <p className="font-black text-[var(--primary)]">
                          {plan.installments}
                        </p>
                      </div>
                    )}
                    {plan.installmentAmount > 0 && (
                      <div className="bg-white rounded-xl p-2.5 border border-gray-100">
                        <p className="text-gray-400 mb-0.5">قيمة القسط</p>
                        <p className="font-black text-[var(--secondary)]">
                          {formatPrice(plan.installmentAmount)}
                        </p>
                      </div>
                    )}
                    {plan.duration > 0 && (
                      <div className="bg-white rounded-xl p-2.5 border border-gray-100">
                        <p className="text-gray-400 mb-0.5">مدة السداد</p>
                        <p className="font-black text-[var(--primary)]">
                          {plan.duration} شهر
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ════ MEDIA ════ */}
          {activeTab === "media" && (
            <div className="space-y-6">
              {project.videoUrl && (
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    فيديو المشروع
                  </p>
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-2xl text-sm font-bold hover:bg-blue-100 transition-colors"
                  >
                    <Play size={16} />
                    مشاهدة الفيديو
                    <ExternalLink size={13} className="mr-auto" />
                  </a>
                </div>
              )}

              {project.videoLinks.length > 0 && (
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    روابط فيديو إضافية
                  </p>
                  <div className="space-y-2">
                    {project.videoLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-3 bg-gray-50 text-[var(--primary)] border border-gray-100 rounded-2xl text-xs font-bold hover:border-[var(--secondary)]/30 transition-colors"
                      >
                        <Play
                          size={13}
                          className="text-[var(--secondary)] shrink-0"
                        />
                        <span className="truncate">{link}</span>
                        <ExternalLink size={12} className="mr-auto shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {project.files.length > 0 && (
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    الملفات المرفقة
                  </p>
                  <div className="space-y-2">
                    {project.files.map((file, i) => (
                      <a
                        key={i}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-3 bg-gray-50 text-[var(--primary)] border border-gray-100 rounded-2xl text-xs font-bold hover:border-[var(--secondary)]/30 transition-colors"
                      >
                        <FileText
                          size={13}
                          className="text-[var(--secondary)] shrink-0"
                        />
                        <span className="truncate flex-1">
                          {file.name || file.url.split("/").pop()}
                        </span>
                        <ExternalLink size={12} className="shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
