"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Edit,
  Trash2,
  DollarSign,
  Percent,
  Package,
  Info,
  Activity,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data for products and categories
const mockCategories = [
  { id: 1, name: "Electronics", productCount: 150 },
  { id: 2, name: "Clothing", productCount: 200 },
  { id: 3, name: "Home & Garden", productCount: 100 },
  { id: 4, name: "Books", productCount: 300 },
  { id: 5, name: "Toys", productCount: 75 },
]

const mockProducts = [
  {
    id: 1,
    name: "Smartphone X",
    sku: "PHNE-001",
    barcode: "123456789",
    description: "Latest model smartphone with advanced features",
    price: 699.99,
    cost: 450,
    tax: 0.08,
    supplier: "TechGadgets Inc.",
    warehouse: "Main Warehouse",
    currentStock: 50,
    minStockLevel: 10,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Classic T-Shirt",
    sku: "SHRT-001",
    barcode: "987654321",
    description: "Comfortable cotton t-shirt in various colors",
    price: 19.99,
    cost: 5,
    tax: 0.06,
    supplier: "FashionWear Co.",
    warehouse: "Apparel Storage",
    currentStock: 200,
    minStockLevel: 50,
    category: "Clothing",
  },
  // Add more mock products as needed
]

const stockLevelColors = {
  low: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-blue-100 text-blue-800",
}

