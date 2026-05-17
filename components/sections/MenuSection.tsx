"use client";

import { motion } from "framer-motion";
import { CATEGORY_GROUPS } from "@/lib/products";
import { MenuCard } from "@/components/ui/ProductCard";

export function MenuSection() {
  return (
    <section id="menu" className="py-24 bg-white border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16">
          <motion.p
            className="text-label text-[#9A9A9A] mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Curated Selection
          </motion.p>
          <motion.h2
            className="font-display font-light text-[52px] md:text-[64px] text-[#0D0D0D] leading-none tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            Our Menu
          </motion.h2>
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORY_GROUPS.map((group, i) => (
            <MenuCard key={group.id} group={group} index={i} />
          ))}
        </div>

        {/* Menu intro */}
        <motion.p
          className="mt-12 font-body font-light text-[#9A9A9A] text-center text-base max-w-2xl mx-auto italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          &quot;Every piece is made with one obsession — it should taste like the best thing you&apos;ve ever had.&quot;
        </motion.p>
      </div>
    </section>
  );
}
