"use client";

import { useState } from "react";
import { UserProfile } from "../lib/types";

async function updateProfile(updatedProfile: Partial<UserProfile>): Promise<UserProfile> {
  // In production, this would be an API call
  const mockProfile: UserProfile = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 555-123-4567",
    bio: "Senior Product Manager with 5+ years of experience in SaaS products.",
    avatar: "",
    companies: ["Tech Solutions Inc", "Digital Marketing Agency"],
    password: "password123",
    twoFactorEnabled: false,
    language: "English",
    timezone: "America/New_York",
  };
  return { ...mockProfile, ...updatedProfile };
}

export function useProfile(initialProfile: UserProfile) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const handleUpdateProfile = async (updatedProfile: Partial<UserProfile>) => {
    try {
      const newProfile = await updateProfile(updatedProfile);
      setProfile(newProfile);
      return true;
    } catch (err) {
      console.error("Failed to update profile:", err);
      return false;
    }
  };

  return { profile, updateProfile: handleUpdateProfile };
}