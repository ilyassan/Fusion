"use client";

import DealsHeader from "./components/DealsHeader";
import DealsFilters from "./components/DealsFilters";
import DealsBoard from "./components/DealsBoard";
import { useDeals } from "./hooks/useDeals";

export default function DealsPipeline() {
  const { deals, setDeals, filters, setFilters, isNewDealOpen, setIsNewDealOpen, addNewDeal, isLoading, updateDeal } = useDeals();

  return (
    <div className="space-y-6 min-h-full">
      <DealsHeader isNewDealOpen={isNewDealOpen} setIsNewDealOpen={setIsNewDealOpen} addNewDeal={addNewDeal} />
      <DealsFilters filters={filters} setFilters={setFilters} />
      <DealsBoard updateDeal={updateDeal} isLoading={isLoading} deals={deals} setDeals={setDeals} />
    </div>
  );
}