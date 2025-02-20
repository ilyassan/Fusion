"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Download, ChevronLeft, ChevronRight, ArrowUpDown, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Mock data (unchanged)
const mockSalesData = [
  {
    id: 1,
    date: "2024-03-01",
    customer: "John Doe",
    product: "Laptop",
    category: "Electronics",
    amount: 1200,
    status: "Completed",
  },
  {
    id: 2,
    date: "2024-03-05",
    customer: "Jane Smith",
    product: "T-Shirt",
    category: "Clothing",
    amount: 25,
    status: "Pending",
  },
  {
    id: 3,
    date: "2024-03-10",
    customer: "Peter Jones",
    product: "Pizza",
    category: "Food",
    amount: 15,
    status: "Completed",
  },
  {
    id: 4,
    date: "2024-03-15",
    customer: "Mary Brown",
    product: "Novel",
    category: "Books",
    amount: 20,
    status: "Shipped",
  },
  {
    id: 5,
    date: "2024-03-20",
    customer: "David Green",
    product: "Basketball",
    category: "Sports",
    amount: 50,
    status: "Processing",
  },
  {
    id: 6,
    date: "2024-03-25",
    customer: "Sarah White",
    product: "Headphones",
    category: "Electronics",
    amount: 150,
    status: "Completed",
  },
  {
    id: 7,
    date: "2024-03-30",
    customer: "Tom Black",
    product: "Jeans",
    category: "Clothing",
    amount: 40,
    status: "Pending",
  },
  {
    id: 8,
    date: "2024-04-03",
    customer: "Jessica Gray",
    product: "Burger",
    category: "Food",
    amount: 12,
    status: "Completed",
  },
  {
    id: 9,
    date: "2024-04-08",
    customer: "Kevin Blue",
    product: "Textbook",
    category: "Books",
    amount: 30,
    status: "Shipped",
  },
  {
    id: 10,
    date: "2024-04-13",
    customer: "Ashley Purple",
    product: "Soccer Ball",
    category: "Sports",
    amount: 60,
    status: "Processing",
  },
  {
    id: 11,
    date: "2024-04-18",
    customer: "Christopher Orange",
    product: "Smartwatch",
    category: "Electronics",
    amount: 200,
    status: "Completed",
  },
  {
    id: 12,
    date: "2024-04-23",
    customer: "Amanda Yellow",
    product: "Dress",
    category: "Clothing",
    amount: 65,
    status: "Pending",
  },
  {
    id: 13,
    date: "2024-04-28",
    customer: "Brian Green",
    product: "Salad",
    category: "Food",
    amount: 8,
    status: "Completed",
  },
  {
    id: 14,
    date: "2024-05-03",
    customer: "Melissa Brown",
    product: "Cookbook",
    category: "Books",
    amount: 25,
    status: "Shipped",
  },
  {
    id: 15,
    date: "2024-05-08",
    customer: "Andrew White",
    product: "Tennis Racket",
    category: "Sports",
    amount: 75,
    status: "Processing",
  },
]

const trendData = [
  { date: "2024-03-01", sales: 1200 },
  { date: "2024-03-08", sales: 1500 },
  { date: "2024-03-15", sales: 1800 },
  { date: "2024-03-22", sales: 2100 },
  { date: "2024-03-29", sales: 2400 },
  { date: "2024-04-05", sales: 2700 },
  { date: "2024-04-12", sales: 3000 },
  { date: "2024-04-19", sales: 3300 },
  { date: "2024-04-26", sales: 3600 },
]

export default function SalesReportsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    dateFrom: "",
    dateTo: "",
  })
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  })

  const itemsPerPage = 10

  // Filter and sort data
  const filteredData = mockSalesData
    .filter((sale) => {
      const matchesSearch = Object.values(sale).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase()),
      )

      const matchesCategory = !filters.category || filters.category === "all" || sale.category === filters.category
      const matchesDateRange =
        (!filters.dateFrom || sale.date >= filters.dateFrom) && (!filters.dateTo || sale.date <= filters.dateTo)

      return matchesSearch && matchesCategory && matchesDateRange
    })
    .sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
    })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle sort
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    })
  }

  // Export data as CSV
  const exportCSV = () => {
    const csvData = [Object.keys(mockSalesData[0])].concat(mockSalesData.map((sale) => Object.values(sale)))
    const csvString = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvString], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sales_report.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Sales Reports</h2>
          <p className="text-gray-500">Detailed view of all sales transactions</p>
        </div>
        <Button onClick={exportCSV} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
              </SelectContent>
            </Select>
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
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort("id")} className="cursor-pointer whitespace-nowrap">
                    ID <ArrowUpDown className="h-4 w-4 inline" />
                  </TableHead>
                  <TableHead onClick={() => handleSort("date")} className="cursor-pointer whitespace-nowrap">
                    Date <ArrowUpDown className="h-4 w-4 inline" />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Customer</TableHead>
                  <TableHead className="whitespace-nowrap">Product</TableHead>
                  <TableHead className="whitespace-nowrap">Category</TableHead>
                  <TableHead onClick={() => handleSort("amount")} className="cursor-pointer whitespace-nowrap">
                    Amount <ArrowUpDown className="h-4 w-4 inline" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="whitespace-nowrap">{sale.id}</TableCell>
                    <TableCell className="whitespace-nowrap">{sale.date}</TableCell>
                    <TableCell className="whitespace-nowrap">{sale.customer}</TableCell>
                    <TableCell className="whitespace-nowrap">{sale.product}</TableCell>
                    <TableCell className="whitespace-nowrap">{sale.category}</TableCell>
                    <TableCell className="whitespace-nowrap">${sale.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)}{" "}
          of {filteredData.length} entries
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

      {/* Sales Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]} />
                <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

