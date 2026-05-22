'use client'
import HeroSection from '@/components/home/HeroSection'
import SearchBar from '@/components/home/SearchBar'
import StatsSection from '@/components/home/StatsSection'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import FeaturesSection from '@/components/home/FeaturesSection'
import BlogPreviewSection from '@/components/home/BlogPreviewSection'
import FaqSection from '@/components/home/FaqSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />     
       <SearchBar/>
      <FeaturedProperties />
      <FeaturedProjects />
      <FeaturesSection />
      <FaqSection />
      <BlogPreviewSection />
    </main>
  )
}
