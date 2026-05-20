"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Bell, Search } from "lucide-react";
import { useGetNotifications } from "@/hooks/deveoper/Usenotifications";
import { useGetDeveloperProfile } from "@/hooks/deveoper/Useprofile";

export default function DeveloperHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: notifications } = useGetNotifications();
  const unreadCount = notifications?.filter((n) => !n.isRead).length ?? 0;

  const { data: profile } = useGetDeveloperProfile();

  const getPageTitle = () => {
    if (!pathname) return "لوحة التحكم";
    if (pathname.includes("dashboard")) return "نظرة عامة";
    if (pathname.includes("properties/add")) return "إضافة عقار جديد";
    if (pathname.includes("properties")) return "إدارة العقارات";
    if (pathname.includes("projects/add")) return "إضافة مشروع جديد";
    if (pathname.includes("projects")) return "إدارة المشاريع";
    if (pathname.includes("notifications")) return "الإشعارات";
    if (pathname.includes("profile")) return "الملف الشخصي";
    return "لوحة التحكم";
  };

  return (
    <header className="h-16 bg-white border-b border-[var(--border)] px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-black text-[var(--primary)] hidden md:block">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="ابحث هنا..."
            className="bg-[var(--bg)] border-none outline-none pl-4 pr-10 py-2 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--secondary)] transition-all"
          />
        </div>

        {/* Bell */}
        <button
          onClick={() => router.push("/developer/notifications")}
          className="relative text-[var(--primary)] hover:text-[var(--secondary)] transition-colors"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white px-1">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 border-r border-[var(--border)] pr-6">
          <div className="text-left hidden md:block">
            <p className="text-sm font-bold text-[var(--primary)]">
              {profile?.companyName ?? "—"}
            </p>
            <p className="text-xs font-medium text-[var(--text-muted)]">
              {profile?.accountStatus === "active"
                ? "مطور معتمد"
                : (profile?.accountStatus ?? "—")}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[var(--bg)] shadow-sm bg-[var(--bg)] flex items-center justify-center">
            {profile?.logoUrl ? (
              <Image
                src={profile.logoUrl}
                alt="Company Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <span className="text-[var(--text-muted)] text-xs font-bold">
                {profile?.companyName?.charAt(0) ?? "؟"}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
