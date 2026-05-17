"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

const POSTS = [
  { id: 1, url: "https://instagram.com/frovora.in", image: "/images/gallery1.png" },
  { id: 2, url: "https://instagram.com/frovora.in", image: "/images/gallery2.png" },
  { id: 3, url: "https://instagram.com/frovora.in", image: "/images/gallery3.png" },
  { id: 4, url: "https://instagram.com/frovora.in", image: "/images/gallery4.png" },
  { id: 5, url: "https://instagram.com/frovora.in", image: "/images/gallery5.png" },
  { id: 6, url: "https://instagram.com/frovora.in", image: "/images/gallery6.png" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-[#F8F7F5] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              className="text-label text-[#9A9A9A] mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              As Seen on Instagram
            </motion.p>
            <motion.h2
              className="font-display font-light text-[42px] md:text-[52px] text-[#0D0D0D] leading-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              The Feed
            </motion.h2>
          </div>

          <Link
            href="https://instagram.com/frovora.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm tracking-widest uppercase text-[#1B3A8C] hover:text-[#0F2563] transition-colors flex items-center gap-2 shrink-0"
          >
            <FaInstagram size={16} />
            Follow @frovora.in →
          </Link>
        </div>

        {/* 3×2 Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {POSTS.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square group overflow-hidden bg-[#F9FAFB] block"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Image
                src={post.image}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
                priority={post.id === 1 || post.id === 4 || post.id === 5}
                loading="eager"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#1B3A8C]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <FaInstagram className="text-white" size={28} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
