// "use client";

// import React from "react";
// import {
//   Home,
//   Eye,
//   CheckCircle2,
//   Clock,
//   BarChart3,
//   TrendingUp,
//   ArrowUpRight,
//   MapPin,
// } from "lucide-react";
// import StatsCard from "@/components/developer/StatsCard";
// import StatusBadge from "@/components/developer/StatusBadge";
// import {
//   mockProperties,
//   mockNotifications,
//   mockDeveloper,
// } from "@/lib/mock-data";
// import { formatPrice, timeAgo } from "@/lib/utils";

// export default function Dashboard() {
//   const latestProperties = mockProperties.slice(0, 5);
//   const latestNotifications = mockNotifications.slice(0, 3);

//   const stats = [
//     {
//       title: "العقارات المنشورة",
//       value: mockDeveloper.totalProperties,
//       icon: <Home size={28} />,
//       color: "#C9A84C",
//     },
//     {
//       title: "قيد المراجعة",
//       value: 3,
//       icon: <Clock size={28} />,
//       color: "#F59E0B",
//     },
//     {
//       title: "المشاريع النشطة",
//       value: 2,
//       icon: <BarChart3 size={28} />,
//       color: "#1B2A4A",
//     },
//     {
//       title: "إجمالي المشاهدات",
//       value: mockDeveloper.totalViews.toLocaleString(),
//       icon: <Eye size={28} />,
//       color: "#10B981",
//     },
//   ];

//   return (
//     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 p-6">
//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//         {stats.map((stat) => (
//           <StatsCard key={stat.title} {...stat} />
//         ))}
//       </div>

