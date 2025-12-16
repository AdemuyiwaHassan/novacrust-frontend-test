"use client";
import React, { JSX, SVGProps, useState } from "react";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { EthIcon, CeloIcon, TonIcon, BNBIcon, NGN } from "@/icons";

interface CurrencySelectorProps {
  value: string;
  onChange: (currency: string) => void;
  currencies: string[];
}

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;
const currencyIcons: Record<string, IconComponent> = {
  ETH: EthIcon,
  "USDT-CELO": CeloIcon,
  "USDT-TON": TonIcon,
  "USDT-BNB": BNBIcon,
  NGN: NGN,
  // USDT: "₮",
  // USDC: "$",
  // NGN: "₦",
  // USD: "$",
  // EUR: "€",
  // GBP: "£",
};

export function CurrencySelector({
  value,
  onChange,
  currencies,
}: CurrencySelectorProps) {
  const [search, setSearch] = useState("");

  const filteredCurrencies = currencies.filter((currency) =>
    currency.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-auto px-4 py-2.5  border-border hover:bg-accent bg-muted rounded-full"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-primary">
            <span className="text-lg w-5 h-5">
              {currencyIcons[value]
                ? React.createElement(currencyIcons[value], {
                    width: "20px",
                    height: "20px",
                  })
                : "◆"}
            </span>
            {value}
            <ChevronDown className="h-5 w-5 ml-1 text-primary" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9 border-input rounded-full"
            />
          </div>
        </div>
        <div className="max-h-60 overflow-auto">
          {filteredCurrencies.map((currency) => (
            <DropdownMenuItem
              key={currency}
              onClick={() => onChange(currency)}
              className="cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">
                  {currencyIcons[currency]
                    ? React.createElement(currencyIcons[currency])
                    : "◆"}
                </span>
                {currency}
              </span>
            </DropdownMenuItem>
          ))}
          {filteredCurrencies.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No currencies found
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
