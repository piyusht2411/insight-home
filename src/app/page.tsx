import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeatureSection"
import { CTASection } from "@/components/CtaSection"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </main>
  )
}
