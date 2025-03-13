"use client";

import { useRef, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Category } from "../types/ProductTypes";

interface CategoryTableProps {
  categories: Category[];
  editingCategoryId: number | null;
  setEditingCategoryId: (id: number | null) => void;
  handleUpdateCategory: (id: number, newName: string) => void;
  handleDeleteCategory: (id: number) => void;
}

export function CategoryTable({
  categories,
  editingCategoryId,
  setEditingCategoryId,
  handleUpdateCategory,
  handleDeleteCategory,
}: CategoryTableProps) {
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingCategoryId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingCategoryId]);

  const handleDoubleClick = (id: number) => {
    setEditingCategoryId(id);
  };

  const handleSave = (id: number, newName: string) => {
    if (newName.trim() !== "") {
      handleUpdateCategory(id, newName);
    }
    setEditingCategoryId(null);
  };

  return (
    <Table className="min-w-[350px]">
      <TableHeader>
        <TableRow>
          <TableHead>Category Name</TableHead>
          <TableHead>Product Count</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell
              onDoubleClick={() => handleDoubleClick(category.id)}
              className="cursor-pointer hover:bg-gray-100"
            >
              {editingCategoryId === category.id ? (
                <Input
                  ref={editInputRef}
                  defaultValue={category.name}
                  onBlur={(e) => handleSave(category.id, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSave(category.id, (e.target as HTMLInputElement).value);
                    }
                  }}
                  className="w-full"
                />
              ) : (
                category.name
              )}
            </TableCell>
            <TableCell>{category.productCount}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => handleDeleteCategory(category.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}