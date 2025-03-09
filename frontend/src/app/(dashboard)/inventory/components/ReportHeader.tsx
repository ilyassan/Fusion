import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ReportHeaderProps {
  title: string;
  description: string;
  onExport?: () => void;
  isPending?: boolean;
}

export function ReportHeader({ title, description, onExport, isPending }: ReportHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {onExport && (
        <Button
          variant="outline"
          className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
          onClick={onExport}
          disabled={isPending}
        >
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      )}
    </div>
  );
}