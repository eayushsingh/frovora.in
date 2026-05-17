"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            className="relative aspect-[4/5] bg-gradient-to-br from-[#1B3A8C] to-[#0F2563] overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full aspect-[4/5] bg-gradient-to-br from-[#1B3A8C] to-[#0D0D0D]">
              {/* Real brand photo */}
              <Image
                src="/images/about.png"
                alt="Frovora Baking Process"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          {/* Text */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-label text-[#9A9A9A] mb-6">Our Story</p>

            <h2 className="font-display font-light text-[42px] md:text-[52px] text-[#0D0D0D] leading-tight mb-6">
              Crafted With Obsession
            </h2>

            <div className="w-12 h-px bg-[#1B3A8C] mb-8" />

            <p className="font-body font-light text-[#2A2A2A] text-base leading-[1.8] mb-6">
              At Frovora, every brownie is made with one goal — it should taste like
              the best thing you&apos;ve ever had.
            </p>
            <p className="font-body font-light text-[#2A2A2A] text-base leading-[1.8] mb-10">
              We don&apos;t use shortcuts. We use Belgian chocolate, real Nutella, and
              care that you can taste. Baked fresh in Hyderabad, made for people who
              don&apos;t do things halfway.
            </p>

            <a
              href="https://instagram.com/frovora.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase text-[#1B3A8C] hover:text-[#0F2563] transition-colors group"
            >
              Follow the journey @frovora.in
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
