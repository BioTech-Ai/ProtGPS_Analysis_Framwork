"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuitIcon, BeakerIcon, MapIcon } from "lucide-react"

export default function EducationContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-black/80 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 terminal-glow flex items-center gap-2">
            <BrainCircuitIcon className="w-5 h-5" />
            About ProtGPS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-green-400/90">
          <p>
            ProtGPS is a deep-learning model that predicts how proteins sort themselves inside the cell. Unlike previous
            AI systems that focus on protein structure, ProtGPS predicts protein localization and cellular organization.
          </p>
          <p>This revolutionary tool allows scientists to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Predict protein cellular locations</li>
            <li>Engineer proteins with defined distributions</li>
            <li>Direct proteins to specific cellular locations</li>
            <li>Understand protein function and interactions</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-black/80 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 terminal-glow flex items-center gap-2">
            <MapIcon className="w-5 h-5" />
            Cellular Organization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-green-400/90">
          <p>
            Proteins rely on various signals to sort themselves into specialized compartments called biomolecular
            condensates. These dynamic, liquid-like clusters help:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Regulate gene activity</li>
            <li>Manage cellular stress</li>
            <li>Contribute to various cellular functions</li>
            <li>Maintain cellular organization</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-black/80 border-green-500/30 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-green-400 terminal-glow flex items-center gap-2">
            <BeakerIcon className="w-5 h-5" />
            Applications in Drug Discovery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-green-400/90">
          <p>ProtGPS has significant implications for drug development and therapeutic design:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Identify new drug targets based on protein localization</li>
            <li>Design proteins with specific cellular targeting</li>
            <li>Predict disease-related protein mislocalization</li>
            <li>Develop targeted therapeutic strategies</li>
          </ul>
          <p className="mt-4">
            This tool represents a major advance in our understanding of cellular organization and provides new
            opportunities for therapeutic intervention in various diseases.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

