"use client";
import { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Building2,
  SlidersHorizontal,
  Filter,
} from "lucide-react";
import { mockProjects, saudiCities } from "@/lib/mock-data";
import ProjectCard from "@/components/projects/ProjectCard";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { motion } from "motion/react";

export default function Projects() {
  const [filters, setFilters] = useState({
    city: "",
    status: "",
    search: "",
  });

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      if (filters.city && project.city !== filters.city) return false;
      if (filters.status && project.status !== filters.status) return false;
      if (filters.search && !project.name.includes(filters.search))
        return false;
      return true;
    });
  }, [filters]);

  return (
    <main className="pt-32 pb-20 bg-bg min-h-screen">
      {/* Header Section */}
      <section className="bg-primary pt-12 pb-24 mb-[-80px] text-white">
        <div className="container">
          <Breadcrumb items={[{ label: "المشاريع" }]} />
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            كُبرى المشاريع العقارية
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            استكشف أضخم المجمعات السكنية والتجارية التي ترسم مستقبل المملكة.
          </p>
        </div>
      </section>

      <div className="container relative z-10">
        {/* Horizontal Filters */}
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-border mb-12 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] text-text-muted font-bold mb-2 uppercase tracking-widest">
              بحث بالمشروع
            </label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="اسم المشروع..."
                className="w-full pr-10 pl-4 py-3 bg-bg rounded-xl border border-transparent focus:border-secondary transition-all outline-none"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] text-text-muted font-bold mb-2 uppercase tracking-widest">
              المدينة
            </label>
            <select
              className="w-full px-4 py-3 bg-bg rounded-xl border border-transparent focus:border-secondary transition-all outline-none appearance-none cursor-pointer"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            >
              <option value="">كل المدن</option>
              {saudiCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] text-text-muted font-bold mb-2 uppercase tracking-widest">
              حالة المشروع
            </label>
            <select
              className="w-full px-4 py-3 bg-bg rounded-xl border border-transparent focus:border-secondary transition-all outline-none appearance-none cursor-pointer"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">كل الحالات</option>
              <option value="under_construction">قيد الإنشاء</option>
              <option value="completed">مكتمل</option>
              <option value="development">قيد التطوير</option>
            </select>
          </div>

          <button
            onClick={() => setFilters({ city: "", status: "", search: "" })}
            className="px-8 py-3 bg-secondary text-primary font-black rounded-xl hover:bg-accent transition-all whitespace-nowrap"
          >
            بحث
          </button>
        </div>

        {/* Results Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                key={project.id}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
            <h3 className="text-2xl font-bold text-primary mb-2">
              لا توجد مشاريع
            </h3>
            <p className="text-text-muted text-lg">
              لم يتم العثور على أي مشروع يطابق خيارات البحث.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
