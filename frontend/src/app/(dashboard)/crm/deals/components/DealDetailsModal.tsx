"use client"

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Deal } from "../types/DealTypes"
import { priorityColors } from "../data"
import { useDeals } from "../hooks/useDeals"

type DealDetailsModalProps = {
  deal: Deal
}

export default function DealDetailsModal({ deal }: DealDetailsModalProps) {
  const { updateDeal, addTask, addActivity } = useDeals()

  return (
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
              onClick={() => addActivity(deal.id, { type: "note", description: "Added new activity" })}
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
              onClick={() => addTask(deal.id, { title: "New Task", due: new Date().toISOString().split("T")[0] })}
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
                  variant={task.status === "completed" ? "default" : "secondary"}
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
              onChange={(e) => updateDeal(deal.id, { notes: e.target.value })}
            />
            <div className="flex justify-end">
              <Button size="sm">Save Notes</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  )
}