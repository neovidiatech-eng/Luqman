'use client'
import { ChevronLeft, Home } from 'lucide-react'
import Link from 'next/link';

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-text-muted mb-8 overflow-x-auto whitespace-nowrap pb-2">
      <Link href="/" className="hover:text-secondary flex items-center gap-1 transition-colors">
        <Home className="w-4 h-4" />
        <span>الرئيسية</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-secondary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-secondary font-bold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
