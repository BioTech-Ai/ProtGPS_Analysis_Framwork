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
      <nav className="border-b border-blue-500/30 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 text-base"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-blue-400 glow-blue">
                  <Terminal className="w-6 h-6" />
                  ProtGPS Documentation
                </h1>
                <div className="text-sm text-blue-400/70">biotech-synapse.xyz</div>
              </div>
            </div>
            <Button asChild className="bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20">
              <Link href="/analysis">Launch App</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Introduction */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-400 glow-blue tracking-tight">
              Understanding ProtGPS
            </h2>
            <p className="text-lg md:text-xl text-blue-300 leading-relaxed max-w-prose">
              ProtGPS is a cutting-edge platform that combines advanced machine learning with real-time 3D visualization
              to build advanced AI-powered platforms for molecular analysis, genomics research, and drug discovery. Our
              system provides unprecedented insights into protein localization and structural analysis, making complex
              protein research more accessible and efficient.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <Card key={index} className="bg-black/80 border-blue-500/30 h-full">
                  <CardHeader className="pb-2">
                    <div className="text-blue-400 mb-2">
                      <item.icon className="w-10 h-10" />
                    </div>
                    <CardTitle className="text-blue-400 text-xl md:text-2xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-300 text-base leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Detailed Features */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="bg-black border border-blue-500/30 mb-6 p-1 overflow-x-auto flex-wrap">
                <TabsTrigger
                  value="features"
                  className="text-blue-300 data-[state=active]:text-blue-400 data-[state=active]:bg-blue-500/10 text-base py-2 px-4"
                >
                  Key Features
                </TabsTrigger>
                <TabsTrigger
                  value="technology"
                  className="text-blue-300 data-[state=active]:text-blue-400 data-[state=active]:bg-blue-500/10 text-base py-2 px-4"
                >
                  Technology
                </TabsTrigger>
                <TabsTrigger
                  value="applications"
                  className="text-blue-300 data-[state=active]:text-blue-400 data-[state=active]:bg-blue-500/10 text-base py-2 px-4"
                >
                  Applications
                </TabsTrigger>
                <TabsTrigger
                  value="getting-started"
                  className="text-blue-300 data-[state=active]:text-blue-400 data-[state=active]:bg-blue-500/10 text-base py-2 px-4"
                >
                  Getting Started
                </TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="space-y-6 mt-6 focus:outline-none">
                <Card className="bg-black/80 border-blue-500/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-blue-400 text-2xl md:text-3xl mb-2">
                      Advanced Analysis Features
                    </CardTitle>
                    <CardDescription className="text-blue-300 text-lg">
                      Comprehensive tools for protein research
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 pt-4">
                    <ul className="space-y-6 text-blue-300">
                      <li className="flex items-start gap-4">
                        <Flask className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-blue-400 text-lg block mb-1">Protein Localization Prediction</strong>
                          <p className="text-base leading-relaxed">
                            Advanced AI models predict protein cellular locations with high accuracy, helping
                            researchers understand protein distribution and function.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <FileCode2 className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-blue-400 text-lg block mb-1">3D Visualization</strong>
                          <p className="text-base leading-relaxed">
                            Real-time 3D visualization of protein structures and cellular compartments, enabling better
                            understanding of protein behavior.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <BookOpen className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-blue-400 text-lg block mb-1">Research Tools</strong>
                          <p className="text-base leading-relaxed">
                            Comprehensive suite of analysis tools, including sequence analysis, structural prediction,
                            and interaction mapping.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technology" className="space-y-6 mt-6 focus:outline-none">
                <Card className="bg-black/80 border-blue-500/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-blue-400 text-2xl md:text-3xl mb-2">Technology Stack</CardTitle>
                    <CardDescription className="text-blue-300 text-lg">
                      Built with cutting-edge technologies
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 pt-4">
                    <ul className="space-y-6 text-blue-300">
                      <li className="flex items-start gap-4">
                        <BrainCircuitIcon className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-blue-400 text-lg block mb-1">AI Models</strong>
                          <p className="text-base leading-relaxed">
                            State-of-the-art machine learning models trained on extensive protein databases for accurate
                            predictions.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <Code2 className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-blue-400 text-lg block mb-1">Modern Web Stack</strong>
                          <p className="text-base leading-relaxed">
                            Built with Next.js, React Three Fiber, and WebGL for smooth, interactive visualizations.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="space-y-6 mt-6 focus:outline-none">
                <Card className="bg-black/80 border-blue-500/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-blue-400 text-2xl md:text-3xl mb-2">Research Applications</CardTitle>
                    <CardDescription className="text-blue-300 text-lg">
                      Real-world applications in research
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 pt-4">
                    <ul className="space-y-6 text-blue-300">
                      <li className="flex items-start gap-4">
                        <GraduationCap className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-blue-400 text-lg block mb-1">Academic Research</strong>
                          <p className="text-base leading-relaxed">
                            Support for protein research in academic institutions, enabling new discoveries in cell
                            biology.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <Flask className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-blue-400 text-lg block mb-1">Drug Development</strong>
                          <p className="text-base leading-relaxed">
                            Accelerate drug discovery by understanding protein behavior and interactions in cells.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="getting-started" className="space-y-6 mt-6 focus:outline-none">
                <Card className="bg-black/80 border-blue-500/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-blue-400 text-2xl md:text-3xl mb-2">Getting Started Guide</CardTitle>
                    <CardDescription className="text-blue-300 text-lg">Quick start guide for new users</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 pt-4">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                        <div className="space-y-3 text-blue-300">
                          <h4 className="font-semibold text-blue-400 text-lg">Before You Begin</h4>
                          <ul className="list-disc space-y-2 ml-6">
                            <li className="text-base leading-relaxed">Prepare your protein sequence</li>
                            <li className="text-base leading-relaxed">Review documentation</li>
                            <li className="text-base leading-relaxed">Check system requirements</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-400 text-lg">Quick Start Steps</h4>
                      <ol className="space-y-6 text-blue-300 ml-2">
                        <li className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-medium">
                            1
                          </span>
                          <span className="text-base leading-relaxed">Launch the ProtGPS application</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-medium">
                            2
                          </span>
                          <span className="text-base leading-relaxed">Enter your protein sequence</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-medium">
                            3
                          </span>
                          <span className="text-base leading-relaxed">Run analysis and view results</span>
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap justify-start gap-4 pt-6">
                    <Button
                      asChild
                      className="bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 px-6 py-2 text-base"
                    >
                      <Link href="/analysis">Start Analysis</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 px-6 py-2 text-base"
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
