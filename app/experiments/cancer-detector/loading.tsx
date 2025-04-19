import { Loader } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CancerDetectorLoading() {
  return (
    <div className="min-h-screen bg-black p-8 flex items-center justify-center">
      <Card className="max-w-2xl mx-auto bg-black/80 border-terminal-red/30">
        <CardHeader>
          <CardTitle className="text-terminal-red flex items-center gap-2">
            <div className="w-6 h-6 animate-pulse bg-terminal-red/30 rounded-md"></div>
            <div className="h-7 w-48 bg-terminal-red/30 animate-pulse rounded-md"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center p-12">
            <Loader className="h-12 w-12 text-terminal-red animate-spin" />
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-terminal-red/20 rounded animate-pulse"></div>
            <div className="h-4 bg-terminal-red/20 rounded animate-pulse w-5/6 mx-auto"></div>
            <div className="h-4 bg-terminal-red/20 rounded animate-pulse w-4/6 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
