"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { openWhatsApp } from "@/lib/whatsapp";

export function OrderCTASection() {
  return (
    <section id="order" className="py-24 bg-white border-t border-[#E8E8E8]">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <motion.p
          className="text-label text-[#9A9A9A] mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Ready to Order?
        </motion.p>

        <motion.h2
          className="font-display font-light text-[#0D0D0D] leading-tight mb-10 text-[clamp(36px,5vw,64px)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Order on WhatsApp
          <br />
          <span className="italic">in under 60 seconds.</span>
        </motion.h2>

        <motion.button
          onClick={openWhatsApp}
          className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1fae54] text-white font-body font-medium text-base tracking-widest uppercase px-12 py-5 transition-colors duration-200 mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaWhatsapp size={22} />
          Order via WhatsApp
        </motion.button>

        <motion.p
          className="mt-6 font-body text-xs text-[#9A9A9A] tracking-widest uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Hyderabad delivery · Fresh every day
        </motion.p>
      </div>
    </section>
  );
}
