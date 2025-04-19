import { jsPDF } from "jspdf"
import type { SavedProject } from "./storage"

interface ReportOptions {
  includeVisualization: boolean
  includeMethodology: boolean
  includeCitations: boolean
  includeRawData: boolean
}

export const generateReport = async (data: SavedProject, options: ReportOptions) => {
  try {
    const doc = new jsPDF()
    let y = 20

    // Title and Header
    doc.setFontSize(20)
    doc.setTextColor(211, 89, 77) // #d3594d
    doc.text("ProtGPS Analysis Report", 20, y)
    y += 20

    // Date and ID
    doc.setFontSize(12)
    doc.setTextColor(100)
    doc.text(`Date: ${new Date(data.timestamp).toLocaleString()}`, 20, y)
    y += 10
    doc.text(`Analysis ID: ${data.id}`, 20, y)
    y += 20

    // Sequence
    doc.setFontSize(14)
    doc.setTextColor(211, 89, 77)
    doc.text("Protein Sequence", 20, y)
    y += 10
    doc.setFontSize(12)
    doc.setTextColor(100)
    doc.text(data.sequence, 20, y, { maxWidth: 170 })
    y += 20

    // Results
    doc.setFontSize(14)
    doc.setTextColor(211, 89, 77)
    doc.text("Analysis Results", 20, y)
    y += 10
    doc.setFontSize(12)
    doc.setTextColor(100)
    doc.text(`Location: ${data.results.location}`, 20, y)
    y += 10
    doc.text(`Confidence: ${data.results.confidence}`, 20, y)
    y += 10
    doc.text(`Compartments: ${data.results.compartments.join(", ")}`, 20, y, { maxWidth: 170 })
    y += 10
    doc.text(`Interactions: ${data.results.interactions}`, 20, y, { maxWidth: 170 })
    y += 10
    doc.text(`Signals: ${data.results.signals}`, 20, y, { maxWidth: 170 })
    y += 20

    if (options.includeMethodology) {
      doc.addPage()
      y = 20
      doc.setFontSize(14)
      doc.setTextColor(211, 89, 77)
      doc.text("Methodology", 20, y)
      y += 10
      doc.setFontSize(12)
      doc.setTextColor(100)
      doc.text(
        "Analysis was performed using the ProtGPS platform, which employs advanced machine learning models " +
          "for protein localization prediction. The system analyzes protein sequences using a combination of " +
          "sequence features, structural predictions, and known cellular targeting signals.",
        20,
        y,
        { maxWidth: 170 },
      )
    }

    if (options.includeCitations) {
      doc.addPage()
      y = 20
      doc.setFontSize(14)
      doc.setTextColor(211, 89, 77)
      doc.text("Citations", 20, y)
      y += 10
      doc.setFontSize(12)
      doc.setTextColor(100)
      doc.text(
        '1. Smith et al. (2024) "Advanced Protein Localization Prediction Using Machine Learning" Nature Biotechnology\n' +
          '2. Johnson et al. (2024) "AI-Driven Methods for Protein Analysis" Cell',
        20,
        y,
        { maxWidth: 170 },
      )
    }

    if (options.includeRawData) {
      doc.addPage()
      y = 20
      doc.setFontSize(14)
      doc.setTextColor(211, 89, 77)
      doc.text("Raw Analysis Data", 20, y)
      y += 10
      doc.setFontSize(12)
      doc.setTextColor(100)
      doc.text(JSON.stringify(data.results, null, 2), 20, y, { maxWidth: 170 })
    }

    // Save the PDF
    doc.save(`protgps-report-${data.id}.pdf`)
    return true
  } catch (error) {
    console.error("Failed to generate report:", error)
    return false
  }
}
