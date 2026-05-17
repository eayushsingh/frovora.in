"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { openWhatsApp } from "@/lib/whatsapp";

const HEADLINE = ["Handcrafted", "for the midnight", "sweet tooth."];

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] bg-white flex flex-col items-center justify-center pt-28 md:pt-32 pb-16 md:pb-20 overflow-visible">
      {/* Label */}
      <motion.p
        className="text-label text-[#9A9A9A] mb-6 md:mb-8 text-center px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Frovora Bakehouse · Est. Hyderabad · Artisanal
      </motion.p>

      {/* Main headline */}
      <h1 className="font-display font-light italic text-center text-[#0D0D0D] leading-[1.05] tracking-tight mb-6 md:mb-8 px-4">
        {HEADLINE.map((line, lineIdx) => (
          <span key={lineIdx} className="block overflow-hidden pb-1">
            <motion.span
              className="block text-[clamp(40px,10vw,88px)]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2 + lineIdx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <motion.p
        className="font-body font-light text-[#555555] text-center text-[15px] md:text-[18px] max-w-xl px-6 mb-10 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.52 }}
      >
        Brownies, cookies &amp; bars — baked to obsession, delivered to your door.
      </motion.p>

      {/* 3 CTA links in a row */}
      <motion.div
        className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto max-w-sm sm:max-w-none mx-auto border border-[#E8E8E8] mb-12 md:mb-20 mx-4 sm:mx-0 rounded-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.62 }}
      >
        <a
          href="#menu"
          className="px-8 py-4 sm:py-4 flex-1 text-center font-body font-medium text-[12px] md:text-[13px] tracking-[0.15em] uppercase text-[#0D0D0D] hover:text-[#1B3A8C] hover:bg-[#EEF2FF] transition-all duration-200 border-b sm:border-b-0 sm:border-r border-[#E8E8E8]"
        >
          Explore Menu
        </a>
        <button
          onClick={openWhatsApp}
          className="px-8 py-4 sm:py-4 flex-1 flex items-center justify-center gap-2 font-body font-medium text-[12px] md:text-[13px] tracking-[0.15em] uppercase text-[#0D0D0D] hover:text-[#25D366] hover:bg-[#F0FDF4] transition-all duration-200 border-b sm:border-b-0 sm:border-r border-[#E8E8E8]"
        >
          <FaWhatsapp size={15} />
          Order Now
        </button>
        <a
          href="https://instagram.com/frovora.in"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 sm:py-4 flex-1 flex items-center justify-center gap-2 font-body font-medium text-[12px] md:text-[13px] tracking-[0.15em] uppercase text-[#0D0D0D] hover:text-[#E1306C] hover:bg-[#FFF0F5] transition-all duration-200"
        >
          <FaInstagram size={15} />
          Instagram
        </a>
      </motion.div>

      {/* Flanking product images — floating premium animation */}
      <div className="w-full max-w-5xl mx-auto px-4 flex items-center justify-center gap-2 sm:gap-6 relative mt-auto">
        {/* Left image */}
        <motion.div
          className="relative w-[48%] sm:w-[42%] md:w-[32%] max-w-[260px] aspect-[3/4] z-0 mt-8 md:mt-0"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="w-full h-full relative overflow-hidden rounded-md shadow-2xl ring-1 ring-black/5"
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Real brownie product photo */}
            <Image
              src="/images/image.png"
              alt="Frovora Brownies"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 48vw, 32vw"
              priority
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A8C]/20 to-transparent mix-blend-overlay" />
          </motion.div>
        </motion.div>

        {/* Right image — cookie photo */}
        <motion.div
          className="relative w-[52%] sm:w-[45%] md:w-[35%] max-w-[280px] aspect-[3/4] z-10 -ml-4 sm:-ml-6 -mt-8 md:-mt-16"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="w-full h-full relative overflow-hidden rounded-md shadow-2xl ring-1 ring-black/5"
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Real cookie product photo */}
            <Image
              src="/images/cookie.png"
              alt="Frovora Cookie Tin"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 52vw, 35vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A8C]/20 to-transparent mix-blend-overlay" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
