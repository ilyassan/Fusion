"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

interface CardPaymentProps {
  formData: Record<string, string>;
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardPayment = ({ formData, errors, handleInputChange }: CardPaymentProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <div className="relative">
          <Input
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="•••• •••• •••• ••••"
            className="pr-10"
          />
          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            name="expiry"
            value={formData.expiry}
            onChange={handleInputChange}
            placeholder="MM/YY"
          />
          {errors.expiry && <p className="text-xs text-red-500">{errors.expiry}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            name="cvc"
            value={formData.cvc}
            onChange={handleInputChange}
            placeholder="•••"
          />
          {errors.cvc && <p className="text-xs text-red-500">{errors.cvc}</p>}
        </div>
      </div>
    </>
  );
};

export default CardPayment;