"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useCartStore } from "@/lib/cartStore";
import { openWhatsApp, buildWhatsAppMessage } from "@/lib/whatsapp";

export function CartDrawer() {
  const { isCartOpen, setCartOpen, items, updateQuantity, removeItem, getTotal } =
    useCartStore();
  const [mounted, setMounted] = useState(false);
  const [instaState, setInstaState] = useState<"idle" | "copied" | "error">("idle");

  // Delivery details form states
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [validationError, setValidationError] = useState("");

  // Load saved details on mount
  useEffect(() => {
    setMounted(true);
    const savedName = localStorage.getItem("frovora-customer-name") || "";
    const savedAddress = localStorage.getItem("frovora-customer-address") || "";
    setName(savedName);
    setAddress(savedAddress);
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    localStorage.setItem("frovora-customer-name", val);
  };

  const handleAddressChange = (val: string) => {
    setAddress(val);
    localStorage.setItem("frovora-customer-address", val);
  };

  const handleWhatsAppClick = () => {
    if (!name.trim()) {
      setValidationError("Please enter your name.");
      return;
    }
    if (!address.trim()) {
      setValidationError("Please enter your delivery address.");
      return;
    }
    setValidationError("");
    openWhatsApp(name, address, preferredTime);
  };

  const handleInstaClick = async () => {
    if (!name.trim()) {
      setValidationError("Please enter your name.");
      return;
    }
    if (!address.trim()) {
      setValidationError("Please enter your delivery address.");
      return;
    }
    setValidationError("");
    try {
      await navigator.clipboard.writeText(buildWhatsAppMessage(name, address, preferredTime));
      setInstaState("copied");
      setTimeout(() => {
        setInstaState("idle");
        window.open("https://ig.me/m/frovora.in", "_blank");
      }, 2000);
    } catch (err) {
      setInstaState("error");
      setTimeout(() => {
        setInstaState("idle");
        window.open("https://ig.me/m/frovora.in", "_blank");
      }, 3000);
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/30 z-50"
          />

          {/* Drawer — slides from right on desktop, bottom on mobile */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white border-l border-[#E8E8E8] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E8E8]">
              <h2 className="font-display italic text-[28px] text-[#0D0D0D]">
                Your Order
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-[#9A9A9A] hover:text-[#0D0D0D] transition-colors"
                aria-label="Close cart"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="font-body text-[#9A9A9A] text-center">
                    Your cart is empty. Fix that.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex flex-col gap-3 pb-4 border-b border-[#E8E8E8] last:border-0"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-body font-medium text-[#0D0D0D] leading-tight">
                          {item.name}
                        </p>
                        <p className="font-body text-xs text-[#9A9A9A] mt-0.5">
                          {item.packSize}
                        </p>
                      </div>
                      <span className="font-body font-medium text-[#1B3A8C] shrink-0">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#E8E8E8]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-9 h-9 flex items-center justify-center text-[#9A9A9A] hover:text-[#0D0D0D] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-body text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-9 h-9 flex items-center justify-center text-[#9A9A9A] hover:text-[#0D0D0D] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#9A9A9A] hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#E8E8E8] bg-[#F8F7F5] space-y-4 shrink-0 overflow-y-auto max-h-[55vh]">
                {/* Delivery Details Form */}
                <div className="space-y-3 pb-3 border-b border-[#E8E8E8]">
                  <p className="font-display italic text-[18px] text-[#0D0D0D] tracking-tight">
                    Delivery Details
                  </p>

                  <div className="grid grid-cols-1 gap-2.5">
                    <div>
                      <label className="block font-body text-[9px] tracking-[0.15em] uppercase text-[#9A9A9A] mb-1 font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full h-9 border border-[#E8E8E8] bg-white px-3 font-body text-xs focus:outline-none focus:border-[#1B3A8C] transition-colors rounded-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-body text-[9px] tracking-[0.15em] uppercase text-[#9A9A9A] mb-1 font-medium">
                        Delivery Address
                      </label>
                      <textarea
                        rows={2}
                        value={address}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        placeholder="Flat/House no, building, street, landmark"
                        className="w-full border border-[#E8E8E8] bg-white p-2.5 font-body text-xs focus:outline-none focus:border-[#1B3A8C] transition-colors resize-none rounded-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-body text-[9px] tracking-[0.15em] uppercase text-[#9A9A9A] mb-1 font-medium">
                        Preferred Delivery Time
                      </label>
                      <input
                        type="text"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        placeholder="e.g., Today 6 PM or Sunday Afternoon"
                        className="w-full h-9 border border-[#E8E8E8] bg-white px-3 font-body text-xs focus:outline-none focus:border-[#1B3A8C] transition-colors rounded-sm"
                      />
                    </div>
                  </div>

                  {/* Validation Error Message */}
                  {validationError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-body text-[11px] text-red-500 font-medium"
                    >
                      {validationError}
                    </motion.p>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-body text-xs tracking-widest uppercase text-[#9A9A9A]">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl text-[#0D0D0D]">
                    ₹{getTotal().toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fae54] text-white font-body font-medium text-sm tracking-widest uppercase py-4 transition-colors duration-200"
                  >
                    <FaWhatsapp size={18} />
                    Order via WhatsApp
                  </button>
                  <button
                    onClick={handleInstaClick}
                    disabled={instaState !== "idle"}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-90 disabled:opacity-80 text-white font-body font-medium text-sm tracking-widest uppercase py-4 transition-colors duration-200"
                  >
                    <FaInstagram size={18} />
                    {instaState === "copied"
                      ? "Copied! Please Paste in IG"
                      : instaState === "error"
                      ? "Send cart screenshot"
                      : "Copy Order & Open Instagram"}
                  </button>
                </div>
                <p className="text-center font-body text-[11px] text-[#9A9A9A] leading-relaxed pt-1">
                  *Instagram blocks auto-filling. We will copy your order to your clipboard so you can paste it directly into the chat!
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
