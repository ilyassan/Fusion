"use client";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

// Define user type (adjust based on your backend's user schema)
interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

// Define credentials type for login
export interface LoginCredentials {
  email: string;
  password: string;
}

// Define the middleware type
type MiddlewareType = "auth" | "guest";

// Hook parameters type
interface UseAuthProps {
  middleware?: MiddlewareType;
}

// Hook return type
interface UseAuthReturn {
  user: User | undefined;
  csrf: () => Promise<void>;
  isLoading: boolean;
  login: (setErrors: React.Dispatch<React.SetStateAction<string[]>>, credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = ({ middleware }: UseAuthProps = {}): UseAuthReturn => {
  const router = useRouter();

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data with SWR (client side)
  const { data: user, error, mutate } = useSWR("/api/user", async () => {
    try {
      const response = await axios.get("/api/user");
      return response.data;
    } catch (error) { // Infer error type as unknown
      if (error instanceof AxiosError) { // Type guard for AxiosError
        if (error.response?.status !== 409) {
          console.log("Axios error fetching user in useAuth (not 409):", error.message);
          throw error; // Rethrow AxiosError if not 409
        } else {
          console.warn("Axios error fetching user in useAuth (409 status):", error.message);
        }
      } else if (error instanceof Error) { // Handle other Errors
        console.log("Non-Axios error fetching user in useAuth:", error.message);
        throw error; // Rethrow other Errors
      } else {
        console.log("Unknown error fetching user in useAuth:", error);
        throw error; // Rethrow unknown errors
      }
    }
  });

  // Fetch CSRF token
  const csrf = async (): Promise<void> => {
    await axios.get("/sanctum/csrf-cookie");
  };

  // Handle login
  const login = async (setErrors: React.Dispatch<React.SetStateAction<string[]>>, credentials: LoginCredentials): Promise<void> => {
    setErrors([]);
    await csrf();

    const { email, password } = credentials;

    try {
      await axios.post("/login", { email, password });
      await mutate(); // Refresh user data
      
      router.push("/");
    } catch (error) { // Infer error type as unknown
      if (error instanceof AxiosError) { // Type guard for AxiosError
        if (error.response?.status === 422) {
          setErrors(Object.values(error.response.data.errors).flat() as string[]);
        } else {
          console.log("Axios error during login:", error.message);
          throw error; // Rethrow AxiosError if not 422
        }
      } else if (error instanceof Error) { // Handle other Errors
        console.log("Non-Axios error during login:", error.message);
        throw error; // Rethrow other Errors
      } else {
        console.log("Unknown error during login:", error);
        throw error; // Rethrow unknown errors
      }
    }
  };

  // Handle logout
  const logout = async (): Promise<void> => {
    await axios.post("/logout");
    mutate(null);
    router.push("/");
  };

  // Effect to handle middleware
  useEffect(() => {
    if (user || error) {
      setIsLoading(false);
    }

    if (middleware === "guest" && user) {
      router.push("/");
    }

    if (middleware === "auth" && error) {
      router.push("/login");
    }
  }, [user, error, middleware, router]);

  return {
    user,
    csrf,
    isLoading,
    login,
    logout,
  };
};
