"use client";

import { useState, useEffect } from "react";
import { Company } from "../types/companyTypes";
import { fetchCompanies, addCompany } from "../data/companyData";

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "owned" | "member">("all");

  const loadCompanies = async () => {
    setIsLoading(true);
    try {
      const fetchedCompanies = await fetchCompanies();
      setCompanies(fetchedCompanies);
    } catch (err) {
      console.error("Failed to fetch companies:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleAddCompany = async (company: Omit<Company, 'id'>) => {
    try {
      const newCompany = await addCompany(company);
      setCompanies((prev) => [...prev, newCompany]);
    } catch (err) {
      console.error("Failed to add company:", err);
    }
  };

  const filteredCompanies = companies.filter((company) => {
    if (activeTab === "all") return true;
    if (activeTab === "owned") return company.role === "Administrator";
    if (activeTab === "member") return company.role !== "Administrator";
    return true;
  });

  return {
    companies: filteredCompanies,
    isLoading,
    activeTab,
    setActiveTab,
    addCompany: handleAddCompany,
    refresh: loadCompanies,
  };
}