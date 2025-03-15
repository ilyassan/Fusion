import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, ArrowRightLeft } from "lucide-react";

interface FilterInputsSectionProps {
  searchWarehouses: (query: string) => void;
  onAddWarehouse: () => void;
  onTransferStock: () => void;
}

export const FilterInputsSection: React.FC<FilterInputsSectionProps> = ({
  searchWarehouses,
  onAddWarehouse,
  onTransferStock,
}) => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        searchWarehouses(query);
    };
      
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Filters & Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
          <div className="flex-1">
            <Label htmlFor="searchQuery">Search</Label>
            <Input
              id="searchQuery"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="flex items-end gap-2 flex-wrap">
            <Button
              onClick={onAddWarehouse}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Warehouse
            </Button>
            <Button onClick={onTransferStock} variant="secondary">
              <ArrowRightLeft className="mr-2 h-4 w-4 text-green-500" /> Transfer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};