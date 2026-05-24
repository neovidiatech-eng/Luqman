"use client";

import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  XCircle,
  Info,
  CheckCheck,
  ArrowRight,
  Loader2,
  Trash2, // ← جديد
} from "lucide-react";
import { timeAgo } from "@/lib/utils";
import {
  useGetNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useDeleteNotification, // ← جديد
  useDeleteAllNotifications, // ← جديد
} from "@/hooks/deveoper/Usenotifications";

type TabId = "all" | "unread" | "approval" | "rejection";

const tabs = [
  { id: "all" as TabId, label: "كل التنبيهات" },
  { id: "unread" as TabId, label: "غير المقروءة" },
  { id: "approval" as TabId, label: "القبول" },
  { id: "rejection" as TabId, label: "الرفض" },
];

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const NotificationSkeleton = () => (
  <div className="p-6 rounded-3xl border border-gray-100 bg-white animate-pulse">
    <div className="flex gap-6">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="h-4 bg-gray-100 rounded w-16" />
        </div>
        <div className="h-3 bg-gray-100 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function Notifications() {
  const [activeTab, setActiveTab] = useState<TabId>("all");

  const { data: notifications = [], isLoading } = useGetNotifications();
  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: markAllRead, isPending: markingAll } =
    useMarkAllNotificationsRead();
  const { mutate: deleteOne, isPending: deletingOne, variables: deletingId } = useDeleteNotification(); // ← جديد
  const { mutate: deleteAll, isPending: deletingAll } =
    useDeleteAllNotifications(); // ← جديد

  // ✅ الفلتر مصلوح — كان الـ getNotificationType مش بيتاخد في الاعتبار
  // الـ type بييجي من الـ API مباشرة، فالفلتر شغال على notif.type بس
  // المشكلة كانت إن الـ API ممكن ترجع "info" للـ approval/rejection
  // الحل: نعمل normalize للـ type قبل الفلتر
  const normalizedNotifications = notifications.map((n) => {
    if (n.type !== "approval" && n.type !== "rejection") {
      const text = `${n.title} ${n.message}`;
      const inferredType = text.includes("رفض")
        ? "rejection"
        : text.includes("قبول") || text.includes("الموافقة")
          ? "approval"
          : "info";
      return { ...n, type: inferredType as typeof n.type };
    }
    return n;
  });

  const filtered = normalizedNotifications.filter((n) => {
    if (activeTab === "unread") return !n.isRead;
    if (activeTab === "approval") return n.type === "approval";
    if (activeTab === "rejection") return n.type === "rejection";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[var(--primary)] mb-1">
            مركز الإشعارات
            {unreadCount > 0 && (
              <span className="mr-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white text-[10px] font-black">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-[var(--text-muted)] font-medium">
            تابع حالة عقاراتك وطلبات المراجعة أولاً بأول
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => markAllRead()}
            disabled={markingAll || unreadCount === 0}
            className="flex items-center gap-1.5 text-xs font-bold text-[var(--secondary)] hover:underline disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            {markingAll && <Loader2 size={12} className="animate-spin" />}
            تعليم الكل كمقروء
          </button>

          {/* ← زرار Delete All جديد */}
          <button
            onClick={() => deleteAll()}
            disabled={deletingAll || notifications.length === 0}
            className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:underline disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            {deletingAll ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Trash2 size={12} />
            )}
            حذف الكل
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-1 rounded-2xl shadow-sm border border-[var(--border)] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shrink-0 ${
              activeTab === tab.id
                ? "bg-[var(--primary)] text-white shadow-lg shadow-blue-900/10"
                : "text-[var(--text-muted)] hover:bg-[var(--bg)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <NotificationSkeleton key={i} />
          ))
        ) : filtered.length > 0 ? (
          filtered.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                if (!notif.isRead) markRead(notif.id);
              }}
              className={`group relative p-6 rounded-3xl border transition-all cursor-pointer overflow-hidden ${
                notif.isRead
                  ? "bg-white border-[var(--border)] hover:border-slate-300"
                  : "bg-[var(--accent)]/20 border-[var(--accent)] shadow-sm"
              }`}
            >
              {!notif.isRead && (
                <div className="absolute top-0 right-0 w-1.5 h-full bg-[var(--secondary)]" />
              )}

              <div className="flex gap-6">
                <div
                  className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    notif.type === "approval"
                      ? "bg-emerald-100 text-emerald-600"
                      : notif.type === "rejection"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {notif.type === "approval" ? (
                    <CheckCircle2 size={28} />
                  ) : notif.type === "rejection" ? (
                    <XCircle size={28} />
                  ) : (
                    <Info size={28} />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-[var(--primary)]">
                      {notif.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] bg-[var(--bg)] px-3 py-1 rounded-full uppercase tracking-widest leading-none flex items-center h-fit">
                        {timeAgo(notif.createdAt)}
                      </span>

                      {/* ← زرار Delete One */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // عشان متعلمش كمقروء
                          deleteOne(notif.id);
                        }}
                        disabled={deletingOne && deletingId === notif.id}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50/80 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm disabled:opacity-50"
                        title="حذف الإشعار"
                      >
                        {deletingOne && deletingId === notif.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                        <span className="text-xs font-bold hidden sm:inline">حذف</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-2xl">
                    {notif.message}
                  </p>
                  {notif.propertyTitle && (
                    <div className="flex items-center gap-2 pt-2 group-hover:gap-4 transition-all">
                      <span className="text-xs font-bold text-[var(--secondary)]">
                        عرض صفحة العقار
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-[var(--secondary)]"
                      />
                    </div>
                  )}
                </div>

                <div className="hidden lg:flex items-center">
                  {!notif.isRead ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markRead(notif.id);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white transition-all shadow-sm"
                      title="تحديد كمقروء"
                    >
                      <CheckCheck size={18} />
                      <span className="text-sm font-bold">تحديد كمقروء</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-300" title="مقروء">
                      <CheckCheck size={20} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 text-center bg-white rounded-3xl border border-[var(--border)] border-dashed">
            <Bell size={48} className="mx-auto text-[var(--border)] mb-4" />
            <p className="text-[var(--text-muted)] font-bold italic">
              لا يوجد إشعارات جديدة في هذا القسم...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
