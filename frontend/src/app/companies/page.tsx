"use client";

import { useState } from "react";
import { Rocket, Bell, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CompaniesHeader } from "./components/CompaniesHeader";
import { CompanyTabs } from "./components/CompanyTabs";
import { CompanyCard } from "./components/CompanyCard";
import { CreateCompanyModal } from "./components/CreateCompanyModal";
import { SkeletonCompanyCard } from "./components/SkeletonCompanyCard";
import { useCompanies } from "./hooks/useCompanies";

export default function CompaniesPage() {
  const { companies, isLoading, activeTab, setActiveTab, addCompany } = useCompanies();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 bg-gradient-to-br from-blue-50 to-purple-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-blue-500 text-xl sm:text-2xl font-bold">
                FUSION
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 py-1 px-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <CompaniesHeader onCreateClick={() => setShowCreateModal(true)} />
        <CompanyTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="space-y-3">
          {isLoading ? (
            Array(2)
              .fill(0)
              .map((_, i) => <SkeletonCompanyCard key={i} />)
          ) : companies.length > 0 ? (
            companies.map((company) => <CompanyCard key={company.id} company={company} />)
          ) : (
            <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg bg-white">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No companies yet</h3>
              <p className="text-gray-500 mt-1">Create your first company to get started</p>
            </div>
          )}
        </div>
      </div>

      <CreateCompanyModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={addCompany}
      />
    </div>
  );
}