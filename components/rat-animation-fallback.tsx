"use client"

export default function RatAnimationFallback() {
  return (
    <div className="w-full p-4 flex justify-center">
      <div className="flex flex-col items-center">
        <div
          className="w-16 h-8 bg-[#F0B90B] rounded-full mb-2 relative"
          style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" }}
        >
          <div className="absolute top-1 left-3 w-2 h-2 bg-black rounded-full"></div>
          <div className="absolute top-3 left-1 w-2 h-1 bg-black rounded-full"></div>
          <div className="absolute -right-8 top-3 w-8 h-1 bg-[#F0B90B] rounded-full"></div>
          <div className="absolute bottom-0 left-3 w-1 h-2 bg-[#d9a50a] rounded-full"></div>
          <div className="absolute bottom-0 right-3 w-1 h-2 bg-[#d9a50a] rounded-full"></div>
        </div>
        <div className="text-sm font-bold text-[#F0B90B]">Lab Rat</div>
      </div>
    </div>
  )
}
