"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Shield, AlertTriangle, CheckCircle, XCircle, TrendingDown } from "lucide-react"

const anomalyData = [
  { day: "Mon", suspicious: 12, normal: 145 },
  { day: "Tue", suspicious: 8, normal: 167 },
  { day: "Wed", suspicious: 15, normal: 134 },
  { day: "Thu", suspicious: 22, normal: 156 },
  { day: "Fri", suspicious: 18, normal: 189 },
  { day: "Sat", suspicious: 6, normal: 98 },
  { day: "Sun", suspicious: 4, normal: 87 },
]

const falsePositiveData = [
  { week: "Week 1", rate: 15 },
  { week: "Week 2", rate: 12 },
  { week: "Week 3", rate: 8 },
  { week: "Week 4", rate: 6 },
]

const reviewQueue = [
  {
    id: "0x1a2b...3c4d",
    amount: "1,500 STX",
    reason: "High-risk destination wallet",
    confidence: 85,
    timestamp: "2024-01-15 14:30:22",
  },
  {
    id: "0x5e6f...7g8h",
    amount: "750 STX",
    reason: "Unusual transaction pattern",
    confidence: 72,
    timestamp: "2024-01-15 14:25:18",
  },
  {
    id: "0x9i0j...1k2l",
    amount: "2,200 STX",
    reason: "Potential mixer activity",
    confidence: 78,
    timestamp: "2024-01-15 14:20:45",
  },
]

export function ComplianceTab() {
  return (
    <div className="space-y-6">
      {/* Compliance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass hover:glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Flagged Wallets (24h)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">23</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 inline mr-1" />
              -12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="glass hover:glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">False Positive Rate</CardTitle>
            <Shield className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">6%</div>
            <p className="text-xs text-success">
              <TrendingDown className="h-3 w-3 inline mr-1" />
              Improving accuracy
            </p>
          </CardContent>
        </Card>

        <Card className="glass hover:glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground">Require manual review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Anomaly Detection Dashboard */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              Daily Transaction Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={anomalyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#ffffff" fontSize={12} />
                  <YAxis stroke="#ffffff" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                  />
                  <Bar dataKey="normal" fill="#10b981" name="Normal" />
                  <Bar dataKey="suspicious" fill="#f59e0b" name="Suspicious" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* False Positives Trend */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-success" />
              False Positive Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={falsePositiveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="week" stroke="#ffffff" fontSize={12} />
                  <YAxis stroke="#ffffff" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#00d4ff"
                    strokeWidth={3}
                    dot={{ fill: "#00d4ff", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Manual Review Queue */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
            Manual Review Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviewQueue.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium">{item.id}</p>
                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.amount}</p>
                    <p className="text-xs text-muted-foreground">{item.reason}</p>
                  </div>
                  <Badge variant="outline" className="text-warning">
                    {item.confidence}% confidence
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="text-success hover:bg-success/10 bg-transparent">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:bg-destructive/10 bg-transparent"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  <Button size="sm" variant="ghost">
                    Mark False Positive
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
