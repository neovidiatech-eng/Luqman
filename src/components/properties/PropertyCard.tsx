"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/lib/types";
import imagepaid from "@/assets/paid.png";

interface PropertyCardProps {
  key?: string | number;
  property: Property;
  view?: "grid" | "list";
}

const typeTranslations: Record<string, string> = {
  apartment: "شقة",
  villa: "فيلا",
  land: "أرض",
  commercial: "تجاري",
  offplan: "على الخارطة",
  compound: "مجمع سكني",
  resort: "منتجع",
  building: "عمارة",
};

const statusTranslations: Record<string, string> = {
  available: "متاح",
  reserved: "محجوز",
  sold: "تم البيع",
};

export default function PropertyCard({
  property,
  view = "grid",
}: PropertyCardProps) {
  const isGrid = view === "grid";

  const displayType = typeTranslations[property.type] || property.type;
  const displayStatus = statusTranslations[property.status] || property.status;

  return (
    <div
      className={`bg-white rounded-[20px] md:rounded-[24px] overflow-hidden
      shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex w-full
      ${
        isGrid
          ? "flex-col"
          : "flex-col md:flex-row md:h-[280px]"
      }
      group transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden bg-[#133c2e] ${
          isGrid
            ? "w-full aspect-[16/10] sm:aspect-[16/9]"
            : "w-full md:w-1/3 h-[220px] md:h-full"
        }`}
      >
        {property.images?.[0] && (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#133c2e]/70 via-transparent to-transparent z-10" />

        {/* Status Badge */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
          <span className="bg-white/95 text-[#133c2e] text-[10px] sm:text-[11px] font-black px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-sm">
            {displayStatus}
          </span>
        </div>

        {/* City & Type */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 text-white font-bold text-[11px] sm:text-xs flex items-center gap-1 sm:gap-1.5">
          <span>{property.city}</span>
          <span>•</span>
          <span>{displayType}</span>
        </div>

        {/* Sold / Reserved Watermark */}
        {(property.status === "reserved" || property.status === "sold") && (
          <div className="absolute inset-0 z-20 flex items-start justify-end p-2 sm:p-3 bg-black/10">
            <Image
              src={imagepaid}
              alt="تم البيع"
              width={80}
              height={80}
              className="object-contain sm:w-[90px] sm:h-[90px]"
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 lg:p-6 flex flex-col justify-center text-right flex-1">
        <div className="space-y-2 w-full">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-extrabold text-[#133c2e] line-clamp-2 group-hover:text-[#c9a84c] transition-colors duration-300">
            {property.title}
          </h3>

          {/* Price */}
          <p className="text-[#c9a84c] text-xl sm:text-2xl font-black">
            {property.price.toLocaleString("en-US")} ريال
          </p>

          {/* Area & Rooms */}
          <p className="text-gray-400 text-xs sm:text-sm font-semibold">
            {property.area} م²
            {property.bedrooms ? ` • ${property.bedrooms} غرفة` : ""}
          </p>
        </div>

        {/* Details Link */}
        <div className="pt-2 sm:pt-3 mt-auto w-full text-right">
          <Link
            href={`/properties/${property.id}`}
            className="text-[#0b7a6a] hover:text-[#c9a84c] font-semibold text-xs sm:text-sm transition-colors duration-300 inline-block"
          >
            عرض التفاصيل
          </Link>
        </div>
      </div>
    </div>
  );
}