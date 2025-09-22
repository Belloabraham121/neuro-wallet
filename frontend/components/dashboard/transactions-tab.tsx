"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Filter, ExternalLink } from "lucide-react"

const transactions = [
  {
    hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
    from: "0x7q8r...9s0t",
    to: "0x1u2v...3w4x",
    amount: "150.5 STX",
    riskScore: 15,
    status: "approved",
    timestamp: "2024-01-15 14:30:22",
    aiExplanation: "Standard peer-to-peer transaction with no suspicious patterns detected.",
  },
  {
    hash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q",
    from: "0x8r9s...0t1u",
    to: "0x2v3w...4x5y",
    amount: "2,500.0 STX",
    riskScore: 78,
    status: "suspicious",
    timestamp: "2024-01-15 14:25:18",
    aiExplanation:
      "Transaction resembles past flagged mixer addresses. High volume transfer to new wallet. 78% confidence of suspicious activity.",
  },
  {
    hash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r",
    from: "0x9s0t...1u2v",
    to: "0x3w4x...5y6z",
    amount: "50.0 STX",
    riskScore: 92,
    status: "flagged",
    timestamp: "2024-01-15 14:20:45",
    aiExplanation:
      "Destination wallet is on known bad actor list. Previous transactions linked to money laundering activities.",
  },
]

export function TransactionsTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<(typeof transactions)[0] | null>(null)

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-success"
    if (score < 70) return "text-warning"
    return "text-destructive"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="secondary" className="text-success">
            Approved
          </Badge>
        )
      case "suspicious":
        return (
          <Badge variant="outline" className="text-warning">
            Suspicious
          </Badge>
        )
      case "flagged":
        return <Badge variant="destructive">Flagged</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Transaction Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by wallet address or transaction hash..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="suspicious">Suspicious</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Tx Hash</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">From</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">To</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">AI Risk Score</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.hash} className="border-b border-border/20 hover:bg-background/50">
                    <td className="py-3 px-2">
                      <code className="text-xs bg-background/50 px-2 py-1 rounded">
                        {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                      </code>
                    </td>
                    <td className="py-3 px-2 text-sm">{tx.from}</td>
                    <td className="py-3 px-2 text-sm">{tx.to}</td>
                    <td className="py-3 px-2 text-sm font-medium">{tx.amount}</td>
                    <td className="py-3 px-2">
                      <span className={`text-sm font-medium ${getRiskColor(tx.riskScore)}`}>{tx.riskScore}%</span>
                    </td>
                    <td className="py-3 px-2">{getStatusBadge(tx.status)}</td>
                    <td className="py-3 px-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedTransaction(tx)}>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="glass max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Transaction Details</DialogTitle>
                          </DialogHeader>
                          {selectedTransaction && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Transaction Hash</label>
                                  <p className="text-sm font-mono bg-background/50 p-2 rounded mt-1">
                                    {selectedTransaction.hash}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Timestamp</label>
                                  <p className="text-sm mt-1">{selectedTransaction.timestamp}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">From</label>
                                  <p className="text-sm font-mono bg-background/50 p-2 rounded mt-1">
                                    {selectedTransaction.from}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">To</label>
                                  <p className="text-sm font-mono bg-background/50 p-2 rounded mt-1">
                                    {selectedTransaction.to}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Amount</label>
                                  <p className="text-sm font-medium mt-1">{selectedTransaction.amount}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Risk Score</label>
                                  <p
                                    className={`text-sm font-medium mt-1 ${getRiskColor(selectedTransaction.riskScore)}`}
                                  >
                                    {selectedTransaction.riskScore}%
                                  </p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">AI Analysis</label>
                                <p className="text-sm bg-background/50 p-3 rounded mt-1 leading-relaxed">
                                  {selectedTransaction.aiExplanation}
                                </p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
