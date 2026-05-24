"use client";
import { motion } from "motion/react";
import {
  Building2,
  Users2,
  Clock,
  LayoutDashboard,
  MapPin,
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
import { useAdminStats, useContactsChart } from "@/hooks/admin/Useadminstats";
import { useGetProperties } from "@/hooks/admin/Useproperties";
import { useGetContacts } from "@/hooks/admin/Usecontacts";
import { formatPrice, formatDate } from "@/lib/utils";
import StatusBadge from "@/components/admin/StatusBadge";
import Link from "next/link";

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

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: chart, isLoading: chartLoading } = useContactsChart();

  const { data: propertiesData, isLoading: propertiesLoading } =
    useGetProperties({ page: 1, limit: 5 });
  const recentProperties = propertiesData?.data?.properties ?? [];

  const { data: contactsData, isLoading: contactsLoading } = useGetContacts({
    page: 1,
    limit: 4,
  });
  const recentContacts = contactsData?.data?.contacts ?? [];

  const chartData = chart
    ? chart.labels.map((label, i) => ({
        name: label.toUpperCase(),
        value: chart.data[i],
        highlight: chart.data[i] === Math.max(...chart.data),
      }))
    : [];

  const propertyBars = stats
    ? [
        {
          label: "Published",
          count: stats.properties.published,
          total: stats.properties.total,
          color: "bg-green-500",
        },
        {
          label: "Pending",
          count: stats.properties.pending,
          total: stats.properties.total,
          color: "bg-amber-500",
        },
        {
          label: "Rejected",
          count: stats.properties.rejected,
          total: stats.properties.total,
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
            Real Estate Performance Intelligence
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
              label="إجمالي العقارات"
              value={stats?.properties.total ?? 0}
              trend="+12.5%"
              icon={Building2}
              delay={0.1}
            />
            <StatCard
              label="إجمالي المشاريع"
              value={stats?.projects.total ?? 0}
              trend="Active"
              icon={LayoutDashboard}
              delay={0.2}
            />
            <StatCard
              label="المطورين"
              value={stats?.developers.total ?? 0}
              icon={Users2}
              delay={0.3}
            />
            <StatCard
              label="استفسارات جديدة"
              value={stats?.contacts.new ?? 0}
              icon={Clock}
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
              نمو الاستفسارات
            </h3>
            <button className="px-3 py-1 text-[10px] font-bold bg-primary text-white rounded-full">
              6 أشهر
            </button>
          </div>

          <div className="h-[300px] w-full mt-auto">
            {chartLoading ? (
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

          {!statsLoading && stats && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                {
                  label: "مشاريع نشطة",
                  value: stats.projects.published,
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
                  label: "مطورين نشطين",
                  value: stats.developers.active,
                  color: "text-primary",
                  bg: "bg-primary/5",
                },
                {
                  label: "رسائل اليوم",
                  value: stats.contacts.today,
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

      {/* ── Properties Table + Contacts ────────────────────────────────────── */}
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
            <Link
              href={"/admin/properties"}
              className="text-[10px] font-bold text-secondary hover:underline uppercase tracking-widest"
            >
              عرض الكل
            </Link>
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
                            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                              <Image
                                src={property.images[0]}
                                alt={property.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="40px"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-primary line-clamp-1">
                                {property.title}
                              </p>
                              <p className="text-[10px] text-gray-400 font-medium">
                                {property.developer?.companyName ?? "—"}
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

        {/* Contact Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black uppercase tracking-tight text-primary">
              أحدث الرسائل
            </h3>
            <Link
              href={"/admin/contacts"}
              className="text-[10px] font-bold text-secondary hover:underline uppercase tracking-widest"
            >
              عرض الكل
            </Link>
          </div>

          {contactsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : recentContacts.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">
              لا توجد رسائل
            </p>
          ) : (
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex gap-3 items-start border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center shrink-0 font-black text-sm border border-primary/10">
                    {contact.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1 gap-2">
                      <p className="font-bold text-sm text-primary truncate">
                        {contact.name}
                      </p>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2">
                      {contact.message}
                    </p>

                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {contact.status === "new" && (
                        <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] rounded-full font-bold border border-secondary/20">
                          جديد
                        </span>
                      )}
                      {contact.status === "replied" && (
                        <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] rounded-full font-bold border border-green-200">
                          تم الرد
                        </span>
                      )}
                      {(contact.property || contact.project) && (
                        <span className="text-[10px] text-gray-400 font-medium truncate">
                          {contact.property?.title ?? contact.project?.name}
                        </span>
                      )}
                    </div>
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
