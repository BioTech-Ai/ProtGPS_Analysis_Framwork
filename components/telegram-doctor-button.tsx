"use client"

import { BrandTelegram } from "@/components/icons/brand-telegram"
import { motion } from "framer-motion"
import Link from "next/link"

export default function TelegramDoctorButton() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Link
        href="https://t.me/BioTech_DRSynapse_Bot"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-gradient-to-br from-[#F0B90B] to-[#d9a50a] hover:from-[#d9a50a] hover:to-[#F0B90B] text-black rounded-full p-4 shadow-lg"
        aria-label="Chat with Dr. Synapse on Telegram"
      >
        <div className="absolute -top-10 right-0 bg-black/80 text-[#F0B90B] text-xs px-3 py-1 rounded whitespace-nowrap border border-[#F0B90B]/30">
          Chat with Dr. Synapse
        </div>
        <BrandTelegram className="w-8 h-8" />
      </Link>
    </motion.div>
  )
}
