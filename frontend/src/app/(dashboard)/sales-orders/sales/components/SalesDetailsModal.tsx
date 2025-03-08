// sales/components/SalesDetailsModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sale, Product } from "../types/salesTypes";
import Skeleton from "@/app/(dashboard)/components/Skeleton";
import { fetchProducts, fetchCustomers } from "../data/salesData";
import DetailsTab from "./DetailsTab";
import ActivityTab from "./ActivityTab";

interface SalesDetailsModalProps {
  isOpen: boolean;
  sale: Sale | null;
  onClose: () => void;
  onUpdateSale: (id: number, updatedSale: Partial<Sale>) => void;
}

interface Customer {
  name: string;
  company: string;
}

export function SalesDetailsModal({ isOpen, sale, onClose, onUpdateSale }: SalesDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSale, setEditedSale] = useState<Sale | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fetchedProducts, fetchedCustomers] = await Promise.all([
          fetchProducts(),
          fetchCustomers(),
        ]);
        setProducts(fetchedProducts);
        setCustomers(fetchedCustomers);
        const uniqueCategories = Array.from(new Set(fetchedProducts.map(p => p.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    setEditedSale(sale);
    setIsEditing(false);
  }, [sale]);

  if (!sale) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {loading ? <Skeleton className="w-40 h-8" /> : `Sale #${sale.id} Details`}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <DetailsTab
              sale={sale}
              editedSale={editedSale}
              setEditedSale={setEditedSale}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              onUpdateSale={onUpdateSale}
              products={products}
              customers={customers}
              categories={categories}
              isLoading={loading}
            />
          </TabsContent>
          <TabsContent value="activity">
            <ActivityTab sale={sale} isLoading={loading} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}