export default function ProductsAndCategoriesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: "all",
    stockStatus: "all",
  })
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  })
  const [products, setProducts] = useState(mockProducts)
  const [categories, setCategories] = useState(mockCategories)
  const [editingCategoryId, setEditingCategoryId] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, type: null, id: null })

  const editInputRef = useRef(null)

  const itemsPerPage = 10

  useEffect(() => {
    if (editingCategoryId !== null && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingCategoryId])

  // Filter and sort data
  const filteredData = products
    .filter((product) => {
      const matchesSearch = Object.values(product).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase()),
      )
      const matchesCategory = filters.category === "all" || product.category === filters.category
      const matchesStockStatus =
        filters.stockStatus === "all" ||
        (filters.stockStatus === "low" && product.currentStock <= product.minStockLevel) ||
        (filters.stockStatus === "medium" &&
          product.currentStock > product.minStockLevel &&
          product.currentStock <= product.minStockLevel * 2) ||
        (filters.stockStatus === "high" && product.currentStock > product.minStockLevel * 2)

      return matchesSearch && matchesCategory && matchesStockStatus
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

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }])
    setIsAddProductModalOpen(false)
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to the inventory.`,
    })
  }

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
    setSelectedProduct(null)
    toast({
      title: "Product Updated",
      description: `${updatedProduct.name} has been updated.`,
    })
  }

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id))
    setDeleteConfirmation({ isOpen: false, type: null, id: null })
    toast({
      title: "Product Deleted",
      description: "The product has been removed from the inventory.",
      variant: "destructive",
    })
  }

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, { ...newCategory, id: categories.length + 1, productCount: 0 }])
    setIsAddCategoryModalOpen(false)
    toast({
      title: "Category Added",
      description: `${newCategory.name} has been added to the categories.`,
    })
  }

  const handleUpdateCategory = (id, newName) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, name: newName } : c)))
    setEditingCategoryId(null)
    toast({
      title: "Category Updated",
      description: `Category has been renamed to ${newName}.`,
    })
  }

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id))
    setDeleteConfirmation({ isOpen: false, type: null, id: null })
    toast({
      title: "Category Deleted",
      description: "The category has been removed.",
      variant: "destructive",
    })
  }

  const getStockLevelColor = (currentStock, minStockLevel) => {
    if (currentStock <= minStockLevel) return stockLevelColors.low
    if (currentStock <= minStockLevel * 2) return stockLevelColors.medium
    return stockLevelColors.high
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Products Management</h2>
          <p className="text-gray-500">Manage your inventory items and categories</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            onClick={() => setIsAddProductModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            onClick={() => setIsAddCategoryModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.stockStatus}
              onValueChange={(value) => setFilters({ ...filters, stockStatus: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Stock Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock Levels</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="medium">Medium Stock</SelectItem>
                <SelectItem value="high">High Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
        {currentData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
                <h2 className="text-xl font-semibold text-gray-600">No products found</h2>
            </div>
        )
        :(
          <Table className="min-w-[400px]">
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                  Product Name <ArrowUpDown className="h-4 w-4 inline" />
                </TableHead>
                <TableHead className="hidden md:table-cell">SKU</TableHead>
                <TableHead onClick={() => handleSort("price")} className="cursor-pointer">
                  Price <ArrowUpDown className="h-4 w-4 inline" />
                </TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead onClick={() => handleSort("currentStock")} className="cursor-pointer">
                  Stock <ArrowUpDown className="h-4 w-4 inline" />
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.sku}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                  <TableCell>
                    <Badge className={getStockLevelColor(product.currentStock, product.minStockLevel)}>
                      {product.currentStock}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => setSelectedProduct(product)} className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => setDeleteConfirmation({ isOpen: true, type: "product", id: product.id })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)}{" "}
          of {filteredData.length} entries
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = i + 1
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "outline"}
                onClick={() => setCurrentPage(pageNumber)}
                className={currentPage === pageNumber ? "bg-blue-600 hover:bg-blue-700" : "bg-white hover:bg-gray-100"}
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
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onUpdateProduct={handleUpdateProduct}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onAddProduct={handleAddProduct}
        categories={categories}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAddCategory={handleAddCategory}
      />

      {/* Categories Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Product Categories</h3>
          <div className="overflow-x-auto">
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
                    <TableCell>
                      {editingCategoryId === category.id ? (
                        <Input
                          ref={editInputRef}
                          defaultValue={category.name}
                          onBlur={(e) => handleUpdateCategory(category.id, e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleUpdateCategory(category.id, e.target.value)
                            }
                          }}
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
                        className="mr-2"
                        onClick={() => setEditingCategoryId(category.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => setDeleteConfirmation({ isOpen: true, type: "category", id: category.id })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteConfirmation.isOpen}
        onOpenChange={(isOpen) => setDeleteConfirmation({ ...deleteConfirmation, isOpen })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {deleteConfirmation.type} from the
              database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteConfirmation.type === "product") {
                  handleDeleteProduct(deleteConfirmation.id)
                } else if (deleteConfirmation.type === "category") {
                  handleDeleteCategory(deleteConfirmation.id)
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
  )
}

function ProductDetailsModal({ product, onClose, onUpdateProduct }) {
  if (!product) return null

  const [editedProduct, setEditedProduct] = useState(product)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onUpdateProduct(editedProduct)
  }

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">Product Details - {product.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50 p-1 rounded-lg">
            <TabsTrigger value="info" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Info className="w-4 h-4 mr-2" />
              Information
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="stock" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              Stock
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4">
            <TabsContent value="info">
              <div className="space-y-4 p-0.5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label className="font-semibold text-gray-700">Product Name</Label>
                    <Input
                      name="name"
                      value={editedProduct.name}
                      onChange={handleInputChange}
                      className="focus-visible:ring-blue-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-semibold text-gray-700">SKU Code</Label>
                    <Input
                      name="sku"
                      value={editedProduct.sku}
                      onChange={handleInputChange}
                      className="focus-visible:ring-blue-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-semibold text-gray-700">Barcode</Label>
                    <Input
                      name="barcode"
                      value={editedProduct.barcode}
                      onChange={handleInputChange}
                      className="focus-visible:ring-blue-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="font-semibold text-gray-700">Product Description</Label>
                  <Textarea
                    name="description"
                    value={editedProduct.description}
                    onChange={handleInputChange}
                    className="min-h-[80px] focus-visible:ring-blue-200"
                  />
                </div>

                <div className="rounded-lg border p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-gray-600">Retail Price</Label>
                      <div className="relative">
                        <Input
                          name="price"
                          type="number"
                          value={editedProduct.price}
                          onChange={handleInputChange}
                          className="pl-8 focus-visible:ring-blue-200"
                        />
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-600">Cost Price</Label>
                      <div className="relative">
                        <Input
                          name="cost"
                          type="number"
                          value={editedProduct.cost}
                          onChange={handleInputChange}
                          className="pl-8 focus-visible:ring-blue-200"
                        />
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-gray-600">Tax Rate</Label>
                      <div className="relative">
                        <Input
                          name="tax"
                          type="number"
                          value={editedProduct.tax}
                          onChange={handleInputChange}
                          className="pl-8 focus-visible:ring-blue-200"
                        />
                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inventory">
              <div className="space-y-4 p-0.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="font-semibold text-gray-700">Current Stock Level</Label>
                    <div className="relative">
                      <Input
                        name="currentStock"
                        type="number"
                        value={editedProduct.currentStock}
                        onChange={handleInputChange}
                        className="focus-visible:ring-blue-200"
                      />
                      <Package className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-semibold text-gray-700">Minimum Stock Level</Label>
                    <Input
                      name="minStockLevel"
                      type="number"
                      value={editedProduct.minStockLevel}
                      onChange={handleInputChange}
                      className="focus-visible:ring-blue-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="font-semibold text-gray-700">Warehouse Location</Label>
                    <Select
                      name="warehouse"
                      value={editedProduct.warehouse}
                      onValueChange={(value) => handleInputChange({ target: { name: "warehouse", value } })}
                    >
                      <SelectTrigger className="focus-visible:ring-blue-200">
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Warehouse</SelectItem>
                        <SelectItem value="secondary">Secondary Warehouse</SelectItem>
                        <SelectItem value="offsite">Offsite Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-semibold text-gray-700">Primary Supplier</Label>
                    <Select
                      name="supplier"
                      value={editedProduct.supplier}
                      onValueChange={(value) => handleInputChange({ target: { name: "supplier", value } })}
                    >
                      <SelectTrigger className="focus-visible:ring-blue-200">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supplier1">Supplier 1</SelectItem>
                        <SelectItem value="supplier2">Supplier 2</SelectItem>
                        <SelectItem value="supplier3">Supplier 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stock">
              <div className="space-y-4 p-0.5">
                <div className="rounded-lg border overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-blue-50">
                      <TableRow>
                        <TableHead className="text-blue-600">Date</TableHead>
                        <TableHead className="text-blue-600">Activity</TableHead>
                        <TableHead className="text-blue-600">Quantity</TableHead>
                        <TableHead className="text-blue-600">Performed By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell>2023-06-01</TableCell>
                        <TableCell>Stock Added</TableCell>
                        <TableCell className="text-green-600">+50</TableCell>
                        <TableCell>John Doe</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell>2023-06-15</TableCell>
                        <TableCell>Stock Removed</TableCell>
                        <TableCell className="text-red-600">-20</TableCell>
                        <TableCell>Jane Smith</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="rounded-lg border p-4 bg-gray-50">
                  <h3 className="font-semibold text-gray-800 mb-3">Stock Adjustment</h3>
                  <div className="flex flex-col md:flex-row gap-3">
                    <Input type="number" placeholder="Enter quantity" className="flex-1 focus-visible:ring-blue-200" />
                    <Select defaultValue="add">
                      <SelectTrigger className="w-full md:w-[150px] focus-visible:ring-blue-200">
                        <SelectValue placeholder="Action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="add">Add Stock</SelectItem>
                        <SelectItem value="remove">Remove Stock</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-semibold">
                      Confirm Adjustment
                    </Button>
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
  )
}

function AddProductModal({ isOpen, onClose, onAddProduct, categories }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    barcode: "",
    description: "",
    price: 0,
    cost: 0,
    tax: 0,
    supplier: "",
    warehouse: "",
    initialStock: 0,
    minStockLevel: 0,
    category: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddProduct(newProduct)
    setNewProduct({
      name: "",
      sku: "",
      barcode: "",
      description: "",
      price: 0,
      cost: 0,
      tax: 0,
      supplier: "",
      warehouse: "",
      initialStock: 0,
      minStockLevel: 0,
      category: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={newProduct.name} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" name="sku" value={newProduct.sku} onChange={handleInputChange} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <div className="relative">
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        required
                      />
                      <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      name="category"
                      value={newProduct.category}
                      onValueChange={(value) => handleInputChange({ target: { name: "category", value } })}
                    >
                      <SelectTrigger>
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
              </div>
            </TabsContent>
            <TabsContent value="details">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input id="barcode" name="barcode" value={newProduct.barcode} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select
                      name="supplier"
                      value={newProduct.supplier}
                      onValueChange={(value) => handleInputChange({ target: { name: "supplier", value } })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supplier1">Supplier 1</SelectItem>
                        <SelectItem value="supplier2">Supplier 2</SelectItem>
                        <SelectItem value="supplier3">Supplier 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cost">Cost</Label>
                    <div className="relative">
                      <Input
                        id="cost"
                        name="cost"
                        type="number"
                        value={newProduct.cost}
                        onChange={handleInputChange}
                        required
                      />
                      <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="tax">Tax</Label>
                    <div className="relative">
                      <Input
                        id="tax"
                        name="tax"
                        type="number"
                        value={newProduct.tax}
                        onChange={handleInputChange}
                        required
                      />
                      <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="warehouse">Warehouse</Label>
                    <Select
                      name="warehouse"
                      value={newProduct.warehouse}
                      onValueChange={(value) => handleInputChange({ target: { name: "warehouse", value } })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Warehouse</SelectItem>
                        <SelectItem value="secondary">Secondary Warehouse</SelectItem>
                        <SelectItem value="offsite">Offsite Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="initialStock">Initial Stock</Label>
                    <div className="relative">
                      <Input
                        id="initialStock"
                        name="initialStock"
                        type="number"
                        value={newProduct.initialStock}
                        onChange={handleInputChange}
                        required
                      />
                      <Package className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="minStockLevel">Minimum Stock Level</Label>
                    <Input
                      id="minStockLevel"
                      name="minStockLevel"
                      type="number"
                      value={newProduct.minStockLevel}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function AddCategoryModal({ isOpen, onClose, onAddCategory }) {
  const [newCategory, setNewCategory] = useState({
    name: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCategory((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddCategory(newCategory)
    setNewCategory({
      name: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              placeholder="Category Name"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Add Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

