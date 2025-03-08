"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Percent } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { fetchProducts, fetchCoupons } from "../data/salesData";
import { Sale, Product } from "../types/salesTypes";

interface AddSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSale: (newSale: Omit<Sale, "id" | "createdBy" | "createdAt">) => void;
}

export function AddSaleModal({ isOpen, onClose, onAddSale }: AddSaleModalProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    date: new Date(),
    customer: "",
    company: "",
    product: "",
    category: "",
    quantity: "1",
    amount: 0,
    coupon: "0", // Percentage discount as a number
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const selectedProduct = products.find(p => p.name === form.product);
    if (selectedProduct && !isNaN(parseInt(form.quantity))) {
      const quantity = parseInt(form.quantity);
      const basePrice = selectedProduct.price * quantity;
      const discount = parseFloat(form.coupon) / 100 || 0;
      const finalAmount = basePrice * (1 - discount);
      setForm(prev => ({ ...prev, amount: finalAmount, category: selectedProduct.category }));
    } else {
      setForm(prev => ({ ...prev, amount: 0 }));
    }
  }, [form.product, form.quantity, form.coupon, products]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer || !form.product || !form.quantity) return;

    onAddSale({
      date: format(form.date, "yyyy-MM-dd"),
      customer: form.customer,
      company: form.company,
      product: form.product,
      category: form.category,
      quantity: parseInt(form.quantity),
      amount: form.amount,
      status: "Pending", // Default status
      coupon: form.coupon !== "0" ? `${form.coupon}%` : undefined, // Convert to string with % if not 0
    });

    setForm({
      date: new Date(),
      customer: "",
      company: "",
      product: "",
      category: "",
      quantity: "1",
      amount: 0,
      coupon: "0",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Sale</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !form.date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.date ? format(form.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={form.date}
                      onSelect={(date) => setForm(prev => ({ ...prev, date: date || new Date() }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="customer">Customer</Label>
                <Select
                  value={form.customer}
                  onValueChange={(value) => handleSelectChange("customer", value)}
                >
                  <SelectTrigger id="customer">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Doe">John Doe</SelectItem>
                    <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    <SelectItem value="Peter Jones">Peter Jones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="product">Product</Label>
                <Select
                  value={form.product}
                  onValueChange={(value) => handleSelectChange("product", value)}
                >
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.name} value={product.name}>
                        {product.name} (${product.price})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="coupon">Discount (%)</Label>
                <div className="relative">
                  <Input
                    id="coupon"
                    name="coupon"
                    type="number"
                    min="0"
                    max="100"
                    value={form.coupon}
                    onChange={handleInputChange}
                    className="pr-8"
                  />
                  <Percent className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  value={form.amount.toFixed(2)}
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Add Sale
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}