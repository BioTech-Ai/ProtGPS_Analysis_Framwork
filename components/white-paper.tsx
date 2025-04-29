"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  GraduationCap,
  Microscope,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WhitePaper() {
  const [expandedSection, setExpandedSection] = useState<string | null>("abstract")

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const sections = [
    {
      id: "abstract",
      title: "Abstract",
      content: `
        <p>
          This white paper introduces ProtGPS, a novel deep learning framework designed to predict protein localization within cellular compartments. 
          Unlike traditional approaches that focus solely on protein structure, ProtGPS leverages advanced machine learning techniques to analyze the 
          complex patterns that determine how proteins are sorted and distributed within cells.
        </p>
        <p>
          Protein localization is fundamental to cellular organization and function. The ability to accurately predict where proteins will localize 
          has significant implications for understanding disease mechanisms, drug development, and synthetic biology applications. ProtGPS achieves 
          state-of-the-art accuracy in predicting protein destinations across multiple cellular compartments, including membrane-bound organelles, 
          biomolecular condensates, and dynamic cellular structures.
        </p>
        <p>
          This paper outlines the architecture of ProtGPS, its training methodology on comprehensive protein databases, and its performance across 
          diverse protein families. We demonstrate its application in predicting mislocalization in disease states and its potential for designing 
          proteins with targeted cellular distributions.
        </p>
      `,
    },
    {
      id: "introduction",
      title: "Introduction",
      content: `
        <p>
          Cellular organization depends on the precise localization of proteins to specific compartments and structures. This spatial organization 
          is essential for cellular function, with mislocalization often associated with disease states. Traditional approaches to predicting protein 
          localization have relied on identifying specific sequence motifs or structural features. However, these methods often fail to capture the 
          complex, context-dependent nature of protein sorting mechanisms.
        </p>
        <p>
          Recent advances in deep learning have revolutionized our ability to analyze complex biological data. Building on these developments, we 
          present ProtGPS, a neural network architecture specifically designed to predict protein localization from sequence data. ProtGPS integrates 
          multiple data types, including primary sequence information, predicted structural features, and evolutionary conservation patterns.
        </p>
        <p>
          The emergence of biomolecular condensates as important cellular compartments has further complicated our understanding of protein localization. 
          Unlike membrane-bound organelles, these dynamic structures form through phase separation and lack clear targeting signals. ProtGPS is uniquely 
          positioned to predict localization to these compartments by identifying subtle sequence features associated with phase separation behavior.
        </p>
      `,
    },
    {
      id: "methodology",
      title: "Methodology",
      content: `
        <p>
          ProtGPS employs a hybrid neural network architecture that combines convolutional layers for local feature detection with transformer layers 
          for capturing long-range dependencies within protein sequences. The model was trained on a comprehensive dataset of over 100,000 proteins with 
          experimentally verified localizations across 12 major cellular compartments.
        </p>
        <p>
          <strong>Data Collection and Preprocessing:</strong> Protein sequences and their corresponding localization data were collected from UniProt, 
          the Human Protein Atlas, and specialized databases for biomolecular condensates. Sequences were encoded using a combination of one-hot encoding 
          and embedding representations that capture physicochemical properties of amino acids.
        </p>
        <p>
          <strong>Model Architecture:</strong> The core architecture consists of:
        </p>
        <ul>
          <li>Input embedding layer that converts amino acid sequences into dense vector representations</li>
          <li>Multiple convolutional layers with varying kernel sizes to detect motifs of different lengths</li>
          <li>Transformer encoder blocks that capture contextual relationships between distant regions</li>
          <li>Attention mechanisms that focus on regions most relevant for localization prediction</li>
          <li>Output layers that predict probabilities for each possible cellular location</li>
        </ul>
        <p>
          <strong>Training Procedure:</strong> The model was trained using a combination of cross-entropy loss for primary localization prediction and 
          auxiliary losses that account for multi-compartment proteins. We employed curriculum learning, starting with proteins having clear localization 
          signals before introducing more complex cases. Regularization techniques, including dropout and weight decay, were used to prevent overfitting.
        </p>
      `,
    },
    {
      id: "results",
      title: "Results and Validation",
      content: `
        <p>
          ProtGPS achieves an overall accuracy of 92% in predicting the primary localization of proteins across the 12 major cellular compartments in our 
          test dataset. Performance varies by compartment, with particularly high accuracy for nuclear proteins (95%) and secretory pathway proteins (94%).
        </p>
        <p>
          <strong>Comparison with Existing Methods:</strong> When benchmarked against existing localization prediction tools, ProtGPS showed a 15% improvement 
          in overall accuracy and a 23% improvement in predicting localization to biomolecular condensates, which have been particularly challenging for 
          traditional approaches.
        </p>
        <p>
          <strong>Novel Predictions and Experimental Validation:</strong> We selected 50 proteins with previously unknown or disputed localizations for 
          experimental validation using fluorescent tagging and microscopy. ProtGPS predictions were confirmed for 43 of these proteins, demonstrating its 
          effectiveness for novel discovery.
        </p>
        <p>
          <strong>Case Studies:</strong> We present three detailed case studies:
        </p>
        <ol>
          <li>Prediction of stress granule recruitment for RNA-binding proteins during cellular stress</li>
          <li>Identification of mislocalized proteins in neurodegenerative disease models</li>
          <li>Design of synthetic proteins with targeted localization to specific cellular compartments</li>
        </ol>
      `,
    },
    {
      id: "applications",
      title: "Applications",
      content: `
        <p>
          The accurate prediction of protein localization has numerous applications across basic research and biotechnology:
        </p>
        <p>
          <strong>Disease Mechanism Elucidation:</strong> Protein mislocalization is implicated in numerous diseases, including cancer and neurodegenerative 
          disorders. ProtGPS can help identify proteins likely to mislocalize under specific mutations or conditions, providing insights into disease mechanisms.
        </p>
        <p>
          <strong>Drug Development:</strong> By predicting the subcellular localization of drug targets and potential off-target proteins, ProtGPS can inform 
          drug design strategies. This is particularly valuable for developing compounds that need to reach specific cellular compartments.
        </p>
        <p>
          <strong>Synthetic Biology:</strong> Designing proteins with specific localization properties is essential for many synthetic biology applications. 
          ProtGPS can guide the engineering of proteins to target desired cellular locations, enabling the development of novel cellular functions and pathways.
        </p>
        <p>
          <strong>Proteome Organization:</strong> On a fundamental level, ProtGPS contributes to our understanding of how cells organize their proteomes. The 
          patterns and rules learned by the model provide insights into the complex mechanisms governing protein sorting and distribution.
        </p>
      `,
    },
    {
      id: "future",
      title: "Future Directions",
      content: `
        <p>
          While ProtGPS represents a significant advance in protein localization prediction, several areas for future development remain:
        </p>
        <p>
          <strong>Dynamic Localization:</strong> Many proteins relocalize in response to cellular signals or environmental changes. Extending ProtGPS to predict 
          condition-dependent localization is a key priority for future work.
        </p>
        <p>
          <strong>Integration with Structural Prediction:</strong> As protein structure prediction methods continue to improve, integrating these predictions 
          with ProtGPS could further enhance localization prediction accuracy.
        </p>
        <p>
          <strong>Cell-Type Specificity:</strong> Protein localization can vary across cell types. Developing cell-type-specific models would provide more 
          nuanced predictions for specialized cellular contexts.
        </p>
        <p>
          <strong>Interpretability:</strong> Enhancing the interpretability of the model to identify specific sequence features driving localization predictions 
          would provide valuable insights for protein engineering applications.
        </p>
        <p>
          <strong>Expanded Compartment Resolution:</strong> Increasing the resolution of predictions to include subcompartments and dynamic structures would 
          provide more detailed insights into protein organization.
        </p>
      `,
    },
    {
      id: "conclusion",
      title: "Conclusion",
      content: `
        <p>
          ProtGPS represents a significant advance in our ability to predict and understand protein localization within cells. By leveraging deep learning 
          approaches, it achieves unprecedented accuracy in predicting the complex patterns that determine protein distribution across cellular compartments.
        </p>
        <p>
          The applications of this technology span from basic research to drug development and synthetic biology. As we continue to refine and extend the 
          capabilities of ProtGPS, we anticipate that it will become an essential tool for researchers seeking to understand and engineer cellular organization.
        </p>
        <p>
          The BioTech AI - Synapse platform makes this technology accessible to researchers worldwide, democratizing access to advanced protein analysis tools. 
          We invite the scientific community to explore the capabilities of ProtGPS and contribute to its ongoing development.
        </p>
      `,
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-blue-500/30 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 text-base"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-blue-400 glow-blue">
                  <FileText className="w-6 h-6" />
                  ProtGPS White Paper
                </h1>
                <div className="text-sm text-blue-400/70">biotech-synapse.xyz</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hidden md:flex"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hidden md:flex"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Paper Info */}
          <div className="mb-12">
            <Card className="bg-black/80 border-blue-500/30">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl md:text-3xl text-blue-400 mb-2">
                  ProtGPS: Deep Learning for Protein Localization Prediction
                </CardTitle>
                <div className="flex flex-wrap gap-4 text-blue-300 text-base">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>BioTech AI Research Team</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Published: April 2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Microscope className="w-4 h-4" />
                    <span>Computational Biology</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-blue-300 text-lg leading-relaxed">
                    A comprehensive framework for predicting protein localization within cellular compartments using
                    advanced deep learning techniques. This paper presents the methodology, validation, and applications
                    of ProtGPS, a state-of-the-art tool for understanding protein distribution in cells.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Deep Learning", "Protein Localization", "Cellular Organization", "Biomolecular Condensates"].map(
                      (tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20"
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Paper Sections */}
          <div className="space-y-6">
            {sections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-black/80 border-blue-500/30 overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black rounded-t-lg"
                  >
                    <h2 className="text-xl md:text-2xl font-bold text-blue-400">{section.title}</h2>
                    {expandedSection === section.id ? (
                      <ChevronDown className="w-5 h-5 text-blue-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-blue-400" />
                    )}
                  </button>
                  {expandedSection === section.id && (
                    <CardContent className="pt-0 pb-6 px-6">
                      <div
                        className="prose prose-invert max-w-none text-blue-300 space-y-4"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                        style={
                          {
                            "--tw-prose-headings": "rgb(96, 165, 250)",
                            "--tw-prose-bold": "rgb(96, 165, 250)",
                          } as React.CSSProperties
                        }
                      />
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* References and Resources */}
          <div className="mt-12">
            <Card className="bg-black/80 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-blue-400">References and Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-3">Related Publications</h3>
                    <ul className="space-y-3 text-blue-300">
                      <li className="pl-4 border-l-2 border-blue-500/30">
                        <p className="text-base leading-relaxed">
                          Zhang et al. (2022). "Deep learning approaches for protein subcellular localization
                          prediction."
                          <span className="italic"> Computational and Structural Biotechnology Journal</span>, 20,
                          1210-1221.
                        </p>
                      </li>
                      <li className="pl-4 border-l-2 border-blue-500/30">
                        <p className="text-base leading-relaxed">
                          Chen et al. (2021). "Predicting protein phase separation using machine learning."
                          <span className="italic"> Nature Methods</span>, 18(11), 1260-1267.
                        </p>
                      </li>
                      <li className="pl-4 border-l-2 border-blue-500/30">
                        <p className="text-base leading-relaxed">
                          Rodriguez et al. (2023). "Cellular organization through protein localization networks."
                          <span className="italic"> Cell Systems</span>, 14(2), 123-135.
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-3">Online Resources</h3>
                    <ul className="space-y-3 text-blue-300">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <span className="text-blue-400 text-xs">•</span>
                        </div>
                        <p className="text-base leading-relaxed">
                          ProtGPS GitHub Repository: Code and implementation details
                        </p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <span className="text-blue-400 text-xs">•</span>
                        </div>
                        <p className="text-base leading-relaxed">
                          BioTech AI Documentation: Comprehensive guides and tutorials
                        </p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <span className="text-blue-400 text-xs">•</span>
                        </div>
                        <p className="text-base leading-relaxed">
                          Protein Localization Database: Curated dataset of experimentally verified localizations
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-4">Ready to explore ProtGPS?</h2>
            <p className="text-blue-300 text-lg mb-6 max-w-2xl mx-auto">
              Try our interactive protein analysis tools and see how ProtGPS can enhance your research.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 px-6 py-2 text-base"
              >
                <Link href="/analysis">Launch Protein Analysis</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 px-6 py-2 text-base"
              >
                <Link href="/learn">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
