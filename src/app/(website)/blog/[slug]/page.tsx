"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  User,
  Calendar,
  Clock,
  Share2,
  MessageCircle,
  Link as LinkIcon,
  ChevronLeft,
} from "lucide-react";
import { mockBlogPosts } from "@/lib/mock-data";
import BlogCard from "@/components/blog/BlogCard";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = mockBlogPosts.find((p) => p.slug === slug);
  const relatedPosts = mockBlogPosts
    .filter((p) => p.id !== post?.id)
    .slice(0, 3);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const shareOnWhatsApp = () => {
    const text = `شوف العقار ده: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };
  if (!post) {
    return (
      <div className="pt-40 pb-20 text-center container">
        <h1 className="text-4xl font-black mb-4">المقال غير موجود</h1>
        <Link href="/blog" className="btn btn-primary">
          العودة للمدونة
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-20 bg-bg">
      <div className="container">
        <Breadcrumb
          items={[{ label: "المدونة", href: "/blog" }, { label: post.title }]}
        />

        <article className="bg-white rounded-[3rem] overflow-hidden border border-border shadow-sm mb-20">
          {/* Hero Image */}
          <div className="relative h-[400px] md:h-[600px] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
              <div className="container p-0">
                <span className="inline-block bg-secondary text-primary px-4 py-1.5 rounded-full text-xs font-black mb-6">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8 max-w-4xl">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <User className="w-5 h-5 text-secondary" />
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-secondary" />
                    <span>{post.readingTime} دقائق قراءة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-16">
            {/* Share & Actions */}
            <div className="flex items-center justify-between pb-8 mb-12 border-b border-gray-100">
              {/* <div className="flex items-center gap-4">
                <p className="font-bold text-primary">شارك المقال:</p>
                <button className="w-10 h-10 rounded-full bg-green-50 text-whatsapp flex items-center justify-center hover:bg-whatsapp hover:text-white transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                  <LinkIcon className="w-5 h-5" />
                </button>
              </div> */}
              <div className="flex items-center gap-4 relative">
                <p className="font-bold text-primary">شارك المقال:</p>

                {/* WhatsApp */}
                <button
                  onClick={shareOnWhatsApp}
                  className="w-10 h-10 rounded-full cursor-pointer  bg-green-50 text-whatsapp flex items-center justify-center hover:bg-whatsapp hover:text-white transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </button>

                {/* Copy Link */}
                <div className="relative">
                  <button
                    onClick={copyLink}
                    className="w-10 h-10 cursor-pointer rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <LinkIcon className="w-5 h-5" />
                  </button>

                  {copied && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                      تم نسخ الرابط
                    </div>
                  )}
                </div>
              </div>
              <Link
                href="/blog"
                className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-secondary"
              >
                <span>العودة للمدونة</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-xl prose-primary mx-auto leading-[2] text-text-muted text-lg text-justify space-y-8">
                {post.content.split("\n").map((para, i) => (
                  <p
                    key={i}
                    className={para.includes("...") ? "font-serif italic" : ""}
                  >
                    {para.trim()}
                  </p>
                ))}
              </div>

              {/* Newsletter or similar CTA can go here */}
              <div className="mt-20 p-12 bg-bg rounded-[2.5rem] border border-border flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h4 className="text-2xl font-black text-primary mb-2">
                    اشترك في نشرتنا العقارية
                  </h4>
                  <p className="text-text-muted">
                    كن أول من يعرف عن أحدث العروض والتحليلات العقارية.
                  </p>
                </div>
                <div className="flex w-full md:w-auto gap-2">
                  <input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    className="flex-1 min-w-[250px] px-6 py-4 rounded-xl border border-border outline-none focus:border-secondary shadow-inner"
                  />
                  <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary hover:text-primary transition-all">
                    اشترك
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-black text-primary">مقالات ذات صلة</h3>
            <Link href="/blog" className="btn btn-outline py-2.5">
              عرض الكل
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
