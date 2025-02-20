"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react"
import { Phone, Mail, Building2, Users } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"


const mockCustomers = [
  {
      id: 1,
      name: "John Smith",
      email: "john.smith@techcorp.com",
      company: "Tech Corp",
      type: "Organization",
      status: "Active",
      lastContact: "2024-01-15",
      deals: 3,
      value: 15000,
      phone: "+1 (555) 123-4567",
      address: "123 Tech Street, San Francisco, CA",
      timeline: [
        { date: "2024-01-15", type: "call", description: "Quarterly review call" },
        { date: "2024-01-01", type: "email", description: "Sent proposal for new project" },
        { date: "2023-12-15", type: "meeting", description: "On-site meeting to discuss requirements" },
      ],
      notes: [
        { 
          date: "2024-01-15", 
          content: "Key decision maker for enterprise deals",
          author: "John Doe" 
        }
      ],
    },
{
  id: 2,
  name: "Alice Johnson",
  email: "alice.j@innovate.io",
  company: "Innovate Solutions",
  type: "Organization",
  status: "Active",
  lastContact: "2024-02-01",
  deals: 1,
  value: 5000,
  phone: "+1 (415) 555-9876",
  address: "456 Innovation Ave, Palo Alto, CA",
    timeline: [
      { date: "2024-02-01", type: "email", description: "Initial inquiry about services" },
      { date: "2024-01-25", type: "meeting", description: "Introductory meeting." },
    ],
    notes: [
        {
            date: "2024-02-01",
            content: "Interested in our cloud services. Needs a follow up.",
            author: "Jane Smith"
        }
    ],
},
{
  id: 3,
  name: "Bob Williams",
  email: "bob.w@freelance.net",
  company: null,
  type: "Individual",
  status: "Active",
  lastContact: "2024-01-20",
  deals: 2,
  value: 8000,
  phone: "+1 (650) 555-2345",
  address: "789 Freelance Lane, Mountain View, CA",
    timeline: [
        {date: "2024-01-20", type: "call", description: "Follow-up on a contract"},
        {date: "2024-01-10", type: "email", description: "Sent contract proposal"},
    ],
  notes: [
      {
          date: "2024-01-20",
          content: "Freelance developer looking for ongoing project opportunities.",
          author: "John Doe"
      }
  ],
},
  {
      id: 4,
      name: "Samantha Lee",
      email: "s.lee@globalcorp.com",
      company: "Global Corp",
      type: "Organization",
      status: "Active",
      lastContact: "2023-12-20",
      deals: 5,
      value: 30000,
      phone: "+1 (212) 555-8765",
      address: "100 Main Street, New York, NY",
      timeline: [
          { date: "2023-12-20", type: "meeting", description: "Annual partnership review." },
          { date: "2023-12-05", type: "email", description: "Sent contract renewal terms" },
      ],
      notes: [
          {
            date: "2023-12-20",
            content: "Key account, requires careful handling and personalized communication.",
            author: "John Doe"
        }
      ],
    },
{
    id: 5,
    name: "David Chen",
    email: "d.chen@startup.co",
    company: "Startup Co",
    type: "Organization",
    status: "Inactive",
    lastContact: "2023-11-15",
    deals: 0,
    value: 0,
    phone: "+1 (310) 555-4321",
    address: "222 Launchpad Blvd, Los Angeles, CA",
    timeline: [
        { date: "2023-11-15", type: "call", description: "Initial outreach call." },
        { date: "2023-10-25", type: "email", description: "Sent introductory email." },
    ],
  notes: [
      {
         date: "2023-11-15",
          content: "Not currently looking for solutions but might be in the future.",
          author: "Jane Smith"
      }
  ],
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-gray-100 text-gray-800"
}


export default function CustomersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
  })
  const [sortConfig, setSortConfig] = useState({
    key: "lastContact",
    direction: "desc",
  })
  const [customers, setCustomers] = useState(mockCustomers)

  const itemsPerPage = 10

  // Filter and sort data
  const filteredData = customers
    .filter((customer) => {
      const matchesSearch = Object.values(customer).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase()),
      )
      const matchesType = filters.type === "all" || customer.type === filters.type
      const matchesStatus = filters.status === "all" || customer.status === filters.status

      return matchesSearch && matchesType && matchesStatus
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

  const handleAddContact = (newContact) => {
    setCustomers([...customers, { ...newContact, id: customers.length + 1 }])
    setIsAddContactModalOpen(false)
  }

  return (
    <div className="space-y-6 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Customers & Contacts</h2>
          <p className="text-gray-500">Manage your customer relationships</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddContactModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <Input
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Individual">Individual</SelectItem>
                <SelectItem value="Organization">Organization</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead onClick={() => handleSort("lastContact")} className="cursor-pointer">
                  Last Contact <ArrowUpDown className="h-4 w-4 inline" />
                </TableHead>
                <TableHead onClick={() => handleSort("deals")} className="cursor-pointer">
                  Deals <ArrowUpDown className="h-4 w-4 inline" />
                </TableHead>
                <TableHead onClick={() => handleSort("value")} className="cursor-pointer">
                  Value <ArrowUpDown className="h-4 w-4 inline" />
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/api/placeholder/32/32`} />
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.company || "None"}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[customer.status]}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.lastContact}</TableCell>
                  <TableCell>{customer.deals}</TableCell>
                  <TableCell>${customer.value.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCustomer(customer)}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                    >
                      Details
                    </Button>
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
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)}{" "}
          of {filteredData.length} entries
        </div>
        <div className="flex gap-2">
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

      {/* Customer Details Modal */}
      <CustomerDetailsModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />

      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={isAddContactModalOpen}
        onClose={() => setIsAddContactModalOpen(false)}
        onAddContact={handleAddContact}
      />
    </div>
  )
}




export function CustomerDetailsModal({ customer, onClose }) {
  if (!customer) return null
  const [isEditing, setIsEditing] = useState(false)
  const [editedCustomer, setEditedCustomer] = useState(customer)
  const [newNote, setNewNote] = useState("")

  // Add this new function for handling note addition
  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedNotes = [
        ...editedCustomer.notes,
        {
          date: new Date().toISOString().split("T")[0],
          content: newNote.trim(),
          author: "User" // Replace with actual user name from auth
        }
      ]
      setEditedCustomer(prev => ({
        ...prev,
        notes: updatedNotes
      }))
      setNewNote("")
    }
  }

  // Update the notes tab content
  const notesTabContent = (
    <div className="space-y-4">
      <div className="space-y-4">
        {editedCustomer.notes.map((note, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-3">
            <div className="text-sm text-gray-500 flex justify-between">
              <span>{note.date}</span>
              <span className="text-blue-600">@{note.author}</span>
            </div>
            <p className="mt-1 whitespace-pre-wrap text-gray-800">
              {note.content}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add new note..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
        <Button
          onClick={handleAddNote}
          className="mt-2 bg-blue-600 hover:bg-blue-700"
        >
          Add Note
        </Button>
      </div>
    </div>
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedCustomer((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Here you would typically update the customer data in your state or backend
    console.log("Saving customer:", editedCustomer)
    setIsEditing(false)
  }

  return (
    <Dialog open={!!customer} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Customer Details</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[400px] mt-4 rounded border p-4">
            <TabsContent value="info">
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <Input name="email" value={editedCustomer.email} onChange={handleInputChange} placeholder="Email" />
                    <Input name="phone" value={editedCustomer.phone} onChange={handleInputChange} placeholder="Phone" />
                    <Input
                      name="company"
                      value={editedCustomer.company}
                      onChange={handleInputChange}
                      placeholder="Company"
                    />
                    <Input name="type" value={editedCustomer.type} onChange={handleInputChange} placeholder="Type" />
                    <Input
                      name="address"
                      value={editedCustomer.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                    />
                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Save</Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Email:</span> {customer.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Phone:</span> {customer.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Company:</span> {customer.company}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Type:</span> {customer.type}
                    </div>
                    <div>
                      <span className="font-medium">Address:</span> {customer.address}
                    </div>
                    <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700" >Edit</Button>
                  </>
                )}
              </div>
            </TabsContent>
            <TabsContent value="activity">
              <div className="space-y-4">
                {customer.timeline.map((event, index) => (
                  <div key={index} className="flex items-start gap-3 border-b pb-2">
                    {event.type === "call" && <Phone className="h-5 w-5 text-blue-500" />}
                    {event.type === "email" && <Mail className="h-5 w-5 text-green-500" />}
                    {event.type === "meeting" && <Users className="h-5 w-5 text-purple-500" />}
                    <div>
                      <div className="font-medium">{event.description}</div>
                      <div className="text-sm text-gray-500">{event.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="notes">
              <ScrollArea className="h-[400px] pr-4">
                {notesTabContent}
              </ScrollArea>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}


export function AddContactModal({ isOpen, onClose, onAddContact }) {
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    type: "Individual",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewContact((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddContact(newContact)
    setNewContact({
      name: "",
      email: "",
      phone: "",
      company: "",
      type: "Individual",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" value={newContact.name} onChange={handleInputChange} placeholder="Name" required />
          <Input
            name="email"
            type="email"
            value={newContact.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <Input name="phone" value={newContact.phone} onChange={handleInputChange} placeholder="Phone" />
          <Input name="company" value={newContact.company} onChange={handleInputChange} placeholder="Company" />
          <Select
            name="type"
            value={newContact.type}
            onValueChange={(value) => handleInputChange({ target: { name: "type", value } })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Individual">Individual</SelectItem>
              <SelectItem value="Organization">Organization</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Add Contact
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

