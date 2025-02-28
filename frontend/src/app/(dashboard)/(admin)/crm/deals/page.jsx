"use client"

import { useEffect, useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { DollarSign, Users, Clock, ArrowRight, CheckCircle2, CalendarIcon, Plus } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"


// Mock data for deals (unchanged)
const mockDeals = {
  "lead-capture": [
    {
      id: "1",
      name: "Enterprise Software Package",
      customer: "Tech Corp",
      value: 75000,
      priority: "high",
      status: "active",
      salesRep: "John Smith",
      expectedClose: "2024-03-15",
      lastActivity: "2024-02-28",
      notes: "Client interested in full suite implementation",
      activities: [
        { date: "2024-02-28", type: "call", description: "Initial discovery call" },
        { date: "2024-02-25", type: "email", description: "Sent product documentation" },
      ],
      tasks: [
        { title: "Send proposal", due: "2024-03-05", status: "pending" },
        { title: "Schedule follow-up", due: "2024-03-10", status: "completed" },
      ],
    },
    {
      id: "34",
      name: "Enterprise Software Package",
      customer: "Tech Corp",
      value: 75000,
      priority: "low",
      status: "active",
      salesRep: "John Smith",
      expectedClose: "2024-03-15",
      lastActivity: "2024-02-28",
      notes: "Client interested in full suite implementation",
      activities: [
        { date: "2024-02-28", type: "call", description: "Initial discovery call" },
        { date: "2024-02-25", type: "email", description: "Sent product documentation" },
      ],
      tasks: [
        { title: "Send proposal", due: "2024-03-05", status: "pending" },
        { title: "Schedule follow-up", due: "2024-03-10", status: "completed" },
      ],
    },
    {
      id: "55",
      name: "Enterprise Software Package",
      customer: "Tech Corp",
      value: 75000,
      priority: "high",
      status: "active",
      salesRep: "John Smith",
      expectedClose: "2024-03-15",
      lastActivity: "2024-02-28",
      notes: "Client interested in full suite implementation",
      activities: [
        { date: "2024-02-28", type: "call", description: "Initial discovery call" },
        { date: "2024-02-25", type: "email", description: "Sent product documentation" },
      ],
      tasks: [
        { title: "Send proposal", due: "2024-03-05", status: "pending" },
        { title: "Schedule follow-up", due: "2024-03-10", status: "completed" },
      ],
    },
  ],
  proposal: [
    {
      id: "2",
      name: "Cloud Migration Project",
      customer: "Global Industries",
      value: 120000,
      priority: "high",
      status: "active",
      salesRep: "Sarah Johnson",
      expectedClose: "2024-04-01",
      lastActivity: "2024-02-27",
      notes: "Proposal under review by IT department",
      activities: [{ date: "2024-02-27", type: "meeting", description: "Technical review meeting" }],
      tasks: [{ title: "Technical assessment", due: "2024-03-15", status: "pending" }], 
    },
  ],
  negotiation: [
    {
      id: "3",
      name: "Security Suite Upgrade",
      customer: "Finance Corp",
      value: 45000,
      priority: "medium",
      status: "active",
      salesRep: "Mike Wilson",
      expectedClose: "2024-03-20",
      lastActivity: "2024-02-26",
      notes: "Negotiating terms and pricing",
      activities: [{ date: "2024-02-26", type: "call", description: "Price negotiation call" }],
      tasks: [{ title: "Revise pricing", due: "2024-03-08", status: "pending" }],
    },
  ],
  "order-confirmation": [
    {
      id: "4",
      name: "Data Analytics Platform",
      customer: "Retail Solutions",
      value: 95000,
      priority: "medium",
      status: "active",
      salesRep: "Emma Davis",
      expectedClose: "2024-03-10",
      lastActivity: "2024-02-25",
      notes: "Final contract review in progress",
      activities: [{ date: "2024-02-25", type: "email", description: "Sent final contract" }],
      tasks: [{ title: "Contract signing", due: "2024-03-05", status: "pending" }],
    },
  ],
  closing: [
    {
      id: "5",
      name: "API Integration Service",
      customer: "E-commerce Pro",
      value: 35000,
      priority: "low",
      status: "active",
      salesRep: "Tom Brown",
      expectedClose: "2024-03-05",
      lastActivity: "2024-02-24",
      notes: "Payment processing",
      activities: [{ date: "2024-02-24", type: "email", description: "Payment confirmation sent" }],
      tasks: [{ title: "Process payment", due: "2024-03-01", status: "completed" }],
    },
  ],
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

export default function DealsPipeline() {
  const [deals, setDeals] = useState(mockDeals)
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [filters, setFilters] = useState({
    search: "",
    priority: "",
    salesRep: "",
    dateRange: null,
  })
  const [isNewDealOpen, setIsNewDealOpen] = useState(false)
  const [activeDeal, setActiveDeal] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = (event) => {
    const { active } = event
    const activeStage = active.data.current.stage
    setActiveDeal(deals[activeStage].find((deal) => deal.id === active.id))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over) return

    const activeStage = active.data.current.stage
    const overStage = over.data.current.sortable.containerId

    if (activeStage !== overStage || active.id !== over.id) {
      setDeals((prev) => {
        const activeItems = prev[activeStage]
        const overItems = prev[overStage] || []

        // Find the indices of the items
        const activeIndex = activeItems.findIndex((item) => item.id === active.id)
        const overIndex = over.id ? overItems.findIndex((item) => item.id === over.id) : overItems.length

        let newItems
        if (activeStage === overStage) {
          // If in the same list, use arrayMove
          newItems = arrayMove(overItems, activeIndex, overIndex)
          return {
            ...prev,
            [overStage]: newItems,
          }
        } else {
          // If moving to a different list
          const [movedItem] = activeItems.splice(activeIndex, 1)
          overItems.splice(overIndex, 0, movedItem)
          return {
            ...prev,
            [activeStage]: [...activeItems],
            [overStage]: [...overItems],
          }
        }
      })
    }
    setActiveDeal(null)
  }

  const stages = [
    { id: "lead-capture", title: "Lead Capture", icon: Users },
    { id: "proposal", title: "Proposal", icon: DollarSign },
    { id: "negotiation", title: "Negotiation", icon: ArrowRight },
    { id: "closing", title: "Closing", icon: CheckCircle2 },
  ]

  const filteredDeals = (stageDeals) => {
    return stageDeals.filter((deal) => {
      const matchesSearch =
        !filters.search ||
        deal.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        deal.customer.toLowerCase().includes(filters.search.toLowerCase())

      const matchesPriority = !filters.priority || filters.priority === "all" || deal.priority === filters.priority
      const matchesSalesRep = !filters.salesRep || filters.salesRep === "all" || deal.salesRep === filters.salesRep

      return matchesSearch && matchesPriority && matchesSalesRep
    })
  }

  const addNewDeal = (dealData) => {
    const newDeal = {
      id: `deal-${Date.now()}`,
      ...dealData,
      activities: [],
      tasks: [],
      lastActivity: format(new Date(), "yyyy-MM-dd"),
    }

    setDeals((prev) => ({
      ...prev,
      "lead-capture": [newDeal, ...prev["lead-capture"]],
    }))
    setIsNewDealOpen(false)
  }

  const updateDeal = (dealId, updatedData) => {
    const newDeals = { ...deals }
    Object.keys(newDeals).forEach((stage) => {
      newDeals[stage] = newDeals[stage].map((deal) => (deal.id === dealId ? { ...deal, ...updatedData } : deal))
    })
    setDeals(newDeals)
  }

  const addTask = (dealId, taskData) => {
    const newTask = {
      title: taskData.title,
      due: taskData.due,
      status: "pending",
    }

    const newDeals = { ...deals }
    Object.keys(newDeals).forEach((stage) => {
      newDeals[stage] = newDeals[stage].map((deal) =>
        deal.id === dealId ? { ...deal, tasks: [...deal.tasks, newTask] } : deal,
      )
    })
    setDeals(newDeals)
  }

  const addActivity = (dealId, activityData) => {
    const newActivity = {
      date: format(new Date(), "yyyy-MM-dd"),
      ...activityData,
    }

    const newDeals = { ...deals }
    Object.keys(newDeals).forEach((stage) => {
      newDeals[stage] = newDeals[stage].map((deal) =>
        deal.id === dealId
          ? {
              ...deal,
              activities: [newActivity, ...deal.activities],
              lastActivity: newActivity.date,
            }
          : deal,
      )
    })
    setDeals(newDeals)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Deals Pipeline</h2>
          <p className="text-gray-500">Track and manage your sales opportunities</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isNewDealOpen} onOpenChange={setIsNewDealOpen}>
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
                  <Input placeholder="Enter customer name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Expected Value</label>
                  <Input type="number" placeholder="Enter deal value" />
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Select>
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
                        <span>Date</span>
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                    />
                    </PopoverContent>
                </Popover>
                </div>
                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <textarea
                    className="w-full h-24 p-2 border rounded-lg resize-none"
                    placeholder="Add any initial notes..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewDealOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      // Add new deal logic here
                      setIsNewDealOpen(false)
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Create Deal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Search deals..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
            <Select value={filters.priority} onValueChange={(value) => setFilters({ ...filters, priority: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.salesRep} onValueChange={(value) => setFilters({ ...filters, salesRep: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sales Rep" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reps</SelectItem>
                <SelectItem value="John Smith">John Smith</SelectItem>
                <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
                <SelectItem value="Emma Davis">Emma Davis</SelectItem>
                <SelectItem value="Tom Brown">Tom Brown</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="nextMonth">Next Month</SelectItem>
                <SelectItem value="thisQuarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stages.map((stage) => (
            <Card key={stage.id} className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stage.icon className="h-4 w-4 text-gray-500" />
                    {stage.title}
                  </div>
                  <Badge variant="secondary">{filteredDeals(deals[stage.id] || []).length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <SortableContext
                  id={stage.id}
                  items={filteredDeals(deals[stage.id] || []).map((deal) => deal.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <ScrollArea className="max-h-[300px]">
                    <div className="p-2 space-y-2">
                      {filteredDeals(deals[stage.id] || []).map((deal) => (
                        <DealItem
                          key={deal.id}
                          deal={deal}
                          stage={stage.id}
                          setSelectedDeal={setSelectedDeal}
                          updateDeal={updateDeal}
                          addTask={addTask}
                          addActivity={addActivity}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </SortableContext>
              </CardContent>
            </Card>
          ))}
        </div>
        <DragOverlay>{activeDeal ? <DealItemContent deal={activeDeal} /> : null}</DragOverlay>
      </DndContext>
    </div>
  )
}

function DealItem({ deal, stage, setSelectedDeal, updateDeal, addTask, addActivity }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: deal.id,
    data: {
      stage: stage,
    },
  })

  
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, []);

    if (!isClient){
        return "wait";
    }
  

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setSelectedDeal(deal)}
        >
          <DealItemContent deal={deal} />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Deal Details</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="overview" className="mt-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{deal.name}</h4>
                <p className="text-sm text-gray-500">{deal.customer}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Value</label>
                  <p className="font-medium">${deal.value.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Priority</label>
                  <Badge className={priorityColors[deal.priority]}>{deal.priority}</Badge>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Sales Rep</label>
                  <p className="font-medium">{deal.salesRep}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Expected Close</label>
                  <p className="font-medium">{deal.expectedClose}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Notes</label>
                <p className="mt-1">{deal.notes}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  Edit Deal
                </Button>
                <Button size="sm">Add Activity</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="activity" className="space-y-4">
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={() => {
                  addActivity(deal.id, {
                    type: "note",
                    description: "Added new activity",
                  })
                }}
              >
                Add Activity
              </Button>
            </div>
            <ScrollArea className="h-[400px] pr-4">
              {deal.activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg">
                  <div className="min-w-[100px]">
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-gray-500">Type: {activity.type}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="tasks" className="space-y-4">
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={() => {
                  addTask(deal.id, {
                    title: "New Task",
                    due: format(new Date(), "yyyy-MM-dd"),
                  })
                }}
              >
                Add Task
              </Button>
            </div>
            <ScrollArea className="h-[400px] pr-4">
              {deal.tasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">Due: {task.due}</p>
                  </div>
                  <Badge
                    variant={task.status === "completed" ? "success" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => {
                      const newStatus = task.status === "completed" ? "pending" : "completed"
                      const updatedTasks = [...deal.tasks]
                      updatedTasks[index] = { ...task, status: newStatus }
                      updateDeal(deal.id, { tasks: updatedTasks })
                    }}
                  >
                    {task.status}
                  </Badge>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="notes" className="space-y-4">
            <div className="space-y-4">
              <textarea
                className="w-full h-32 p-2 border rounded-lg resize-none"
                placeholder="Add notes about this deal..."
                value={deal.notes}
                onChange={(e) => {
                  updateDeal(deal.id, { notes: e.target.value })
                }}
              />
              <div className="flex justify-end">
                <Button size="sm">Save Notes</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function DealItemContent({ deal }) {
  return (
    <div className="space-y-2">
      <div className="font-sm">{deal.customer}</div>
      <div className="flex items-center justify-between">
        <Badge className={priorityColors[deal.priority]}>{deal.priority}</Badge>
        <span className="text-sm font-medium">${deal.value.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Clock className="h-3 w-3" />
        Expected close: {deal.expectedClose}
      </div>
    </div>
  )
}

