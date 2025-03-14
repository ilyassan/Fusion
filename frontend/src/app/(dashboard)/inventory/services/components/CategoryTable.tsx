"use client";

import { useState, useRef, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "../types/ServiceTypes";
import { Trash2 } from "lucide-react";

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
  const [tempName, setTempName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when editing starts
  useEffect(() => {
    if (editingCategoryId && inputRef.current) {
      inputRef.current.focus();
      const category = categories.find((c) => c.id === editingCategoryId);
      setTempName(category ? category.name : "");
    }
  }, [editingCategoryId, categories]);

  const handleDoubleClick = (categoryId: number) => {
    setEditingCategoryId(categoryId);
  };

  const handleBlur = (id: number) => {
    if (tempName.trim()) {
      handleUpdateCategory(id, tempName.trim());
    }
    setEditingCategoryId(null);
    setTempName("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === "Enter") {
      handleBlur(id);
    } else if (e.key === "Escape") {
      setEditingCategoryId(null);
      setTempName("");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category Name</TableHead>
          <TableHead>Service Count</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell
              onDoubleClick={() => handleDoubleClick(category.id)}
              className="cursor-text select-none"
            >
              {editingCategoryId === category.id ? (
                <Input
                  ref={inputRef}
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={() => handleBlur(category.id)}
                  onKeyDown={(e) => handleKeyPress(e, category.id)}
                  className="w-full"
                />
              ) : (
                category.name
              )}
            </TableCell>
            <TableCell>{category.serviceCount}</TableCell>
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