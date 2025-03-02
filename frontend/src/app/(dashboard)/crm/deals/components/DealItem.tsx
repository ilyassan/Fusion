"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import DealItemContent from "./DealItemContent"
import DealDetailsModal from "./DealDetailsModal"
import { Deal } from "../types/DealTypes"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useState, useEffect } from "react"

type DealItemProps = {
  deal: Deal
  stage: string
}

export default function DealItem({ deal, stage }: DealItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: deal.id,
    data: { stage },
  })

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return "wait"
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
        >
          <DealItemContent deal={deal} />
        </div>
      </DialogTrigger>
      <DealDetailsModal deal={deal} />
    </Dialog>
  )
}