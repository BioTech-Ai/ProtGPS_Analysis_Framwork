"use server"

import { isProduction } from "@/utils/environment"

interface AnalysisResult {
  location: string
  confidence: string
  compartments: string[]
  interactions: string
  signals: string
}

function mistralAgent() {
  const API_KEY = process.env.MISTRAL_API_KEY

  if (!API_KEY) {
    throw new Error("MISTRAL_API_KEY environment variable is not set")
  }

  const API_URL = "https://api.mistral.ai/v1/chat/completions"

  async function sendMessage(messages: any[]) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistral-tiny",
          messages: messages.map((msg) => ({
            role: msg.role || "user",
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}${
            errorData.error ? ` - ${errorData.error}` : ""
          }`,
        )
      }

      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error("Error calling Mistral AI:", error)
      throw new Error(error instanceof Error ? error.message : "Failed to communicate with Mistral AI")
    }
  }

  return { sendMessage }
}

export async function analyzeProtein(sequence: string): Promise<string | AnalysisResult> {
  if (!sequence) {
    return "Please enter a protein sequence to analyze."
  }

  // Handle special commands
  const command = sequence.toLowerCase()
  if (command === "help") {
    return `Available commands:
- help: Show this help message
- clear: Clear the terminal
- example: Show an example protein sequence
Enter a protein sequence (using letters A-Y) to analyze its structure and location.`
  }

  if (command === "clear") {
    return "CLEAR_TERMINAL"
  }

  if (command === "example") {
    return "Example protein sequence: MAEGEITTFTALTEKFNLPPGNYKKPKLLYCSNG"
  }

  try {
    // Add deployment-specific error handling
    if (isProduction && !process.env.MISTRAL_API_KEY) {
      throw new Error("API key not configured")
    }

    const agent = mistralAgent()

    // Add timeout for production environments
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Analysis timeout")), 30000)
    })

    const analysisPromise = agent.sendMessage([
      {
        role: "system",
        content: `You are a protein analysis AI. Analyze the protein sequence and return ONLY a JSON object with this exact structure:
        {
          "location": "primary location",
          "confidence": "high/medium/low",
          "compartments": ["compartment1", "compartment2"],
          "interactions": "description",
          "signals": "description"
        }
        
        IMPORTANT: Return ONLY the JSON object with no additional text, explanations, or markdown formatting. Your entire response must be a single, valid JSON object.`,
      },
      {
        role: "user",
        content: `Analyze this protein sequence: ${sequence}`,
      },
    ])

    const result = await Promise.race([analysisPromise, timeoutPromise])

    try {
      // Try to extract JSON from the response
      const jsonMatch = (result as string).match(/\{[\s\S]*\}/)
      const jsonString = jsonMatch ? jsonMatch[0] : (result as string)

      try {
        const parsedResult = JSON.parse(jsonString)

        // Validate and sanitize the response
        const validatedResult: AnalysisResult = {
          location: String(parsedResult?.location || "Unknown"),
          confidence: ["high", "medium", "low"].includes(parsedResult?.confidence?.toLowerCase?.())
            ? parsedResult.confidence
            : "low",
          compartments: Array.isArray(parsedResult?.compartments) ? parsedResult.compartments.map(String) : ["Unknown"],
          interactions: String(parsedResult?.interactions || "No interactions identified"),
          signals: String(parsedResult?.signals || "No signals identified"),
        }

        return validatedResult
      } catch (jsonParseError) {
        console.error("Failed to parse JSON:", jsonParseError)
        console.error("Attempted to parse:", jsonString)
        throw new Error("Failed to parse analysis results - invalid JSON format")
      }
    } catch (parseError) {
      console.error("Failed to extract JSON from API response:", parseError)
      console.error("Raw response:", result)
      throw new Error("Failed to parse analysis results")
    }
  } catch (error) {
    console.error("Analysis error:", error)
    throw error
  }
}
