"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { OverviewTab } from "@/components/dashboard/overview-tab"
import { TransactionsTab } from "@/components/dashboard/transactions-tab"
import { ComplianceTab } from "@/components/dashboard/compliance-tab"
import { UsersTab } from "@/components/dashboard/users-tab"
import { SettingsTab } from "@/components/dashboard/settings-tab"
import { AIAssistantSidebar } from "@/components/dashboard/ai-assistant-sidebar"

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "transactions", label: "Transactions" },
  { id: "compliance", label: "Compliance" },
  { id: "users", label: "Users" },
  { id: "settings", label: "Settings" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />
      case "transactions":
        return <TransactionsTab />
      case "compliance":
        return <ComplianceTab />
      case "users":
        return <UsersTab />
      case "settings":
        return <SettingsTab />
      default:
        return <OverviewTab />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAIAssistantToggle={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
      />

      <main className={`transition-all duration-300 ${isAIAssistantOpen ? "mr-80" : "mr-0"}`}>
        <div className="p-6">{renderTabContent()}</div>
      </main>

      <AIAssistantSidebar isOpen={isAIAssistantOpen} onClose={() => setIsAIAssistantOpen(false)} />
    </div>
  )
}
