"use client";

import { useState, useEffect } from "react";
import { Category } from "../types/ProductTypes";
import { toast } from "@/hooks/use-toast";
import { mockCategories } from "../data";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories || []);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    type: "category" | null;
    id: number | null;
  }>({ isOpen: false, type: null, id: null });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        if (categories.length === 0) {
          setCategories(mockCategories || []);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  const addCategory = (newCategory: Omit<Category, "id" | "productCount">) => {
    const fullCategory: Category = {
      ...newCategory,
      id: Math.max(...categories.map((c) => c.id), 0) + 1,
      productCount: 0,
    };
    setCategories((prev) => [...prev, fullCategory]);
    toast({
      title: "Category Added",
      description: `${newCategory.name} has been added to the categories.`,
    });
  };

  const updateCategory = (id: number, newName: string) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name: newName } : c)));
    toast({
      title: "Category Updated",
      description: `Category has been renamed to ${newName}.`,
    });
  };

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirmation({ isOpen: false, type: null, id: null });
    toast({
      title: "Category Deleted",
      description: "The category has been removed.",
      variant: "destructive",
    });
  };

  return {
    categories,
    isLoading,
    addCategory,
    updateCategory,
    deleteCategory,
    deleteConfirmation,
    setDeleteConfirmation,
  };
};