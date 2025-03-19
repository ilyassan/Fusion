import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CompanyTabsProps {
  activeTab: "all" | "owned" | "member";
  setActiveTab: (value: "all" | "owned" | "member") => void;
}

export function CompanyTabs({ activeTab, setActiveTab }: CompanyTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={(value) => {
        if (value === "all" || value === "owned" || value === "member") {
            setActiveTab(value);
        }
    }} className="mb-6">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="all">All Companies</TabsTrigger>
        <TabsTrigger value="owned">Owned</TabsTrigger>
        <TabsTrigger value="member">Member</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}