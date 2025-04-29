"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Send, ArrowLeft, Loader2, User, Bot, RefreshCw, Copy, Check, DiscIcon as Discord } from "lucide-react"
import { BrandTelegram } from "@/components/icons/brand-telegram"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function DoctorChat() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello, I'm Dr. Synapse, your AI medical assistant. I can help with questions about the BioTech AI platform and provide general medical information. For more specialized assistance, you can also connect with me on Telegram (https://t.me/BioTech_DRSynapse_Bot) or join our Discord Lab (https://discord.gg/wQbnM9V2). How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(null)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Add assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Error:", error)
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error processing your request. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
    setCopied(content)
  }

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello, I'm Dr. Synapse, your AI medical assistant. I can help with questions about the BioTech AI platform and provide general medical information. For more specialized assistance, you can also connect with me on Telegram (https://t.me/BioTech_DRSynapse_Bot) or join our Discord Lab (https://discord.gg/wQbnM9V2). How can I help you today?",
      },
    ])
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-blue-500/30 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/")}
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Dr. Synapse - AI Medical Assistant
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://t.me/BioTech_DRSynapse_Bot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                  <BrandTelegram className="h-4 w-4 mr-2" />
                  Telegram
                </Button>
              </a>
              <a
                href="https://discord.gg/wQbnM9V2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                  <Discord className="h-4 w-4 mr-2" />
                  Discord
                </Button>
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearChat}
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-4 p-4 rounded-lg",
                message.role === "user"
                  ? "bg-blue-500/10 border border-blue-500/20"
                  : "bg-emerald-950/20 border border-emerald-800/30",
              )}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                  message.role === "user" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-800/20 text-emerald-500",
                )}
              >
                {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              <div className="flex-1 space-y-2">
                <div className="text-sm font-medium text-blue-400">
                  {message.role === "user" ? "You" : "Dr. Synapse"}
                </div>
                <div className="text-blue-300 whitespace-pre-wrap text-base leading-relaxed">{message.content}</div>
              </div>
              {message.role === "assistant" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-400/50 hover:text-blue-400"
                  onClick={() => handleCopy(message.content)}
                >
                  {copied === message.content ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4 p-4 rounded-lg bg-emerald-950/20 border border-emerald-800/30">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-800/20 text-emerald-500 flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-blue-400">Dr. Synapse</div>
                <div className="text-blue-300 flex items-center">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Thinking...
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t border-blue-500/30 bg-black p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your medical question here..."
            className="flex-1 min-h-[60px] max-h-[200px] bg-black/50 border-blue-500/30 text-blue-300 placeholder:text-blue-400/50 focus-visible:ring-blue-500/30 text-base"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white h-auto"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </form>
        <div className="max-w-3xl mx-auto mt-4 text-sm text-blue-400/70 space-y-2">
          <div className="text-center">
            Dr. Synapse provides general information only and is not a substitute for professional medical advice,
            diagnosis, or treatment.
          </div>
          <div className="flex justify-center space-x-4 pt-2">
            <a
              href="https://t.me/BioTech_DRSynapse_Bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400/70 hover:text-blue-400"
            >
              <BrandTelegram className="h-4 w-4 mr-1" />
              Telegram Doctor
            </a>
            <a
              href="https://discord.gg/wQbnM9V2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400/70 hover:text-blue-400"
            >
              <Discord className="h-4 w-4 mr-1" />
              Discord Lab Doctor
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
