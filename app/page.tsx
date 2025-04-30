"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  BookOpen,
  BrainCircuitIcon,
  Database,
  FlaskRoundIcon as Flask,
  Globe,
  GraduationCap,
  HeartPulseIcon,
  LockIcon,
  MicroscopeIcon,
  PhoneIcon as CellIcon,
  PiIcon as PetriDishIcon,
  Search,
  VolumeIcon as VialIcon,
  SearchIcon,
  WrenchIcon,
} from "lucide-react"
import { FlaskConicalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import SplashScreen from "@/components/splash-screen"
import CCTVProteinAnimation from "@/components/cctv-protein-animation"
import { BrandTelegram } from "@/components/icons/brand-telegram"

const categories = [
  {
    title: "Molecular Biology",
    description: "Advanced molecular analysis and research tools",
    experiments: [
      {
        id: "proteingps",
        title: "Protein GPS Analysis",
        description: "AI-powered protein localization and interaction prediction",
        icon: BrainCircuitIcon,
        link: "/analysis",
        tags: ["AI", "Protein Analysis", "Molecular Dynamics"],
        status: "Operational",
        highlight: true,
      },
    ],
  },
  // Removing genomics section entirely to prevent access
  {
    title: "Cell Biology",
    description: "Advanced cell culture and analysis tools",
    experiments: [
      {
        icon: MicroscopeIcon,
        title: "Advanced Cell Imaging",
        description: "High-resolution microscopy with AI-powered analysis",
        status: "Beta",
      },
      {
        icon: PetriDishIcon,
        title: "Smart Cell Culture System",
        description: "Automated culture monitoring with growth optimization",
        status: "Beta",
      },
      {
        icon: CellIcon,
        title: "Cell Signaling Analyzer",
        description: "Advanced pathway and molecular interaction analysis",
        status: "Beta",
      },
      {
        icon: SearchIcon,
        title: "Cancer Cell Detector",
        description: "ML-based cancer cell identification and analysis",
        status: "Beta",
      },
      {
        icon: WrenchIcon,
        title: "Cancer Cell Repair Analysis",
        description: "DNA repair mechanism analysis in cancer cells",
        status: "Beta",
      },
    ],
  },
  {
    title: "Drug Discovery",
    description: "Advanced tools for drug development",
    experiments: [
      {
        icon: FlaskConicalIcon,
        title: "Virtual Drug Screening",
        description: "AI-driven drug screening and molecular docking",
        status: "Beta",
      },
      {
        icon: VialIcon,
        title: "Toxicity Predictor",
        description: "ML-based ADMET property prediction",
        status: "Beta",
      },
      {
        icon: HeartPulseIcon,
        title: "Biomarker Discovery",
        description: "Multi-omics biomarker identification",
        status: "Beta",
      },
    ],
  },
]

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setLoading(false)
  }

  // Update the function name to better match new terminology
  const handleStartAnalysis = () => {
    // Redirect directly to protein analysis instead of experiments page
    router.push("/protein-analysis")
  }

  // If loading, show splash screen
  if (loading) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return (
    <div className="min-h-screen bg-black">
      <CCTVProteinAnimation />
      {/* Navigation */}
      <nav className="border-b border-blue-primary/30 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Biotech Ai - Synapse
                  </h1>
                </div>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#features" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Features
                </a>
                <a href="#experiments" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Experiments
                </a>
                <Link href="/white-paper" className="text-blue-400 hover:text-blue-300 transition-colors">
                  White Paper
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleStartAnalysis} className="button-energy">
                Protein Analysis
              </Button>
              <Button onClick={() => router.push("/doctor")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Talk to Doctor
              </Button>
              <a
                href="https://t.me/BioTech_DRSynapse_Bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0088cc] hover:bg-[#0077b5] transition-colors"
                aria-label="Chat with Dr. Synapse on Telegram"
              >
                <BrandTelegram className="w-5 h-5 text-white" />
              </a>
              {/* Removed Discord icon and link */}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="space-y-8 relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold tracking-tight text-blue-400 glow-blue"
              >
                Advanced Research Platform
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-blue-400 glow-blue"
              >
                BioTech AI - Synapse: Building advanced AI-powered platforms for molecular analysis, genomics research,
                and drug discovery
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex space-x-4"
              >
                <Button variant="outline" asChild className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10">
                  <Link href="/learn">Learn More</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-400 glow-blue">Advanced Research Features</h2>
            <p className="mt-4 text-blue-400/70 max-w-2xl mx-auto">
              Comprehensive tools for protein analysis and research
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Flask,
                title: "AI-Powered Analysis",
                description: "Advanced machine learning models for accurate protein localization prediction",
              },
              {
                icon: Database,
                title: "Comprehensive Database",
                description: "Access to extensive protein sequence and structure databases",
              },
              {
                icon: Search,
                title: "Real-time Visualization",
                description: "Interactive 3D visualization of protein structures and cellular locations",
              },
              {
                icon: Globe,
                title: "Global Research Network",
                description: "Collaborate with researchers worldwide and share findings",
              },
              {
                icon: GraduationCap,
                title: "Educational Resources",
                description: "In-depth learning materials and research documentation",
              },
              {
                icon: BookOpen,
                title: "Analysis Tools",
                description: "Export findings in publication-ready formats with detailed reports",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="feature-card"
              >
                <div className="p-6 border border-blue-400/20 rounded-lg bg-black/80 hover:bg-blue-400/5 transition-all duration-300 h-full flex flex-col items-center text-center shadow-md hover:shadow-lg hover:shadow-blue-400/10">
                  <div className="rounded-full bg-blue-400/10 p-3 mb-4">
                    <feature.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-400 glow-blue">{feature.title}</h3>
                  <p className="text-blue-400/90">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiments Section */}
      <section id="experiments" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-400 glow-blue">Available Experiments</h2>
            <p className="mt-4 text-blue-400/70 max-w-2xl mx-auto">Explore our comprehensive suite of research tools</p>
          </div>
          <div className="space-y-16 max-w-6xl mx-auto">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-400 glow-blue">{category.title}</h3>
                  <p className="text-blue-400/70 max-w-2xl mx-auto">{category.description}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.experiments.map((experiment, experimentIndex) => (
                    <motion.div
                      key={experimentIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: experimentIndex * 0.1 }}
                    >
                      <Card
                        className={`experiment-card h-full flex flex-col p-6 bg-black/80 border-blue-400/30 ${
                          experiment.status === "Beta" ? "opacity-75" : ""
                        } ${
                          experiment.status === "Operational" && experiment.link
                            ? "cursor-pointer hover:border-blue-400/60 hover:shadow-md hover:shadow-blue-400/20"
                            : "cursor-not-allowed"
                        } transition-all duration-300`}
                        onClick={() =>
                          experiment.status === "Operational" && experiment.link && router.push(experiment.link)
                        }
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="rounded-full bg-blue-400/10 p-2">
                            <experiment.icon className="h-6 w-6 text-blue-400" />
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                              experiment.status === "Operational"
                                ? "bg-blue-400/10 text-blue-400 border border-blue-400/30"
                                : "bg-blue-400/10 text-blue-400 border border-blue-400/30"
                            }`}
                          >
                            {experiment.status === "Beta" && <LockIcon className="w-3 h-3" />}
                            {experiment.status}
                          </span>
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-lg font-semibold mb-2 text-blue-400 glow-blue">{experiment.title}</h4>
                          <p className="text-blue-400/90 mb-4">{experiment.description}</p>
                        </div>
                        {experiment.status === "Beta" && (
                          <div className="mt-2 text-blue-400/70 text-sm flex items-center">
                            <LockIcon className="w-3 h-3 mr-1" /> Currently frozen
                          </div>
                        )}
                        {experiment.status === "Operational" && experiment.tags && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {experiment.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="text-xs px-2 py-1 rounded-full bg-blue-400/10 text-blue-300 border border-blue-400/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Removed Discord Community Section */}

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-blue-400/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://t.me/BioTech_DRSynapse_Bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0088cc] hover:text-[#0077b5] transition-colors"
              aria-label="Telegram"
            >
              <BrandTelegram className="w-6 h-6" />
            </a>
            {/* Removed Discord icon and link */}
          </div>
          <p className="text-blue-400/70">
            &copy; {new Date().getFullYear()} BioTech AI - Synapse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
