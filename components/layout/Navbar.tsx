"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

const NAV_LINKS = [
  { label: "Menu", href: "/#menu" },
  { label: "About", href: "/#about" },
  { label: "Order", href: "/#order" },
  { label: "Instagram", href: "https://instagram.com/frovora.in", external: true },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isCartOpen, setCartOpen, getCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const count = mounted ? getCount() : 0;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-sm border-b border-[#E8E8E8] py-4"
            : "bg-transparent border-b border-[#E8E8E8] py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="Frovora Bakehouse home">
            <Image
              src="/images/logo.png"
              alt="Frovora Bakehouse"
              width={180}
              height={72}
              className="h-14 md:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[13px] tracking-[0.1em] uppercase text-[#2A2A2A] hover:text-[#1B3A8C] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-[13px] tracking-[0.1em] uppercase text-[#2A2A2A] hover:text-[#1B3A8C] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right: Cart + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <button
              onClick={() => setCartOpen(!isCartOpen)}
              className="relative flex items-center gap-1.5 text-[#2A2A2A] hover:text-[#1B3A8C] transition-colors duration-200"
              aria-label="Open cart"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#1B3A8C] text-white text-[10px] font-body font-medium flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-[#2A2A2A] hover:text-[#1B3A8C] transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-[#2A2A2A]"
              aria-label="Close menu"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            <nav className="flex flex-col items-center gap-10">
              {NAV_LINKS.map((link, i) =>
                link.external ? (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i }}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-4xl text-[#0D0D0D] hover:text-[#1B3A8C] transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ) : (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-4xl text-[#0D0D0D] hover:text-[#1B3A8C] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
