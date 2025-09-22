"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Users, UserCheck, UserX, Network, Eye } from "lucide-react"
import { useState } from "react"

const userCohorts = [
  { name: "Power Users", value: 245, color: "hsl(var(--primary))" },
  { name: "Active", value: 1834, color: "hsl(var(--success))" },
  { name: "Dormant", value: 892, color: "hsl(var(--muted))" },
]

const walletConnections = [
  {
    userId: "user_001",
    primaryWallet: "0x1a2b...3c4d",
    connectedWallets: ["0x5e6f...7g8h", "0x9i0j...1k2l", "0x3m4n...5o6p"],
    riskLevel: "low",
    lastActivity: "2024-01-15 14:30:22",
  },
  {
    userId: "user_002",
    primaryWallet: "0x7q8r...9s0t",
    connectedWallets: ["0x1u2v...3w4x", "0x5y6z...7a8b", "0x9c0d...1e2f", "0x3g4h...5i6j", "0x7k8l...9m0n"],
    riskLevel: "medium",
    lastActivity: "2024-01-15 13:45:18",
  },
  {
    userId: "user_003",
    primaryWallet: "0x1o2p...3q4r",
    connectedWallets: ["0x5s6t...7u8v"],
    riskLevel: "high",
    lastActivity: "2024-01-15 12:20:45",
  },
]

export function UsersTab() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-success"
      case "medium":
        return "text-warning"
      case "high":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "low":
        return (
          <Badge variant="secondary" className="text-success">
            Low Risk
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="text-warning">
            Medium Risk
          </Badge>
        )
      case "high":
        return <Badge variant="destructive">High Risk</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* User Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass hover:glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2,971</div>
            <p className="text-xs text-success">+127 new this week</p>
          </CardContent>
        </Card>

        <Card className="glass hover:glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Today</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">1,834</div>
            <p className="text-xs text-muted-foreground">62% of total users</p>
          </CardContent>
        </Card>

        <Card className="glass hover:glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Risk Users</CardTitle>
            <UserX className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">23</div>
            <p className="text-xs text-muted-foreground">Require monitoring</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Cohorts Pie Chart */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              User Activity Cohorts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userCohorts}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {userCohorts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {userCohorts.map((cohort, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cohort.color }} />
                  <span className="text-sm text-muted-foreground">
                    {cohort.name}: {cohort.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wallet Connections */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Network className="h-5 w-5 mr-2 text-primary" />
              Wallet Connection Tree
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {walletConnections.map((user) => (
                <div key={user.userId} className="p-3 rounded-lg bg-background/50 border border-border/40">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{user.userId}</span>
                      {getRiskBadge(user.riskLevel)}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedUser(selectedUser === user.userId ? null : user.userId)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground mb-2">
                    Primary: <code className="bg-background/50 px-1 rounded">{user.primaryWallet}</code>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Connected: {user.connectedWallets.length} wallet{user.connectedWallets.length !== 1 ? "s" : ""}
                  </div>

                  {selectedUser === user.userId && (
                    <div className="mt-3 pt-3 border-t border-border/40">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Connected Wallets:</p>
                      <div className="space-y-1">
                        {user.connectedWallets.map((wallet, index) => (
                          <div key={index} className="text-xs">
                            <code className="bg-background/50 px-1 rounded">{wallet}</code>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Last Activity: {user.lastActivity}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
