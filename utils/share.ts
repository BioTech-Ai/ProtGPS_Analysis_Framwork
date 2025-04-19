interface ShareOptions {
  type: "public" | "private"
  expiresIn?: number // hours
}

export const generateShareLink = (projectId: string, options: ShareOptions) => {
  try {
    const baseUrl = window.location.origin
    const token = btoa(
      JSON.stringify({
        id: projectId,
        type: options.type,
        expires: options.expiresIn ? Date.now() + options.expiresIn * 60 * 60 * 1000 : null,
      }),
    )

    return `${baseUrl}/share/${token}`
  } catch (error) {
    console.error("Failed to generate share link:", error)
    return null
  }
}

export const validateShareToken = (token: string) => {
  try {
    const data = JSON.parse(atob(token))

    if (!data.id) {
      throw new Error("Invalid share token")
    }

    if (data.expires && Date.now() > data.expires) {
      throw new Error("Share link has expired")
    }

    return {
      isValid: true,
      projectId: data.id,
      type: data.type,
    }
  } catch (error) {
    console.error("Failed to validate share token:", error)
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Invalid share token",
    }
  }
}
