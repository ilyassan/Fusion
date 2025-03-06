import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface EmployeeFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  uniqueRoles: string[];
}

export function EmployeeFilters({ searchQuery, setSearchQuery, roleFilter, setRoleFilter, uniqueRoles }: EmployeeFiltersProps) {
  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search employees..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={roleFilter} onValueChange={setRoleFilter}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          {uniqueRoles.map(role => (
            <SelectItem key={role} value={role}>{role}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}