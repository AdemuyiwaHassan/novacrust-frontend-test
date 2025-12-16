"use client";

import { cn } from "@/lib/utils";

type CheckoutMode = "crypto-to-cash" | "cash-to-crypto" | "crypto-to-loan";

interface CheckoutTabsProps {
  mode: CheckoutMode;
  onModeChange: (mode: CheckoutMode) => void;
}

const tabs: { value: CheckoutMode; label: string }[] = [
  { value: "crypto-to-cash", label: "Crypto to cash" },
  { value: "cash-to-crypto", label: "Cash to crypto" },
  { value: "crypto-to-loan", label: "Crypto to fiat loan" },
];

export function CheckoutTabs({ mode, onModeChange }: CheckoutTabsProps) {
  return (
    <div className="flex gap-2  bg-muted rounded-[1.5rem] self-center font-medium text-sm">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onModeChange(tab.value)}
          className={cn(
            "flex-1 px-3 sm:px-6 py-2.5 sm:py-3 rounded-4xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap",
            mode === tab.value
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
