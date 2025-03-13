"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ProductHeader } from "./components/ProductHeader";
import { ProductFilters } from "./components/ProductFilters";
import { ProductTable } from "./components/ProductTable";
import { ProductPagination } from "./components/ProductPagination";
import { ProductDetailsModal } from "./components/ProductDetailsModal";
import { AddProductModal } from "./components/AddProductModal";
import { AddCategoryModal } from "./components/AddCategoryModal";
import { CategoryTable } from "./components/CategoryTable";
import { useProducts } from "./hooks/useProducts";
import { useCategories } from "./hooks/useCategories";
import { Product } from "./types/ProductTypes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ProductsPage() {
  const {
    products,
    totalItems,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    filters,
    setFilters,
    sortConfig,
    setSortConfig,
    isLoading: isProductsLoading,
    addProduct,
    deleteProduct,
    deleteConfirmation: productDeleteConfirmation,
    setDeleteConfirmation: setProductDeleteConfirmation,
  } = useProducts({
    initialFilters: { category: "all", stockStatus: "all" },
    itemsPerPage: 10,
  });

  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    deleteConfirmation: categoryDeleteConfirmation,
    setDeleteConfirmation: setCategoryDeleteConfirmation,
  } = useCategories();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);

  const totalPages = Math.ceil(totalItems / 10);

  const handleSort = (key: keyof Product) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
    setCurrentPage(1);
  };

  const handleDelete = (type: "product" | "category", id: number) => {
    if (type === "product") {
      deleteProduct(id);
    } else if (type === "category") {
      deleteCategory(id);
    }
  };

  // Combine delete confirmations
  const isDeleteConfirmationOpen = productDeleteConfirmation.isOpen || categoryDeleteConfirmation.isOpen;
  const activeDeleteConfirmation = productDeleteConfirmation.isOpen
    ? productDeleteConfirmation
    : categoryDeleteConfirmation;

  return (
    <div className="space-y-6 min-h-full">
      <ProductHeader
        onAddProductClick={() => setIsAddProductModalOpen(true)}
        onAddCategoryClick={() => setIsAddCategoryModalOpen(true)}
      />
      <Card>
        <CardContent className="pt-6">
          <ProductFilters
            search={search}
            setSearch={setSearch}
            filters={filters}
            setFilters={setFilters}
            categories={categories}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <ProductTable
            isLoading={isProductsLoading}
            products={products}
            sortConfig={sortConfig}
            handleSort={handleSort}
            setSelectedProduct={(product) => {
              setSelectedProduct(product);
              setIsDetailsModalOpen(true);
            }}
            handleDelete={(id) => setProductDeleteConfirmation({ isOpen: true, type: "product", id })}
          />
        </CardContent>
      </Card>
      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        filteredDataLength={totalItems}
        itemsPerPage={10}
        setCurrentPage={setCurrentPage}
      />
      <ProductDetailsModal
        isOpen={isDetailsModalOpen}
        product={selectedProduct}
        onClose={() => setIsDetailsModalOpen(false)}
      />
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onAddProduct={addProduct}
        categories={categories}
      />
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAddCategory={addCategory}
      />
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Product Categories</h3>
          <div className="overflow-x-auto">
            <CategoryTable
              categories={categories}
              editingCategoryId={editingCategoryId}
              setEditingCategoryId={setEditingCategoryId}
              handleUpdateCategory={updateCategory}
              handleDeleteCategory={(id) => setCategoryDeleteConfirmation({ isOpen: true, type: "category", id })}
            />
          </div>
        </CardContent>
      </Card>
      <AlertDialog
        open={isDeleteConfirmationOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setProductDeleteConfirmation({ isOpen: false, type: null, id: null });
            setCategoryDeleteConfirmation({ isOpen: false, type: null, id: null });
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {activeDeleteConfirmation.type} from the
              database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (activeDeleteConfirmation.type && activeDeleteConfirmation.id !== null) {
                  handleDelete(activeDeleteConfirmation.type, activeDeleteConfirmation.id);
                }
              }}
              className="bg-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}