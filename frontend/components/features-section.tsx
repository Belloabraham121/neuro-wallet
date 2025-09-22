import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Zap, Shield, Brain, BarChart3, Code } from "lucide-react"

const features = [
  {
    icon: Wallet,
    title: "Wallet Management",
    description: "Easy onboarding with email or phone. Custodial, hybrid, or non-custodial options.",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Gasless Transactions",
    description: "Abstract away fees with relayer/meta-tx system for seamless user experience.",
    color: "text-success",
  },
  {
    icon: Shield,
    title: "AI-Powered Compliance",
    description: "Detect fraud, flagged addresses, and anomalies with intelligent monitoring.",
    color: "text-destructive",
  },
  {
    icon: Brain,
    title: "Executive AI Assistant",
    description: "Send onchain transactions or request reports in plain English commands.",
    color: "text-primary",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track wallets, transactions, and treasury flows with comprehensive insights.",
    color: "text-success",
  },
  {
    icon: Code,
    title: "Developer SDK + API",
    description: "Drop-in integration for dApps, DAOs, and fintechs with full documentation.",
    color: "text-primary",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Everything you need to build the future</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Comprehensive tools and AI-powered features to create next-generation Web3 applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass hover:glow transition-all duration-300 group">
              <CardContent className="p-8">
                <div
                  className={`inline-flex p-3 rounded-lg bg-muted/20 mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
