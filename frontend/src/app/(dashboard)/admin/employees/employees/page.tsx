"use client"

import { useState } from "react"
import { Plus, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { mockEmployees } from "../data"
import type { Employee } from "../types"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(mockEmployees)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [editingCell, setEditingCell] = useState<{ id: number; field: string } | null>(null)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; employeeId: number | null }>({
    isOpen: false,
    employeeId: null,
  })
  const [updateModal, setUpdateModal] = useState<{
    isOpen: boolean
    employee: Employee | null
    field: string
    value: string
  }>({
    isOpen: false,
    employee: null,
    field: "",
    value: "",
  })

  const uniqueRoles = Array.from(new Set(employees.map(emp => emp.role)))

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = roleFilter === "all" || employee.role === roleFilter
    
    return matchesSearch && matchesRole
  })

  const handleCellEdit = (employee: Employee, field: string, value: string) => {
    setUpdateModal({
      isOpen: true,
      employee,
      field,
      value,
    })
  }

  const confirmUpdate = () => {
    if (!updateModal.employee || !updateModal.field) return

    const updatedEmployees = employees.map((emp) =>
      emp.id === updateModal.employee?.id
        ? { ...emp, [updateModal.field]: updateModal.field === "salary" ? Number.parseInt(updateModal.value) : updateModal.value }
        : emp
    )
    setEmployees(updatedEmployees)
    setEditingCell(null)
    setUpdateModal({ isOpen: false, employee: null, field: "", value: "" })
  }

  const handleDeleteEmployee = (employeeId: number) => {
    setDeleteModal({ isOpen: true, employeeId })
  }

  const confirmDelete = () => {
    if (!deleteModal.employeeId) return
    setEmployees(employees.filter((emp) => emp.id !== deleteModal.employeeId))
    setDeleteModal({ isOpen: false, employeeId: null })
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Employees</h2>
        <p className="text-gray-500">See your employees data</p>
      </div>

      <Card className="w-full">
        <CardHeader className="space-y-6">
          <div className="flex items-center justify-between">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add New Employee
            </Button>
          </div>
          
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search employees..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {uniqueRoles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="whitespace-nowrap">Phone Number</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="whitespace-nowrap">
                      {employee.firstName} {employee.lastName}
                    </TableCell>
                    <TableCell
                      onDoubleClick={() => setEditingCell({ id: employee.id, field: 'email' })}
                    >
                      {editingCell?.id === employee.id && editingCell?.field === 'email' ? (
                        <Input
                          value={employee.email}
                          onChange={(e) => {
                            const updatedEmployees = employees.map((emp) =>
                              emp.id === employee.id ? { ...emp, email: e.target.value } : emp
                            )
                            setEmployees(updatedEmployees)
                          }}
                          onBlur={() => handleCellEdit(employee, 'email', employee.email)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleCellEdit(employee, 'email', employee.email)
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <span className="cursor-pointer hover:bg-blue-50 px-2 py-1 rounded">
                          {employee.email}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{employee.phoneNumber}</TableCell>
                    <TableCell
                      onDoubleClick={() => setEditingCell({ id: employee.id, field: 'salary' })}
                    >
                      {editingCell?.id === employee.id && editingCell?.field === 'salary' ? (
                        <Input
                          type="number"
                          value={employee.salary}
                          onChange={(e) => {
                            const updatedEmployees = employees.map((emp) =>
                              emp.id === employee.id ? { ...emp, salary: Number(e.target.value) } : emp
                            )
                            setEmployees(updatedEmployees)
                          }}
                          onBlur={() => handleCellEdit(employee, 'salary', employee.salary.toString())}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleCellEdit(employee, 'salary', employee.salary.toString())
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <span className="cursor-pointer hover:bg-blue-50 px-2 py-1 rounded">
                          ${employee.salary.toLocaleString()}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteEmployee(employee.id)}
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

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModal.isOpen} onOpenChange={(open: boolean) => setDeleteModal({ isOpen: open, employeeId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this employee? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ isOpen: false, employeeId: null })}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Confirmation Modal */}
      <Dialog open={updateModal.isOpen} onOpenChange={(open: boolean) => setUpdateModal({ isOpen: open, employee: null, field: "", value: "" })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Update</DialogTitle>
            <DialogDescription>
              Are you sure you want to update the {updateModal.field} for {updateModal.employee?.firstName} {updateModal.employee?.lastName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUpdateModal({ isOpen: false, employee: null, field: "", value: "" })}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={confirmUpdate}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}