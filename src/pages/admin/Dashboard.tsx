"use client";
import {
  Building,
  Users,
  CheckCircle,
  Home,
  FileText,
  MessageSquare,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import DataTable from "@/components/admin/DataTable";
import ApprovalCard from "@/components/admin/ApprovalCard";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  mockProperties,
  mockContactRequests,
  mockDevelopers,
} from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";
import Image from "next/image";

export default function Dashboard() {
  const totalProperties = mockProperties.length;
  const pendingApprovals = mockProperties.filter(
    (p) => p.approvalStatus === "pending",
  ).length;
  const totalDevelopers = mockDevelopers.length;
  const newMessages = mockContactRequests.filter(
    (m) => m.status === "new",
  ).length;

  const recentProperties = mockProperties.slice(0, 5);
  const recentContacts = mockContactRequests.slice(0, 5);
  const pendingItems = mockProperties
    .filter((p) => p.approvalStatus === "pending")
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Row 1: Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="إجمالي العقارات"
          value={totalProperties}
          icon={<Building size={24} />}
          iconBg="var(--primary)"
          trend="+12%"
        />
        <StatsCard
          title="طلبات قيد المراجعة"
          value={pendingApprovals}
          icon={<CheckCircle size={24} />}
          iconBg="var(--warning)"
        />
        <StatsCard
          title="إجمالي المطورين"
          value={totalDevelopers}
          icon={<Users size={24} />}
          iconBg="var(--success)"
          trend="+3"
        />
        <StatsCard
          title="رسائل جديدة"
          value={newMessages}
          icon={<MessageSquare size={24} />}
          iconBg="var(--secondary)"
        />
      </div>

      {/* Row 2: Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-[var(--text)]">
              أحدث العقارات المضافة
            </h3>
          </div>
          <DataTable
            data={recentProperties}
            keyExtractor={(item) => item.id}
            columns={[
              {
                header: "العقار",
                render: (item) => (
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded overflow-hidden shrink-0 border border-gray-100">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[var(--text)]">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.district}، {item.city}
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                header: "السعر",
                render: (item) => (
                  <span className="font-medium text-[var(--secondary)]">
                    {formatPrice(item.price)}
                  </span>
                ),
              },
              {
                header: "الحالة",
                render: (item) => <StatusBadge status={item.status} />,
              },
            ]}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-[var(--text)]">
              أحدث الرسائل
            </h3>
          </div>
          <div className="space-y-4">
            {recentContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                  {contact.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-sm text-[var(--text)]">
                      {contact.name}
                    </p>
                    <span className="text-xs text-gray-400">
                      {formatDate(contact.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {contact.message}
                  </p>
                  {contact.status === "new" && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-[10px] rounded-full font-medium">
                      جديد
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Pending Approvals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-[var(--text)]">
            عقارات بانتظار الموافقة
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {pendingItems.map((item) => (
            <ApprovalCard key={item.id} item={item} type="property" />
          ))}
          {pendingItems.length === 0 && (
            <div className="col-span-full py-8 text-center text-gray-500">
              لا توجد عقارات بانتظار الموافقة حالياً
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
