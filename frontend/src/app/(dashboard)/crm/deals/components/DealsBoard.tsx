"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, DollarSign, ArrowRight, CheckCircle2 } from "lucide-react";
import DealItem from "./DealItem";
import DealItemContent from "./DealItemContent";
import { DealsData, Deal } from "../types/DealTypes";
import { useState } from "react";
import { DealsBoardSkeleton } from "./DealsBoardSkeleton";
import DealDetailsModal from "./DealDetailsModal";

type DealsBoardProps = {
  deals: DealsData;
  setDeals: React.Dispatch<React.SetStateAction<DealsData>>;
  updateDeal: (dealId: string, updatedData: Deal) => void;
  isLoading: boolean;
};


export default function DealsBoard({ deals, setDeals, updateDeal, isLoading }: DealsBoardProps) {
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    const { active } = event;
    const activeStage = active.data.current.stage;
    setActiveDeal(deals[activeStage].find((deal) => deal.id === active.id) || null);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeStage = active.data.current.stage;
    // Use over.id directly for droppable areas (empty lists) or sortable.containerId for populated lists
    const overStage = over.data.current?.sortable?.containerId || over.id;

    if (!overStage) return;

    if (activeStage !== overStage || active.id !== over.id) {
      setDeals((prev: DealsData) => {
        const activeItems = [...(prev[activeStage] || [])];
        const overItems = [...(prev[overStage] || [])];
        const activeIndex = activeItems.findIndex((item) => item.id === active.id);
        const overIndex =
          over.data.current?.sortable && over.id !== overStage
            ? overItems.findIndex((item) => item.id === over.id)
            : overItems.length;

        if (activeStage === overStage) {
          const newItems = arrayMove(overItems, activeIndex, overIndex);
          return { ...prev, [overStage]: newItems };
        } else {
          const [movedItem] = activeItems.splice(activeIndex, 1);
          overItems.splice(overIndex, 0, movedItem);
          return {
            ...prev,
            [activeStage]: activeItems,
            [overStage]: overItems,
          };
        }
      });
    }
    setActiveDeal(null);
  };

  const handleDetailsClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDetailsModalOpen(true);
  };

  const stages = [
    { id: "lead-capture", title: "Lead Capture", icon: Users },
    { id: "proposal", title: "Proposal", icon: DollarSign },
    { id: "negotiation", title: "Negotiation", icon: ArrowRight },
    { id: "closing", title: "Closing", icon: CheckCircle2 },
  ];

  if (isLoading) {
    return <DealsBoardSkeleton />;
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stages.map((stage) => (
            <DroppableStage
              key={stage.id}
              stageId={stage.id}
              title={stage.title}
              icon={stage.icon}
              deals={deals[stage.id] || []}
              onDetailsClick={handleDetailsClick}
            />
          ))}
        </div>
        <DragOverlay>{activeDeal ? <DealItemContent deal={activeDeal} /> : null}</DragOverlay>
      </DndContext>
      {selectedDeal && (
        <DealDetailsModal
          isOpen={isDetailsModalOpen}
          deal={selectedDeal}
          onClose={() => setIsDetailsModalOpen(false)}
          updateDeal={(dealId, updatedData: Deal) => {
            updateDeal(dealId, updatedData);
            setSelectedDeal(updatedData);
          }}
        />
      )}
    </>
  );
}

const DroppableStage = ({
    stageId,
    title,
    icon: Icon,
    deals,
    onDetailsClick,
  }: {
    stageId: string;
    title: string;
    icon: React.ElementType;
    deals: Deal[];
    onDetailsClick: (deal: Deal) => void;
  }) => {
    const { setNodeRef } = useDroppable({
      id: stageId,
    });
  
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-gray-500" />
              {title}
            </div>
            <Badge variant="secondary">{deals.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <SortableContext
            id={stageId}
            items={deals.map((deal) => deal.id)}
            strategy={verticalListSortingStrategy}
          >
            <ScrollArea className="max-h-[300px]">
              <div ref={setNodeRef} className="p-2 space-y-2 min-h-[50px]">
                {deals.length > 0 ? (
                  deals.map((deal) => (
                    <DealItem
                      key={deal.id}
                      deal={deal}
                      stage={stageId}
                      onDetailsClick={onDetailsClick}
                    />
                  ))
                ) : (
                  <div className="text-center text-gray-500 text-sm py-4">Drop deals here</div>
                )}
              </div>
            </ScrollArea>
          </SortableContext>
        </CardContent>
      </Card>
    );
  };