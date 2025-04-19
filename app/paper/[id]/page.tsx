"use client"

import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const PAPERS = {
  "protein-cancer": {
    title: "Protein Localization in Cancer Cells",
    authors: "Smith et al.",
    journal: "Nature Biotechnology",
    year: "2024",
    doi: "10.1038/s41587-024-0001-x",
    abstract: `Recent advances in protein localization studies have revealed crucial insights into cancer cell biology. This paper presents groundbreaking research on how protein mislocalization contributes to cancer development and progression. Using state-of-the-art imaging techniques and machine learning algorithms, we identified novel patterns of protein distribution in various cancer cell lines.

Our findings demonstrate that specific proteins exhibit altered localization patterns in cancer cells compared to normal cells, potentially serving as new therapeutic targets. The study utilized advanced microscopy techniques combined with artificial intelligence to analyze thousands of cell images, revealing previously unknown protein-location associations.

Key findings include:
- Identification of 47 proteins with cancer-specific localization patterns
- Novel machine learning approach for protein localization prediction
- Correlation between protein mislocalization and patient outcomes
- Potential therapeutic strategies targeting protein localization

This research provides new perspectives on cancer cell biology and opens avenues for innovative therapeutic approaches based on protein localization patterns.`,
    keywords: ["Protein Localization", "Cancer Biology", "Machine Learning", "Cell Imaging", "Therapeutic Targets"],
    sections: [
      {
        title: "Introduction",
        content: "Cancer cells exhibit numerous molecular alterations that distinguish them from normal cells...",
      },
      {
        title: "Methods",
        content: "We employed high-throughput microscopy combined with deep learning algorithms...",
      },
      {
        title: "Results",
        content: "Our analysis revealed distinct protein localization patterns specific to cancer cells...",
      },
      {
        title: "Discussion",
        content: "These findings have significant implications for cancer therapy development...",
      },
    ],
  },
  "ai-protein": {
    title: "AI-Driven Protein Analysis Methods",
    authors: "Johnson et al.",
    journal: "Cell",
    year: "2024",
    doi: "10.1016/j.cell.2024.01.001",
    abstract: `Artificial Intelligence (AI) has revolutionized our approach to protein analysis and understanding. This paper presents novel AI-driven methods for analyzing protein structure, function, and interactions. We introduce advanced machine learning algorithms specifically designed for protein sequence analysis and structural prediction.

Our research demonstrates the effectiveness of deep learning models in predicting protein properties and interactions with unprecedented accuracy. The methodology combines traditional bioinformatics approaches with cutting-edge AI techniques to achieve superior results in protein analysis tasks.

Key contributions include:
- Novel deep learning architecture for protein structure prediction
- Improved accuracy in protein-protein interaction prediction
- Automated protein function annotation system
- Integration of multiple data sources for comprehensive analysis

This work establishes a new paradigm for protein analysis, leveraging the power of artificial intelligence to unlock new insights in molecular biology.`,
    keywords: ["Artificial Intelligence", "Protein Analysis", "Deep Learning", "Bioinformatics", "Structural Biology"],
    sections: [
      {
        title: "Introduction",
        content: "The analysis of protein structure and function remains a central challenge in molecular biology...",
      },
      {
        title: "AI Methods",
        content: "We developed a suite of deep learning models specifically designed for protein analysis...",
      },
      {
        title: "Results",
        content: "Our AI-driven approach achieved significant improvements in prediction accuracy...",
      },
      {
        title: "Discussion",
        content: "These methods open new possibilities for understanding protein biology...",
      },
    ],
  },
}

export default function PaperPage() {
  const params = useParams()
  const paperId = params.id as string
  const paper = PAPERS[paperId as keyof typeof PAPERS]

  if (!paper) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#d3594d]">Paper not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-[#d3594d]/10 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center text-[#d3594d]/70 hover:text-[#d3594d] transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Platform
            </Link>
            <div></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl font-bold text-[#d3594d]">{paper.title}</h1>
            <div className="space-y-2">
              <p className="text-xl text-[#d3594d]/70">{paper.authors}</p>
              <p className="text-[#d3594d]/60">
                {paper.journal} ({paper.year})
              </p>
              <p className="text-[#d3594d]/50">DOI: {paper.doi}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#d3594d] mb-3">Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {paper.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-[#d3594d]/10 text-[#d3594d]/70 border border-[#d3594d]/20"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#d3594d] mb-4">Abstract</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-[#d3594d]/70 whitespace-pre-line">{paper.abstract}</p>
            </div>
          </div>

          <div className="space-y-8">
            {paper.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-semibold text-[#d3594d] mb-4">{section.title}</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-[#d3594d]/70">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
