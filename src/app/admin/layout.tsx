"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.replace("/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (pathname === "/login") {
    return <>{children}</>;
  }

  // لحد ما الـ check يخلص، ما نعرضش حاجة
  if (!checked) return null;

  return (
    <div className="flex min-h-screen" dir="rtl">
      <AdminSidebar />
      <div className="flex-1 flex flex-col" style={{ marginRight: "260px" }}>
        <AdminHeader />
        <main className="flex-1 p-6" style={{ background: "var(--bg)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
