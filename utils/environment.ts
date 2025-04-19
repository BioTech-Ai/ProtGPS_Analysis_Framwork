export const isProduction = process.env.NODE_ENV === "production"
export const isDevelopment = process.env.NODE_ENV === "development"

export function checkEnvironment() {
  // Check for required environment variables
  const requiredEnvVars = ["MISTRAL_API_KEY"]
  const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key])

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
  }

  // Check for proper Next.js configuration
  if (typeof window !== "undefined" && !window.__NEXT_DATA__) {
    console.warn("Next.js data not found. This might cause hydration issues.")
  }
}
