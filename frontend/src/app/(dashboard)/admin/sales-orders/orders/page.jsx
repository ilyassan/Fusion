"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, Download, Eye, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react"

// Mock data for pending orders
const mockPendingOrders = [
  {
    id: "ORD001",
    customerName: "John Doe",
    type: "Product",
    itemName: "Laptop",
    quantity: 1,
    price: 999.99,
    orderDate: "2024-03-01",
    status: "Pending",
    email: "john.doe@example.com",
    phone: "+1 234-567-8900",
    shippingAddress: "123 Main St, Anytown, AN 12345",
    shippingMethod: "Standard",
  },
  {
    id: "ORD002",
    customerName: "Jane Smith",
    type: "Service",
    itemName: "Website Design",
    quantity: "N/A",
    price: 1500,
    orderDate: "2024-03-02",
    status: "Pending",
    email: "jane.smith@example.com",
    phone: "+1 234-567-8901",
    scheduledDate: "2024-03-15",
    serviceDescription: "Custom e-commerce website design and development",
  },
  {
    id: "ORD003",
    customerName: "Bob Johnson",
    type: "Product",
    itemName: "Smartphone",
    quantity: 2,
    price: 1599.98,
    orderDate: "2024-03-03",
    status: "Pending",
    email: "bob.johnson@example.com",
    phone: "+1 234-567-8902",
    shippingAddress: "456 Elm St, Othertown, OT 67890",
    shippingMethod: "Express",
  },
  ...(function() {
    const orders = []
    
    for (let i = 4; i <= 100; i++){
      orders.push({
        id: `ORD00${i}`,
        customerName: `Customer ${i}`,
        type: i % 2 === 0 ? "Product" : "Service",
        itemName: i % 2 === 0 ? "Product" : "Service",
        quantity: i % 2 === 0 ? 1 : "N/A",
        price: i * 10,
        orderDate: `2024-03-${i < 10 ? `0${i}` : i}`,
        status: "Pending",
        email: "bob.johnson@example.com",
        phone: "+1 234-567-8902",
        shippingAddress: "456 Elm St, Othertown, OT 67890",
        shippingMethod: "Express"
    })
  }
  return orders;
})()
]

