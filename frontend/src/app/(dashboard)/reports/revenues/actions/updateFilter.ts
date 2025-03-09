"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateFilter(formData: FormData) {
  const dateRange = formData.get("dateRange") as string;
  revalidatePath("/reports/revenues");
  redirect(`/reports/revenues?dateRange=${encodeURIComponent(dateRange)}`);
}