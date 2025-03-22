"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfile } from "./hooks/useProfile";
import PersonalInformationSection from "./components/PersonalInformationSection";
import SecuritySection from "./components/SecuritySection";
import AccountPreferencesSection from "./components/AccountPreferencesSection";
import ActionsSection from "./components/ActionsSection";
import { UserProfile } from "./lib/types";

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

export default function ProfilePage({ initialProfile = mockProfile }: { initialProfile?: UserProfile }) {
  const { profile, updateProfile } = useProfile(initialProfile);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p className="text-gray-500">Manage your personal information and account preferences</p>
      </div>
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="w-full border-b justify-start rounded-none space-x-4 bg-transparent h-auto pb-1">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none pb-2"
          >
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none pb-2"
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none pb-2"
          >
            Account Preferences
          </TabsTrigger>
          <TabsTrigger
            value="actions"
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none pb-2"
          >
 transientActions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="mt-6">
          <PersonalInformationSection profile={profile} onSave={updateProfile} />
        </TabsContent>
        <TabsContent value="security" className="mt-6">
          <SecuritySection profile={profile} onSave={updateProfile} />
        </TabsContent>
        <TabsContent value="preferences" className="mt-6">
          <AccountPreferencesSection profile={profile} onSave={updateProfile} />
        </TabsContent>
        <TabsContent value="actions" className="mt-6">
          <ActionsSection profile={profile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}