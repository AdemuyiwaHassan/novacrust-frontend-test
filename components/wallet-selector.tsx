"use client";
import React, { JSX, useState, SVGProps } from "react";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { WalletIcon } from "@/icons";

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

interface WalletSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}

export function WalletSelector({
  label,
  value,
  onChange,
  placeholder,
  options,
}: WalletSelectorProps) {
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3 w-full">
      <Label className="text-base text-foreground font-medium">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12 p-5 text-base rounded-[1.5rem] border-border bg-card w-full text-primary font-normal">
          <SelectValue
            placeholder={placeholder}
            className="text-primary text-base font-normal"
          />
        </SelectTrigger>
        <SelectContent>
          {/* <div className="p-2 border-b sticky top-0 bg-popover">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-9 border-input"
              />
            </div>
          </div> */}
          <div className="max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <WalletIcon wallet={option.label} />
                {option.label}
              </SelectItem>
            ))}
            {filteredOptions.length === 0 && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No options found
              </div>
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
