"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DeveloperSidebar from "@/components/developer/DeveloperSidebar";
import DeveloperHeader from "@/components/developer/DeveloperHeader";

export default function DeveloperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const isAuthPage =
    pathname === "/login" || pathname === "/developer/register";

  useEffect(() => {
    if (isAuthPage) {
      setChecked(true);
      return;
    }

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "developer") {
      router.replace("/login");
    } else {
      setChecked(true);
    }
  }, [router, isAuthPage]);

  if (!checked) return null;

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen" dir="rtl">
      <DeveloperSidebar />
      <div className="flex-1 flex flex-col" style={{ marginRight: "260px" }}>
        <DeveloperHeader />
        <main className="flex-1 p-6" style={{ background: "var(--bg)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
