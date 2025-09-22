"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Brain, Settings, LogOut, User } from "lucide-react"
import Link from "next/link"
import { useLogout } from "@/hooks/use-auth"

interface DashboardHeaderProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (tab: string) => void
  onAIAssistantToggle: () => void
}

export function DashboardHeader({ tabs, activeTab, onTabChange, onAIAssistantToggle }: DashboardHeaderProps) {
  const { logout } = useLogout()
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground">OnchainSDK</span>
          </Link>

          <nav className="flex items-center space-x-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className={`relative ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && <div className="absolute -bottom-px left-0 right-0 h-px bg-primary" />}
              </Button>
            ))}
          </nav>
        </div>

        {/* Right side - AI Assistant and Profile */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={onAIAssistantToggle}
            className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 glow"
            size="sm"
          >
            <Brain className="h-4 w-4 mr-2" />
            Ask AI
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass" align="end" forceMount>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
