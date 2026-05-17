'use client'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import BlogCard from '@/components/blog/BlogCard'
import { mockBlogPosts } from '@/lib/mock-data'

export default function BlogPreviewSection() {
  const posts = mockBlogPosts.slice(0, 3)

  return (
    <section className="py-24 bg-bg">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle 
            title="آخر المقالات العقارية" 
            subtitle="نخبة من المقالات والتحليلات لمتابعة نبض السوق العقاري السعودي"
          />
          <Link 
            href="/blog" 
            className="hidden md:flex items-center gap-2 text-primary font-black hover:text-secondary transition-colors group mb-12"
          >
            <span>عرض جميع المقالات</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link 
            href="/blog" 
            className="btn btn-primary w-full"
          >
            عرض جميع المقالات
          </Link>
        </div>
      </div>
    </section>
  )
}
