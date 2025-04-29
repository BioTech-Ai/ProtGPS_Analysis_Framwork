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
          className={`rounded-full ${triggerClassName || "bg-blue-primary/10 border-blue-primary/30 text-blue-primary hover:bg-blue-primary/20"}`}
          aria-label={`Help about ${title}`}
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-black/95 border-blue-primary/30">
        <DialogHeader>
          <DialogTitle className="text-blue-primary text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="text-white space-y-4 text-base leading-relaxed">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
