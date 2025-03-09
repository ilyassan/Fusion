"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Edit,
  Trash2,
  Plus,
  ArrowRightLeft,
  Download,
  Phone,
  User,
  Package,
  Building,
  DollarSign,
  ChevronRight,
  Box,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for products
const mockProducts = [
  { id: 1, name: "Smartphone X", price: 499.99 },
  { id: 2, name: "Laptop Pro", price: 1499.99 },
  { id: 3, name: "Wireless Earbuds", price: 79.99 },
]

// Mock data for warehouses
const mockWarehouses = [
  {
    id: 1,
    name: "Main Warehouse",
    location: "New York, NY",
    capacity: 10000,
    capacityUnit: "m²",
    contact: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "john.doe@warehouse.com",
    totalItems: 5678,
    totalValue: 234567.89,
    utilizationRate: 75,
  },
  {
    id: 2,
    name: "West Coast Distribution",
    location: "Los Angeles, CA",
    capacity: 8000,
    capacityUnit: "m²",
    contact: "Jane Smith",
    phone: "+1 (555) 987-6543",
    email: "jane.smith@warehouse.com",
    totalItems: 3456,
    totalValue: 178901.23,
    utilizationRate: 60,
  },
  {
    id: 3,
    name: "Midwest Fulfillment",
    location: "Chicago, IL",
    capacity: 6000,
    capacityUnit: "m²",
    contact: "Mike Johnson",
    phone: "+1 (555) 456-7890",
    email: "mike.johnson@warehouse.com",
    totalItems: 2345,
    totalValue: 98765.43,
    utilizationRate: 45,
  },
]

// Mock data for stock levels
const mockStockLevels = [
  { warehouseId: 1, productId: 1, productName: "Smartphone X", quantity: 500, value: 249999.5 },
  { warehouseId: 1, productId: 2, productName: "Laptop Pro", quantity: 200, value: 299999.0 },
  { warehouseId: 2, productId: 1, productName: "Smartphone X", quantity: 300, value: 149999.7 },
  { warehouseId: 2, productId: 3, productName: "Wireless Earbuds", quantity: 1000, value: 79999.0 },
  { warehouseId: 3, productId: 2, productName: "Laptop Pro", quantity: 150, value: 224999.25 },
  { warehouseId: 3, productId: 3, productName: "Wireless Earbuds", quantity: 500, value: 39999.5 },
]

