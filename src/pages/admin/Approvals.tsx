"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import ApprovalCard from "@/components/admin/ApprovalCard";
import { useGetApprovalQueue } from "@/hooks/admin/Useapprovalqueue";

export default function Approvals() {
  const [activeTab, setActiveTab] = useState<"all" | "properties" | "projects">(
    "all",
  );
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useGetApprovalQueue();

  const pendingProperties = data?.data.properties ?? [];
  const pendingProjects = data?.data.projects ?? [];
  const totalPending = data?.data.totalPending ?? 0;

  // ─── Build items list based on active tab ─────────────────────────────────
  let items: { item: any; type: "property" | "project" }[] = [];

  if (activeTab === "all" || activeTab === "properties") {
    items = [
      ...items,
      ...pendingProperties.map((p) => ({ item: p, type: "property" as const })),
    ];
  }
  if (activeTab === "all" || activeTab === "projects") {
    items = [
      ...items,
      ...pendingProjects.map((p) => ({ item: p, type: "project" as const })),
    ];
  }

  // ─── Search filter ─────────────────────────────────────────────────────────
  const filteredItems = searchTerm
    ? items.filter(({ item, type }) => {
        const title = type === "property" ? item.title : item.name;
        const companyName = item.developer?.companyName ?? "";
        return title.includes(searchTerm) || companyName.includes(searchTerm);
      })
    : items;

  // ─── States ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-400">
        جاري التحميل...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-24 text-red-500">
        حدث خطأ أثناء تحميل البيانات، حاول مرة أخرى
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Tabs */}
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-100 w-full md:w-auto">
          <button
            className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "all" ? "bg-[var(--primary)] text-white" : "text-gray-600 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("all")}
          >
            الكل ({totalPending})
          </button>
          <button
            className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "properties" ? "bg-[var(--primary)] text-white" : "text-gray-600 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("properties")}
          >
            العقارات ({pendingProperties.length})
          </button>
          <button
            className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "projects" ? "bg-[var(--primary)] text-white" : "text-gray-600 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("projects")}
          >
            المشاريع ({pendingProjects.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="بحث باسم العقار، المطور..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-[var(--primary)]"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredItems.map(({ item, type }) => (
          <ApprovalCard key={`${type}-${item.id}`} item={item} type={type} />
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
            لا توجد طلبات موافقة حالياً
          </div>
        )}
      </div>
    </div>
  );
}
