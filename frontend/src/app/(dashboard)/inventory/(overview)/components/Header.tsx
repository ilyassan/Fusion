"use client";

import { ReportHeader } from "../../components/ReportHeader";

export function Header() {

  return (
    <div className="space-y-6">
      <ReportHeader
        title="Inventory Overview"
        description="Comprehensive summary of current inventory status"
      />
    </div>
  );
}