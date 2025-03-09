// sales/components/DetailsTab.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  Building2, 
  CalendarIcon, 
  DollarSign, 
  Package, 
  Tag, 
  User, 
  ShoppingCart 
} from "lucide-react";
import { Sale, Product } from "../types/salesTypes";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { updateSale } from "../data/salesData";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface Customer {
  name: string;
  company: string;
}

interface DetailsTabProps {
  sale: Sale;
  editedSale: Sale | null;
  setEditedSale: React.Dispatch<React.SetStateAction<Sale | null>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateSale: (id: number, updatedSale: Partial<Sale>) => void;
  products: Product[];
  customers: Customer[];
  categories: string[];
  isLoading: boolean;
}

const DetailsTab: React.FC<DetailsTabProps> = ({
  sale,
  editedSale,
  setEditedSale,
  isEditing,
  setIsEditing,
  onUpdateSale,
  products,
  customers,
  categories,
  isLoading,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedSale(prev => {
      if (!prev) return null;
      const updatedSale = {
        ...prev,
        [name]: name === "quantity" ? parseInt(value) || 0 : value,
      };
      if (name === "quantity") {
        const selectedProduct = products.find(p => p.name === prev.product);
        if (selectedProduct) {
          updatedSale.amount = selectedProduct.price * (parseInt(value) || 0);
        }
      }
      return updatedSale;
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    setEditedSale(prev => {
      if (!prev) return null;
      return {
        ...prev,
        date: date ? format(date, "yyyy-MM-dd") : prev.date,
      };
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedSale(prev => {
      if (!prev) return null;
      const updatedSale = { ...prev, [name]: value };
      if (name === "customer") {
        const selectedCustomer = customers.find(c => c.name === value);
        updatedSale.company = selectedCustomer ? selectedCustomer.company : "";
      } else if (name === "product") {
        const selectedProduct = products.find(p => p.name === value);
        if (selectedProduct) {
          updatedSale.category = selectedProduct.category;
          updatedSale.amount = selectedProduct.price * (prev.quantity || 0);
        }
      } else if (name === "category") {
        const currentProduct = products.find(p => p.name === prev.product);
        if (currentProduct && currentProduct.category !== value) {
          updatedSale.product = "";
          updatedSale.amount = 0;
        }
      }
      return updatedSale;
    });
  };

  const handleSave = async () => {
    if (editedSale && sale) {
      try {
        const updatedSale = await updateSale(sale.id, {
          date: editedSale.date,
          customer: editedSale.customer,
          company: editedSale.company,
          product: editedSale.product,
          category: editedSale.category,
          quantity: editedSale.quantity,
          amount: editedSale.amount,
          status: editedSale.status,
          coupon: editedSale.coupon,
        });
        onUpdateSale(sale.id, updatedSale);
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update sale:", error);
      }
    }
  };

  const filteredProducts = editedSale?.category
    ? products.filter(p => p.category === editedSale.category)
    : products;

  const parsedDate = editedSale?.date ? parse(editedSale.date, "yyyy-MM-dd", new Date()) : undefined;

  const SkeletonDetails = () => (
    <div className="grid grid-cols-2 gap-4 p-2">
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Date</span>
        </div>
        <Skeleton className="w-24 h-6" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Customer</span>
        </div>
        <Skeleton className="w-32 h-6" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Building2 className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Company</span>
        </div>
        <Skeleton className="w-28 h-6" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Package className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Product</span>
        </div>
        <Skeleton className="w-28 h-6" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Tag className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Category</span>
        </div>
        <Skeleton className="w-20 h-6" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <ShoppingCart className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Quantity</span>
        </div>
        <Skeleton className="w-16 h-6" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Amount</span>
        </div>
        <Skeleton className="w-16 h-6" />
      </div>
    </div>
  );

  const ViewMode = () => (
    <div className="grid grid-cols-2 gap-4 p-2">
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Date</span>
        </div>
        <p className="text-sm">{editedSale?.date ? format(parsedDate!, "PPP") : "N/A"}</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Customer</span>
        </div>
        <p className="text-sm">{editedSale?.customer || "N/A"}</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Building2 className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Company</span>
        </div>
        <p className="text-sm">{editedSale?.company || "N/A"}</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Package className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Product</span>
        </div>
        <p className="text-sm">{editedSale?.product || "N/A"}</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Tag className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Category</span>
        </div>
        <p className="text-sm">{editedSale?.category || "N/A"}</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <ShoppingCart className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Quantity</span>
        </div>
        <p className="text-sm">{editedSale?.quantity || "0"}</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Amount</span>
        </div>
        <p className="text-sm">{editedSale?.amount.toLocaleString() || "0"}</p>
      </div>
      {editedSale?.coupon && (
        <div className="space-y-1 col-span-2">
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-sm">Coupon</span>
          </div>
          <p className="text-sm">{editedSale.coupon}</p>
        </div>
      )}
    </div>
  );

  const EditMode = () => (
    <div className="grid grid-cols-2 gap-3 p-2">
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-xs">Date</span>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-8 justify-start text-left font-normal text-sm",
                !editedSale?.date && "text-muted-foreground"
              )}
            >
              {editedSale?.date ? format(parsedDate!, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={parsedDate}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-xs">Customer</span>
        </div>
        <Select
          name="customer"
          value={editedSale?.customer || ""}
          onValueChange={(value) => handleSelectChange("customer", value)}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Select customer" />
          </SelectTrigger>
          <SelectContent>
            {customers.map(customer => (
              <SelectItem key={customer.name} value={customer.name}>
                {customer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Building2 className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-xs">Company</span>
        </div>
        <Input
          name="company"
          value={editedSale?.company || ""}
          className="w-full h-8 text-sm bg-gray-100"
          disabled
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Package className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-xs">Product</span>
        </div>
        <Select
          name="product"
          value={editedSale?.product || ""}
          onValueChange={(value) => handleSelectChange("product", value)}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            {filteredProducts.map(product => (
              <SelectItem key={product.name} value={product.name}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Tag className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-xs">Category</span>
        </div>
        <Select
          name="category"
          value={editedSale?.category || ""}
          onValueChange={(value) => handleSelectChange("category", value)}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <ShoppingCart className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-xs">Quantity</span>
        </div>
        <Input
          name="quantity"
          type="number"
          value={editedSale?.quantity || 0}
          onChange={handleInputChange}
          className="w-full h-8 text-sm"
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-xs">Amount</span>
        </div>
        <Input
          value={editedSale?.amount.toLocaleString() || "0"}
          disabled
          className="w-full h-8 text-sm bg-gray-100"
        />
      </div>
      {editedSale?.coupon && (
        <div className="space-y-1 col-span-2">
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-xs">Coupon</span>
          </div>
          <Input
            value={editedSale.coupon}
            disabled
            className="w-full h-8 text-sm bg-gray-100"
          />
        </div>
      )}
    </div>
  );

  return (
    <>
      {isLoading ? (
        <SkeletonDetails />
      ) : isEditing ? (
        <EditMode />
      ) : (
        <ViewMode />
      )}
      <div className="flex justify-end gap-2 pt-2">
        {isLoading ? (
          <Skeleton className="w-20 h-8" />
        ) : isEditing ? (
          <>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="h-8 text-sm py-0"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="h-8 text-sm py-0 bg-blue-600 hover:bg-blue-700"
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="h-8 text-sm py-0 bg-blue-600 hover:bg-blue-700"
          >
            Edit
          </Button>
        )}
      </div>
    </>
  );
};

export default DetailsTab;