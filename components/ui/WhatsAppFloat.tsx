"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { openWhatsApp } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white border border-[#E8E8E8] shadow-sm px-3 py-1.5 rounded text-xs font-body text-[#2A2A2A] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
        Order Now on WhatsApp
      </div>

      <motion.button
        onClick={openWhatsApp}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Order on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#1fae54] transition-colors duration-200"
      >
        <FaWhatsapp size={26} />
      </motion.button>
    </div>
  );
}
