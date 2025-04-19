import type { LucideProps } from "lucide-react"

export function BrandTelegram(props: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 3 9 10l-2-2 15-5z" fill="currentColor" />
      <path d="M9 10v10l3-4 3 4 4-10-10 6z" fill="currentColor" />
      <path d="m3 16 6-6" />
    </svg>
  )
}
