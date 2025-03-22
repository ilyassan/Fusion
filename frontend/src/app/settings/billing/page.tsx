"use client";

import { useState } from "react";
import { CreditCard, Download, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Mock data types
interface Plan {
  name: string;
  features: string[];
  price: string;
  billingCycle: string;
}

interface PaymentMethod {
  type: string;
  lastFour: string;
  expiry: string;
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  pdfUrl: string;
}

// Mock data
const currentPlan: Plan = {
  name: "Pro",
  features: [
    "Unlimited Projects",
    "5 Team Members",
    "Advanced Analytics",
    "Priority Support",
  ],
  price: "$99",
  billingCycle: "month",
};

const paymentMethod: PaymentMethod = {
  type: "Credit Card",
  lastFour: "1234",
  expiry: "12/26",
};

const billingAddress = {
  line1: "123 Main St",
  city: "New York",
  state: "NY",
  postalCode: "10001",
  country: "USA",
};

const invoices: Invoice[] = [
  {
    id: "INV-001",
    date: "2025-03-01",
    amount: "$99.00",
    status: "paid",
    pdfUrl: "#",
  },
  {
    id: "INV-002",
    date: "2025-02-01",
    amount: "$99.00",
    status: "paid",
    pdfUrl: "#",
  },
  {
    id: "INV-003",
    date: "2025-01-01",
    amount: "$99.00",
    status: "pending",
    pdfUrl: "#",
  },
  {
    id: "INV-004",
    date: "2024-12-01",
    amount: "$99.00",
    status: "failed",
    pdfUrl: "#",
  },
];

export default function BillingPage() {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancelPassword, setCancelPassword] = useState("");
  const { toast } = useToast();

  const handleCancelSubscription = () => {
    if (cancelPassword !== "password123") { // Mock password check
      toast({
        title: "Incorrect Password",
        description: "Please enter the correct password to cancel your subscription.",
        variant: "destructive",
      });
      return;
    }
    setIsCancelDialogOpen(false);
    setCancelPassword("");
    toast({
      title: "Subscription Cancelled",
      description: "Your subscription has been successfully cancelled.",
      variant: "default",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <p className="text-gray-500">View your plan, payment methods, and invoices</p>
      </div>

      {/* Current Plan */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">{currentPlan.name} Plan</h3>
            <p className="text-gray-600">
              {currentPlan.price}/{currentPlan.billingCycle}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Features Included:</h4>
            <ul className="mt-2 space-y-1">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> {feature}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium">Payment Method</h3>
            <p className="text-gray-600 mt-2">
              {paymentMethod.type} ending in {paymentMethod.lastFour} (Expires {paymentMethod.expiry})
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Billing Address</h3>
            <p className="text-gray-600 mt-2">
              {billingAddress.line1}, {billingAddress.city}, {billingAddress.state}{" "}
              {billingAddress.postalCode}, {billingAddress.country}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Invoices & Payment History */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Invoices & Payment History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{invoice.id}</p>
                  <p className="text-sm text-gray-600">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-medium">{invoice.amount}</p>
                  <Badge
                    className={
                      invoice.status === "paid"
                        ? "bg-green-500 hover:bg-green-600"
                        : invoice.status === "pending"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-red-500 hover:bg-red-600"
                    }
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={invoice.pdfUrl} download>
                      <Download className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subscription Management */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Subscription Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Auto-Renewal</h3>
              <p className="text-sm text-gray-500">
                Automatically renew your subscription when it expires (required)
              </p>
            </div>
            <Switch
              checked={true}
              disabled
              className="data-[state=checked]:bg-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-red-600">Cancel Subscription</h3>
              <p className="text-sm text-gray-500">
                Cancel your subscription (effective at the end of the billing cycle)
              </p>
            </div>
            <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">Cancel Subscription</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Cancel Subscription</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to cancel your subscription? This action cannot be undone
                    and will take effect at the end of your current billing cycle.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Label htmlFor="cancel-password">Enter your password to confirm:</Label>
                  <Input
                    id="cancel-password"
                    type="password"
                    value={cancelPassword}
                    onChange={(e) => setCancelPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleCancelSubscription}>
                    Confirm Cancellation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}