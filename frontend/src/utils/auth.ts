"use server";

import { headers } from "next/headers";

interface User {
  id: number;
  name: string;
  email: string;
}

export const getServerUser = async (): Promise<User | null> => {
  try {
    const headersList = await headers();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    const axiosHeaders: Record<string, string> = {};

    for (const [key, value] of headersList.entries()) {
      axiosHeaders[key] = value;
    }

    // Get user data
    const response = await fetch(`${backendUrl}/api/user`, {
      headers: {
        ...axiosHeaders,
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) return null;
      throw new Error('Failed to fetch user');
    }

    return response.json();
  } catch (error) {
    console.log("Error fetching user:", error);
    return null;
  }
};