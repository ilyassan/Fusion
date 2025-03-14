"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceHeader } from "./components/ServiceHeader";
import { ServiceFilters } from "./components/ServiceFilters";
import { ServiceTable } from "./components/ServiceTable";
import { ServicePagination } from "./components/ServicePagination";
import { ServiceDetailsModal } from "./components/ServiceDetailsModal";
import { AddServiceModal } from "./components/AddServiceModal";
import { AddCategoryModal } from "./components/AddCategoryModal";
import { CategoryTable } from "./components/CategoryTable";
import { useServices } from "./hooks/useServices";
import { mockCategories } from "./data";
import { Service, Category } from "./types/ServiceTypes";
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
import { toast } from "@/hooks/use-toast";

export default function ServicesPage() {
  const {
    services,
    totalItems,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    filters,
    setFilters,
    sortConfig,
    setSortConfig,
    isLoading,
    addService,
    updateService,
    deleteService,
    deleteConfirmation: serviceDeleteConfirmation,
    setDeleteConfirmation: setServiceDeleteConfirmation,
  } = useServices({
    initialFilters: { category: "all", priceRange: "all" },
    itemsPerPage: 10,
  });

  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isServiceDetailsModalOpen, setIsServiceDetailsModalOpen] = useState<boolean>(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [categoryDeleteConfirmation, setCategoryDeleteConfirmation] = useState<{
    isOpen: boolean;
    type: "category" | null;
    id: number | null;
  }>({ isOpen: false, type: null, id: null });

  const totalPages = Math.ceil(totalItems / 10);

  const handleSort = (key: keyof Service) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
    setCurrentPage(1);
  };

  const handleSelectService = (service : Service) => {
    setSelectedService(service);
    setIsServiceDetailsModalOpen(true);
  };

  const handleAddCategory = (newCategory: { name: string }) => {
    setCategories((prev) => [
      ...prev,
      { ...newCategory, id: prev.length > 0 ? Math.max(...prev.map((c) => c.id)) + 1 : 1, serviceCount: 0 },
    ]);
    setIsAddCategoryModalOpen(false);
    toast({
      title: "Category Added",
      description: `${newCategory.name} has been added to the categories.`,
    });
  };

  const handleUpdateCategory = (id: number, newName: string) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name: newName } : c)));
    setEditingCategoryId(null);
    toast({
      title: "Category Updated",
      description: `Category has been renamed to ${newName}.`,
    });
  };

  const handleDeleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setCategoryDeleteConfirmation({ isOpen: false, type: null, id: null });
    toast({
      title: "Category Deleted",
      description: "The category has been removed.",
      variant: "destructive",
    });
  };

  const handleDelete = (type: "service" | "category", id: number) => {
    if (type === "service") {
      deleteService(id);
    } else if (type === "category") {
      handleDeleteCategory(id);
    }
  };

  const isDeleteConfirmationOpen = serviceDeleteConfirmation.isOpen || categoryDeleteConfirmation.isOpen;
  const activeDeleteConfirmation = serviceDeleteConfirmation.isOpen
    ? serviceDeleteConfirmation
    : categoryDeleteConfirmation;

  return (
    <div className="space-y-6 min-h-full">
      <ServiceHeader
        onAddServiceClick={() => setIsAddServiceModalOpen(true)}
        onAddCategoryClick={() => setIsAddCategoryModalOpen(true)}
      />
      <Card>
        <CardContent className="pt-6">
          <ServiceFilters
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
          <ServiceTable
            isLoading={isLoading}
            services={services}
            sortConfig={sortConfig}
            handleSort={handleSort}
            setSelectedService={handleSelectService}
            handleDelete={(id) => setServiceDeleteConfirmation({ isOpen: true, type: "service", id })}
          />
        </CardContent>
      </Card>
      <ServicePagination
        currentPage={currentPage}
        totalPages={totalPages}
        filteredDataLength={totalItems}
        itemsPerPage={10}
        setCurrentPage={setCurrentPage}
      />
      <ServiceDetailsModal
        isOpen={isServiceDetailsModalOpen}
        service={selectedService}
        onClose={() => setIsServiceDetailsModalOpen(false)}
        onUpdateService={updateService}
        categories={categories}
      />
      <AddServiceModal
        isOpen={isAddServiceModalOpen}
        onClose={() => setIsAddServiceModalOpen(false)}
        onAddService={addService}
        categories={categories}
      />
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAddCategory={handleAddCategory}
      />
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Service Categories</h3>
          <div className="overflow-x-auto">
            <CategoryTable
              categories={categories}
              editingCategoryId={editingCategoryId}
              setEditingCategoryId={setEditingCategoryId}
              handleUpdateCategory={handleUpdateCategory}
              handleDeleteCategory={(id) => setCategoryDeleteConfirmation({ isOpen: true, type: "category", id })}
            />
          </div>
        </CardContent>
      </Card>
      <AlertDialog
        open={isDeleteConfirmationOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setServiceDeleteConfirmation({ isOpen: false, type: null, id: null });
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