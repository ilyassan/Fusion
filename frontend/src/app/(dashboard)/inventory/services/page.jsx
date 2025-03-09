"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Search, Plus, ChevronLeft, ChevronRight, ArrowUpDown, Edit, Trash2, DollarSign, Percent } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data for services and categories
const mockCategories = [
  { id: 1, name: "Consulting", serviceCount: 5 },
  { id: 2, name: "Training", serviceCount: 3 },
  { id: 3, name: "Support", serviceCount: 4 },
  { id: 4, name: "Development", serviceCount: 6 },
  { id: 5, name: "Design", serviceCount: 2 },
]

const mockServices = [
  {
    id: 1,
    name: "Business Strategy Consultation",
    description: "Comprehensive business strategy consultation for startups and SMEs",
    price: 1500,
    tax: 0.1,
    category: "Consulting",
  },
  {
    id: 2,
    name: "Web Development Workshop",
    description: "Hands-on workshop covering modern web development techniques",
    price: 800,
    tax: 0.08,
    category: "Training",
  },
  // Add more mock services as needed
]

export default function ServicesManagementPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [selectedService, setSelectedService] = useState(null)
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false)
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
  })
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  })
  const [services, setServices] = useState(mockServices)
  const [categories, setCategories] = useState(mockCategories)
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, type: null, id: null })
  const [editingCategoryId, setEditingCategoryId] = useState(null)

  const itemsPerPage = 10

  // Filter and sort data
  const filteredData = services
    .filter((service) => {
      const matchesSearch = Object.values(service).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase()),
      )
      const matchesCategory = filters.category === "all" || service.category === filters.category
      const matchesPriceRange = filters.priceRange === "all" || getPriceRange(service.price) === filters.priceRange

      return matchesSearch && matchesCategory && matchesPriceRange
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

  const handleAddService = (newService) => {
    setServices([...services, { ...newService, id: services.length + 1 }])
    setIsAddServiceModalOpen(false)
    toast({
      title: "Service Added",
      description: `${newService.name} has been added to the services.`,
    })
  }

  const handleUpdateService = (updatedService) => {
    setServices(services.map((s) => (s.id === updatedService.id ? updatedService : s)))
    setSelectedService(null)
    toast({
      title: "Service Updated",
      description: `${updatedService.name} has been updated.`,
    })
  }

  const handleDeleteService = (id) => {
    setServices(services.filter((s) => s.id !== id))
    setDeleteConfirmation({ isOpen: false, type: null, id: null })
    toast({
      title: "Service Deleted",
      description: "The service has been removed from the list.",
      variant: "destructive",
    })
  }

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, { ...newCategory, id: categories.length + 1, serviceCount: 0 }])
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

  const getPriceRange = (price) => {
    if (price < 500) return "low"
    if (price < 1000) return "medium"
    return "high"
  }

  return (
    <div className="space-y-6 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Services Management</h2>
          <p className="text-gray-500">Manage your service offerings and categories</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            onClick={() => setIsAddServiceModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service
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
                placeholder="Search services..."
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
            <Select value={filters.priceRange} onValueChange={(value) => setFilters({ ...filters, priceRange: value })}>
              <SelectTrigger>
                <SelectValue placeholder="All Price Ranges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Price Ranges</SelectItem>
                <SelectItem value="low">Low (&lt; $500)</SelectItem>
                <SelectItem value="medium">Medium ($500 - $999)</SelectItem>
                <SelectItem value="high">High (&ge; $1000)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

    {/* Services Table */}
    <Card>
        <CardContent className="p-0 overflow-x-auto">
            {currentData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
                <h2 className="text-xl font-semibold text-gray-600">No services found</h2>
            </div>
            ) : (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                    Service Name <ArrowUpDown className="h-4 w-4 inline" />
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead onClick={() => handleSort("price")} className="cursor-pointer">
                    Price <ArrowUpDown className="h-4 w-4 inline" />
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {currentData.map((service) => (
                    <TableRow key={service.id}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{service.description.substring(0, 50)}...</TableCell>
                    <TableCell>${service.price.toFixed(2)}</TableCell>
                    <TableCell className="hidden md:table-cell">{service.category}</TableCell>
                    <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => setSelectedService(service)} className="mr-2">
                        <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => setDeleteConfirmation({ isOpen: true, type: "service", id: service.id })}
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

      {/* Categories Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Service Categories</h3>
          <div className="overflow-x-auto">
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
                    <TableCell>
                      {editingCategoryId === category.id ? (
                        <Input
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
                    <TableCell>{category.serviceCount}</TableCell>
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
                        onClick={() =>
                          setDeleteConfirmation({
                            isOpen: true,
                            type: "category",
                            id: category.id,
                          })
                        }
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

      {/* Service Details Modal */}
      <ServiceDetailsModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onUpdateService={handleUpdateService}
        categories={categories}
      />

      {/* Add Service Modal */}
      <AddServiceModal
        isOpen={isAddServiceModalOpen}
        onClose={() => setIsAddServiceModalOpen(false)}
        onAddService={handleAddService}
        categories={categories}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAddCategory={handleAddCategory}
      />

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
                if (deleteConfirmation.type === "service") {
                  handleDeleteService(deleteConfirmation.id)
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

function ServiceDetailsModal({ service, onClose, onUpdateService, categories }) {
  if (!service) return null

  const [editedService, setEditedService] = useState(service)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedService((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onUpdateService(editedService)
  }

  return (
    <Dialog open={!!service} onOpenChange={onClose}>
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
                      name="category"
                      value={editedService.category}
                      onValueChange={(value) => handleInputChange({ target: { name: "category", value } })}
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
  )
}

function AddServiceModal({ isOpen, onClose, onAddService, categories }) {
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: 0,
    tax: 0,
    category: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewService((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddService(newService)
    setNewService({
      name: "",
      description: "",
      price: 0,
      tax: 0,
      category: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Service</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Service Name</Label>
              <Input id="name" name="name" value={newService.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newService.description}
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
                    value={newService.price}
                    onChange={handleInputChange}
                    required
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <Label htmlFor="tax">Tax Rate</Label>
                <div className="relative">
                  <Input
                    id="tax"
                    name="tax"
                    type="number"
                    value={newService.tax}
                    onChange={handleInputChange}
                    required
                  />
                  <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                value={newService.category}
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
          <DialogFooter>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Add Service
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

