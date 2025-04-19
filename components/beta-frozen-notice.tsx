import { LockIcon } from "lucide-react"

export function BetaFrozenNotice() {
  return (
    <div className="mt-4 mb-4 p-3 border border-dashed border-terminal-red/50 rounded-md bg-terminal-red/10">
      <p className="text-terminal-red flex items-center gap-2">
        <LockIcon className="w-4 h-4" />
        <span>NOTICE: All beta features are currently frozen and unavailable.</span>
      </p>
    </div>
  )
}
