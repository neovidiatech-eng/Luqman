"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, List as ListIcon, SlidersHorizontal } from "lucide-react";
import { useGetProperties } from "@/hooks/public/useProperties";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilters from "@/components/properties/PropertyFilters";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { motion, AnimatePresence } from "motion/react";

// Wrap the main content in a component to use useSearchParams safely
function PropertiesContent() {
  const searchParams = useSearchParams();
  
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    city: searchParams?.get("city") || "",
    types: searchParams?.get("type") ? [searchParams?.get("type") as string] : [] as string[],
    district: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });

  // Also sync when searchParams change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      city: searchParams?.get("city") || prev.city,
      types: searchParams?.get("type") ? [searchParams?.get("type") as string] : prev.types,
    }));
  }, [searchParams]);

  // Map frontend filters to API expected formats
  const apiFilters = useMemo(() => {
    return {
      city: filters.city || undefined,
      type: filters.types.length > 0 ? filters.types.join(',') : undefined,
      district: filters.district || undefined,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      bedrooms: filters.bedrooms && filters.bedrooms !== "5+" ? Number(filters.bedrooms) : undefined,
      // If "5+", we might need a different API approach, but for now we'll map as best as possible
    };
  }, [filters]);

  // Fetch from Backend
  const { data, isLoading, error } = useGetProperties(apiFilters);
  const filteredProperties = data?.data?.properties || [];

  const clearFilters = () => {
    setFilters({
      city: "",
      types: [],
      district: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
    });
  };

  return (
    <main className="pt-32 pb-20 bg-bg min-h-screen">
      <div className="container">
        <Breadcrumb items={[{ label: "العقارات" }]} />

        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-primary mb-2">
              استكشف العقارات
            </h1>
            <p className="text-text-muted">
              {isLoading ? "جاري البحث..." : `تم العثور على ${filteredProperties.length} عقاراً يطابق بحثك`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* View Switcher */}
            <div className="bg-white p-1 rounded-xl border border-border flex">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-lg transition-all ${view === "grid" ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-primary"}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-lg transition-all ${view === "list" ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-primary"}`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden btn btn-primary py-2.5 flex items-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>الفلاتر</span>
            </button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-1/4">
            <PropertyFilters
              filters={filters}
              setFilters={setFilters}
              onClear={clearFilters}
            />
          </aside>

          {/* Results Grid */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-primary font-bold text-xl">جاري تحميل العقارات...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-red-500 font-bold text-xl">حدث خطأ أثناء تحميل العقارات</p>
              </div>
            ) : filteredProperties.length > 0 ? (
              <div
                className={`grid gap-8 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
              >
                {filteredProperties.map((property) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    key={property.id}
                  >
                    <PropertyCard property={property} view={view} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <SlidersHorizontal className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  لا توجد نتائج
                </h3>
                <p className="text-text-muted mb-8 text-lg">
                  لم يتم العثور على أي عقار يطابق هذه الفلاتر، جرب تغيير خيارات
                  البحث.
                </p>
                <button onClick={clearFilters} className="btn btn-secondary">
                  إعادة تعيين البحث
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 w-full h-[85vh] bg-white z-[110] rounded-t-[3rem] p-6 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <div className="overflow-y-auto flex-1 pb-10">
                <PropertyFilters
                  filters={filters}
                  setFilters={setFilters}
                  onClear={clearFilters}
                />
              </div>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full btn btn-primary py-4 mt-4"
              >
                عرض {filteredProperties.length} عقاراً
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

import { Suspense } from "react";

export default function Properties() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-20 flex justify-center items-center"><p className="text-primary font-bold text-xl">جاري التحميل...</p></div>}>
      <PropertiesContent />
    </Suspense>
  );
}
