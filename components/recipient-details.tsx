"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Search } from "lucide-react";
import type { CheckoutData } from "@/components/checkout";

type RecipientDetailsProps = {
  checkoutData: CheckoutData;
  onBack: () => void;
};

export function RecipientDetails({
  checkoutData,
  onBack,
}: RecipientDetailsProps) {
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankSearch, setBankSearch] = useState("");

  useEffect(() => {
    if (accountNumber.length === 10) {
      // Simulate account name lookup
      setTimeout(() => {
        setAccountName("ODUTUGA GBEKE");
      }, 500);
    } else {
      setAccountName("");
    }
  }, [accountNumber]);

  const handleNext = () => {
    console.log("[v0] Proceeding with:", {
      ...checkoutData,
      bank,
      accountNumber,
      accountName,
    });
    alert("Payment processing...");
  };

  const banks = [
    { value: "gtb", label: "Guaranty Trust Bank" },
    { value: "access", label: "Access Bank" },
    { value: "zenith", label: "Zenith Bank" },
    { value: "firstbank", label: "First Bank of Nigeria" },
    { value: "uba", label: "United Bank for Africa" },
    { value: "fidelity", label: "Fidelity Bank" },
  ];

  const filteredBanks = banks.filter((bankOption) =>
    bankOption.label.toLowerCase().includes(bankSearch.toLowerCase())
  );

  return (
    <Card className="w-full max-w-2xl min-h-90 sm:min-h-190  p-4 sm:p-6 md:p-8 shadow-xl rounded-[30px]">
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-10 w-10 rounded-full hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg sm:text-xl font-semibold text-center flex-1 pr-8 sm:pr-10">
          Recipient details
        </h1>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <Label htmlFor="bank" className="text-sm sm:text-base font-semibold">
            Bank
          </Label>
          <Select value={bank} onValueChange={setBank}>
            <SelectTrigger
              id="bank"
              className="h-15 sm:h-14 rounded-2xl border-2 text-sm sm:text-base bg-background w-full"
            >
              <SelectValue placeholder="Select an option" className="h-15 " />
            </SelectTrigger>
            <SelectContent>
              <div className="max-h-60 overflow-auto">
                {filteredBanks.map((bankOption) => (
                  <SelectItem key={bankOption.value} value={bankOption.value}>
                    {bankOption.label}
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="account-number"
            className="text-sm sm:text-base font-semibold"
          >
            Account number
          </Label>
          <Input
            id="account-number"
            type="text"
            placeholder="Enter your account number"
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            className="h-12 sm:h-14 rounded-full border-2 text-sm sm:text-base"
          />
        </div>

        {accountName && (
          <div className="space-y-2">
            <Label className="text-sm sm:text-base font-semibold">
              Account name
            </Label>
            <div className="h-12 sm:h-14 rounded-2xl bg-muted flex items-center px-4">
              <span className="text-sm sm:text-base font-medium">
                {accountName}
              </span>
            </div>
          </div>
        )}

        <Button
          onClick={handleNext}
          className="w-full h-12 sm:h-14 text-base sm:text-lg font-medium mt-6 sm:mt-8"
          size="lg"
          disabled={!bank || !accountNumber || !accountName}
        >
          Next
        </Button>
      </div>
    </Card>
  );
}
