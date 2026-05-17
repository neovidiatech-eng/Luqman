'use client'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react'
import { BlogPost } from '@/lib/types'
import { formatDate } from '@/lib/utils'

interface BlogCardProps {
  key?: string | number;
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 group flex flex-col">
      <div className="relative h-[220px] overflow-hidden">
        <Image 
          src={post.image} 
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-secondary text-primary px-4 py-1.5 rounded-full text-[10px] font-black shadow-lg">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-[10px] font-bold text-text-muted mb-4 uppercase tracking-widest">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-secondary" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-secondary" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span>{post.readingTime} دقائق</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
          {post.title}
        </h3>

        <p className="text-text-muted text-sm line-clamp-3 mb-8 leading-relaxed">
          {post.excerpt}
        </p>

        <Link 
          href={`/blog/${post.slug}`}
          className="mt-auto flex items-center gap-2 text-primary font-black group/link"
        >
          <span>اقرأ المزيد</span>
          <ArrowLeft className="w-5 h-5 group-hover/link:-translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
