'use client'
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react'
import { BlogPost } from '@/lib/types'
import { useBlogs } from '@/hooks/public/useBlogs'
import { formatDate } from '@/lib/utils'

export default function BlogPreviewSection() {
  const { data, isLoading, error } = useBlogs()
  const posts = data?.data?.posts || []

  if (isLoading) {
    return <div>Is Loading..</div>
  }

  if (error) {
    return <div>Error Loading blogs</div>
  }

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-[#f9f8f4]">
      <div className="container">
        <div className="text-center mb-16">
          <div className="text-[#c9a84c] font-bold text-lg mb-2">من مدونة لقمان</div>
          <h2 className="text-3xl md:text-4xl font-black text-[#133c2e] mb-6">
            معرفة عقارية تنفعك
          </h2>
          <div className="w-24 h-1 bg-[#c9a84c] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.slice(0, 2).map((post: BlogPost) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col border border-gray-100 group">
              <div className="h-48 bg-[#133c2e] relative overflow-hidden">
                <Image 
                  src={post.coverImage || post.image || '/placeholder.svg'} 
                  alt={post.title || 'صورة المقالة'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0" />
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-[#c9a84c] text-[#133c2e] px-4 py-1.5 rounded-xl text-xs font-bold shadow-md">
                    {post.category || 'نصائح'}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1 text-right">
                <div className="text-gray-400 text-sm mb-4">
                  {(post.publishedAt || post.createdAt) ? formatDate(post.publishedAt || post.createdAt!) : '2026-05-03'}
                </div>
                
                <h3 className="text-lg font-bold text-[#133c2e] mb-3 leading-relaxed">
                  {post.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
