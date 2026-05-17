"use client";
import { useState, useMemo } from "react";
import { LayoutGrid, List as ListIcon, SlidersHorizontal } from "lucide-react";
import { mockProperties } from "@/lib/mock-data";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilters from "@/components/properties/PropertyFilters";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { motion, AnimatePresence } from "motion/react";

export default function Properties() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    city: "",
    types: [] as string[],
    district: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });

  // Filter logic
  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      if (filters.city && property.city !== filters.city) return false;
      if (filters.types.length > 0 && !filters.types.includes(property.type))
        return false;
      if (filters.district && !property.district.includes(filters.district))
        return false;
      if (filters.minPrice && property.price < Number(filters.minPrice))
        return false;
      if (filters.maxPrice && property.price > Number(filters.maxPrice))
        return false;
      if (filters.bedrooms) {
        const bedrooms = property.bedrooms || 0;
        if (
          filters.bedrooms === "5+"
            ? bedrooms < 5
            : bedrooms.toString() !== filters.bedrooms
        )
          return false;
      }
      return true;
    });
  }, [filters]);

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
              تم العثور على {filteredProperties.length} عقاراً يطابق بحثك
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
            {filteredProperties.length > 0 ? (
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
