import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Zap, Shield, BarChart3 } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Create Wallets",
    description: "Email/phone onboarding with multiple custody options",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Enable Gasless",
    description: "Relayer abstracts fees for seamless user experience",
    color: "text-success",
  },
  {
    icon: Shield,
    title: "AI Compliance",
    description: "Detect anomalies & flagged addresses automatically",
    color: "text-destructive",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Get insights, export data, and automate workflows",
    color: "text-primary",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Four simple steps to transform your Web3 application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="glass hover:glow transition-all duration-300 group h-full">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div
                      className={`inline-flex p-4 rounded-full bg-muted/20 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>

              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent transform -translate-y-1/2 z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
