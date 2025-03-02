"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { DealsData, Deal, Filters, Task, Activity } from "../types/DealTypes";
import { format } from "date-fns";
import { fetchDeals, fetchFilteredDeals } from "../data";

export const useDeals = () => {
  const [deals, setDeals] = useState<DealsData>({
    "lead-capture": [],
    proposal: [],
    negotiation: [],
    "order-confirmation": [],
    closing: [],
  });
  const [filters, setFilters] = useState<Filters>({
    search: "",
    priority: "",
    fromDate: undefined,
    toDate: undefined,
  });
  const [isNewDealOpen, setIsNewDealOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [debouncedSearch] = useDebounce(filters.search, 300); // Debounce search

  const rebuildStages = (flatDeals: Deal[]): DealsData => {
    const stages: DealsData = {
      "lead-capture": [],
      proposal: [],
      negotiation: [],
      "order-confirmation": [],
      closing: [],
    };
    flatDeals.forEach((deal) => {
      if (deal.id.startsWith("1") || deal.id.startsWith("34") || deal.id.startsWith("55")) {
        stages["lead-capture"].push(deal);
      } else if (deal.id.startsWith("2")) {
        stages.proposal.push(deal);
      } else if (deal.id.startsWith("3")) {
        stages.negotiation.push(deal);
      } else if (deal.id.startsWith("4")) {
        stages["order-confirmation"].push(deal);
      } else if (deal.id.startsWith("5")) {
        stages.closing.push(deal);
      }
    });
    return stages;
  };

  // Fetch deals on mount or filter/search change
  useEffect(() => {
    const loadDeals = async () => {
      try {
        setIsLoading(true);
        const hasFilters =
          debouncedSearch || filters.priority || filters.fromDate || filters.toDate;
        const flatDeals = hasFilters
          ? await fetchFilteredDeals(filters, debouncedSearch)
          : await fetchDeals();
        const stagedDeals = rebuildStages(flatDeals);
        setDeals(stagedDeals);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDeals();
  }, [debouncedSearch, filters.priority, filters.fromDate, filters.toDate]);

  const addNewDeal = (dealData: Partial<Deal>) => {
    const newDeal: Deal = {
      id: `deal-${Date.now()}`,
      ...dealData,
      activities: [],
      tasks: [],
      lastActivity: format(new Date(), "yyyy-MM-dd"),
    } as Deal;
    setDeals((prev) => ({
      ...prev,
      "lead-capture": [newDeal, ...prev["lead-capture"]],
    }));
    setIsNewDealOpen(false);
  };

  const updateDeal = (dealId: string, updatedData: Partial<Deal>) => {
    const newDeals = { ...deals };
    Object.keys(newDeals).forEach((stage) => {
      newDeals[stage] = newDeals[stage].map((deal) =>
        deal.id === dealId ? { ...deal, ...updatedData } : deal
      );
    });
    setDeals(newDeals);
  };

  const addTask = (dealId: string, taskData: Partial<Task>) => {
    const newTask = {
      title: taskData.title,
      due: taskData.due,
      status: "pending",
    } as Task;
    const newDeals = { ...deals };
    Object.keys(newDeals).forEach((stage) => {
      newDeals[stage] = newDeals[stage].map((deal) =>
        deal.id === dealId ? { ...deal, tasks: [...deal.tasks, newTask] } : deal
      );
    });
    setDeals(newDeals);
  };

  const addActivity = (dealId: string, activityData: Partial<Activity>) => {
    const newActivity = {
      date: format(new Date(), "yyyy-MM-dd"),
      ...activityData,
    } as Activity;
    const newDeals = { ...deals };
    Object.keys(newDeals).forEach((stage) => {
      newDeals[stage] = newDeals[stage].map((deal) =>
        deal.id === dealId
          ? { ...deal, activities: [newActivity, ...deal.activities], lastActivity: newActivity.date }
          : deal
      );
    });
    setDeals(newDeals);
  };

  return {
    deals,
    setDeals,
    filters,
    setFilters,
    isNewDealOpen,
    setIsNewDealOpen,
    isLoading,
    addNewDeal,
    updateDeal,
    addTask,
    addActivity,
  };
};