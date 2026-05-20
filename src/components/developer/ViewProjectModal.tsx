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
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

import { Project } from "@/services/developer/Projectsservice";

export function ViewProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
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
    approved: "معتمد",
    rejected: "مرفوض",
    pending: "قيد المراجعة",
  };

  const statusLabel: Record<string, string> = {
    development: "قيد التطوير",
    under_construction: "قيد الإنشاء",
    completed: "مكتمل",
  };

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
        {project.images[0] && (
          <div className="relative h-56 rounded-t-[2rem] overflow-hidden">
            <Image
              src={project.images[0]}
              alt={project.name}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
            >
              <X size={18} />
            </button>
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              {project.logoUrl && (
                <Image
                  src={project.logoUrl}
                  alt="logo"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white object-cover"
                  unoptimized
                />
              )}
              <h2 className="text-xl font-black text-white drop-shadow">
                {project.name}
              </h2>
            </div>
          </div>
        )}

        {/* No image fallback header */}
        {!project.images[0] && (
          <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
            <h2 className="text-xl font-black text-[var(--primary)]">
              {project.name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[var(--bg)] transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="p-8 space-y-6">
          {/* Status Row */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${approvalColor[project.approvalStatus]}`}
            >
              {approvalIcon[project.approvalStatus]}
              {approvalLabel[project.approvalStatus]}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {statusLabel[project.status]}
            </span>
            {project.isFeatured && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                ⭐ مميز
              </span>
            )}
          </div>

          {/* Rejection reason */}
          {project.approvalStatus === "rejected" && project.rejectionReason && (
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
                  {project.rejectionReason}
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">
              وصف المشروع
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {project.description}
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
                {project.city}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {project.address}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "إجمالي الوحدات",
                value: project.totalUnits,
                icon: <Users size={14} />,
              },
              {
                label: "السعر يبدأ من",
                value: formatPrice(project.startingPrice),
                icon: <TrendingUp size={14} />,
              },
              {
                label: "تاريخ التسليم",
                value: new Date(project.deliveryDate).toLocaleDateString(
                  "ar-EG",
                ),
                icon: <Calendar size={14} />,
              },
              {
                label: "نسبة الإنجاز",
                value: `${project.completionPercent}%`,
                icon: <CheckCircle2 size={14} />,
              },
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

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[var(--text-muted)]">
                نسبة الإنجاز
              </span>
              <span className="text-sm font-black text-[var(--primary)]">
                {project.completionPercent}%
              </span>
            </div>
            <div className="w-full h-3 bg-[var(--bg)] rounded-full overflow-hidden border border-[var(--border)] p-0.5">
              <div
                className="h-full bg-[var(--secondary)] rounded-full"
                style={{ width: `${project.completionPercent}%` }}
              />
            </div>
          </div>

          {/* Features */}
          {project.features.length > 0 && (
            <div>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-3">
                المميزات
              </p>
              <div className="flex flex-wrap gap-2">
                {project.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional images */}
          {project.images.length > 1 && (
            <div>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-3">
                صور إضافية
              </p>
              <div className="grid grid-cols-3 gap-3">
                {project.images.slice(1).map((img, i) => (
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
        </div>
      </div>
    </div>
  );
}
