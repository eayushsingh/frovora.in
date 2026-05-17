"use client";

import { motion } from "framer-motion";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface BlueButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BlueButton({
  children,
  variant = "solid",
  size = "md",
  className = "",
  ...props
}: BlueButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-sm",
  };

  const variants = {
    solid:
      "bg-[#1B3A8C] text-white hover:bg-[#0F2563] border border-[#1B3A8C]",
    outline:
      "bg-transparent text-[#1B3A8C] border border-[#1B3A8C] hover:bg-[#1B3A8C] hover:text-white",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buttonProps = props as any;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`
        inline-flex items-center justify-center gap-2
        font-body font-medium tracking-widest uppercase
        transition-colors duration-200
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
}
