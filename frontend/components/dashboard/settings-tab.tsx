"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Shield, Bell, Database, Key, Copy, Eye, EyeOff, Trash2, Plus, LogOut, User, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useLogout } from "@/hooks/use-auth"
import { useApiKeys } from "@/hooks/use-api-keys"
import { toast } from "sonner"

export function SettingsTab() {
  const { logout } = useLogout()
  const { isLoading, apiKeys, fetchApiKeys, createApiKey, deleteApiKey } = useApiKeys()
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({})
  const [newKeyName, setNewKeyName] = useState("")
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [showGeneratedKey, setShowGeneratedKey] = useState(false)

  useEffect(() => {
    fetchApiKeys()
  }, [fetchApiKeys])

  const handleGenerateApiKey = async () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a name for the API key')
      return
    }

    const result = await createApiKey({ name: newKeyName })
    if (result) {
      setGeneratedKey(result.apiKey)
      setShowGeneratedKey(true)
      setNewKeyName("")
    }
  }

  const handleDeleteApiKey = async (id: string) => {
    await deleteApiKey(id)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  const toggleKeyVisibility = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const maskKey = (key: string) => {
    if (key.length <= 8) return key
    return key.substring(0, 8) + "..."
  }

  return (
    <div className="space-y-6">
      {/* Account Management */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2 text-primary" />
            Account Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/10">
            <div className="space-y-1">
              <h4 className="font-medium">Sign Out</h4>
              <p className="text-sm text-muted-foreground">
                Sign out of your account and clear all session data
              </p>
            </div>
            <Button 
              variant="destructive" 
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="h-5 w-5 mr-2 text-primary" />
            API Key Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Create New API Key */}
          <div className="space-y-4 p-4 border border-border/50 rounded-lg bg-background/20">
            <h4 className="font-medium">Create New API Key</h4>
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="api-key-name">API Key Name</Label>
                <Input
                  id="api-key-name"
                  placeholder="e.g., Production API, Development API"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleGenerateApiKey} 
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  Generate Key
                </Button>
              </div>
            </div>
          </div>

          {/* Generated API Key Display */}
          {showGeneratedKey && generatedKey && (
            <div className="space-y-4 p-4 border border-green-500/50 rounded-lg bg-green-500/10">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-green-700 dark:text-green-300">New API Key Generated</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowGeneratedKey(false)}
                >
                  ×
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-green-600 dark:text-green-400">
                  ⚠️ Copy this key now - it won't be shown again!
                </p>
                <div className="font-mono text-sm bg-background/30 p-3 rounded border flex items-center justify-between">
                  <span className="break-all">{generatedKey}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      navigator.clipboard.writeText(generatedKey)
                      toast.success('API key copied to clipboard')
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Existing API Keys */}
          <div className="space-y-4">
            <h4 className="font-medium">Your API Keys</h4>
            {apiKeys.length === 0 ? (
              <p className="text-muted-foreground text-sm">No API keys created yet.</p>
            ) : (
              <div className="space-y-3">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 border border-border/50 rounded-lg bg-background/10">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="font-medium">{apiKey.name}</h5>
                        <p className="text-xs text-muted-foreground">
                          Created: {new Date(apiKey.createdAt).toLocaleDateString()} • Last used: {apiKey.lastUsedAt ? new Date(apiKey.lastUsedAt).toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => toggleKeyVisibility(apiKey.id)}>
                          {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(apiKey.keyPrefix + '...')}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteApiKey(apiKey.id)}
                          disabled={isLoading}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="font-mono text-sm bg-background/30 p-2 rounded border">
                      {showKeys[apiKey.id] ? apiKey.keyPrefix + '...' : maskKey(apiKey.keyPrefix + '...')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* API Key Settings */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <h4 className="font-medium">API Key Settings</h4>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-rotate API Keys</Label>
                <p className="text-xs text-muted-foreground">Automatically rotate keys every 90 days</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Key Usage Notifications</Label>
                <p className="text-xs text-muted-foreground">Get notified when keys are used from new locations</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Configuration */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            AI Compliance Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="risk-threshold">Risk Score Threshold</Label>
            <div className="px-3">
              <Slider id="risk-threshold" min={0} max={100} step={5} defaultValue={[75]} className="w-full" />
            </div>
            <p className="text-xs text-muted-foreground">Transactions above this score will be flagged for review</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="confidence-level">Minimum Confidence Level</Label>
              <Select defaultValue="70">
                <SelectTrigger>
                  <SelectValue placeholder="Select confidence level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60%</SelectItem>
                  <SelectItem value="70">70%</SelectItem>
                  <SelectItem value="80">80%</SelectItem>
                  <SelectItem value="90">90%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-mode">Auto-Review Mode</Label>
              <Select defaultValue="manual">
                <SelectTrigger>
                  <SelectValue placeholder="Select review mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Automatic</SelectItem>
                  <SelectItem value="manual">Manual Review</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Real-time Monitoring</Label>
              <p className="text-xs text-muted-foreground">Enable continuous transaction monitoring</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Machine Learning Updates</Label>
              <p className="text-xs text-muted-foreground">Allow AI model to learn from manual reviews</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-primary" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>High-Risk Transaction Alerts</Label>
              <p className="text-xs text-muted-foreground">Immediate notifications for flagged transactions</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Daily Summary Reports</Label>
              <p className="text-xs text-muted-foreground">Daily compliance and activity summaries</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>System Maintenance Alerts</Label>
              <p className="text-xs text-muted-foreground">Notifications about system updates and maintenance</p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notification-email">Notification Email</Label>
            <Input
              id="notification-email"
              type="email"
              placeholder="admin@company.com"
              defaultValue="admin@company.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Database & API Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2 text-primary" />
            Database & API Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="retention-period">Data Retention Period</Label>
              <Select defaultValue="90">
                <SelectTrigger>
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue placeholder="Select backup frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-endpoint">API Endpoint</Label>
            <Input
              id="api-endpoint"
              placeholder="https://api.onchain-sdk.com/v1"
              defaultValue="https://api.onchain-sdk.com/v1"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable API Rate Limiting</Label>
              <p className="text-xs text-muted-foreground">Protect against excessive API usage</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="h-5 w-5 mr-2 text-primary" />
            Security & Access Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-xs text-muted-foreground">Require 2FA for admin access</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Session Timeout</Label>
              <p className="text-xs text-muted-foreground">Automatically log out inactive users</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="session-duration">Session Duration (minutes)</Label>
            <Input id="session-duration" type="number" placeholder="30" defaultValue="30" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
            <Input id="allowed-ips" placeholder="192.168.1.0/24, 10.0.0.0/8" defaultValue="192.168.1.0/24" />
            <p className="text-xs text-muted-foreground">Comma-separated list of allowed IP ranges</p>
          </div>

          <div className="pt-4">
            <Button className="w-full">Save Security Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
