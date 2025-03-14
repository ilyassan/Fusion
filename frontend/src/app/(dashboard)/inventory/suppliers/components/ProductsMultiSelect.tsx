import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronsUpDown, Check, X } from "lucide-react";
import { Product } from "../types/SupplierTypes";

interface ProductsMultiSelectProps {
  value: number[];
  onChange: (value: number[]) => void;
  products: Product[];
}

export const ProductsMultiSelect: React.FC<ProductsMultiSelectProps> = ({
  value = [],
  onChange = () => {},
  products,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProduct = (productId: number) => {
    onChange(
      value.includes(productId)
        ? value.filter((id) => id !== productId)
        : [...value, productId]
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex flex-wrap gap-1 min-h-[2.5rem] p-2 border rounded-md mb-2">
        {value.map((productId) => {
          const product = products.find((p) => p.id === productId);
          return (
            <Badge
              key={productId}
              variant="secondary"
              className="flex items-center gap-1 bg-blue-100"
            >
              {product?.name}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProduct(productId);
                }}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          );
        })}
      </div>
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {value.length > 0
            ? `${value.length} product${value.length > 1 ? "s" : ""} selected`
            : "Select products..."}
        </span>
        <ChevronsUpDown className="h-4 w-4 opacity-50" />
      </Button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredProducts.length === 0 ? (
              <div className="p-2 text-center text-gray-500">No products found</div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                        value.includes(product.id)
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {value.includes(product.id) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};