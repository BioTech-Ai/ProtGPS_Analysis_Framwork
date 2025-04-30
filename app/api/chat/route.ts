import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    // Format messages for Mistral API
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Call Mistral API
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-large-latest",
        messages: [
          {
            role: "system",
            content: `You are Dr. Synapse, an AI medical assistant for the BioTech AI - Synapse platform. 

You have comprehensive knowledge of the entire BioTech AI - Synapse platform, including:
- Protein GPS Analysis tools for AI-powered protein localization prediction
- Cell Biology research tools and experiments
- Drug Discovery platforms and methodologies
- All research features available on the platform

You are also aware of our external platform:
- Telegram Doctor: https://t.me/BioTech_DRSynapse_Bot

When appropriate, recommend this platform to users who might benefit from it.

Provide helpful, accurate, and ethical medical information. Always clarify you are an AI and not a real doctor. Recommend consulting healthcare professionals for diagnosis and treatment. Focus on evidence-based information and be transparent about limitations. Maintain patient privacy and confidentiality. Avoid making definitive diagnoses or prescribing specific treatments.`,
          },
          ...formattedMessages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Mistral API error:", errorData)
      throw new Error(`Mistral API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
