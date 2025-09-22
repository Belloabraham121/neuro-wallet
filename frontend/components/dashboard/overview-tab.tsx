"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, Users, Activity, DollarSign, CheckCircle, AlertTriangle, XCircle, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const metricsData = [
  { title: "Total Wallets Created", value: "12,847", icon: Wallet, change: "+12%" },
  { title: "Active Users Today", value: "3,421", icon: Users, change: "+8%" },
  { title: "Transactions (24h)", value: "8,932", icon: Activity, change: "+15%" },
  { title: "Total Volume", value: "₿2.4M", icon: DollarSign, change: "+23%" },
]

const complianceFeed = [
  {
    id: "0x1a2b...3c4d",
    type: "send",
    amount: "150 STX",
    status: "approved",
    verdict: "Clean transaction",
    confidence: 95,
  },
  {
    id: "0x5e6f...7g8h",
    type: "receive",
    amount: "2,500 STX",
    status: "suspicious",
    verdict: "Possible mixer activity",
    confidence: 78,
  },
  {
    id: "0x9i0j...1k2l",
    type: "send",
    amount: "50 STX",
    status: "flagged",
    verdict: "Known bad actor",
    confidence: 92,
  },
  {
    id: "0x3m4n...5o6p",
    type: "receive",
    amount: "1,200 STX",
    status: "approved",
    verdict: "Legitimate exchange",
    confidence: 88,
  },
  {
    id: "0x7q8r...9s0t",
    type: "send",
    amount: "800 STX",
    status: "suspicious",
    verdict: "Unusual pattern detected",
    confidence: 65,
  },
]

const gasData = [
  { time: "00:00", cost: 45, budget: 100 },
  { time: "04:00", cost: 52, budget: 100 },
  { time: "08:00", cost: 78, budget: 100 },
  { time: "12:00", cost: 85, budget: 100 },
  { time: "16:00", cost: 72, budget: 100 },
  { time: "20:00", cost: 68, budget: 100 },
]

export function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <Card key={index} className="glass hover:glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground animate-pulse-glow">{metric.value}</div>
              <p className="text-xs text-success flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live AI Compliance Feed */}
        <Card className="lg:col-span-2 glass">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Live AI Compliance Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {complianceFeed.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/40"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {item.status === "approved" && <CheckCircle className="h-4 w-4 text-success" />}
                      {item.status === "suspicious" && <AlertTriangle className="h-4 w-4 text-warning" />}
                      {item.status === "flagged" && <XCircle className="h-4 w-4 text-destructive" />}
                      <Badge
                        variant={
                          item.status === "approved"
                            ? "secondary"
                            : item.status === "suspicious"
                              ? "outline"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.type} • {item.amount}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{item.verdict}</p>
                    <p className="text-xs font-medium">{item.confidence}% confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gasless Transaction Monitor */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-primary" />
              Gas Sponsorship
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={gasData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#ffffff" fontSize={12} tick={{ fill: "#ffffff" }} />
                    <YAxis stroke="#ffffff" fontSize={12} tick={{ fill: "#ffffff" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#ffffff",
                      }}
                      labelStyle={{ color: "#ffffff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cost"
                      stroke="#00d4ff"
                      strokeWidth={3}
                      dot={{ fill: "#00d4ff", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#00d4ff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="budget"
                      stroke="#9ca3af"
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      dot={{ fill: "#9ca3af", strokeWidth: 1, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Today's Cost</span>
                  <span className="font-medium text-white">$68.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Budget Limit</span>
                  <span className="font-medium text-white">$100.00</span>
                </div>
                <Button size="sm" className="w-full mt-4">
                  Top Up Relayer Balance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
