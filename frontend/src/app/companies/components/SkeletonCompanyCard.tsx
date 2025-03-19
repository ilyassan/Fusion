import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export function SkeletonCompanyCard() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gray-200 h-11 w-11 rounded-lg"></div>
            <div className="space-y-5">
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-12 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
        </div>
      </CardContent>
    </Card>
  );
}