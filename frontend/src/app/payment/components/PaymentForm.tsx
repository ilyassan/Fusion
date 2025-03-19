"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import PaymentMethod from "./PaymentMethod";
import CardPayment from "./CardPayment";
import BankPayment from "./BankPayment";
import BillingInfo from "./BillingInfo";
import { CheckCircle } from "lucide-react";

// Zod schemas
const cardSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Expiry must be MM/YY"),
  cvc: z.string().regex(/^\d{3}$/, "CVC must be 3 digits"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Billing address is required"),
});

const bankSchema = z.object({
  accountName: z.string().min(1, "Account name is required"),
  accountNumber: z.string().regex(/^\d{8,12}$/, "Account number must be 8-12 digits"),
  routingNumber: z.string().regex(/^\d{9}$/, "Routing number must be 9 digits"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Billing address is required"),
});

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    accountName: "",
    accountNumber: "",
    routingNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const schema = paymentMethod === "card" ? cardSchema : bankSchema;

    try {
      schema.parse(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({ title: "Success", description: "Payment processed successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce<Record<string, string>>((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please correct the errors in the form.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Payment failed. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl">Secure Payment</CardTitle>
        <p className="text-sm sm:text-base text-gray-600">Complete your Fusion Pro subscription</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
          {paymentMethod === "card" ? (
            <CardPayment formData={formData} errors={errors} handleInputChange={handleInputChange} />
          ) : (
            <BankPayment formData={formData} errors={errors} handleInputChange={handleInputChange} />
          )}
          <BillingInfo formData={formData} errors={errors} handleInputChange={handleInputChange} />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 btn-primary"
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Confirm Payment - $99.00</span>
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;