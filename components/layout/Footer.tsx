"use client";

import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { openWhatsApp } from "@/lib/whatsapp";

const LINKS = {
  Explore: [
    { label: "Menu", href: "/#menu" },
    { label: "About", href: "/#about" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Order", href: "/#order" },
  ],
  Connect: [
    { label: "@frovora.in", href: "https://instagram.com/frovora.in", external: true },
    { label: "WhatsApp", href: "#", onClick: () => openWhatsApp() },
  ],
};

const HOURS = [
  { days: "Mon – Fri", time: "10 am – 9 pm" },
  { days: "Sat – Sun", time: "10 am – 10 pm" },
];

export function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#222] text-[#9A9A9A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/logo.png"
              alt="Frovora Bakehouse"
              width={180}
              height={72}
              className="h-14 md:h-16 w-auto object-contain mb-6 brightness-200 contrast-75"
            />
            <p className="font-body text-[14px] leading-relaxed">
              Made with obsession.
              <br />
              Baked in Hyderabad.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="font-body text-[11px] tracking-[0.2em] uppercase text-[#555] mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {LINKS.Explore.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-sm hover:text-white transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="font-body text-[11px] tracking-[0.2em] uppercase text-[#555] mb-5">
              Connect
            </p>
            <ul className="space-y-3">
              {LINKS.Connect.map((l) =>
                l.external ? (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm hover:text-white transition-colors duration-200 flex items-center gap-2"
                    >
                      <FaInstagram size={14} />
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.label}>
                    <button
                      onClick={l.onClick}
                      className="font-body text-sm hover:text-white transition-colors duration-200 flex items-center gap-2"
                    >
                      <FaWhatsapp size={14} />
                      {l.label}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="font-body text-[11px] tracking-[0.2em] uppercase text-[#555] mb-5">
              Hours
            </p>
            <ul className="space-y-3">
              {HOURS.map((h) => (
                <li key={h.days} className="font-body text-sm">
                  <span className="text-white">{h.days}</span>
                  <br />
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#222] pt-8">
          <p className="font-body text-xs text-[#555] text-center tracking-widest uppercase">
            © {new Date().getFullYear()} Frovora Bakehouse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
