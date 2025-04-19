"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileJson, FileText, Table, Download } from "lucide-react"
import { motion } from "framer-motion"

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onExport: (format: string) => void
}

export function ExportDialog({ open, onOpenChange, onExport }: ExportDialogProps) {
  const exportFormats = [
    {
      id: "json",
      name: "JSON",
      description: "Raw data in JSON format",
      icon: FileJson,
    },
    {
      id: "csv",
      name: "CSV",
      description: "Tabular data format",
      icon: Table,
    },
    {
      id: "txt",
      name: "Plain Text",
      description: "Human-readable format",
      icon: FileText,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-black/95 border-terminal-red/20">
        <DialogHeader>
          <DialogTitle className="text-terminal-red flex items-center gap-2 font-mono">
            <Download className="w-5 h-5" />
            Export Analysis
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-terminal-orange/70 font-mono">Choose export format:</div>
          <div className="space-y-3">
            {exportFormats.map((format, index) => (
              <motion.button
                key={format.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full flex items-center p-4 rounded-lg border border-terminal-red/20 bg-black/50 hover:bg-terminal-red/5 transition-colors group"
                onClick={() => onExport(format.id)}
              >
                <format.icon className="w-5 h-5 text-terminal-red/60 group-hover:text-terminal-red transition-colors" />
                <div className="ml-4 text-left">
                  <div className="text-terminal-red/70 group-hover:text-terminal-red transition-colors font-mono">
                    {format.name}
                  </div>
                  <div className="text-sm text-terminal-orange/50 font-mono">{format.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
