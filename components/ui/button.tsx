"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 cursor-pointer",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]",
          {
            "bg-[#00FF88] text-[#09090B] hover:bg-[#00FF88]/90 hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] active:scale-95":
              variant === "primary",
            "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40 backdrop-blur-sm active:scale-95":
              variant === "secondary",
            "text-white/70 hover:text-white hover:bg-white/5 active:scale-95":
              variant === "ghost",
            "border border-[#00FF88]/50 text-[#00FF88] hover:bg-[#00FF88]/10 hover:border-[#00FF88] active:scale-95":
              variant === "outline",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
