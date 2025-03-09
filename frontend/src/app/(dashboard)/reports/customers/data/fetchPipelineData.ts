export interface PipelineData {
  name: string;
  value: number;
  color: string;
}

export async function fetchPipelineData(dateRange: string): Promise<PipelineData[]> {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate delay

  return [
    { name: "Lead Capture", value: 35, color: "#4f46e5" },
    { name: "Proposal", value: 25, color: "#7c3aed" },
    { name: "Negotiation", value: 20, color: "#2563eb" },
    { name: "Closing", value: 20, color: "#0891b2" },
  ];
}