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
import { FlaskConicalIcon } from "lucide-react" // Import FlaskConicalIcon
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import SplashScreen from "@/components/splash-screen"
import CCTVProteinAnimation from "@/components/cctv-protein-animation"
import { BrandTelegram } from "@/components/icons/brand-telegram"
// First, import the Twitter icon and Discord icon
import { BrandTwitter } from "@/components/icons/brand-twitter"
import { DiscIcon as DiscordIcon } from "lucide-react"

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
      <nav className="border-b border-binance-gold/30 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                    Biotech Ai - Synapse
                  </h1>
                  <div className="text-xs text-binance-gold/70">biotech-synapse.xyz</div>
                </div>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#features" className="text-binance-gold hover:text-binance-lightGold transition-colors">
                  Features
                </a>
                <a href="#experiments" className="text-binance-gold hover:text-binance-lightGold transition-colors">
                  Experiments
                </a>
                <Link href="/white-paper" className="text-binance-gold hover:text-binance-lightGold transition-colors">
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
              <Button
                asChild
                className="bg-gradient-to-r from-[#F0B90B] to-[#d9a50a] hover:from-[#d9a50a] hover:to-[#F0B90B] text-black font-medium"
              >
                <a
                  href="https://t.me/BioTech_DRSynapse_Bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <BrandTelegram className="w-4 h-4" />
                  Telegram Doctor
                </a>
              </Button>
              <div className="flex items-center space-x-2">
                <a
                  href="https://x.com/BioTechAi_sol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-binance-gold hover:text-binance-lightGold transition-colors"
                  aria-label="Twitter/X"
                >
                  <BrandTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://discord.gg/fjeyeh5p"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-binance-gold hover:text-binance-lightGold transition-colors"
                  aria-label="Discord"
                >
                  <DiscordIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* CA Address Banner */}
      <div className="bg-gradient-to-r from-black via-[#F0B90B]/10 to-black border-y border-[#F0B90B]/20 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <span className="text-[#F0B90B]/80 text-sm font-mono">
                CA: <span className="font-bold text-[#F0B90B]">9fCgRed2oFenKySLP9CYeyjYVhApiqAfM7Kf5pYtpump</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="space-y-8 relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold tracking-tight text-binance-gold glow-yellow"
              >
                Advanced Research Platform
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-binance-gold glow-yellow"
              >
                Building advanced AI-powered platforms for molecular analysis, genomics research, and drug discovery
              </motion.p>

              {/* Grok Credit - Bold and Prominent */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-binance-gold glow-yellow">Advanced Research Features</h2>
            <p className="mt-4 text-binance-gold/70">Comprehensive tools for protein analysis and research</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
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
                className="p-6 border border-binance-gold/20 rounded-lg bg-black/80 hover:bg-binance-gold/5 transition-colors"
              >
                <feature.icon className="h-8 w-8 text-binance-gold mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-binance-gold glow-yellow">{feature.title}</h3>
                <p className="text-binance-gold/90">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiments Section */}
      <section id="experiments" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-binance-gold glow-yellow">Available Experiments</h2>
            <p className="mt-4 text-binance-gold/70">Explore our comprehensive suite of research tools</p>
          </div>
          <div className="space-y-16">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-binance-gold glow-yellow">{category.title}</h3>
                  <p className="text-binance-gold/70">{category.description}</p>
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
                        className={`p-6 bg-black/80 border-binance-gold/30 ${
                          experiment.status === "Beta" ? "opacity-75" : ""
                        } ${experiment.status === "Operational" && experiment.link ? "cursor-pointer" : "cursor-not-allowed"}`}
                        onClick={() =>
                          experiment.status === "Operational" && experiment.link && router.push(experiment.link)
                        }
                      >
                        <div className="flex justify-between items-start mb-4">
                          <experiment.icon className="h-8 w-8 text-binance-gold" />
                          <span
                            className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                              experiment.status === "Operational"
                                ? "bg-binance-gold/10 text-binance-gold border border-binance-gold/30"
                                : "bg-binance-gold/10 text-binance-gold border border-binance-gold/30"
                            }`}
                          >
                            {experiment.status === "Beta" && <LockIcon className="w-3 h-3" />}
                            {experiment.status}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold mb-2 text-binance-gold glow-yellow">{experiment.title}</h4>
                        <p className="text-binance-gold/90 mb-4">{experiment.description}</p>
                        {experiment.status === "Beta" && (
                          <div className="mt-2 text-binance-gold/70 text-sm flex items-center">
                            <LockIcon className="w-3 h-3 mr-1" /> Currently frozen
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

      {/* Telegram Doctor Section */}
      <section className="py-16 bg-gradient-to-r from-[#001a2c] to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-black/50 border border-[#F0B90B]/30 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F0B90B] to-[#d9a50a] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#F0B90B]/20">
                <BrandTelegram className="w-12 h-12 text-black" />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-3xl font-bold text-binance-gold glow-yellow">Connect with Dr. Synapse</h2>
                <p className="text-binance-gold/90">
                  Get instant medical assistance and biotech research support through our Telegram bot. Dr. Synapse is
                  available 24/7 to answer your questions and provide guidance.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-[#F0B90B] to-[#d9a50a] hover:from-[#d9a50a] hover:to-[#F0B90B] text-black font-medium"
                >
                  <a
                    href="https://t.me/BioTech_DRSynapse_Bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <BrandTelegram className="w-5 h-5" />
                    Chat on Telegram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Grok Credit */}
      <footer className="py-8 bg-black border-t border-binance-gold/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a
              href="https://x.com/BioTechAi_sol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-binance-gold hover:text-binance-lightGold transition-colors"
              aria-label="Twitter/X"
            >
              <BrandTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://discord.gg/fjeyeh5p"
              target="_blank"
              rel="noopener noreferrer"
              className="text-binance-gold hover:text-binance-lightGold transition-colors"
              aria-label="Discord"
            >
              <DiscordIcon className="w-6 h-6" />
            </a>
            <a
              href="https://t.me/BioTech_DRSynapse_Bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-binance-gold hover:text-binance-lightGold transition-colors"
              aria-label="Telegram"
            >
              <BrandTelegram className="w-6 h-6" />
            </a>
          </div>
          <p className="text-binance-gold/70">
            &copy; {new Date().getFullYear()} BioTech AI - Synapse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
