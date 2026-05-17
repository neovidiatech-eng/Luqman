import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "لقمان للتسويق العقاري",
  description: "منصة تسويق عقاري متكاملة في المملكة العربية السعودية",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={cairo.variable}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning className="font-cairo antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
