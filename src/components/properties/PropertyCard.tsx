"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Bed, Bath, Square, Eye, ArrowLeft } from "lucide-react";
import { Property } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import imagepaid from "@/assets/paid.png";
interface PropertyCardProps {
  key?: string | number;
  property: Property;
  view?: "grid" | "list";
}

export default function PropertyCard({
  property,
  view = "grid",
}: PropertyCardProps) {
  const isGrid = view === "grid";

  return (
    <div
      className={`card-sleek flex ${isGrid ? "flex-col" : "flex-row h-[280px]"} group`}
    >
      {/* Image Section */}
      {/* <div className={`relative overflow-hidden ${isGrid ? 'w-full aspect-[16/10]' : 'w-1/3 h-full'}`}>
        <Image 
          src={property.images[0]} 
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`px-3 py-1 rounded text-[10px] font-black tracking-wider ${
            property.status === 'available' ? 'bg-success text-white' : 
            property.status === 'reserved' ? 'bg-warning text-white' : 'bg-error text-white'
          }`}>
            {property.status === 'available' ? 'متاح' : property.status === 'reserved' ? 'محجوز' : 'تم البيع'}
          </span>
        </div>
      </div> */}
      {/* <div
        className={`relative overflow-hidden ${isGrid ? "w-full aspect-[16/10]" : "w-1/3 h-full"}`}
      >
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {(property.status === "reserved" || property.status === "sold") && (
          <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
            <Image
              src={imagepaid}
              alt="تم البيع"
              width={220}
              height={220}
              className="object-contain rotate-[-12deg] opacity-95"
            />
          </div>
        )}

        <div className="absolute top-3 right-3 flex gap-2 z-20">
          <span
            className={`px-3 py-1 rounded text-[10px] font-black tracking-wider ${
              property.status === "available"
                ? "bg-success text-white"
                : property.status === "reserved"
                  ? "bg-warning text-white"
                  : "bg-error text-white"
            }`}
          >
            {property.status === "available"
              ? "متاح"
              : property.status === "reserved"
                ? "محجوز"
                : "تم البيع"}
          </span>
        </div>
      </div> */}
      <div
        className={`relative overflow-hidden ${
          isGrid ? "w-full aspect-[16/10]" : "w-1/3 h-full"
        }`}
      >
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {(property.status === "reserved" || property.status === "sold") && (
          <div className="absolute inset-0 z-10 flex items-start justify-end p-3">
            <Image
              src={imagepaid}
              alt="تم البيع"
              width={90}
              height={90}
              className="object-contain"
            />
          </div>
        )}
      </div>
      {/* Content Section */}
      <div
        className={`p-5 flex flex-col flex-1 ${!isGrid && "justify-between"}`}
      >
        <div>
          <div className="flex items-center gap-2 text-text-muted text-[10px] font-black uppercase tracking-widest mb-3">
            <span className="bg-bg px-2 py-0.5 rounded">{property.type}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>
                {property.city}، {property.district}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-primary mb-2 line-clamp-1 group-hover:text-secondary transition-colors">
            {property.title}
          </h3>

          <p className="text-secondary text-xl font-black mb-4">
            {formatPrice(property.price)}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between border-t border-gray-50 pt-4 mb-4">
            <div className="flex items-center gap-4 text-[11px] font-bold text-text-muted">
              {property.bedrooms && (
                <div className="flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-secondary" />
                  <span>{property.bedrooms} غرف</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Square className="w-3.5 h-3.5 text-secondary" />
                <span>{property.area} م²</span>
              </div>
            </div>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="w-full btn btn-primary text-xs py-3 rounded-xl"
          >
            <span>عرض التفاصيل</span>
            <ArrowLeft className="w-4 h-4 mr-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
