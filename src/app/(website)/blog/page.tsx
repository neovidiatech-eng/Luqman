'use client'
import { useState, useMemo } from 'react'
import BlogCard from '@/components/blog/BlogCard'
import Breadcrumb from '@/components/shared/Breadcrumb'
import { motion, AnimatePresence } from 'motion/react'
import { BlogPost } from '@/lib/types'
import { useBlogs } from '@/hooks/public/useBlogs'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('الكل')

  const { data, isLoading, error } = useBlogs()
  const posts = data?.data?.posts || []

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'الكل') return posts
    return posts.filter((post: BlogPost) => post.category === activeCategory)
  }, [activeCategory, posts])

  const categories = useMemo(() => {
    const uniqueCats = new Set(posts.map((p: BlogPost) => p.category).filter(Boolean))
    return ['الكل', ...Array.from(uniqueCats)]
  }, [posts])

  if (isLoading) {
    return (
      <main className="pt-32 pb-20 bg-bg min-h-screen">
        <div className="container text-center text-primary font-bold">جاري التحميل...</div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="pt-32 pb-20 bg-bg min-h-screen">
        <div className="container text-center text-red-500 font-bold">حدث خطأ أثناء تحميل المقالات</div>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-20 bg-bg min-h-screen">
      <div className="container">
        <Breadcrumb items={[{ label: 'المدونة' }]} />

        <header className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">مدونة لقمان العقارية</h1>
          <p className="text-text-muted text-lg">دليلك الشامل لكل ما يخص عالم العقار، الاستثمار، والتحليلات الاقتصادية في السوق السعودي.</p>
        </header>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap ${activeCategory === cat
                ? 'bg-primary text-white shadow-xl scale-105'
                : 'bg-white text-text-muted border border-border hover:border-secondary hover:text-secondary'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post: BlogPost) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                key={post.id}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-24 text-center border border-border">
            <h3 className="text-2xl font-bold text-primary mb-2">لا توجد مقالات</h3>
            <p className="text-text-muted">نعمل حالياً على كتابة محتوى جديد لهذا التصنيف.</p>
          </div>
        )}
      </div>
    </main>
  )
}
