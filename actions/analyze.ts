"use server"

interface AnalysisResult {
  location: string
  confidence: string
  compartments: string[]
  interactions: string
  signals: string
}

interface MistralResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export async function analyzeProtein(sequence: string): Promise<AnalysisResult> {
  if (!process.env.MISTRAL_API_KEY) {
    throw new Error("Mistral API key is not configured")
  }

  if (!sequence) {
    return {
      location: "No sequence provided",
      confidence: "low",
      compartments: [],
      interactions: "No sequence to analyze",
      signals: "No sequence to analyze",
    }
  }

  try {
    // Create the prompt for the Mistral API
    const prompt = `You are a protein analysis AI. Analyze this protein sequence for cellular localization: ${sequence}
    
    Consider:
    1. Likely cellular compartments based on sequence characteristics
    2. Localization signals and motifs
    3. Potential protein-protein interactions
    4. Confidence level in predictions
    
    Respond ONLY with a JSON object containing these fields:
    {
      "location": "primary predicted location",
      "confidence": "high/medium/low",
      "compartments": ["compartment1", "compartment2"],
      "interactions": "description of key interaction partners",
      "signals": "identified localization signals"
    }`

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-medium",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Mistral API error:", errorText)
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data: MistralResponse = await response.json()

    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format from API")
    }

    let parsedResult: AnalysisResult

    try {
      parsedResult = JSON.parse(data.choices[0].message.content)

      // Validate the parsed result
      if (!parsedResult.location || !Array.isArray(parsedResult.compartments)) {
        throw new Error("Invalid result structure")
      }
    } catch (parseError) {
      console.error("Failed to parse API response:", parseError)
      // Attempt to extract meaningful information even if JSON parsing fails
      const content = data.choices[0].message.content
      return {
        location: "Parse error - see interactions",
        confidence: "low",
        compartments: [],
        interactions: `Failed to parse response: ${content.slice(0, 100)}...`,
        signals: "Unable to process signals",
      }
    }

    // Ensure all fields are present with defaults if missing
    return {
      location: parsedResult.location || "Unknown",
      confidence: parsedResult.confidence || "low",
      compartments: Array.isArray(parsedResult.compartments) ? parsedResult.compartments : [],
      interactions: parsedResult.interactions || "No interactions predicted",
      signals: parsedResult.signals || "No signals identified",
    }
  } catch (error) {
    console.error("Analysis error:", error)

    // Return a user-friendly error result
    return {
      location: "Error",
      confidence: "low",
      compartments: [],
      interactions: error instanceof Error ? error.message : "Unknown error occurred",
      signals: "Analysis failed",
    }
  }
}

