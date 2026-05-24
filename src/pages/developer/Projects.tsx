"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Edit2,
  MapPin,
  Calendar,
  Building2,
  TrendingUp,
  Users,
  Eye,
  X,
  RefreshCcw,
  Save,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import StatusBadge from "@/components/developer/StatusBadge";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { formatPrice } from "@/lib/utils";
import { saudiCities } from "@/lib/mock-data";
import {
  useGetDeveloperProjects,
  useDeleteDeveloperProject,
  useUpdateDeveloperProject,
  useResubmitDeveloperProject,
} from "@/hooks/deveoper/Useprojects";
import {
  Project,
  ProjectStatus,
  UpdateProjectPayload,
} from "@/services/developer/Projectsservice";
import { ViewProjectModal } from "@/components/developer/ViewProjectModal";
import { EditProjectModal } from "@/components/developer/EditProjectModal";

export default function Projects() {
  const [viewProject, setViewProject] = useState<Project | null>(null);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetDeveloperProjects();
  const { mutate: deleteProject, isPending: isDeleting } =
    useDeleteDeveloperProject();
  const { mutate: resubmit, isPending: isResubmitting } =
    useResubmitDeveloperProject();

  const projects = data?.data?.projects ?? [];

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteProject(deleteId, { onSuccess: () => setDeleteId(null) });
  };

  // ─── Loading ────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="flex flex-col items-center gap-4 text-[var(--text-muted)]">
          <Loader2 size={40} className="animate-spin text-[var(--primary)]" />
          <p className="font-bold">جارٍ تحميل المشاريع...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertTriangle size={40} className="text-red-400" />
          <p className="font-bold text-[var(--primary)]">
            حدث خطأ أثناء تحميل المشاريع
          </p>
        </div>
      </div>
    );
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-[var(--primary)] mb-2">
            إدارة المشاريع العقارية
          </h1>
          <p className="text-[var(--text-muted)] font-medium">
            مشاريعك الكبرى والكمبوندات السكنية تحت الإنشاء
          </p>
        </div>
        <Link
          href="/developer/projects/add"
          className="bg-[var(--primary)] text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all"
        >
          <Plus size={20} />
          <span>إضافة مشروع جديد</span>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-[2rem] shadow-sm border border-[var(--border)] overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              {project.logoUrl || project.images[0] ? (
                <Image
                  src={project.logoUrl || project.images[0]}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-[var(--bg)] flex items-center justify-center">
                  <Building2 size={40} className="text-[var(--border)]" />
                </div>
              )}
              <div className="absolute top-4 left-4">
                <StatusBadge status={project.approvalStatus || "pending"} />
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 text-[10px] font-bold text-[var(--primary)] shadow-sm">
                <MapPin size={12} className="text-[var(--secondary)]" />
                <span>{project.city}</span>
              </div>
              {/* Eye overlay button */}
              <button
                onClick={() => setViewProject(project)}
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
              >
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg">
                  <Eye size={20} className="text-[var(--primary)]" />
                </div>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--primary)] mb-2 group-hover:text-[var(--secondary)] transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-bold line-clamp-2 leading-relaxed h-10">
                  {project.description}
                </p>
              </div>

              {/* Rejection reason pill */}
              {project.approvalStatus === "rejected" &&
                project.rejectionReason && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                    <AlertTriangle
                      size={14}
                      className="text-red-500 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-xs text-red-600 font-medium line-clamp-2">
                      {project.rejectionReason}
                    </p>
                  </div>
                )}

              {/* Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest flex items-center gap-1">
                    <TrendingUp size={12} className="text-[var(--success)]" />
                    نسبة الإنجاز
                  </span>
                  <span className="text-sm font-black text-[var(--primary)]">
                    {project.completionPercent}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[var(--bg)] rounded-full overflow-hidden border border-[var(--border)] p-0.5">
                  <div
                    className="h-full bg-[var(--secondary)] rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(201,168,76,0.3)]"
                    style={{ width: `${project.completionPercent}%` }}
                  />
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-[var(--border)]">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] font-bold">
                    <Users size={12} />
                    <span>إجمالي الوحدات</span>
                  </div>
                  <p className="text-sm font-black text-[var(--primary)]">
                    {project.totalUnits}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] font-bold">
                    <Calendar size={12} />
                    <span>تاريخ التسليم</span>
                  </div>
                  <p className="text-sm font-black text-[var(--primary)]">
                    {new Date(project.deliveryDate).toLocaleDateString("ar-EG")}
                  </p>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[var(--text-muted)]">
                    يبدأ من
                  </span>
                  <span className="text-base font-black text-[var(--primary)]">
                    {formatPrice(project.startingPrice)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {/* View */}
                  <button
                    onClick={() => setViewProject(project)}
                    title="عرض التفاصيل"
                    className="p-3 bg-[var(--bg)] text-[var(--primary)] rounded-xl border border-[var(--border)] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all font-bold"
                  >
                    <Eye size={18} />
                  </button>

                  {/* Edit */}

                  {project.approvalStatus !== "approved" && (
                    <button
                      onClick={() => setEditProject(project)}
                      title="تعديل"
                      className="p-3 bg-[var(--bg)] text-[var(--primary)] rounded-xl border border-[var(--border)] hover:bg-slate-100 transition-all font-bold"
                    >
                      <Edit2 size={18} />
                    </button>
                  )}

                  {/* Resubmit — only if rejected */}
                  {project.approvalStatus === "rejected" && (
                    <button
                      onClick={() => resubmit({ id: project.id })}
                      disabled={isResubmitting}
                      title="إعادة التقديم"
                      className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-200 hover:bg-amber-100 transition-all font-bold disabled:opacity-50"
                    >
                      {isResubmitting ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <RefreshCcw size={18} />
                      )}
                    </button>
                  )}

                  {/* Delete */}
                  {project.approvalStatus !== "approved" && (
                    <button
                      onClick={() => setDeleteId(project.id)}
                      title="حذف"
                      className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 hover:bg-red-100 transition-all font-bold"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="py-24 text-center bg-white rounded-[3rem] border border-[var(--border)] border-dashed">
          <Building2 size={64} className="mx-auto text-[var(--border)] mb-4" />
          <h3 className="text-xl font-bold text-[var(--primary)] mb-2">
            لا يوجد مشاريع حتى الآن
          </h3>
          <p className="text-[var(--text-muted)] font-medium mb-6">
            ابدأ بإضافة أول مشروع ضخم لك على المنصة
          </p>
          <Link
            href="/developer/projects/add"
            className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl font-bold"
          >
            أضف مشروعك الأول
          </Link>
        </div>
      )}

      {/* View Modal */}
      {viewProject && (
        <ViewProjectModal
          project={viewProject}
          onClose={() => setViewProject(null)}
        />
      )}

      {/* Edit Modal */}
      {editProject && (
        <EditProjectModal
          project={editProject}
          onClose={() => setEditProject(null)}
        />
      )}

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        message="هل أنت متأكد من حذف هذا المشروع بالكامل؟ سيتم حذف جميع الوحدات والبيانات المرتبطة به."
      />
    </div>
  );
}
