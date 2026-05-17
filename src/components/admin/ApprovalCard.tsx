"use client";
import { useState } from "react";
import Image from "next/image";
import { CheckCircle, XCircle } from "lucide-react";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { formatPrice } from "@/lib/utils";
import {
  useApproveProperty,
  useRejectProperty,
  useApproveProject,
  useRejectProject,
} from "@/hooks/admin/Useapprovalqueue";

interface ApprovalCardProps {
  item: any;
  type: "property" | "project";
}

export default function ApprovalCard({ item, type }: ApprovalCardProps) {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const title = type === "property" ? item.title : item.name;
  const price = type === "property" ? item.price : item.startingPrice;
  const companyName = item.developer?.companyName ?? "";

  const { mutate: approveProperty, isPending: isApprovingProperty } =
    useApproveProperty();
  const { mutate: rejectProperty, isPending: isRejectingProperty } =
    useRejectProperty();
  const { mutate: approveProject, isPending: isApprovingProject } =
    useApproveProject();
  const { mutate: rejectProject, isPending: isRejectingProject } =
    useRejectProject();

  const isApproving =
    type === "property" ? isApprovingProperty : isApprovingProject;
  const isRejecting =
    type === "property" ? isRejectingProperty : isRejectingProject;

  const handleApprove = () => {
    if (type === "property") approveProperty(item.id);
    else approveProject(item.id);
  };

  const handleReject = () => {
    const trimmedReason = rejectReason.trim();
    if (!trimmedReason) return;

    if (type === "property")
      rejectProperty({ id: item.id, reason: trimmedReason });
    else rejectProject({ id: item.id, reason: trimmedReason });

    setIsRejectModalOpen(false);
    setRejectReason("");
  };

  const handleOpenRejectModal = () => {
    setRejectReason("");
    setIsRejectModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4 items-start md:items-center border border-gray-100">
        <div className="relative h-24 w-32 shrink-0">
          <Image
            src={item.images[0]}
            alt={title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 128px, 128px"
          />
        </div>

        <div className="flex-1 w-full">
          <div className="flex flex-col items-start mb-1">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium">
              {type === "property" ? "عقار" : "مشروع"}
            </span>
            <h3 className="font-bold text-lg text-[var(--text)]">{title}</h3>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            {item.city} - المطور: {companyName}
          </p>
          <div className="font-bold text-[var(--secondary)]">
            {formatPrice(price)}
          </div>
        </div>

        <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0 shrink-0">
          <button
            onClick={handleApprove}
            disabled={isApproving || isRejecting}
            className="flex-1 md:flex-none flex items-center justify-center gap-1 bg-green-50 text-green-600 hover:bg-green-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <CheckCircle size={16} />
            {isApproving ? "جاري..." : "موافقة"}
          </button>
          <button
            onClick={handleOpenRejectModal} // ✅ استخدمنا الدالة الجديدة
            disabled={isApproving || isRejecting}
            className="flex-1 md:flex-none flex items-center justify-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <XCircle size={16} />
            {isRejecting ? "جاري..." : "رفض"}
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isRejectModalOpen}
        title="رفض الطلب"
        message={
          <div className="space-y-2">
            <p>يرجى كتابة سبب الرفض ليتم إرساله للمطور:</p>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 min-h-[100px] text-sm focus:outline-none focus:border-[var(--primary)]"
              placeholder="اكتب سبب الرفض هنا..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
        }
        onConfirm={handleReject}
        onCancel={() => setIsRejectModalOpen(false)}
        confirmLabel="تأكيد الرفض"
        confirmColor="var(--error)"
      />
    </>
  );
}