export default function PendingOrdersPage() {
  const [orders, setOrders] = useState(mockPendingOrders)
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    orderType: "All",
    status: "All",
    dateFrom: "",
    dateTo: "",
  })
  const [selectedOrders, setSelectedOrders] = useState([])
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState({ type: "" })
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter and search logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.itemName.toLowerCase().includes(search.toLowerCase())

    const matchesType = filters.orderType === "All" || order.type === filters.orderType
    const matchesStatus = filters.status === "All" || order.status === filters.status
    const matchesDateRange =
      (!filters.dateFrom || order.orderDate >= filters.dateFrom) &&
      (!filters.dateTo || order.orderDate <= filters.dateTo)

    return matchesSearch && matchesType && matchesStatus && matchesDateRange
  })

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Action handlers
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders
        .map((order) => {
          if (order.id === orderId) {
            if (newStatus === "Completed") {
              // Remove the order if it's marked as completed
              return null
            }
            return { ...order, status: newStatus }
          }
          return order
        })
        .filter(Boolean),
    )
    setIsConfirmModalOpen(false)
  }

  const handleBulkAction = (action) => {
    if (action === "export") {
      // Implement export logic
      console.log("Exporting selected orders:", selectedOrders)
    } else {
      const newStatus = action === "complete" ? "Completed" : "Canceled"
      setOrders(
        orders
          .filter((order) => {
            if (selectedOrders.includes(order.id)) {
              return newStatus !== "Completed"
            }
            return true
          })
          .map((order) => (selectedOrders.includes(order.id) ? { ...order, status: newStatus } : order)),
      )
      setSelectedOrders([])
    }
    setIsConfirmModalOpen(false)
  }

  const openDetailsModal = (order) => {
    setSelectedOrder(order)
    setIsDetailsModalOpen(true)
  }

  const openConfirmModal = (action, orderId) => {
    setConfirmAction({ type: action, orderId })
    setIsConfirmModalOpen(true)
  }

  // Status badge color mapping
  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Canceled: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pending Orders</h1>
          <p className="text-gray-500">Manage and track all pending orders</p>
        </div>
        <Button onClick={() => openConfirmModal("export")} className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <Input
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filters.orderType} onValueChange={(value) => setFilters({ ...filters, orderType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Order Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Service">Service</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
            <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.dateFrom && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateFrom ? format(new Date(filters.dateFrom), "PPP") : <span>From</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateFrom ? new Date(filters.dateFrom) : undefined}
                    onSelect={(date) =>
                      setFilters({ ...filters, dateFrom: date ? date.toISOString().split("T")[0] : "" })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.dateTo && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateTo ? format(new Date(filters.dateTo), "PPP") : <span>To</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateTo ? new Date(filters.dateTo) : undefined}
                    onSelect={(date) =>
                      setFilters({ ...filters, dateTo: date ? date.toISOString().split("T")[0] : "" })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center sm:justify-between items-center">
        {/* Bulk Actions */}
        <div className="flex sm:flex-row flex-col sm:space-x-2 gap-y-2">
          <Button
            variant="outline"
            onClick={() => openConfirmModal("complete")}
            disabled={selectedOrders.length === 0}
            className="bg-green-100 text-green-800 hover:bg-green-200"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark as Completed
          </Button>
          <Button
            variant="outline"
            onClick={() => openConfirmModal("cancel")}
            disabled={selectedOrders.length === 0}
            className="bg-red-100 text-red-800 hover:bg-red-200"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel Orders
          </Button>
        </div>
        <span className="text-sm hidden sm:block font-medium text-gray-500">Total Pending Orders: {filteredOrders.length}</span>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedOrders.length === currentOrders.length}
                    onCheckedChange={(checked) => {
                      setSelectedOrders(checked ? currentOrders.map((order) => order.id) : [])
                    }}
                    className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 focus:ring-blue-500"
                  />
                </TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={(checked) => {
                        setSelectedOrders(
                          checked ? [...selectedOrders, order.id] : selectedOrders.filter((id) => id !== order.id),
                        )
                      }}
                      className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 focus:ring-blue-500"
                    />
                  </TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>{order.itemName}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.price.toFixed(2)}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openDetailsModal(order)}
                        className="hover:bg-blue-100"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openConfirmModal("complete", order.id)}
                        className="hover:bg-green-100"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openConfirmModal("cancel", order.id)}
                        className="hover:bg-red-100"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="bg-white hover:bg-gray-100"
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
            className="bg-white hover:bg-gray-100"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Order Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Order Information</h4>
                  <p>Order ID: {selectedOrder.id}</p>
                  <p>Date: {selectedOrder.orderDate}</p>
                  <p>Type: {selectedOrder.type}</p>
                  <p>Status: {selectedOrder.status}</p>
                </div>
                <div>
                  <h4 className="font-medium">Customer Information</h4>
                  <p>Name: {selectedOrder.customerName}</p>
                  <p>Email: {selectedOrder.email}</p>
                  <p>Phone: {selectedOrder.phone}</p>
                </div>
              </div>

              {selectedOrder.type === "Product" ? (
                <div>
                  <h4 className="font-medium">Product Details</h4>
                  <p>Product: {selectedOrder.itemName}</p>
                  <p>Quantity: {selectedOrder.quantity}</p>
                  <p>Shipping Address: {selectedOrder.shippingAddress}</p>
                  <p>Shipping Method: {selectedOrder.shippingMethod}</p>
                </div>
              ) : (
                <div>
                  <h4 className="font-medium">Service Details</h4>
                  <p>Service: {selectedOrder.itemName}</p>
                  <p>Scheduled Date: {selectedOrder.scheduledDate}</p>
                  <p>Description: {selectedOrder.serviceDescription}</p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDetailsModalOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    openConfirmModal("complete", selectedOrder.id)
                    setIsDetailsModalOpen(false)
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Mark as Completed
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              {confirmAction.type === "complete" && "Are you sure you want to mark this order as completed?"}
              {confirmAction.type === "cancel" && "Are you sure you want to cancel this order?"}
              {confirmAction.type === "export" && "Are you sure you want to export the selected orders?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (confirmAction.type === "complete") {
                  handleStatusChange(confirmAction.orderId, "Completed")
                } else if (confirmAction.type === "cancel") {
                  handleStatusChange(confirmAction.orderId, "Canceled")
                } else if (confirmAction.type === "export") {
                  handleBulkAction("export")
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

