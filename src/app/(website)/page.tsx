'use client'
import HeroSection from '@/components/home/HeroSection'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import StatsSection from '@/components/home/StatsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CtaSection from '@/components/home/CtaSection'
import BlogPreviewSection from '@/components/home/BlogPreviewSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProperties />
      <FeaturedProjects />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
      <BlogPreviewSection />
    </main>
  )
}
