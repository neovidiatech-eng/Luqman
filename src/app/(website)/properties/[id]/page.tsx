"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Share2,
  MessageCircle,
  Link as LinkIcon,
  Download,
  Phone,
  ChevronLeft,
  LayoutGrid,
  CheckCircle2,
} from "lucide-react";
import { mockProperties, companyInfo } from "@/lib/mock-data";
import PropertyGallery from "@/components/properties/PropertyGallery";
import ContactForm from "@/components/shared/ContactForm";
import MapPlaceholder from "@/components/shared/MapPlaceholder";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

export default function PropertyDetail() {
  const params = useParams();
  const id = params?.id as string;
  const property = mockProperties.find((p) => p.id === id);
  const [copied, setCopied] = useState(false);
  if (!property) {
    return (
      <div className="pt-40 pb-20 text-center container">
        <h1 className="text-4xl font-black mb-4">العقار غير موجود</h1>
        <Link href="/properties" className="btn btn-primary">
          العودة لقائمة العقارات
        </Link>
      </div>
    );
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOnWhatsApp = () => {
    const text = `ألقِ نظرة على هذا العقار في لقمان العقارية: ${property.title} - ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  // const copyLink = () => {
  //   navigator.clipboard.writeText(window.location.href);
  //   // Would show toast here
  // };

  return (
    <main className="pt-32 pb-20 bg-bg">
      <div className="container">
        <Breadcrumb
          items={[
            { label: "العقارات", href: "/properties" },
            { label: property.title },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <PropertyGallery images={property.images} />

            <div className="mt-12 bg-white p-8 md:p-12 rounded-3xl border border-border shadow-sm">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-primary mb-4">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-text-muted">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <span className="font-bold">
                      {property.city}، {property.district}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={shareOnWhatsApp}
                    className="w-12 h-12 bg-green-50 text-whatsapp rounded-xl flex items-center justify-center hover:bg-whatsapp hover:text-white transition-all shadow-sm"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  {/* <button
                    onClick={copyLink}
                    className="w-12 h-12 bg-gray-50 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                  >
                    <LinkIcon className="w-5 h-5" />
                  </button> */}
                  <div className="relative">
                    <button
                      onClick={copyLink}
                      className="w-12 h-12 bg-gray-50 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                      <LinkIcon className="w-5 h-5" />
                    </button>

                    {copied && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap shadow-lg">
                        تم نسخ الرابط
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    label: "نوع العقار",
                    value: property.type,
                    icon: LayoutGrid,
                  },
                  {
                    label: "المساحة",
                    value: `${property.area} م²`,
                    icon: Square,
                  },
                  { label: "المدينة", value: property.city, icon: MapPin },
                  {
                    label: "عدد الغرف",
                    value: property.bedrooms || "N/A",
                    icon: Bed,
                  },
                  {
                    label: "عدد الحمامات",
                    value: property.bathrooms || "N/A",
                    icon: Bath,
                  },
                  { label: "الحي", value: property.district, icon: MapPin },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-bg p-4 rounded-2xl flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-secondary shadow-sm">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted font-black mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-primary font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mb-12">
                <h3 className="text-2xl font-black text-primary mb-6">
                  الوصف التفصيلي
                </h3>
                <div className="text-text-muted leading-relaxed whitespace-pre-wrap text-lg">
                  {property.description}
                </div>
              </div>

              {/* Features */}
              <div className="mb-12">
                <h3 className="text-2xl font-black text-primary mb-6">
                  المزايا والخصائص
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-bg/50 p-4 rounded-xl"
                    >
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span className="font-bold text-primary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="mb-12">
                <h3 className="text-2xl font-black text-primary mb-6">
                  الموقع الجغرافي
                </h3>
                <MapPlaceholder
                  location={`${property.district}، ${property.city}`}
                />
              </div>

              {/* Downloads */}
              <div>
                <h3 className="text-2xl font-black text-primary mb-6">
                  ملفات العقار
                </h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black hover:bg-secondary hover:text-primary transition-all group"
                >
                  <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                  <span>تحميل كرت العقار (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              {/* Pricing & Contact Card */}
              <div className="bg-white p-8 rounded-3xl border border-border shadow-xl">
                <div className="mb-8">
                  <p className="text-text-muted font-bold mb-1">
                    السعر المطلوب
                  </p>
                  <p className="text-secondary text-4xl font-black">
                    {formatPrice(property.price)}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mb-8">
                  <div
                    className={`p-4 rounded-2xl border flex items-center justify-between ${
                      property.status === "available"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : property.status === "reserved"
                          ? "bg-orange-50 border-orange-200 text-orange-700"
                          : "bg-red-50 border-red-200 text-red-700"
                    }`}
                  >
                    <span className="font-black">حالة العقار:</span>
                    <span className="font-black px-3 py-1 rounded bg-white shadow-sm">
                      {property.status === "available"
                        ? "متاح للعرض"
                        : property.status === "reserved"
                          ? "محجوز حالياً"
                          : "تم البيع"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 ">
                  <ContactForm compact propertyTitle={property.title} />

                  <div className="pt-6 border-t border-gray-100 space-y-3">
                    <a
                      href={`https://wa.me/${companyInfo.whatsapp}?text=أريد الاستفسار عن: ${property.title}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full btn bg-whatsapp text-white py-4"
                    >
                      <Phone className="w-5 h-5 ml-2" />
                      تواصل عبر واتساب
                    </a>
                    <a
                      href={`tel:${companyInfo.phone}`}
                      className="w-full btn btn-outline py-4"
                    >
                      اتصال هاتفي
                    </a>
                  </div>
                </div>

                <div className="mt-8 text-center bg-bg p-4 rounded-2xl">
                  <p className="text-xs text-text-muted font-bold mb-1">
                    المطور العقاري
                  </p>
                  <p className="text-primary font-black">
                    {property.developerName}
                  </p>
                </div>
              </div>

              {/* Quick Ad */}
              <div className="bg-primary text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-2">فرصة استثمارية؟</h4>
                  <p className="text-sm text-gray-400 mb-6">
                    احصل على استشارة عقارية مجانية من خبراء لقمان.
                  </p>
                  <Link
                    href="/contact"
                    className="text-secondary font-bold flex items-center gap-2 hover:underline"
                  >
                    <span>تواصل معنا الآن</span>
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                </div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
