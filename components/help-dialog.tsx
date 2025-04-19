"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"

interface HelpDialogProps {
  title: string
  children: React.ReactNode
  triggerClassName?: string
}

export function HelpDialog({ title, children, triggerClassName }: HelpDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full ${triggerClassName || "bg-[#F0B90B]/10 border-[#F0B90B]/30 text-[#F0B90B] hover:bg-[#F0B90B]/20"}`}
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-black/95 border-[#F0B90B]/30">
        <DialogHeader>
          <DialogTitle className="text-[#F0B90B]">{title}</DialogTitle>
        </DialogHeader>
        <div className="text-[#F0B90B]/80 space-y-4">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
