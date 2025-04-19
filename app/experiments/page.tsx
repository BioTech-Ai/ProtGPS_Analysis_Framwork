"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LockIcon } from "lucide-react"
import Link from "next/link"

export default function ExperimentsPage() {
  const router = useRouter()

  // Redirect to home after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-black p-8">
      <Card className="max-w-2xl mx-auto bg-black/80 border-terminal-red/30">
        <CardHeader>
          <CardTitle className="text-terminal-red flex items-center gap-2">
            <LockIcon className="w-6 h-6" />
            Experiments Platform
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-dashed border-terminal-red/50 rounded-md bg-terminal-red/10">
            <p className="text-terminal-red text-center font-bold">All experimental features are currently frozen</p>
          </div>
          <p className="text-terminal-orange mt-4">
            The experiments platform is currently unavailable. All beta features have been frozen for maintenance.
          </p>
          <p className="text-terminal-orange">You will be redirected to the home page in a few seconds...</p>
          <div className="mt-4">
            <Link href="/" className="text-terminal-red hover:text-terminal-orange transition-colors">
              ← Return to Home Page
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
