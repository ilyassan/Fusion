"use client"

import AddDealModal from "./AddDealModal"
import { Deal } from "../types/DealTypes"

type DealsHeaderProps = {
  isNewDealOpen: boolean
  setIsNewDealOpen: (open: boolean) => void
  addNewDeal: (dealData: Partial<Deal>) => void
}

export default function DealsHeader({ isNewDealOpen, setIsNewDealOpen, addNewDeal }: DealsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Deals Pipeline</h2>
        <p className="text-gray-500">Track and manage your sales opportunities</p>
      </div>
      <div className="flex gap-2">
        <AddDealModal
          isOpen={isNewDealOpen}
          setIsOpen={setIsNewDealOpen}
          addNewDeal={addNewDeal}
        />
      </div>
    </div>
  )
}