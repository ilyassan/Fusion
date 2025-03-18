"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Banknote } from "lucide-react";

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
}

const PaymentMethod = ({ paymentMethod, setPaymentMethod }: PaymentMethodProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Payment Method
      </Label>
      <RadioGroup
        value={paymentMethod}
        onValueChange={setPaymentMethod}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <RadioGroupItem value="card" id="card" className="peer sr-only" />
          <Label
            htmlFor="card"
            className={`flex items-center justify-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
              paymentMethod === "card"
                ? "border-blue-600 bg-blue-50 shadow-sm"
                : "border-gray-200 hover:border-blue-400 peer-focus:ring-2 peer-focus:ring-blue-500"
            }`}
          >
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <span className="text-sm sm:text-base font-medium">Credit Card</span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
          <Label
            htmlFor="bank"
            className={`flex items-center justify-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
              paymentMethod === "bank"
                ? "border-blue-600 bg-blue-50 shadow-sm"
                : "border-gray-200 hover:border-blue-400 peer-focus:ring-2 peer-focus:ring-blue-500"
            }`}
          >
            <Banknote className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <span className="text-sm sm:text-base font-medium">Bank Transfer</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethod;