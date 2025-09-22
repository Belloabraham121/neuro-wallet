"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Send, X, User, Bot } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIAssistantSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AIAssistantSidebar({ isOpen, onClose }: AIAssistantSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI assistant. I can help you with transaction analysis, compliance queries, and system operations. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isThinking, setIsThinking] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsThinking(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getAIResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsThinking(false)
    }, 2000)
  }

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("flagged") || lowerQuery.includes("suspicious")) {
      return "I found 23 flagged wallets in the last 24 hours. The most recent flagged transaction was 0x9i0j...1k2l with a 92% risk score due to connection with known bad actors. Would you like me to show you the detailed analysis?"
    }

    if (lowerQuery.includes("gas") || lowerQuery.includes("budget")) {
      return "Current gas sponsorship usage is at $68.50 out of your $100 daily budget (68% utilized). The relayer balance is sufficient for approximately 847 more transactions. Would you like me to set up an auto-top-up alert?"
    }

    if (lowerQuery.includes("send") && lowerQuery.includes("stx")) {
      return "I can help you initiate a transaction from the Treasury Wallet. However, I'll need you to confirm the recipient address and amount. For security, all treasury transactions require 2FA verification. Shall I prepare the transaction form?"
    }

    if (lowerQuery.includes("users") || lowerQuery.includes("active")) {
      return "Currently, you have 2,971 total users with 1,834 active today (62% activity rate). Power users account for 245 individuals, while 892 users are currently dormant. The user growth rate is +127 new users this week."
    }

    return "I understand you're asking about blockchain compliance and transaction monitoring. Could you be more specific about what you'd like to know? I can help with transaction analysis, user management, compliance reports, or system operations."
  }

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-background/95 backdrop-blur border-l border-border/40 z-50">
      <Card className="h-full rounded-none border-0 glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center text-lg">
            <div className="relative mr-2">
              <Brain className="h-5 w-5 text-primary" />
              {isThinking && (
                <div className="absolute inset-0 animate-pulse">
                  <Brain className="h-5 w-5 text-primary/50" />
                </div>
              )}
            </div>
            AI Assistant
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex flex-col h-[calc(100%-5rem)] p-0">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "assistant" && (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-background/50 border border-border/40"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.type === "user" && (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-3 w-3 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {isThinking && (
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-primary animate-pulse" />
                  </div>
                  <div className="bg-background/50 border border-border/40 p-3 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border/40">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about transactions, users, compliance..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isThinking}
              />
              <Button size="sm" onClick={handleSendMessage} disabled={!inputValue.trim() || isThinking}>
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-2 text-xs text-muted-foreground">Try: "Show flagged wallets" or "Gas budget status"</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