//       {/* Main Table Container */}
//       <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden flex flex-col">
//         <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
//           <h3 className="text-base font-bold text-[var(--primary)]">
//             آخر العقارات المضافة
//           </h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-right border-collapse">
//             <thead className="bg-[#F9FAFB] text-[var(--text-muted)] text-[0.85rem] font-semibold">
//               <tr>
//                 <th className="px-5 py-3 border-b border-[var(--border)]">#</th>
//                 <th className="px-5 py-3 border-b border-[var(--border)] text-right">
//                   اسم العقار
//                 </th>
//                 <th className="px-5 py-3 border-b border-[var(--border)] text-right">
//                   المدينة
//                 </th>
//                 <th className="px-5 py-3 border-b border-[var(--border)] text-right">
//                   السعر
//                 </th>
//                 <th className="px-5 py-3 border-b border-[var(--border)] text-right">
//                   الحالة
//                 </th>
//                 <th className="px-5 py-3 border-b border-[var(--border)] text-left">
//                   التاريخ
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {latestProperties.map((prop, idx) => (
//                 <tr
//                   key={prop.id}
//                   className="hover:bg-gray-50/50 transition-colors"
//                 >
//                   <td className="px-5 py-3 text-[0.9rem] text-[var(--text-muted)]">
//                     #{7241 - idx}
//                   </td>
//                   <td className="px-5 py-3 text-[0.9rem] font-medium text-[var(--primary)]">
//                     {prop.title}
//                   </td>
//                   <td className="px-5 py-3 text-[0.9rem] text-[var(--text-muted)]">
//                     {prop.city}
//                   </td>
//                   <td className="px-5 py-3 text-[0.9rem] font-medium">
//                     {formatPrice(prop.price)}
//                   </td>
//                   <td className="px-5 py-3">
//                     <StatusBadge status={prop.approvalStatus} />
//                   </td>
//                   <td
//                     className="px-5 py-3 text-[0.9rem] text-[var(--text-muted)] text-left"
//                     dir="ltr"
//                   >
//                     {prop.createdAt}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Bottom Sections */}
//       <div className="flex flex-col xl:flex-row gap-6">
//         {/* Notifications Column */}
//         <div className="flex-1 bg-white border border-[var(--border)] rounded-xl p-5 shadow-sm">
//           <h4 className="text-[0.95rem] font-bold mb-4 pb-2 border-b border-[var(--border)]">
//             آخر الإشعارات
//           </h4>
//           <div className="flex flex-col gap-3">
//             {latestNotifications.map((notif) => (
//               <div
//                 key={notif.id}
//                 className="flex gap-3 items-start group cursor-pointer"
//               >
//                 <div
//                   className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
//                     notif.type === "approval"
//                       ? "bg-[var(--success)]"
//                       : "bg-[var(--warning)]"
//                   }`}
//                 />
//                 <div>
//                   <p className="text-[0.85rem] font-medium text-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors">
//                     {notif.title}
//                   </p>
//                   <p className="text-[0.75rem] text-[var(--text-muted)]">
//                     {timeAgo(notif.createdAt)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Support Banner */}
//         <div className="flex-1 bg-[var(--secondary)] text-white rounded-xl p-5 relative overflow-hidden group">
//           <div className="relative z-10">
//             <h4 className="text-lg font-bold mb-2 tracking-tight">
//               تواصل مع الدعم الفني
//             </h4>
//             <p className="text-[0.85rem] opacity-90 leading-relaxed mb-4">
//               هل تواجه مشكلة في رفع المستندات؟ فريقنا متاح لمساعدتك على مدار
//               الساعة.
//             </p>
//             <button className="bg-white text-[var(--primary)] px-4 py-2 rounded-md font-bold text-[0.8rem] hover:shadow-lg transition-all">
//               ابدأ محادثة الآن
//             </button>
//           </div>
//           <div className="absolute -bottom-4 -left-2 text-6xl opacity-10 rotate-12 transition-transform group-hover:scale-110">
//             💬
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { motion } from "motion/react";
import {
  Building2,
  Users2,
  Eye,
  MessageSquare,
  LayoutDashboard,
  MapPin,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Image from "next/image";
import { useDeveloperDashboard } from "@/hooks/deveoper/Usedeveloperdashboard";
import { useGetDeveloperProperties } from "@/hooks/deveoper/Useproperties";
import { formatPrice, timeAgo } from "@/lib/utils";
import StatusBadge from "@/components/developer/StatusBadge";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const cn = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(" ");

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-xl bg-gray-100", className)} />
);

// ─── StatCard ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number | string;
  trend?: string | null;
  icon: React.ElementType;
  highlight?: boolean;
  delay?: number;
}

const StatCard = ({
  label,
  value,
  trend,
  icon: Icon,
  highlight,
  delay = 0,
}: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className={cn(
      "p-5 rounded-2xl flex flex-col justify-between border shadow-sm transition-all duration-300 relative overflow-hidden",
      highlight
        ? "bg-primary border-secondary/30 shadow-xl"
        : "bg-white border-gray-200 hover:border-secondary/30",
    )}
  >
    <div className="flex justify-between items-start">
      <div
        className={cn(
          "p-2 rounded-lg",
          highlight
            ? "bg-white/10 text-secondary"
            : "bg-primary/5 text-primary",
        )}
      >
        <Icon size={20} />
      </div>
      {trend && (
        <span
          className={cn(
            "text-[10px] font-bold px-2 py-1 rounded-full",
            trend.includes("+")
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700",
          )}
        >
          {trend}
        </span>
      )}
      {highlight && !trend && (
        <span className="animate-pulse w-2 h-2 bg-secondary rounded-full" />
      )}
    </div>
    <div className="mt-4">
      <p
        className={cn(
          "text-[10px] font-bold uppercase tracking-tighter",
          highlight ? "text-gray-300" : "text-gray-400",
        )}
      >
        {label}
      </p>
      <h3
        className={cn(
          "text-2xl font-black",
          highlight ? "text-white" : "text-primary",
        )}
      >
        {String(value).padStart(2, "0")}
      </h3>
    </div>
  </motion.div>
);

// ─── Notification Status Icon ─────────────────────────────────────────────────

const statusIcon = (status: string) => {
  if (status === "approved")
    return <CheckCircle2 size={14} className="text-green-500 shrink-0" />;
  if (status === "rejected")
    return <XCircle size={14} className="text-red-500 shrink-0" />;
  return <Clock size={14} className="text-amber-500 shrink-0" />;
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDeveloperDashboard();

  const { data: propertiesData, isLoading: propertiesLoading } =
    useGetDeveloperProperties({ page: 1, limit: 5 });
  const recentProperties = propertiesData?.data?.properties ?? [];

  // Build notifications chart data — group by month using updatedAt
  const notifications = stats?.notifications ?? [];

  // Build a simple chart: notifications per status grouped (approved / pending / rejected)
  const chartData = (() => {
    // Use notifications grouped by month (last 6 entries or pad to 6)
    const monthMap: Record<string, number> = {};
    notifications.forEach((n) => {
      const d = new Date(n.updatedAt);
      const key = d.toLocaleString("ar-EG", { month: "short" }).toUpperCase();
      monthMap[key] = (monthMap[key] ?? 0) + 1;
    });

    const entries = Object.entries(monthMap).slice(-6);
    if (entries.length === 0) {
      return [
        { name: "يناير", value: 0, highlight: false },
        { name: "فبراير", value: 0, highlight: false },
        { name: "مارس", value: 0, highlight: false },
        { name: "أبريل", value: 0, highlight: false },
        { name: "مايو", value: 0, highlight: false },
        { name: "يونيو", value: 0, highlight: false },
      ];
    }

    const maxVal = Math.max(...entries.map(([, v]) => v));
    return entries.map(([name, value]) => ({
      name,
      value,
      highlight: value === maxVal,
    }));
  })();

  // Property status bars
  const propertyBars = stats
    ? [
        {
          label: "مقبولة",
          count: stats.properties.approved,
          total:
            stats.properties.approved +
            stats.properties.pending +
            stats.properties.rejected,
          color: "bg-green-500",
        },
        {
          label: "معلقة",
          count: stats.properties.pending,
          total:
            stats.properties.approved +
            stats.properties.pending +
            stats.properties.rejected,
          color: "bg-amber-500",
        },
        {
          label: "مرفوضة",
          count: stats.properties.rejected,
          total:
            stats.properties.approved +
            stats.properties.pending +
            stats.properties.rejected,
          color: "bg-red-500",
        },
      ]
    : [];

  return (
    <div className="min-h-screen p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-extrabold tracking-tight text-primary"
          >
            لوحة التحكم <span className="text-secondary">الرئيسية</span>
          </motion.h1>
          <p className="text-xs font-medium text-text-muted mt-1 uppercase tracking-widest">
            Developer Performance Dashboard
          </p>
        </div>
      </header>

      {/* ── Stats Grid ─────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36" />
          ))
        ) : (
          <>
            <StatCard
              label="العقارات المقبولة"
              value={stats?.properties.approved ?? 0}
              trend="+Active"
              icon={Building2}
              delay={0.1}
            />
            <StatCard
              label="المشاريع المقبولة"
              value={stats?.projects.approved ?? 0}
              trend="Active"
              icon={LayoutDashboard}
              delay={0.2}
            />
            <StatCard
              label="إجمالي المشاهدات"
              value={stats?.totalViews ?? 0}
              icon={Eye}
              delay={0.3}
            />
            <StatCard
              label="إجمالي العملاء المحتملين"
              value={stats?.totalLeads ?? 0}
              icon={MessageSquare}
              highlight
              delay={0.4}
            />
          </>
        )}
      </section>

      {/* ── Charts + Status ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black uppercase tracking-tight text-primary">
              نشاط الإشعارات
            </h3>
            <button className="px-3 py-1 text-[10px] font-bold bg-primary text-white rounded-full">
              آخر الأشهر
            </button>
          </div>

          <div className="h-[300px] w-full mt-auto">
            {statsLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(0,0,0,0.05)"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 10, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 10 }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.02)" }}
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    itemStyle={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: "#1B2A4A",
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={48}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.highlight
                            ? "var(--color-secondary)"
                            : index === chartData.length - 1
                              ? "var(--color-primary)"
                              : "#f3f4f6"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Property Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center"
        >
          <h3 className="text-sm font-black uppercase mb-6 tracking-wider text-primary">
            حالة العقارات
          </h3>
          <div className="space-y-5">
            {statsLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-full" />
                ))
              : propertyBars.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 min-w-[70px]">
                      {item.label}
                    </span>
                    <div className="flex-1 mx-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            item.total > 0
                              ? `${(item.count / item.total) * 100}%`
                              : "0%",
                        }}
                        transition={{ duration: 1, delay: 0.2 * idx }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                    <span className="text-xs font-black text-primary w-6 text-right">
                      {String(item.count).padStart(2, "0")}
                    </span>
                  </div>
                ))}
          </div>

          {/* Quick mini stats */}
          {!statsLoading && stats && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                {
                  label: "مشاريع مقبولة",
                  value: stats.projects.approved,
                  color: "text-green-600",
                  bg: "bg-green-50",
                },
                {
                  label: "مشاريع معلقة",
                  value: stats.projects.pending,
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                },
                {
                  label: "عقارات معلقة",
                  value: stats.properties.pending,
                  color: "text-primary",
                  bg: "bg-primary/5",
                },
                {
                  label: "عملاء محتملين",
                  value: stats.totalLeads,
                  color: "text-secondary",
                  bg: "bg-secondary/10",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`${item.bg} rounded-xl p-3 border border-transparent`}
                >
                  <p className="text-[10px] text-gray-500 font-bold">
                    {item.label}
                  </p>
                  <p className={`text-xl font-black mt-0.5 ${item.color}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Properties Table + Notifications ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Properties Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black uppercase tracking-tight text-primary">
              أحدث العقارات
            </h3>
            <button className="text-[10px] font-bold text-secondary hover:underline uppercase tracking-widest">
              عرض الكل
            </button>
          </div>

          {propertiesLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-gray-50 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    <th className="px-4 pb-3">العقار</th>
                    <th className="px-4 pb-3">الموقع</th>
                    <th className="px-4 pb-3">السعر</th>
                    <th className="px-4 pb-3">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentProperties.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-sm text-gray-400"
                      >
                        لا توجد عقارات
                      </td>
                    </tr>
                  ) : (
                    recentProperties.map((property) => (
                      <tr
                        key={property.id}
                        className="hover:bg-gray-50/50 transition-colors group"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {property.images?.[0] && (
                              <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                <Image
                                  src={property.images[0]}
                                  alt={property.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  sizes="40px"
                                />
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-bold text-primary line-clamp-1">
                                {property.title}
                              </p>
                              <p className="text-[10px] text-gray-400 font-medium">
                                {property.type ?? "—"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-xs text-text-muted font-semibold">
                            <MapPin
                              size={11}
                              className="text-secondary shrink-0"
                            />
                            {property.district}، {property.city}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-black text-secondary whitespace-nowrap">
                          {formatPrice(property.price)}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={property.approvalStatus} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black uppercase tracking-tight text-primary">
              أحدث الإشعارات
            </h3>
          </div>

          {statsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">
              لا توجد إشعارات
            </p>
          ) : (
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="flex gap-3 items-start border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10 mt-0.5">
                    {statusIcon(notif.approvalStatus)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <p className="font-bold text-sm text-primary line-clamp-1">
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-gray-400 shrink-0 whitespace-nowrap">
                        {timeAgo(notif.updatedAt)}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "inline-block px-2 py-0.5 text-[10px] rounded-full font-bold border",
                        notif.approvalStatus === "approved"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : notif.approvalStatus === "rejected"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200",
                      )}
                    >
                      {notif.approvalStatus === "approved"
                        ? "مقبول"
                        : notif.approvalStatus === "rejected"
                          ? "مرفوض"
                          : "معلق"}
                    </span>
                    {notif.rejectionReason && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {notif.rejectionReason}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
