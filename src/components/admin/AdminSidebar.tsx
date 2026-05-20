// 'use client'
// import Link from 'next/link'
// import { usePathname, useRouter } from 'next/navigation'
// import { Home, Building, LayoutGrid, CheckCircle, Users, MessageSquare, FileText, Settings, LogOut } from 'lucide-react'
// import { mockProperties, mockContactRequests } from '@/lib/mock-data'

// export default function AdminSidebar() {
//   const pathname = usePathname()
//   const router = useRouter()

//   const pendingCount = mockProperties.filter(p => p.approvalStatus === 'pending').length
//   const newContactsCount = mockContactRequests.filter(r => r.status === 'new').length

//   const navItems = [
//     { href: '/admin/dashboard',  label: 'الرئيسية',        icon: <Home size={20} /> },
//     { href: '/admin/properties', label: 'إدارة العقارات',  icon: <Building size={20} /> },
//     { href: '/admin/projects',   label: 'إدارة المشاريع',  icon: <LayoutGrid size={20} /> },
//     { href: '/admin/approvals',  label: 'طلبات الموافقة',  icon: <CheckCircle size={20} />, badge: pendingCount },
//     { href: '/admin/developers', label: 'إدارة المطورين',  icon: <Users size={20} /> },
//     { href: '/admin/contacts',   label: 'طلبات التواصل',   icon: <MessageSquare size={20} />, badge: newContactsCount },
//     { href: '/admin/blog',       label: 'المدونة',          icon: <FileText size={20} /> },
//     { href: '/admin/settings',   label: 'الإعدادات',        icon: <Settings size={20} /> },
//   ]

//   const handleLogout = () => {
//     router.push('/login')
//   }

//   return (
//     <aside className="fixed top-0 right-0 bottom-0 w-[260px] flex flex-col z-40" style={{ backgroundColor: 'var(--sidebar-bg)' }}>
//       <div className="h-20 flex items-center justify-center border-b border-gray-700/50 px-6">
//         <h1 className="text-xl font-bold text-white">لقمان العقارية</h1>
//       </div>

//       <div className="flex-1 overflow-y-auto no-scrollbar py-6 px-4 flex flex-col gap-2">
//         {navItems.map((item) => {
//           const isActive = pathname === item.href || (pathname && pathname.startsWith(item.href + '/'))

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
//                 isActive
//                   ? 'bg-[var(--secondary)] text-[var(--sidebar-bg)] font-bold'
//                   : 'text-gray-300 hover:bg-white/10 hover:text-white'
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 {item.icon}
//                 <span>{item.label}</span>
//               </div>
//               {item.badge !== undefined && item.badge > 0 && (
//                 <span className="flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-bold">
//                   {item.badge}
//                 </span>
//               )}
//             </Link>
//           )
//         })}
//       </div>

//       <div className="p-4 border-t border-gray-700/50">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
//         >
//           <LogOut size={20} />
//           <span>تسجيل الخروج</span>
//         </button>
//       </div>
//     </aside>
//   )
// // }
// "use client";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   Home,
//   Building,
//   LayoutGrid,
//   CheckCircle,
//   Users,
//   MessageSquare,
//   FileText,
//   Settings,
//   LogOut,
// } from "lucide-react";
// import { useGetContacts } from "@/hooks/admin/Usecontacts";
// import { useGetProperties } from "@/hooks/admin/Useproperties";

// export default function AdminSidebar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   // ── Real counts from API ──────────────────────────────────────────────────
//   const { data: contactsData } = useGetContacts({ status: "new", limit: 1 });
//   const { data: propertiesData } = useGetProperties({
//     status: "pending",
//     limit: 1,
//   });

//   const newContactsCount = contactsData?.data?.pagination?.total ?? 0;
//   const pendingCount = propertiesData?.data?.pagination?.total ?? 0;

//   // ── Nav items ─────────────────────────────────────────────────────────────
//   const navItems = [
//     { href: "/admin/dashboard", label: "الرئيسية", icon: <Home size={20} /> },
//     {
//       href: "/admin/properties",
//       label: "إدارة العقارات",
//       icon: <Building size={20} />,
//     },
//     {
//       href: "/admin/projects",
//       label: "إدارة المشاريع",
//       icon: <LayoutGrid size={20} />,
//     },
//     {
//       href: "/admin/approvals",
//       label: "طلبات الموافقة",
//       icon: <CheckCircle size={20} />,
//       badge: pendingCount,
//     },
//     {
//       href: "/admin/developers",
//       label: "إدارة المطورين",
//       icon: <Users size={20} />,
//     },
//     {
//       href: "/admin/contacts",
//       label: "طلبات التواصل",
//       icon: <MessageSquare size={20} />,
//       badge: newContactsCount,
//     },
//     { href: "/admin/blog", label: "المدونة", icon: <FileText size={20} /> },
//     {
//       href: "/admin/settings",
//       label: "الإعدادات",
//       icon: <Settings size={20} />,
//     },
//   ];

