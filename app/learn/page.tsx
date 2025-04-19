"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  AlertCircle,
  ArrowLeft,
  BeakerIcon,
  BookOpen,
  BrainCircuitIcon,
  Code2,
  FileCode2,
  FlaskRoundIcon as Flask,
  GraduationCap,
  Terminal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="border-b border-terminal-red/30 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-terminal-red hover:text-terminal-dim-red transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2 text-terminal-red glow-red">
                  <Terminal className="w-6 h-6" />
                  ProtGPS Documentation
                </h1>
                <div className="text-xs text-terminal-red/70">biotech-synapse.xyz</div>
              </div>
            </div>
            <Button
              asChild
              className="bg-terminal-red/10 text-terminal-red border-terminal-red/30 hover:bg-terminal-red/20"
            >
              <Link href="/analysis">Launch App</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h2 className="text-3xl font-bold text-terminal-red glow-red">Understanding ProtGPS</h2>
            <p className="text-lg text-terminal-orange leading-relaxed">
              ProtGPS is a cutting-edge platform that combines advanced machine learning with real-time 3D visualization
              to build advanced AI-powered platforms for molecular analysis, genomics research, and drug discovery. Our
              system provides unprecedented insights into protein localization and structural analysis, making complex
              protein research more accessible and efficient.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: BrainCircuitIcon,
                  title: "AI-Powered",
                  description: "Advanced machine learning models for accurate predictions",
                },
                {
                  icon: BeakerIcon,
                  title: "Research-Grade",
                  description: "Publication-ready analysis and visualization tools",
                },
                {
                  icon: Code2,
                  title: "Developer-Friendly",
                  description: "Comprehensive API and integration options",
                },
              ].map((item, index) => (
                <Card key={index} className="bg-black/80 border-terminal-red/30">
                  <CardHeader>
                    <div className="text-terminal-red">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-terminal-red">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-terminal-orange/90">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Detailed Features */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="bg-black border border-terminal-red/30">
                <TabsTrigger
                  value="features"
                  className="text-terminal-orange data-[state=active]:text-terminal-red data-[state=active]:bg-terminal-red/10"
                >
                  Key Features
                </TabsTrigger>
                <TabsTrigger
                  value="technology"
                  className="text-terminal-orange data-[state=active]:text-terminal-red data-[state=active]:bg-terminal-red/10"
                >
                  Technology
                </TabsTrigger>
                <TabsTrigger
                  value="applications"
                  className="text-terminal-orange data-[state=active]:text-terminal-red data-[state=active]:bg-terminal-red/10"
                >
                  Applications
                </TabsTrigger>
                <TabsTrigger
                  value="getting-started"
                  className="text-terminal-orange data-[state=active]:text-terminal-red data-[state=active]:bg-terminal-red/10"
                >
                  Getting Started
                </TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="space-y-6 mt-6">
                <Card className="bg-black/80 border-terminal-red/30">
                  <CardHeader>
                    <CardTitle className="text-terminal-red">Advanced Analysis Features</CardTitle>
                    <CardDescription className="text-terminal-orange">
                      Comprehensive tools for protein research
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-4 text-terminal-orange/90">
                      <li className="flex items-start gap-3">
                        <Flask className="w-5 h-5 text-terminal-red mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-terminal-red">Protein Localization Prediction</strong>
                          <p>
                            Advanced AI models predict protein cellular locations with high accuracy, helping
                            researchers understand protein distribution and function.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <FileCode2 className="w-5 h-5 text-terminal-red mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-terminal-red">3D Visualization</strong>
                          <p>
                            Real-time 3D visualization of protein structures and cellular compartments, enabling better
                            understanding of protein behavior.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-terminal-red mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-terminal-red">Research Tools</strong>
                          <p>
                            Comprehensive suite of analysis tools, including sequence analysis, structural prediction,
                            and interaction mapping.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technology" className="space-y-6 mt-6">
                <Card className="bg-black/80 border-terminal-red/30">
                  <CardHeader>
                    <CardTitle className="text-terminal-red">Technology Stack</CardTitle>
                    <CardDescription className="text-terminal-orange">
                      Built with cutting-edge technologies
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-4 text-terminal-orange/90">
                      <li className="flex items-start gap-3">
                        <BrainCircuitIcon className="w-5 h-5 text-terminal-red mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-terminal-red">AI Models</strong>
                          <p>
                            State-of-the-art machine learning models trained on extensive protein databases for accurate
                            predictions.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Code2 className="w-5 h-5 text-terminal-red mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-terminal-red">Modern Web Stack</strong>
                          <p>
                            Built with Next.js, React Three Fiber, and WebGL for smooth, interactive visualizations.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="space-y-6 mt-6">
                <Card className="bg-black/80 border-terminal-red/30">
                  <CardHeader>
                    <CardTitle className="text-terminal-red">Research Applications</CardTitle>
                    <CardDescription className="text-terminal-orange">
                      Real-world applications in research
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-4 text-terminal-orange/90">
                      <li className="flex items-start gap-3">
                        <GraduationCap className="w-5 h-5 text-terminal-red mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-terminal-red">Academic Research</strong>
                          <p>
                            Support for protein research in academic institutions, enabling new discoveries in cell
                            biology.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Flask className="w-5 h-5 text-terminal-red mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-terminal-red">Drug Development</strong>
                          <p>Accelerate drug discovery by understanding protein behavior and interactions in cells.</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="getting-started" className="space-y-6 mt-6">
                <Card className="bg-black/80 border-terminal-red/30">
                  <CardHeader>
                    <CardTitle className="text-terminal-red">Getting Started Guide</CardTitle>
                    <CardDescription className="text-terminal-orange">Quick start guide for new users</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-terminal-red mt-1 flex-shrink-0" />
                        <div className="space-y-2 text-terminal-orange/90">
                          <h4 className="font-semibold text-terminal-red">Before You Begin</h4>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Prepare your protein sequence</li>
                            <li>Review documentation</li>
                            <li>Check system requirements</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-terminal-red">Quick Start Steps</h4>
                      <ol className="space-y-4 text-terminal-orange/90">
                        <li className="flex items-center gap-2">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-terminal-red/10 border border-terminal-red/30 flex items-center justify-center text-terminal-red">
                            1
                          </span>
                          Launch the ProtGPS application
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-terminal-red/10 border border-terminal-red/30 flex items-center justify-center text-terminal-red">
                            2
                          </span>
                          Enter your protein sequence
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-terminal-red/10 border border-terminal-red/30 flex items-center justify-center text-terminal-red">
                            3
                          </span>
                          Run analysis and view results
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-start gap-4">
                    <Button
                      asChild
                      className="bg-terminal-red/10 text-terminal-red border-terminal-red/30 hover:bg-terminal-red/20"
                    >
                      <Link href="/analysis">Start Analysis</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-terminal-red/30 text-terminal-red hover:bg-terminal-red/10"
                    >
                      View Documentation
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.section>
        </div>
      </main>
    </div>
  )
}
