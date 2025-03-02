"use client"

import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { Deal } from "../types/DealTypes"
import { priorityColors } from "../data"

type DealItemContentProps = {
  deal: Deal
}

export default function DealItemContent({ deal }: DealItemContentProps) {
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