"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { CategoryGroup, Product } from "@/lib/products";
import { useCartStore } from "@/lib/cartStore";

interface MenuCardProps {
  group: CategoryGroup;
  index: number;
}

function PackSelector({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (packSize: string, price: number) => void;
}) {
  const [selected, setSelected] = useState<"6" | "16" | "single">(
    product.price_pack6 ? "6" : "single"
  );
  const [mounted, setMounted] = useState(false);
  
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const label = selected === "6" ? "Pack of 6" : selected === "16" ? "Pack of 16" : "Tin";
  const price = selected === "6" ? product.price_pack6! : selected === "16" ? product.price_pack16! : product.price_single!;
  const currentId = `${product.id}-${label}`;
  const cartItem = items.find((i) => i.id === currentId);
  const quantity = mounted && cartItem ? cartItem.quantity : 0;

  return (
    <div className="flex items-center justify-between py-3 border-b border-[#E8E8E8] last:border-0">
      <div className="flex-1 min-w-0 pr-4">
        <p className="font-body text-sm text-[#2A2A2A] leading-snug">{product.name}</p>
        {product.is_recommended && (
          <span className="inline-block text-[10px] tracking-widest uppercase font-body font-medium text-[#1B3A8C] bg-[#EEF2FF] px-2 py-0.5 rounded mt-1">
            Frovora&apos;s Pick
          </span>
        )}
        {!product.is_available && (
          <span className="inline-block text-[10px] tracking-widest uppercase font-body font-medium text-white bg-[#9A9A9A] px-2 py-0.5 rounded mt-1">
            Sold Out
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Pack size pills */}
        {product.price_pack6 && product.price_pack16 ? (
          <div className="flex border border-[#E8E8E8] text-xs">
            <button
              onClick={() => setSelected("6")}
              className={`px-2.5 py-1 font-body transition-colors ${
                selected === "6"
                  ? "bg-[#1B3A8C] text-white"
                  : "text-[#9A9A9A] hover:text-[#0D0D0D]"
              }`}
            >
              6
            </button>
            <button
              onClick={() => setSelected("16")}
              className={`px-2.5 py-1 font-body transition-colors border-l border-[#E8E8E8] ${
                selected === "16"
                  ? "bg-[#1B3A8C] text-white"
                  : "text-[#9A9A9A] hover:text-[#0D0D0D]"
              }`}
            >
              16
            </button>
          </div>
        ) : null}

        {/* Price */}
        <span className="font-body font-medium text-[#0D0D0D] text-sm min-w-[52px] text-right">
          ₹
          {selected === "6"
            ? product.price_pack6
            : selected === "16"
            ? product.price_pack16
            : product.price_single}
        </span>

        {/* Add / Stepper button */}
        {quantity > 0 ? (
          <div className="flex items-center border border-[#1B3A8C] rounded-sm h-7 text-[#1B3A8C]">
            <button
              onClick={() => updateQuantity(currentId, -1)}
              className="w-7 h-full flex items-center justify-center hover:bg-[#1B3A8C] hover:text-white transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={12} strokeWidth={2.5} />
            </button>
            <span className="w-6 text-center font-body font-medium text-[13px]">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(currentId, 1)}
              className="w-7 h-full flex items-center justify-center hover:bg-[#1B3A8C] hover:text-white transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={12} strokeWidth={2.5} />
            </button>
          </div>
        ) : product.is_available ? (
          <button
            onClick={() => onAdd(label, price)}
            aria-label={`Add ${product.name} to cart`}
            className="w-7 h-7 flex items-center justify-center border border-[#1B3A8C] text-[#1B3A8C] hover:bg-[#1B3A8C] hover:text-white transition-colors rounded-sm"
          >
            <Plus size={14} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function MenuCard({ group, index }: MenuCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { addItem } = useCartStore();

  const handleAdd = (product: Product, packSize: string, price: number) => {
    addItem({
      id: `${product.id}-${packSize}`,
      productId: product.id,
      name: product.name,
      packSize,
      price,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col border border-[#E8E8E8] overflow-hidden bg-white hover:border-[#1B3A8C]/30 transition-colors duration-300"
    >
      {/* Image — 55% of card */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {group.id === "cookies" ? (
          // Real cookie product photo
          <Image
            src="/images/cookie.png"
            alt="Frovora Cookie Tin"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            loading="eager"
          />
        ) : group.id === "brownies" ? (
          // Real brownie product photo
          <Image
            src="/images/brownie.png"
            alt="Frovora Brownies"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            loading="eager"
          />
        ) : (
          // Real bars product photo
          <Image
            src="/images/bars.png"
            alt="Frovora Dessert Bars"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Card body */}
      <div className="p-6">
        {/* Italic label — like "Single Origin · Precision Brewed" on Vero */}
        <p className="font-body italic text-[13px] text-[#9A9A9A] mb-2 tracking-wide">
          {group.italic_label}
        </p>

        {/* Category name */}
        <h3 className="font-display font-semibold text-[28px] md:text-[32px] text-[#0D0D0D] mb-4 tracking-tight">
          {group.name}
        </h3>

        {/* Accordion toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 border border-[#E8E8E8] rounded-sm group hover:border-[#1B3A8C] hover:bg-[#F9FAFB] transition-all"
          aria-expanded={isOpen}
          aria-label={`Toggle ${group.name} menu`}
        >
          <span className="font-body text-[13px] font-medium tracking-widest uppercase text-[#0D0D0D] group-hover:text-[#1B3A8C] transition-colors">
            {isOpen ? "Hide Menu" : "View Menu"}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-[#9A9A9A] group-hover:text-[#1B3A8C] transition-colors"
          >
            <ChevronDown size={16} strokeWidth={2} />
          </motion.div>
        </button>

        {/* Accordion content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-0">
                {group.items.map((product) => (
                  <PackSelector
                    key={product.id}
                    product={product}
                    onAdd={(packSize, price) => handleAdd(product, packSize, price)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
