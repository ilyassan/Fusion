import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompaniesHeaderProps {
  onCreateClick: () => void;
}

export function CompaniesHeader({ onCreateClick }: CompaniesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
        <p className="text-gray-600 mt-1">Access your workspaces or create a new one</p>
      </div>
      <Button onClick={onCreateClick} className="w-full sm:w-auto btn-primary">
        <Plus className="w-5 h-5 mr-2" />
        New Company
      </Button>
    </div>
  );
}