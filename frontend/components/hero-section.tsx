import { Button } from "@/components/ui/button"
import { NetworkVisualization } from "@/components/network-visualization"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Network Visualization */}
      <div className="absolute inset-0 z-0">
        <NetworkVisualization />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            AI-Powered Onchain SDK for <span className="text-primary">Wallets</span>,{" "}
            <span className="text-success">Gasless Transactions</span> &{" "}
            <span className="text-destructive">Compliance</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
            Build faster — create wallets, sponsor gasless sends, and prevent risky transfers with an intelligent,
            privacy-first assistant.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="glow text-lg px-8 py-4" asChild>
              <Link href="/auth/signup">Get Started — Free</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-border/50 hover:border-primary/50 bg-transparent"
            >
              View Docs
            </Button>
          </div>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40 z-5" />
    </section>
  )
}
