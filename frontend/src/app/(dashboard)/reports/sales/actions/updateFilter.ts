"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateFilter(formData: FormData) {
  const dateRange = formData.get("dateRange") as string;
  revalidatePath("/reports/sales");
  redirect(`/reports/sales?dateRange=${encodeURIComponent(dateRange)}`);
}