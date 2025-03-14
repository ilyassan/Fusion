"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Service, Category } from "../types/ServiceTypes";
import { DollarSign, Percent } from "lucide-react";

interface ServiceDetailsModalProps {
  isOpen: boolean;
  service: Service | null;
  onClose: () => void;
  onUpdateService: (service: Service) => void;
  categories: Category[];
}

export function ServiceDetailsModal({ isOpen, service, onClose, onUpdateService, categories }: ServiceDetailsModalProps) {
  const [editedService, setEditedService] = useState<Service | null>(service);
  
  useEffect(() => {
    setEditedService(service);
  }, [service]);

  if (!service || !editedService) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedService((prev) => prev && { ...prev, [name]: name === "price" || name === "tax" ? Number(value) : value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedService((prev) => prev && { ...prev, [name]: value });
  };

  const handleSave = () => {
    if (editedService) onUpdateService(editedService);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">Service Details - {service.name}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-50 p-1 rounded-lg">
            <TabsTrigger value="info" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Information
            </TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Pricing
            </TabsTrigger>
          </TabsList>
          <div className="mt-4 space-y-4">
            <TabsContent value="info">
              <div className="space-y-4 p-0.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="font-semibold text-gray-700">Service Name</Label>
                    <Input
                      name="name"
                      value={editedService.name}
                      onChange={handleInputChange}
                      className="focus-visible:ring-blue-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-semibold text-gray-700">Category</Label>
                    <Select
                      value={editedService.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger className="focus-visible:ring-blue-200">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="font-semibold text-gray-700">Service Description</Label>
                  <Textarea
                    name="description"
                    value={editedService.description}
                    onChange={handleInputChange}
                    className="min-h-[80px] focus-visible:ring-blue-200"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="pricing">
              <div className="space-y-4 p-0.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="font-semibold text-gray-700">Price</Label>
                    <div className="relative">
                      <Input
                        name="price"
                        type="number"
                        value={editedService.price}
                        onChange={handleInputChange}
                        className="pl-8 focus-visible:ring-blue-200"
                      />
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-semibold text-gray-700">Tax Rate</Label>
                    <div className="relative">
                      <Input
                        name="tax"
                        type="number"
                        value={editedService.tax}
                        onChange={handleInputChange}
                        className="pl-8 focus-visible:ring-blue-200"
                      />
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        <DialogFooter className="mt-4">
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-sm font-semibold">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}