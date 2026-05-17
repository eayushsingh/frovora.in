"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { openWhatsApp } from "@/lib/whatsapp";

const HEADLINE = ["The gift they", "didn't know", "they needed."];

export function GiftingSection() {
  return (
    <section className="py-24 bg-white border-t border-[#E8E8E8]">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <motion.p
          className="text-label text-[#9A9A9A] mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          For Someone Special
        </motion.p>

        <h2 className="font-display font-light italic text-[#0D0D0D] leading-tight mb-8">
          {HEADLINE.map((line, i) => (
            <motion.span
              key={i}
              className="block text-[clamp(36px,5vw,64px)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.span>
          ))}
        </h2>

        <motion.p
          className="font-body font-light text-[#9A9A9A] text-base leading-relaxed mb-10 max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          Custom dessert boxes & hampers, crafted for gifting.
          DM us on Instagram or order on WhatsApp.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
        >
          <button
            onClick={openWhatsApp}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1B3A8C] hover:bg-[#0F2563] text-white font-body font-medium text-sm tracking-widest uppercase px-8 py-4 transition-colors duration-200"
          >
            <FaWhatsapp size={16} />
            Order a Hamper →
          </button>

          <a
            href="https://instagram.com/frovora.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#1B3A8C] text-[#1B3A8C] hover:bg-[#1B3A8C] hover:text-white font-body font-medium text-sm tracking-widest uppercase px-8 py-4 transition-colors duration-200"
          >
            <FaInstagram size={16} />
            DM on Instagram →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
