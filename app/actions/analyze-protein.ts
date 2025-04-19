"use server"

export interface ProteinAnalysisResult {
  location: string
  confidence: string
  compartments: string[]
  interactions: string[]
  structuralFeatures: string[]
  predictions: {
    membrane: boolean
    secretory: boolean
    nuclear: boolean
  }
}

export async function analyzeProtein(sequence: string): Promise<ProteinAnalysisResult> {
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
            content:
              "You are a protein analysis AI expert. Analyze protein sequences and provide detailed predictions about their cellular location, structure, and function. IMPORTANT: Return ONLY valid JSON with no additional text, explanations, or markdown formatting. Your entire response must be a single, valid JSON object.",
          },
          {
            role: "user",
            content: `Analyze this protein sequence and provide predictions: ${sequence}
            
            Return ONLY a JSON object with this structure:
            {
              "location": "primary cellular location",
              "confidence": "high/medium/low",
              "compartments": ["list", "of", "possible", "compartments"],
              "interactions": ["likely", "protein", "interactions"],
              "structuralFeatures": ["key", "structural", "features"],
              "predictions": {
                "membrane": boolean,
                "secretory": boolean,
                "nuclear": boolean
              }
            }`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
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
    throw new Error("Failed to analyze protein sequence")
  }
}
