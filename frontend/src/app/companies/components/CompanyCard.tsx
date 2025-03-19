import { ChevronRight, Users, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Company } from "../types/companyTypes";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const getRoleStyles = (role: Company["role"]) => {
    switch (role) {
      case "Administrator":
        return "bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200";
      case "Manager":
        return "bg-green-100 hover:bg-green-200 text-green-800 border-green-200";
      case "Employee":
        return "bg-purple-100 hover:bg-purple-200 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="group hover:border-blue-200 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-2.5 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{company.name}</h3>
              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                <Badge className={getRoleStyles(company.role)}>{company.role}</Badge>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  {company.members}
                </span>
                <span className="text-sm text-gray-500">{company.category}</span>
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
        </div>
      </CardContent>
    </Card>
  );
}