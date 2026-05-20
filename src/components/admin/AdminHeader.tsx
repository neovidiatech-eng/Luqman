"use client";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";
import { useGetProfile } from "@/hooks/admin/Useprofile";
import { useGetContacts } from "@/hooks/admin/Usecontacts";

const pageNames: Record<string, string> = {
  "/admin/dashboard": "الرئيسية",
  "/admin/properties": "إدارة العقارات",
  "/admin/projects": "إدارة المشاريع",
  "/admin/approvals": "طلبات الموافقة",
  "/admin/developers": "إدارة المطورين",
  "/admin/contacts": "طلبات التواصل",
  "/admin/blog": "المدونة",
  "/admin/settings": "الإعدادات",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading } = useGetProfile();
  const { data: contactsData } = useGetContacts({ status: "new", limit: 1 });

  const newContactsCount = contactsData?.data?.pagination?.total ?? 0;

  const profile = data?.data?.admin;
  const fullName = profile?.name ?? "المدير العام";
  const role = profile?.role ?? "مدير النظام";
  const avatar = profile?.avatarUrl ?? null;
  const initial = fullName.charAt(0);

  let title = "لوحة التحكم";
  const matchedKey = Object.keys(pageNames).find(
    (key) => pathname === key || (pathname && pathname.startsWith(key + "/")),
  );
  if (matchedKey) title = pageNames[matchedKey];

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500 hover:text-[var(--primary)]">
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-bold text-[var(--text)]">{title}</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="بحث سريع..."
            className="bg-gray-100 rounded-full py-2 pr-10 pl-4 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </div>

        {/* Bell */}
        <button
          onClick={() => router.push("/admin/contacts")}
          className="relative cursor-pointer text-gray-500 hover:text-[var(--primary)] transition-colors"
        >
          <Bell size={24} />
          {newContactsCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white">
              {newContactsCount > 99 ? "99+" : newContactsCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-3 border-r border-gray-200 pr-6">
          <div className="text-left hidden sm:block">
            {isLoading ? (
              <div className="space-y-1.5">
                <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
                <div className="h-2.5 w-20 bg-gray-100 rounded animate-pulse" />
              </div>
            ) : (
              <>
                <p className="text-sm font-bold text-[var(--text)]">
                  مرحباً، {fullName}
                </p>
                <p className="text-xs text-gray-500">{role}</p>
              </>
            )}
          </div>

          <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
            {isLoading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            ) : avatar ? (
              <Image
                src={avatar}
                alt={fullName}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-bold text-lg">{initial}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
