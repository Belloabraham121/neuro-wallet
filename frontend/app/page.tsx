import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { AIInActionSection } from "@/components/ai-in-action-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { DeveloperTeamsSection } from "@/components/developer-teams-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AIInActionSection />
        <HowItWorksSection />
        <DeveloperTeamsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
