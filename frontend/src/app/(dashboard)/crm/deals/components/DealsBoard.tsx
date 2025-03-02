"use client"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, DollarSign, ArrowRight, CheckCircle2 } from "lucide-react"
import DealItem from "./DealItem"
import DealItemContent from "./DealItemContent"
import { DealsData, Deal } from "../types/DealTypes"
import { useState } from "react"
import { DealsBoardSkeleton } from "./DealsBoardSkeleton"

type DealsBoardProps = {
  deals: DealsData
  setDeals: React.Dispatch<React.SetStateAction<DealsData>>
  isLoading: boolean
}

export default function DealsBoard({ deals, setDeals, isLoading }: DealsBoardProps) {
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: any) => {
    const { active } = event
    const activeStage = active.data.current.stage
    setActiveDeal(deals[activeStage].find((deal) => deal.id === active.id) || null)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (!over) return

    const activeStage = active.data.current.stage
    const overStage = over.data.current.sortable.containerId

    if (activeStage !== overStage || active.id !== over.id) {
      setDeals((prev: DealsData) => {
        const activeItems = prev[activeStage]
        const overItems = prev[overStage] || []

        const activeIndex = activeItems.findIndex((item) => item.id === active.id)
        const overIndex = over.id ? overItems.findIndex((item) => item.id === over.id) : overItems.length

        let newItems
        if (activeStage === overStage) {
          newItems = arrayMove(overItems, activeIndex, overIndex)
          return { ...prev, [overStage]: newItems }
        } else {
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

  if (isLoading) {
    return <DealsBoardSkeleton />;
  }

  return (
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
                <Badge variant="secondary">{(deals[stage.id] || []).length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <SortableContext
                id={stage.id}
                items={(deals[stage.id] || []).map((deal) => deal.id)}
                strategy={verticalListSortingStrategy}
              >
                <ScrollArea className="max-h-[300px]">
                  <div className="p-2 space-y-2">
                    {(deals[stage.id] || []).map((deal) => (
                      <DealItem key={deal.id} deal={deal} stage={stage.id} />
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
  )
}