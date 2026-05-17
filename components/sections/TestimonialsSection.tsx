"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Ananya R.",
    text: "The Nutella Cookie Tin is literally dangerous. I finished half of it at 2 AM. Best dessert I've had in Hyderabad.",
  },
  {
    name: "Siddharth K.",
    text: "Those brookies are unreal. The perfect balance of fudgy brownie and chunky cookie. Highly recommended.",
  },
  {
    name: "Priya M.",
    text: "Ordered a box for my husband's birthday. The packaging is so premium, and the brownies melt in your mouth.",
  },
  {
    name: "Rohit V.",
    text: "The Cheesecake Brownies changed my life. I don't know what you guys put in them, but I'm obsessed.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#F8F7F5] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <motion.p
            className="text-label text-[#9A9A9A] mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Love Notes
          </motion.p>
          <motion.h2
            className="font-display font-light text-[42px] md:text-[52px] text-[#0D0D0D] leading-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            What People Say
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <motion.div
              key={i}
              className="bg-white border border-[#E8E8E8] p-8 flex flex-col relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Decorative quote mark */}
              <span className="font-display text-[80px] text-[#1B3A8C]/20 leading-none absolute top-2 left-6 select-none">
                &quot;
              </span>

              <p className="font-body font-light italic text-[#2A2A2A] leading-[1.8] mb-8 pt-8 relative z-10">
                {t.text}
              </p>

              <div className="mt-auto">
                <div className="flex gap-0.5 mb-2 text-[#1B3A8C] text-xs">
                  {"★★★★★".split("").map((s, j) => (
                    <span key={j}>{s}</span>
                  ))}
                </div>
                <p className="font-body font-medium text-xs tracking-[0.15em] uppercase text-[#1B3A8C]">
                  — {t.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
