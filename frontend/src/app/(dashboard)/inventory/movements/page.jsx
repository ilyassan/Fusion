"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Plus, ArrowUpDown, Download, Eye } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Mock data for products
const mockProducts = [
  { id: 1, name: "Product A", image: "/product-a.jpg" },
  { id: 2, name: "Product B", image: "/product-b.jpg" },
  { id: 3, name: "Product C", image: "/product-c.jpg" },
]

// Mock data for suppliers
const mockSuppliers = [
  { id: 1, name: "Supplier X" },
  { id: 2, name: "Supplier Y" },
  { id: 3, name: "Supplier Z" },
]

// Mock data for stock movements
const mockStockMovements = [
  {
    id: 1,
    date: "2023-06-01T10:30:00Z",
    productName: "Product A",
    movementType: "New Stock",
    quantity: 100,
    user: "John Doe",
    supplier: "Supplier X",
    notes: "Initial stock order",
  },
  {
    id: 2,
    date: "2023-06-02T14:45:00Z",
    productName: "Product B",
    movementType: "Consumption",
    quantity: -50,
    user: "Jane Smith",
    notes: "Used in production",
  },
  {
    id: 3,
    date: "2023-06-03T09:15:00Z",
    productName: "Product C",
    movementType: "Damage",
    quantity: -10,
    user: "Mike Johnson",
    notes: "Damaged during transportation",
  }
]

export default function StockMovementsAndAdjustmentsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })
  const [selectedProduct, setSelectedProduct] = useState("All Products")
  const [selectedMovementType, setSelectedMovementType] = useState("All Types")
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" })
  const [newMovement, setNewMovement] = useState({
    product: "",
    quantity: "",
    movementType: "",
    date: new Date(),
    supplier: "",
    notes: "",
  })
  const [selectedMovement, setSelectedMovement] = useState(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const itemsPerPage = 10

  // Filter and sort data
  const filteredData = mockStockMovements
    .filter((movement) => {
      const matchesSearch = Object.values(movement).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase()),
      )
      const matchesProduct = selectedProduct === "All Products" || movement.productName === selectedProduct
      const matchesMovementType = selectedMovementType === "All Types" || movement.movementType === selectedMovementType
      const matchesDateRange =
        (!dateRange.from || new Date(movement.date) >= dateRange.from) &&
        (!dateRange.to || new Date(movement.date) <= dateRange.to)

      return matchesSearch && matchesProduct && matchesMovementType && matchesDateRange
    })
    .sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
    })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    })
  }

  const handleAddMovement = (e) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("New movement:", newMovement)
    toast({
      title: "Stock Movement Added",
      description: `A new stock movement has been recorded for ${newMovement.product}.`,
    })
    // Reset form
    setNewMovement({
      product: "",
      quantity: "",
      movementType: "",
      date: new Date(),
      supplier: "",
      notes: "",
    })
  }

  const handleExport = () => {
    // Implement export logic here
    toast({
      title: "Exporting Data",
      description: "Your export has started. You'll be notified when it's ready.",
    })
  }

  const openDetailsDialog = (movement) => {
    setSelectedMovement(movement)
    setIsDetailsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Stock Movements & Adjustments</h2>
          <p className="text-muted-foreground">Manage and track your inventory changes</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4 text-blue-500" /> Export Data
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Stock Movement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddMovement} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select
                  value={newMovement.product}
                  onValueChange={(value) => setNewMovement({ ...newMovement, product: value })}
                >
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map((product) => (
                      <SelectItem key={product.id} value={product.name}>
                        <div className="flex items-center">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-6 h-6 mr-2 rounded"
                          />
                          {product.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newMovement.quantity}
                  onChange={(e) => setNewMovement({ ...newMovement, quantity: e.target.value })}
                  placeholder="Enter quantity"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="movementType">Movement Type</Label>
                <Select
                  value={newMovement.movementType}
                  onValueChange={(value) => setNewMovement({ ...newMovement, movementType: value })}
                >
                  <SelectTrigger id="movementType">
                    <SelectValue placeholder="Select movement type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Damage">Damage</SelectItem>
                    <SelectItem value="Loss">Loss</SelectItem>
                    <SelectItem value="Correction">Correction</SelectItem>
                    <SelectItem value="New Stock">New Stock</SelectItem>
                    <SelectItem value="Consumption">Consumption</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${
                        !newMovement.date && "text-muted-foreground"
                      }`}
                    >
                      {newMovement.date ? format(newMovement.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newMovement.date}
                      onSelect={(date) => setNewMovement({ ...newMovement, date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {newMovement.movementType === "New Stock" && (
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Select
                    value={newMovement.supplier}
                    onValueChange={(value) => setNewMovement({ ...newMovement, supplier: value })}
                  >
                    <SelectTrigger id="supplier">
                      <SelectValue placeholder="Select a supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSuppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.name}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-2 col-span-full">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={newMovement.notes}
                  onChange={(e) => setNewMovement({ ...newMovement, notes: e.target.value })}
                  placeholder="Add any additional notes"
                />
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto bg-blue-500 text-white hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" /> Add Movement
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stock Movements Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search movements..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Products">All Products</SelectItem>
                    {mockProducts.map((product) => (
                      <SelectItem key={product.id} value={product.name}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={selectedMovementType} onValueChange={setSelectedMovementType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Movement Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Types">All Types</SelectItem>
                    <SelectItem value="New Stock">Stock In</SelectItem>
                    <SelectItem value="Consumption">Stock Out</SelectItem>
                    <SelectItem value="Damage">Damage</SelectItem>
                    <SelectItem value="Loss">Loss</SelectItem>
                    <SelectItem value="Correction">Correction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${
                        !dateRange.from && "text-muted-foreground"
                      }`}
                    >
                      {dateRange.from ? format(dateRange.from, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${
                        !dateRange.to && "text-muted-foreground"
                      }`}
                    >
                      {dateRange.to ? format(dateRange.to, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort("date")} className="cursor-pointer">
                    Date <ArrowUpDown className="w-4 h-4 inline" />
                  </TableHead>
                  <TableHead onClick={() => handleSort("productName")} className="cursor-pointer">
                    Product <ArrowUpDown className="w-4 h-4 inline" />
                  </TableHead>
                  <TableHead onClick={() => handleSort("movementType")} className="cursor-pointer">
                    Movement Type <ArrowUpDown className="w-4 h-4 inline" />
                  </TableHead>
                  <TableHead onClick={() => handleSort("quantity")} className="cursor-pointer">
                    Quantity <ArrowUpDown className="w-4 h-4 inline" />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>{format(new Date(movement.date), "PPP")}</TableCell>
                    <TableCell>{movement.productName}</TableCell>
                    <TableCell>{movement.movementType}</TableCell>
                    <TableCell>{movement.quantity}</TableCell>
                    <TableCell>{movement.user}</TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={() => openDetailsDialog(movement)} className="hover:bg-blue-100">
                        <Eye className="w-4 h-4 text-blue-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = i + 1
                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={currentPage === pageNumber ? "bg-blue-500 text-white" : ""}
                  >
                    {pageNumber}
                  </Button>
                )
              })}
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stock Movement Details</DialogTitle>
            <DialogDescription>Detailed information about the selected stock movement.</DialogDescription>
          </DialogHeader>
          {selectedMovement && (
            <div className="space-y-4">
              <div>
                <Label className="font-bold">Date and Time:</Label>
                <p>{format(new Date(selectedMovement.date), "PPP p")}</p>
              </div>
              <div>
                <Label className="font-bold">Product:</Label>
                <p>{selectedMovement.productName}</p>
              </div>
              <div>
                <Label className="font-bold">Movement Type:</Label>
                <p>{selectedMovement.movementType}</p>
              </div>
              <div>
                <Label className="font-bold">Quantity:</Label>
                <p>{selectedMovement.quantity}</p>
              </div>
              <div>
                <Label className="font-bold">Performed By:</Label>
                <p>{selectedMovement.user}</p>
              </div>
              {selectedMovement.movementType === "New Stock" && (
                <div>
                  <Label className="font-bold">Supplier:</Label>
                  <p>{selectedMovement.supplier}</p>
                </div>
              )}
              <div>
                <Label className="font-bold">Notes:</Label>
                <p>{selectedMovement.notes || "No additional notes"}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

