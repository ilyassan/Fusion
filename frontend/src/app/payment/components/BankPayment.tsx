"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BankPaymentProps {
  formData: Record<string, string>;
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BankPayment = ({ formData, errors, handleInputChange }: BankPaymentProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="accountName">Account Name</Label>
        <Input
          id="accountName"
          name="accountName"
          value={formData.accountName}
          onChange={handleInputChange}
        />
        {errors.accountName && <p className="text-xs text-red-500">{errors.accountName}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input
          id="accountNumber"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleInputChange}
        />
        {errors.accountNumber && <p className="text-xs text-red-500">{errors.accountNumber}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="routingNumber">Routing Number</Label>
        <Input
          id="routingNumber"
          name="routingNumber"
          value={formData.routingNumber}
          onChange={handleInputChange}
        />
        {errors.routingNumber && <p className="text-xs text-red-500">{errors.routingNumber}</p>}
      </div>
    </div>
  );
};

export default BankPayment;