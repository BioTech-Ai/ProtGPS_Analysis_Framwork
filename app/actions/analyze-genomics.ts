"use server"

export interface GenomicFeature {
  type: string
  start: number
  end: number
  description: string
  score?: number
}

export interface VariantInfo {
  position: number
  reference: string
  alternate: string
  type: string
  impact: "HIGH" | "MODERATE" | "LOW" | "MODIFIER"
  description: string
}

export interface GenomicsAnalysisResult {
  sequenceType: "DNA" | "RNA"
  length: number
  gcContent: number
  features: GenomicFeature[]
  variants: VariantInfo[]
  mappingQuality: number
  coverage: number
  expressionData?: {
    [gene: string]: {
      expression: number
      foldChange: number
      pValue: number
    }
  }
  pathwayEnrichment?: {
    pathway: string
    enrichmentScore: number
    pValue: number
    genes: string[]
  }[]
  qualityMetrics: {
    meanQuality: number
    depthOfCoverage: number
    mappingRate: number
    duplicationRate: number
  }
}

export async function analyzeGenomicSequence(
  sequence: string,
  type: "DNA" | "RNA",
  options: {
    includeVariants?: boolean
    includeMapping?: boolean
    includeExpression?: boolean
    includePathways?: boolean
  } = {},
): Promise<GenomicsAnalysisResult> {
  const MISTRAL_API_KEY = "ZCid8XjA0p54IRHAn5uT2wB3XtgHKUUP"

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages: [
          {
            role: "system",
            content: `You are a genomics analysis AI expert. Analyze ${type} sequences and provide detailed analysis including variants, mapping quality, and expression data. IMPORTANT: Return ONLY valid JSON with no additional text, explanations, or markdown formatting. Your entire response must be a single, valid JSON object.`,
          },
          {
            role: "user",
            content: `Analyze this ${type} sequence with the following requirements:
            ${options.includeVariants ? "- Include variant analysis" : ""}
            ${options.includeMapping ? "- Include genomic mapping metrics" : ""}
            ${options.includeExpression ? "- Include expression analysis" : ""}
            ${options.includePathways ? "- Include pathway enrichment" : ""}
            
            Sequence: ${sequence}
            
            Return ONLY a JSON object matching the GenomicsAnalysisResult interface.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Extract JSON from the response content
    try {
      // Try to find JSON object in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      const jsonString = jsonMatch ? jsonMatch[0] : content
      const result = JSON.parse(jsonString)
      return result
    } catch (parseError) {
      console.error("Failed to parse API response:", parseError)
      console.error("Raw response:", content)
      throw new Error("Failed to parse analysis results. The API returned an invalid response.")
    }
  } catch (error) {
    console.error("Analysis error:", error)
    throw new Error("Failed to analyze sequence")
  }
}
