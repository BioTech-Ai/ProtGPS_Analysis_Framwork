"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Clock, Search, Trash2 } from "lucide-react"

interface HistoryItem {
  id: string
  sequence: string
  timestamp: string
  results: {
    location: string
    confidence: string
  }
}

interface HistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectItem: (item: HistoryItem) => void
}

export function HistoryDialog({ open, onOpenChange, onSelectItem }: HistoryDialogProps) {
  // Mock history data - replace with actual storage implementation
  const [history] = useState<HistoryItem[]>([
    {
      id: "1",
      sequence: "MAEGEITTFTALTEKFNLPPGNYKKPKLLYCSNG",
      timestamp: "2024-02-12T10:30:00",
      results: {
        location: "Nucleus",
        confidence: "High",
      },
    },
    {
      id: "2",
      sequence: "MAEGEITTKFNLPPGNYKKPKLLYCSNG",
      timestamp: "2024-02-12T09:15:00",
      results: {
        location: "Cytoplasm",
        confidence: "Medium",
      },
    },
  ])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-black/95 border-[#d3594d]/20">
        <DialogHeader>
          <DialogTitle className="text-[#d3594d] flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Analysis History
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d3594d]/40" />
            <input
              type="text"
              placeholder="Search history..."
              className="w-full bg-black/50 border border-[#d3594d]/20 rounded-md pl-10 pr-4 py-2 text-[#d3594d]/70 placeholder:text-[#d3594d]/30 focus:outline-none focus:border-[#d3594d]/40"
            />
          </div>
          <ScrollArea className="h-[400px] rounded-md border border-[#d3594d]/20 p-4">
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-[#d3594d]/20 bg-black/50 hover:bg-[#d3594d]/5 transition-colors group"
                >
                  <div className="space-y-1">
                    <div className="font-mono text-sm text-[#d3594d]/70">{item.sequence}</div>
                    <div className="text-xs text-[#d3594d]/50">{new Date(item.timestamp).toLocaleString()}</div>
                    <div className="text-sm text-[#d3594d]/60">
                      Location: {item.results.location} • Confidence: {item.results.confidence}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#d3594d]/20 text-[#d3594d]/70 hover:text-[#d3594d] hover:bg-[#d3594d]/10"
                      onClick={() => onSelectItem(item)}
                    >
                      Load
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#d3594d]/20 text-[#d3594d]/70 hover:text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
