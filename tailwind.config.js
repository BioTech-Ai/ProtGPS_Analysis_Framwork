/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Binance colors
        binance: {
          gold: "#F0B90B",
          darkGold: "#D9A50A",
          lightGold: "#F8D33A",
          black: "#1E2026",
          darkGray: "#474D57",
          gray: "#707A8A",
          lightGray: "#B7BDC6",
        },
        // Terminal colors
        terminal: {
          gold: "#F0B90B",
          dim: "#B7BDC6",
          dark: "#1E2026",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold": "linear-gradient(45deg, #F0B90B, #F8D33A, #D9A50A)",
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            "box-shadow": "0 0 20px rgba(240, 185, 11, 0.5), 0 0 40px rgba(240, 185, 11, 0.3)",
            "text-shadow": "0 0 10px rgba(240, 185, 11, 0.5), 0 0 20px rgba(240, 185, 11, 0.3)",
          },
          "50%": {
            "box-shadow": "0 0 40px rgba(248, 211, 58, 0.5), 0 0 20px rgba(217, 165, 10, 0.3)",
            "text-shadow": "0 0 20px rgba(248, 211, 58, 0.5), 0 0 10px rgba(217, 165, 10, 0.3)",
          },
        },
      },
      animation: {
        glow: "glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
