// deals/components/DealItem.tsx
"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DealItemContent from "./DealItemContent";
import { Deal } from "../types/DealTypes";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

type DealItemProps = {
  deal: Deal;
  stage: string;
  onDetailsClick: (deal: Deal) => void;
};

export default function DealItem({ deal, stage, onDetailsClick }: DealItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: deal.id,
    data: { stage },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          ref={setNodeRef}
          style={style}
          className="bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow relative cursor-grab"
        >
          <div {...attributes} {...listeners}>
            <DealItemContent deal={deal} />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDetailsClick(deal);
            }}
            className="absolute top-1 right-1 h-6 w-6 p-0"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </DialogTrigger>

    </Dialog>
  );
}