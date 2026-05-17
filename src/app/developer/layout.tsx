"use client";
import { usePathname } from "next/navigation";
import DeveloperSidebar from "@/components/developer/DeveloperSidebar";
import DeveloperHeader from "@/components/developer/DeveloperHeader";

export default function DeveloperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" || pathname === "/developer/register";
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
