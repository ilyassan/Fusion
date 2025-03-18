"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BillingInfoProps {
  formData: Record<string, string>;
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BillingInfo = ({ formData, errors, handleInputChange }: BillingInfoProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Billing Information
      </Label>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Billing Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
      </div>
    </div>
  );
};

export default BillingInfo;