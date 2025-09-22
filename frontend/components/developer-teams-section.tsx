import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export function DeveloperTeamsSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Choose Your Path</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Whether you're building or managing, we have the tools you need
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Developers */}
          <Card className="glass hover:glow transition-all duration-300 group">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 rounded-full bg-primary/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Code className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-4">For Developers</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  SDK, APIs, fast integration, webhooks, and comprehensive documentation
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Drop-in SDK integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>RESTful APIs & GraphQL</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Real-time webhooks</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>TypeScript support</span>
                </div>
              </div>

              <Button className="w-full glow group" asChild>
                <Link href="/auth/signup">
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* For Teams */}
          <Card className="glass hover:glow transition-all duration-300 group">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 rounded-full bg-success/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-12 w-12 text-success" />
                </div>
                <h3 className="text-3xl font-bold mb-4">For Teams</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Dashboard, AI reporting, compliance tools, and team management
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Executive dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>AI-powered reports</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Compliance monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Team permissions</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-success/50 hover:border-success hover:bg-success/10 group bg-transparent"
                asChild
              >
                <Link href="/auth/signup">
                  Get Dashboard Access
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
