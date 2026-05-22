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
    <main className="pt-32 pb-20 bg-[#FBF8F3] min-h-screen">
      <div className="container">
        {/* Right-aligned Page Header */}
        <header className="mb-12 text-right">
          <h1 className="text-4xl font-extrabold text-[#133c2e] mb-3">
            اكتشف عقارك المثالي في السعودية
          </h1>
          <p className="text-gray-400 font-bold text-sm">
            {isLoading ? "جاري البحث..." : `عرض ${filteredProperties.length} عقار`}
          </p>
        </header>

        {/* Layout Grid: Filters on the right, Cards on the left (RTL) */}
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Filters Sidebar (First child = Right on desktop, Top on mobile in RTL) */}
          <aside className="w-full lg:w-1/4">
            <PropertyFilters
              filters={filters}
              setFilters={setFilters}
              onClear={clearFilters}
            />
          </aside>

          {/* Results Grid (Second child = Left on desktop, Bottom on mobile in RTL) */}
          <div className="w-full lg:w-3/4" id="results-grid">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-[#133c2e] font-black text-lg">جاري تحميل العقارات...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-red-500 font-black text-lg">حدث خطأ أثناء تحميل العقارات</p>
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
                {filteredProperties.map((property) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    key={property.id}
                  >
                    <PropertyCard property={property} view="grid" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[24px] p-16 text-center border border-gray-100 shadow-sm">
                <div className="w-16 h-16 bg-[#FBF8F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-extrabold text-[#133c2e] mb-2">
                  لا توجد نتائج
                </h3>
                <p className="text-gray-400 mb-6 text-sm">
                  لم يتم العثور على أي عقار يطابق هذه الفلاتر، جرب تغيير خيارات البحث.
                </p>
                <button onClick={clearFilters} className="bg-[#c9a84c] text-[#133c2e] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#b8973b] transition-all">
                  إعادة تعيين البحث
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
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
