"use client";

import React from "react";
import {
  Home,
  Eye,
  CheckCircle2,
  Clock,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import StatsCard from "@/components/developer/StatsCard";
import StatusBadge from "@/components/developer/StatusBadge";
import {
  mockProperties,
  mockNotifications,
  mockDeveloper,
} from "@/lib/mock-data";
import { formatPrice, timeAgo } from "@/lib/utils";

export default function Dashboard() {
  const latestProperties = mockProperties.slice(0, 5);
  const latestNotifications = mockNotifications.slice(0, 3);

  const stats = [
    {
      title: "العقارات المنشورة",
      value: mockDeveloper.totalProperties,
      icon: <Home size={28} />,
      color: "#C9A84C",
    },
    {
      title: "قيد المراجعة",
      value: 3,
      icon: <Clock size={28} />,
      color: "#F59E0B",
    },
    {
      title: "المشاريع النشطة",
      value: 2,
      icon: <BarChart3 size={28} />,
      color: "#1B2A4A",
    },
    {
      title: "إجمالي المشاهدات",
      value: mockDeveloper.totalViews.toLocaleString(),
      icon: <Eye size={28} />,
      color: "#10B981",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden flex flex-col">
        <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="text-base font-bold text-[var(--primary)]">
            آخر العقارات المضافة
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead className="bg-[#F9FAFB] text-[var(--text-muted)] text-[0.85rem] font-semibold">
              <tr>
                <th className="px-5 py-3 border-b border-[var(--border)]">#</th>
                <th className="px-5 py-3 border-b border-[var(--border)] text-right">
                  اسم العقار
                </th>
                <th className="px-5 py-3 border-b border-[var(--border)] text-right">
                  المدينة
                </th>
                <th className="px-5 py-3 border-b border-[var(--border)] text-right">
                  السعر
                </th>
                <th className="px-5 py-3 border-b border-[var(--border)] text-right">
                  الحالة
                </th>
                <th className="px-5 py-3 border-b border-[var(--border)] text-left">
                  التاريخ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {latestProperties.map((prop, idx) => (
                <tr
                  key={prop.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-3 text-[0.9rem] text-[var(--text-muted)]">
                    #{7241 - idx}
                  </td>
                  <td className="px-5 py-3 text-[0.9rem] font-medium text-[var(--primary)]">
                    {prop.title}
                  </td>
                  <td className="px-5 py-3 text-[0.9rem] text-[var(--text-muted)]">
                    {prop.city}
                  </td>
                  <td className="px-5 py-3 text-[0.9rem] font-medium">
                    {formatPrice(prop.price)}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={prop.approvalStatus} />
                  </td>
                  <td
                    className="px-5 py-3 text-[0.9rem] text-[var(--text-muted)] text-left"
                    dir="ltr"
                  >
                    {prop.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Notifications Column */}
        <div className="flex-1 bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm">
          <h4 className="text-[0.95rem] font-bold mb-4 pb-2 border-b border-[var(--border)]">
            آخر الإشعارات
          </h4>
          <div className="flex flex-col gap-3">
            {latestNotifications.map((notif) => (
              <div
                key={notif.id}
                className="flex gap-3 items-start group cursor-pointer"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    notif.type === "approval"
                      ? "bg-[var(--success)]"
                      : "bg-[var(--warning)]"
                  }`}
                />
                <div>
                  <p className="text-[0.85rem] font-medium text-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors">
                    {notif.title}
                  </p>
                  <p className="text-[0.75rem] text-[var(--text-muted)]">
                    {timeAgo(notif.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Banner */}
        <div className="flex-1 bg-[var(--secondary)] text-white rounded-xl p-5 relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="text-lg font-bold mb-2 tracking-tight">
              تواصل مع الدعم الفني
            </h4>
            <p className="text-[0.85rem] opacity-90 leading-relaxed mb-4">
              هل تواجه مشكلة في رفع المستندات؟ فريقنا متاح لمساعدتك على مدار
              الساعة.
            </p>
            <button className="bg-white text-[var(--primary)] px-4 py-2 rounded-md font-bold text-[0.8rem] hover:shadow-lg transition-all">
              ابدأ محادثة الآن
            </button>
          </div>
          <div className="absolute -bottom-4 -left-2 text-6xl opacity-10 rotate-12 transition-transform group-hover:scale-110">
            💬
          </div>
        </div>
      </div>
    </div>
  );
}
