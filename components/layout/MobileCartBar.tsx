"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { openWhatsApp } from "@/lib/whatsapp";

/** Fixed bottom bar — visible on mobile only, hidden when cart is open */
export function MobileCartBar() {
  const { getCount, isCartOpen, setCartOpen } = useCartStore();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  const count = mounted ? getCount() : 0;

  return (
    <AnimatePresence>
      {!isCartOpen && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          {/* Cart half */}
          <button
            onClick={() => setCartOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1B3A8C] text-white font-body font-medium text-sm tracking-widest uppercase py-4 hover:bg-[#0F2563] transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            Cart
            {count > 0 && (
              <span className="ml-1 bg-white text-[#1B3A8C] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* WhatsApp half */}
          <button
            onClick={() => {
              if (count > 0) {
                setCartOpen(true);
              } else {
                openWhatsApp();
              }
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-body font-medium text-sm tracking-widest uppercase py-4 hover:bg-[#1fae54] transition-colors"
          >
            <FaWhatsapp size={18} />
            Order Now
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
