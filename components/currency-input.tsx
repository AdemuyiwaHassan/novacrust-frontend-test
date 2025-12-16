"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencySelector } from "@/components/currency-selector";

interface CurrencyInputProps {
  label: string;
  amount: string;
  currency: string;
  onAmountChange: (amount: string) => void;
  onCurrencyChange: (currency: string) => void;
  currencies: string[];
}

export function CurrencyInput({
  label,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  currencies,
}: CurrencyInputProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col items-start justify-between gap-2 sm:gap-4 p-4 sm:p-6 bg-card border border-border rounded-[1.875rem]">
        <Label className="text-sm sm:text-base text-muted-foreground font-medium">
          {label}
        </Label>
        <div className="flex w-full items-center justify-between gap-2 sm:gap-4">
          <Input
            type="text"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="text-sm sm:text-xl md:text-2xl font-semibold border-0 bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="0.00"
          />
          <CurrencySelector
            value={currency}
            onChange={onCurrencyChange}
            currencies={currencies}
          />
        </div>
      </div>
    </div>
  );
}
