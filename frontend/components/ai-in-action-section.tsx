import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, Terminal, Brain } from "lucide-react"

export function AIInActionSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">AI in Action</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            See how natural language commands translate to blockchain operations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Chat Interface */}
          <Card className="glass">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-semibold">
                    U
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted/20 rounded-lg p-4">
                      <p className="text-sm">"Send 50 STX to treasury multisig"</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                      <p className="text-sm text-success-foreground">
                        ✓ Transaction prepared: 50 STX → SP1ABC...DEF7
                        <br />✓ Compliance check passed
                        <br />✓ Gas sponsored automatically
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-semibold">
                    U
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted/20 rounded-lg p-4">
                      <p className="text-sm">"Generate weekly transaction report"</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                  <input
                    type="text"
                    placeholder="Type your command..."
                    className="flex-1 bg-muted/20 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button size="sm" className="glow">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Console Output */}
          <Card className="glass">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="h-5 w-5 text-primary" />
                <span className="font-semibold">AI Processing Console</span>
              </div>

              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm space-y-2">
                <div className="text-success">→ Parsing natural language command...</div>
                <div className="text-primary">→ Validating wallet permissions...</div>
                <div className="text-success">→ Running compliance checks...</div>
                <div className="text-primary">→ Preparing transaction payload...</div>
                <div className="text-success">→ Sponsoring gas fees...</div>
                <div className="text-primary">→ Broadcasting to network...</div>
                <div className="text-success">✓ Transaction confirmed: 0xabc123...</div>
                <div className="text-muted-foreground">→ Updating analytics dashboard...</div>
                <div className="text-success">✓ Complete</div>
              </div>

              <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm text-primary-foreground">
                  <strong>AI Insight:</strong> Transaction completed 3.2x faster than manual process. Zero gas fees
                  charged to user.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