//   return (
//     <aside
//       className="fixed top-0 right-0 bottom-0 w-[260px] flex flex-col z-40"
//       style={{ backgroundColor: "var(--sidebar-bg)" }}
//     >
//       <div className="h-20 flex items-center justify-center border-b border-gray-700/50 px-6">
//         <h1 className="text-xl font-bold text-white">لقمان العقارية</h1>
//       </div>

//       <div className="flex-1 overflow-y-auto no-scrollbar py-6 px-4 flex flex-col gap-2">
//         {navItems.map((item) => {
//           const isActive =
//             pathname === item.href ||
//             (pathname?.startsWith(item.href + "/") ?? false);

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
//                 isActive
//                   ? "bg-[var(--secondary)] text-[var(--sidebar-bg)] font-bold"
//                   : "text-gray-300 hover:bg-white/10 hover:text-white"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 {item.icon}
//                 <span>{item.label}</span>
//               </div>
//               {item.badge !== undefined && item.badge > 0 && (
//                 <span className="flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-bold">
//                   {item.badge}
//                 </span>
//               )}
//             </Link>
//           );
//         })}
//       </div>

//       <div className="p-4 border-t border-gray-700/50">
//         <button
//           onClick={() => router.push("/admin/login")}
//           className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
//         >
//           <LogOut size={20} />
//           <span>تسجيل الخروج</span>
//         </button>
//       </div>
//     </aside>
//   );
// }
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Building,
  LayoutGrid,
  CheckCircle,
  Users,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";
import { useGetContacts } from "@/hooks/admin/Usecontacts";
import { useGetProperties } from "@/hooks/admin/Useproperties";
import { useGetProfile } from "@/hooks/admin/Useprofile";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // ── Real counts from API ──────────────────────────────────────────────────
  const { data: contactsData } = useGetContacts({ status: "new", limit: 1 });
  const { data: propertiesData } = useGetProperties({
    status: "pending",
    limit: 1,
  });
  const { data: profileData } = useGetProfile();

  const newContactsCount = contactsData?.data?.pagination?.total ?? 0;
  const pendingCount = propertiesData?.data?.pagination?.total ?? 0;
  const admin = profileData?.data?.admin;

  // ── Nav items ─────────────────────────────────────────────────────────────
  const navItems = [
    { href: "/admin/dashboard", label: "الرئيسية", icon: <Home size={20} /> },
    {
      href: "/admin/properties",
      label: "إدارة العقارات",
      icon: <Building size={20} />,
    },
    {
      href: "/admin/projects",
      label: "إدارة المشاريع",
      icon: <LayoutGrid size={20} />,
    },
    {
      href: "/admin/approvals",
      label: "طلبات الموافقة",
      icon: <CheckCircle size={20} />,
      badge: pendingCount,
    },
    {
      href: "/admin/developers",
      label: "إدارة المطورين",
      icon: <Users size={20} />,
    },
    {
      href: "/admin/contacts",
      label: "طلبات التواصل",
      icon: <MessageSquare size={20} />,
      badge: newContactsCount,
    },
    { href: "/admin/blog", label: "المدونة", icon: <FileText size={20} /> },
    {
      href: "/admin/settings",
      label: "الإعدادات",
      icon: <Settings size={20} />,
    },
  ];

  const isProfileActive =
    pathname === "/admin/profile" ||
    (pathname?.startsWith("/admin/profile/") ?? false);

  return (
    <aside
      className="fixed top-0 right-0 bottom-0 w-[260px] flex flex-col z-40"
      style={{ backgroundColor: "var(--sidebar-bg)" }}
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-gray-700/50 px-6">
        <h1 className="text-xl font-bold text-white">لقمان العقارية</h1>
      </div>

      {/* Admin profile card */}
      <Link
        href="/admin/profile"
        className={`mx-4 mt-4 flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
          isProfileActive
            ? "bg-[var(--secondary)] text-[var(--sidebar-bg)]"
            : "bg-white/5 hover:bg-white/10 text-white"
        }`}
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shrink-0">
          {admin?.avatarUrl ? (
            <img
              src={admin.avatarUrl}
              alt={admin.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserCircle
              size={26}
              className={
                isProfileActive ? "text-[var(--sidebar-bg)]" : "text-gray-300"
              }
            />
          )}
        </div>

        {/* Name + role */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-semibold truncate ${isProfileActive ? "text-[var(--sidebar-bg)]" : "text-white"}`}
          >
            {admin?.name ?? "مرحباً"}
          </p>
          <p
            className={`text-xs truncate ${isProfileActive ? "text-[var(--sidebar-bg)]/70" : "text-gray-400"}`}
          >
            {admin?.role ?? "مدير النظام"}
          </p>
        </div>
      </Link>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-4 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname?.startsWith(item.href + "/") ?? false);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-[var(--secondary)] text-[var(--sidebar-bg)] font-bold"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700/50">
        <button
          onClick={() => router.push("/admin/login")}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