export default function WarehousesAndStockLocationsPage() {
  const [warehouses, setWarehouses] = useState(mockWarehouses)
  const [stockLevels, setStockLevels] = useState(mockStockLevels)
  const [isAddWarehouseModalOpen, setIsAddWarehouseModalOpen] = useState(false)
  const [isEditWarehouseModalOpen, setIsEditWarehouseModalOpen] = useState(false)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const [selectedWarehouse, setSelectedWarehouse] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, id: null })
  const [filterLocation, setFilterLocation] = useState("")
  const [filterCapacity, setFilterCapacity] = useState("")
  const [detailsWarehouse, setDetailsWarehouse] = useState(null)

  const handleAddWarehouse = (newWarehouse) => {
    setWarehouses([
      ...warehouses,
      {
        ...newWarehouse,
        id: warehouses.length + 1,
        totalItems: 0,
        totalValue: 0,
        utilizationRate: 0,
      },
    ])
    setIsAddWarehouseModalOpen(false)
    toast({
      title: "Warehouse Added",
      description: `${newWarehouse.name} has been added to the list.`,
    })
  }

  const handleEditWarehouse = (updatedWarehouse) => {
    setWarehouses(
      warehouses.map((w) =>
        w.id === updatedWarehouse.id
          ? {
              ...updatedWarehouse,
              totalItems: w.totalItems,
              totalValue: w.totalValue,
              utilizationRate: w.utilizationRate,
            }
          : w,
      ),
    )
    setSelectedWarehouse(null)
    setIsEditWarehouseModalOpen(false)
    toast({
      title: "Warehouse Updated",
      description: `${updatedWarehouse.name} has been updated.`,
    })
  }

  const handleDeleteWarehouse = (id) => {
    setWarehouses(warehouses.filter((w) => w.id !== id))
    setStockLevels(stockLevels.filter((s) => s.warehouseId !== id))
    setDeleteConfirmation({ isOpen: false, id: null })
    toast({
      title: "Warehouse Deleted",
      description: "The warehouse has been removed from the list.",
      variant: "destructive",
    })
  }

  const handleTransferStock = (transfer) => {
    const sourceStock = stockLevels.find(
      (s) =>
        s.warehouseId === Number.parseInt(transfer.sourceWarehouse) &&
        s.productId === Number.parseInt(transfer.product),
    )

    if (!sourceStock || sourceStock.quantity < Number.parseInt(transfer.quantity)) {
      toast({
        title: "Transfer Failed",
        description: "Insufficient stock in source warehouse.",
        variant: "destructive",
      })
      return
    }

    const newStockLevels = stockLevels.map((stock) => {
      if (
        stock.warehouseId === Number.parseInt(transfer.sourceWarehouse) &&
        stock.productId === Number.parseInt(transfer.product)
      ) {
        return { ...stock, quantity: stock.quantity - Number.parseInt(transfer.quantity) }
      }
      if (
        stock.warehouseId === Number.parseInt(transfer.destinationWarehouse) &&
        stock.productId === Number.parseInt(transfer.product)
      ) {
        return { ...stock, quantity: stock.quantity + Number.parseInt(transfer.quantity) }
      }
      return stock
    })

    setStockLevels(newStockLevels)
    setIsTransferModalOpen(false)
    toast({
      title: "Stock Transferred",
      description: `${transfer.quantity} units have been transferred successfully.`,
    })
  }

  const filteredWarehouses = warehouses.filter((warehouse) => {
    const matchesLocation =
      filterLocation === "" || warehouse.location.toLowerCase().includes(filterLocation.toLowerCase())
    const matchesCapacity = filterCapacity === "" || warehouse.capacity >= Number.parseInt(filterCapacity)
    return matchesLocation && matchesCapacity
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Warehouses & Stock Locations</h2>
          <p className="text-muted-foreground">Manage your warehouses and view stock levels</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              /* Implement export logic */
            }}
          >
            <Download className="mr-2 h-4 w-4 text-blue-500" /> Export Data
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Filters & Actions</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            {/* Filters */}
            <div className="flex-1 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="filterLocation">Location</Label>
                <Input
                  id="filterLocation"
                  placeholder="Filter by location"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="filterCapacity">Min Capacity ({warehouses[0]?.capacityUnit})</Label>
                <Input
                  id="filterCapacity"
                  type="number"
                  placeholder="Filter by capacity"
                  value={filterCapacity}
                  onChange={(e) => setFilterCapacity(e.target.value)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-end gap-2 flex-wrap">
              <Button onClick={() => setIsAddWarehouseModalOpen(true)} className="bg-blue-500 hover:bg-blue-600">
                <Plus className="mr-2 h-4 w-4" /> Add Warehouse
              </Button>
              <Button onClick={() => setIsTransferModalOpen(true)} variant="secondary">
                <ArrowRightLeft className="mr-2 h-4 w-4 text-green-500" /> Transfer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredWarehouses.map((warehouse) => (
          <WarehouseCard
            key={warehouse.id}
            warehouse={warehouse}
            stockLevels={stockLevels.filter((s) => s.warehouseId === warehouse.id)}
            onEdit={() => {
              setSelectedWarehouse(warehouse)
              setIsEditWarehouseModalOpen(true)
            }}
            onDelete={() => setDeleteConfirmation({ isOpen: true, id: warehouse.id })}
            onViewDetails={() => setDetailsWarehouse(warehouse)}
          />
        ))}
      </div>

      <AddWarehouseModal
        isOpen={isAddWarehouseModalOpen}
        onClose={() => setIsAddWarehouseModalOpen(false)}
        onSave={handleAddWarehouse}
      />

      <EditWarehouseModal
        warehouse={selectedWarehouse}
        isOpen={isEditWarehouseModalOpen}
        onClose={() => {
            setSelectedWarehouse(null)
            setIsEditWarehouseModalOpen(false)
        }}
        onSave={handleEditWarehouse}
      />

      <StockTransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onTransfer={handleTransferStock}
        warehouses={warehouses}
        products={mockProducts}
        stockLevels={stockLevels}
      />

      <WarehouseDetailsSheet
        warehouse={detailsWarehouse}
        stockLevels={stockLevels.filter((s) => s.warehouseId === detailsWarehouse?.id)}
        onClose={() => setDetailsWarehouse(null)}
      />

      <AlertDialog
        open={deleteConfirmation.isOpen}
        onOpenChange={(isOpen) => setDeleteConfirmation({ ...deleteConfirmation, isOpen })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this warehouse?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the warehouse and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteWarehouse(deleteConfirmation.id)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function WarehouseCard({ warehouse, stockLevels, onEdit, onDelete, onViewDetails }) {
  const getUtilizationColor = (rate) => {
    if (rate < 50) return "text-green-500"
    if (rate < 75) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{warehouse.name}</CardTitle>
        <div className="flex gap-3">
          <Edit className="cursor-pointer h-4 w-4 text-blue-500" onClick={onEdit} />
          <Trash2 className="cursor-pointer h-4 w-4 text-red-500" onClick={onDelete} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-2xl font-bold">{warehouse.totalItems.toLocaleString()} items</div>
            <p className="text-xs text-muted-foreground">
              <DollarSign className="inline h-3 w-3 text-green-500" />
              Total Value: ${warehouse.totalValue.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4 text-red-400" />
            {warehouse.location}
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Capacity Usage:</div>
            <div className="flex items-center gap-2">
              <Building className={`h-4 w-4 ${getUtilizationColor(warehouse.utilizationRate)}`} />
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${getUtilizationColor(warehouse.utilizationRate)} bg-current`}
                  style={{ width: `${warehouse.utilizationRate}%` }}
                />
              </div>
              <span className={`text-sm ${getUtilizationColor(warehouse.utilizationRate)}`}>
                {warehouse.utilizationRate}%
              </span>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">Top Products:</div>
            <ul className="mt-2 text-sm space-y-2">
              {stockLevels.slice(0, 3).map((stock) => (
                <li key={stock.productId} className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Box className="h-3 w-3 text-blue-400 mr-2" />
                    {stock.productName}
                  </span>
                  <span className="font-medium">{stock.quantity}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button variant="outline" className="w-full mt-4" onClick={onViewDetails}>
            View Details
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AddWarehouseModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    capacityUnit: "m²",
    contact: "",
    phone: "",
    email: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Warehouse</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
            </div>

            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <div className="flex gap-2">
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="flex-1"
                  required
                />
                <Select
                  name="capacityUnit"
                  value={formData.capacityUnit}
                  onValueChange={(value) => handleInputChange({ target: { name: "capacityUnit", value } })}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m²">m²</SelectItem>
                    <SelectItem value="ft²">ft²</SelectItem>
                    <SelectItem value="yd²">yd²</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="contact">Contact Person</Label>
              <Input id="contact" name="contact" value={formData.contact} onChange={handleInputChange} required />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Add Warehouse
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditWarehouseModal({ warehouse, isOpen, onClose, onSave }) {
  if (!warehouse) return null;
  const [formData, setFormData] = useState(
    warehouse || {
      name: "",
      location: "",
      capacity: "",
      capacityUnit: "m²",
      contact: "",
      phone: "",
      email: "",
    },
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Warehouse</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
            </div>

            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <div className="flex gap-2">
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="flex-1"
                  required
                />
                <Select
                  name="capacityUnit"
                  value={formData.capacityUnit}
                  onValueChange={(value) => handleInputChange({ target: { name: "capacityUnit", value } })}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m²">m²</SelectItem>
                    <SelectItem value="ft²">ft²</SelectItem>
                    <SelectItem value="yd²">yd²</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="contact">Contact Person</Label>
              <Input id="contact" name="contact" value={formData.contact} onChange={handleInputChange} required />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function StockTransferModal({ isOpen, onClose, onTransfer, warehouses, products, stockLevels }) {
  const [formData, setFormData] = useState({
    sourceWarehouse: "",
    destinationWarehouse: "",
    product: "",
    quantity: "",
  })

  const [availableQuantity, setAvailableQuantity] = useState(0)

  const handleSourceWarehouseChange = (value) => {
    const newFormData = {
      ...formData,
      sourceWarehouse: value,
      product: "",
      quantity: "",
    }
    setFormData(newFormData)
    setAvailableQuantity(0)
  }

  const handleProductChange = (value) => {
    const sourceStock = stockLevels.find(
      (s) => s.warehouseId === Number.parseInt(formData.sourceWarehouse) && s.productId === Number.parseInt(value),
    )
    setFormData({ ...formData, product: value, quantity: "" })
    setAvailableQuantity(sourceStock?.quantity || 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Number.parseInt(formData.quantity) > availableQuantity) {
      toast({
        title: "Invalid Quantity",
        description: "Transfer quantity cannot exceed available stock.",
        variant: "destructive",
      })
      return
    }
    onTransfer(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Stock</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="sourceWarehouse">From</Label>
              <Select
                name="sourceWarehouse"
                value={formData.sourceWarehouse}
                onValueChange={handleSourceWarehouseChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source warehouse" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map((warehouse) => (
                    <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                      {warehouse.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="destinationWarehouse">To</Label>
              <Select
                name="destinationWarehouse"
                value={formData.destinationWarehouse}
                onValueChange={(value) => setFormData({ ...formData, destinationWarehouse: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination warehouse" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses
                    .filter((w) => w.id.toString() !== formData.sourceWarehouse)
                    .map((warehouse) => (
                      <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                        {warehouse.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {formData.sourceWarehouse && (
              <div>
                <Label htmlFor="product">Product</Label>
                <Select name="product" value={formData.product} onValueChange={handleProductChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.product && (
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <div>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    max={availableQuantity}
                    min="1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">Available: {availableQuantity} units</p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600"
              disabled={
                !formData.sourceWarehouse || !formData.destinationWarehouse || !formData.product || !formData.quantity
              }
            >
              Transfer Stock
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function WarehouseDetailsSheet({ warehouse, stockLevels, onClose }) {
  if (!warehouse) return null

  return (
    <Sheet open={!!warehouse} onOpenChange={() => onClose()}>
      <SheetContent className="w-full sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>{warehouse.name}</SheetTitle>
          <SheetDescription>Complete warehouse information and stock levels</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-muted-foreground">Location</Label>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-red-400 mr-2" />
                {warehouse.location}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground">Capacity</Label>
              <div className="flex items-center">
                <Building className="h-4 w-4 text-blue-400 mr-2" />
                {warehouse.capacity} {warehouse.capacityUnit}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground">Contact Person</Label>
              <div className="flex items-center">
                <User className="h-4 w-4 text-green-400 mr-2" />
                {warehouse.contact}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground">Phone</Label>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-purple-400 mr-2" />
                {warehouse.phone}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold flex items-center">
              <Package className="h-4 w-4 text-orange-400 mr-2" />
              Stock Inventory
            </h4>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockLevels.map((stock) => (
                    <TableRow key={stock.productId}>
                      <TableCell>{stock.productName}</TableCell>
                      <TableCell className="text-right">{stock.quantity}</TableCell>
                      <TableCell className="text-right">${stock.value.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

