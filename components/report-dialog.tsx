"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Settings2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface ReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerate: (options: ReportOptions) => void
}

interface ReportOptions {
  includeVisualization: boolean
  includeMethodology: boolean
  includeCitations: boolean
  includeRawData: boolean
}

export function ReportDialog({ open, onOpenChange, onGenerate }: ReportDialogProps) {
  const sections = [
    {
      id: "visualization",
      label: "3D Visualization",
      description: "Include molecular visualization snapshots",
    },
    {
      id: "methodology",
      label: "Methodology",
      description: "Analysis methods and parameters",
    },
    {
      id: "citations",
      label: "Citations",
      description: "Relevant research papers and references",
    },
    {
      id: "rawData",
      label: "Raw Data",
      description: "Complete analysis data and metrics",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-black/95 border-[#d3594d]/20">
        <DialogHeader>
          <DialogTitle className="text-[#d3594d] flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Generate Report
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-[#d3594d]/70">Report Sections</div>
              <Button
                variant="outline"
                size="sm"
                className="border-[#d3594d]/20 text-[#d3594d]/70 hover:text-[#d3594d] hover:bg-[#d3594d]/10"
              >
                <Settings2 className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>
            <div className="space-y-3">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="flex items-start space-x-3 p-3 rounded-lg border border-[#d3594d]/20 bg-black/50"
                >
                  <Checkbox
                    id={section.id}
                    className="border-[#d3594d]/20 data-[state=checked]:bg-[#d3594d] data-[state=checked]:border-[#d3594d]"
                  />
                  <div className="space-y-1">
                    <label htmlFor={section.id} className="text-sm font-medium text-[#d3594d]/70 cursor-pointer">
                      {section.label}
                    </label>
                    <p className="text-xs text-[#d3594d]/50">{section.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            className="w-full bg-[#d3594d]/20 text-[#d3594d] hover:bg-[#d3594d]/30"
            onClick={() =>
              onGenerate({
                includeVisualization: true,
                includeMethodology: true,
                includeCitations: true,
                includeRawData: true,
              })
            }
          >
            Generate Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
