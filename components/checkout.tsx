"use client";
// import from react/next
import { useState, useEffect } from "react";

//import from external liberies/Shadcn-UI
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// import from component
import { CheckoutTabs } from "@/components/checkout-tabs";
import { CurrencyInput } from "@/components/currency-input";
import { WalletSelector } from "@/components/wallet-selector";
import { RecipientDetails } from "@/components/recipient-details";

type CheckoutMode = "crypto-to-cash" | "cash-to-crypto" | "crypto-to-loan";

export type CheckoutData = {
  mode: CheckoutMode;
  payAmount: string;
  payCurrency: string;
  receiveAmount: string;
  receiveCurrency: string;
  payFrom: string;
  payTo: string;
};

const EXCHANGE_RATES: Record<string, number> = {
  // Crypto to USD
  ETH: 3500,
  "USDT-CELO": 7.44,
  "USDT-TON": 0.667456,
  "USDT-BNB": 0.001163,
  // Fiat to USD
  NGN: 0.0013,
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
};

const CheckOut = () => {
  const [mode, setMode] = useState<CheckoutMode>("crypto-to-cash");

  const [step, setStep] = useState<"checkout" | "recipient">("checkout");

  const [payAmount, setPayAmount] = useState("1.00");
  const [payCurrency, setPayCurrency] = useState("ETH");
  const [receiveAmount, setReceiveAmount] = useState("1.00");
  const [receiveCurrency, setReceiveCurrency] = useState("NGN");
  const [payFrom, setPayFrom] = useState("");
  const [payTo, setPayTo] = useState("");
  const [lastEdited, setLastEdited] = useState<"pay" | "receive">("pay");

  useEffect(() => {
    const payValue = Number.parseFloat(payAmount) || 0;
    const receiveValue = Number.parseFloat(receiveAmount) || 0;

    if (lastEdited === "pay" && payValue > 0) {
      // Convert from pay currency to receive currency
      const payInUSD = payValue * (EXCHANGE_RATES[payCurrency] || 1);
      const receiveConverted =
        payInUSD / (EXCHANGE_RATES[receiveCurrency] || 1);
      setReceiveAmount(receiveConverted.toFixed(2));
    } else if (lastEdited === "receive" && receiveValue > 0) {
      // Convert from receive currency to pay currency
      const receiveInUSD =
        receiveValue * (EXCHANGE_RATES[receiveCurrency] || 1);
      const payConverted = receiveInUSD / (EXCHANGE_RATES[payCurrency] || 1);
      setPayAmount(payConverted.toFixed(6));
    }
  }, [payAmount, payCurrency, receiveCurrency, lastEdited]);

  const handlePayAmountChange = (amount: string) => {
    setPayAmount(amount);
    setLastEdited("pay");
  };

  const handleReceiveAmountChange = (amount: string) => {
    setReceiveAmount(amount);
    setLastEdited("receive");
  };

  const handlePayCurrencyChange = (currency: string) => {
    setPayCurrency(currency);
    setLastEdited("pay");
  };

  const handleReceiveCurrencyChange = (currency: string) => {
    setReceiveCurrency(currency);
    setLastEdited("receive");
  };

  const handleConvert = () => {
    setStep("recipient");
  };

  const handleBack = () => {
    setStep("checkout");
  };

  const checkoutData: CheckoutData = {
    mode,
    payAmount,
    payCurrency,
    receiveAmount,
    receiveCurrency,
    payFrom,
    payTo,
  };

  if (step === "recipient") {
    return <RecipientDetails checkoutData={checkoutData} onBack={handleBack} />;
  }

  return (
    <Card className="flex flex-col justify-between w-full max-w-2xl min-h-90 sm:min-h-190 sm:p-6 p-8 shadow-xl rounded-[30px]">
      <CheckoutTabs mode={mode} onModeChange={setMode} />
      {mode === "crypto-to-cash" ? (
        <div className="flex flex-col justify-between  ">
          <div className="space-y-4 sm:space-y-6  md:space-y-6">
            <CurrencyInput
              label="You pay"
              amount={payAmount}
              currency={payCurrency}
              onAmountChange={handlePayAmountChange}
              onCurrencyChange={handlePayCurrencyChange}
              currencies={["ETH", "USDT-CELO", "USDT-TON", "USDT-BNB"]}
            />
            <CurrencyInput
              label="You receive"
              amount={receiveAmount}
              currency={receiveCurrency}
              onAmountChange={handleReceiveAmountChange}
              onCurrencyChange={handleReceiveCurrencyChange}
              currencies={["NGN", "USD", "EUR", "GBP"]}
            />
            <WalletSelector
              label="Pay from"
              value={payFrom}
              onChange={setPayFrom}
              placeholder="Select an option"
              options={[
                { value: "metamask", label: "MetaMask " },
                { value: "rainbow", label: "Rainbow" },
                { value: "walletconnect", label: "WalletConnect" },
                {
                  value: "others",
                  label: "Other Crypto Wallets (Binance, Conibase, Bybit etc)",
                },
              ]}
            />
            <WalletSelector
              label="Pay to"
              value={payTo}
              onChange={setPayTo}
              placeholder="Select an option"
              options={[
                { value: "bank-usd", label: "US Bank Account" },
                { value: "bank-ngn", label: "Nigerian Bank Account" },
                { value: "paypal", label: "PayPal Account" },
                { value: "wise", label: "Wise Account" },
              ]}
            />
          </div>

          {/* <Button
            onClick={handleConvert}
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold rounded-full  "
            size="lg"
          >
            Convert now
          </Button> */}
        </div>
      ) : (
        <div className="flex flex-col mt-6 md:mt-8 space-y-4 md:space-y-6 justify-center items-center p-8">
          <h1 className="font-medium text-3xl text-primary self-center">
            Coming Soon!
          </h1>
          <p className="text-center font-normal text-xl text-[##4F4F4F] ">
            Crypto to Fiat Loan is almost here. <br /> Enter your email and
            we&apos;ll let you know the moment it&apos;s live.
          </p>
          <div className="flex flex-col gap-2 w-full ">
            <Label className="text-base font-medium text-primary">Email</Label>
            <Input
              placeholder="Email"
              className="pl-8 h-12 border-input rounded-full text-base font-normal "
            />
          </div>
        </div>
      )}
      <Button
        onClick={mode === "crypto-to-cash" ? handleConvert : () => {}}
        className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold rounded-full mt-15 mb-20  "
        size="lg"
      >
        {mode === "crypto-to-cash" ? "Convert now" : "Update me"}
      </Button>
    </Card>
  );
};

export default CheckOut;
