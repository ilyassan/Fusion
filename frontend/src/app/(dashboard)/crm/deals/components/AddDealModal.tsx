"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Deal } from "../types/DealTypes"
import { format } from "date-fns"
import { useState } from "react"

type AddDealModalProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  addNewDeal: (dealData: Partial<Deal>) => void
}

export default function AddDealModal({ isOpen, setIsOpen, addNewDeal }: AddDealModalProps) {
  const [formData, setFormData] = useState({
    customer: "",
    value: "",
    priority: "",
    expectedClose: undefined as Date | undefined,
    notes: "",
  })

  const handleSubmit = () => {
    addNewDeal({
      customer: formData.customer,
      value: Number(formData.value),
      priority: formData.priority as "high" | "medium" | "low",
      expectedClose: formData.expectedClose ? format(formData.expectedClose, "yyyy-MM-dd") : "",
      notes: formData.notes,
      name: `${formData.customer} Deal`, // Placeholder, adjust as needed
      salesRep: "Unassigned", // Default value, adjust as needed
      status: "active",
    })
    setFormData({ customer: "", value: "", priority: "", expectedClose: undefined, notes: "" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Deal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Deal</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Customer</label>
            <Input
              placeholder="Enter customer name"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Expected Value</label>
            <Input
              type="number"
              placeholder="Enter deal value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Priority</label>
            <Select
              value={formData.priority}
              onValueChange={(value) => setFormData({ ...formData, priority: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Expected Close Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal text-muted-foreground"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.expectedClose ? format(formData.expectedClose, "PPP") : <span>Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.expectedClose}
                  onSelect={(date) => setFormData({ ...formData, expectedClose: date || undefined })}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="text-sm font-medium">Notes</label>
            <textarea
              className="w-full h-24 p-2 border rounded-lg resize-none"
              placeholder="Add any initial notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              Create Deal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}