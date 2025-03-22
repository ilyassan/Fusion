"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Bell, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Types
interface Invite {
  id: number;
  company: string;
  role: string;
  sender: string;
  date: string;
  status: "pending" | "accepted" | "declined";
}

// Data
let mockInvites: Invite[] = [
  { id: 1, company: "Tech Solutions Inc", role: "Manager", sender: "alice@example.com", date: "2025-03-18", status: "pending" },
  { id: 2, company: "Digital Marketing Agency", role: "Employee", sender: "bob@example.com", date: "2025-03-17", status: "accepted" },
];

async function fetchInvites(): Promise<Invite[]> {
  await new Promise((r) => setTimeout(r, 1000));
  return [...mockInvites];
}

async function updateInviteStatus(id: number, status: "accepted" | "declined"): Promise<void> {
  await new Promise((r) => setTimeout(r, 500));
  mockInvites = mockInvites.map((invite) =>
    invite.id === id ? { ...invite, status } : invite
  );
}

// Hook
function useInvites() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInvites = async () => {
      setIsLoading(true);
      try {
        const data = await fetchInvites();
        setInvites(data);
      } catch (err) {
        console.error("Failed to load invites:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadInvites();
  }, []);

  const handleUpdateStatus = async (id: number, status: "accepted" | "declined") => {
    try {
      await updateInviteStatus(id, status);
      setInvites((prev) => prev.map((invite) => (invite.id === id ? { ...invite, status } : invite)));
    } catch (err) {
      console.error("Failed to update invite:", err);
    }
  };

  return { invites, isLoading, updateInviteStatus: handleUpdateStatus };
}

// Sidebar Component
function InvitesSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed top-0 left-0 pt-16">
      <nav className="space-y-1 p-4">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <User className="w-5 h-5" />
          Profile
        </Link>
        <Link
          href="/dashboard/invites"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md"
        >
          <Bell className="w-5 h-5" />
          Invites
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </nav>
    </aside>
  );
}

// Invites List Component
function InvitesList({ invites, onUpdateStatus }: { invites: Invite[]; onUpdateStatus: (id: number, status: "accepted" | "declined") => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Invites</h2>
      {invites.length > 0 ? (
        invites.map((invite) => (
          <Card key={invite.id} className="shadow-md rounded-lg p-6 bg-white">
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-900">{invite.company}</p>
                  <p className="text-sm text-gray-500">Role: {invite.role}</p>
                  <p className="text-sm text-gray-500">From: {invite.sender}</p>
                  <p className="text-sm text-gray-500">Date: {invite.date}</p>
                </div>
                <div className="flex gap-2">
                  {invite.status === "pending" ? (
                    <>
                      <Button
                        onClick={() => onUpdateStatus(invite.id, "accepted")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => onUpdateStatus(invite.id, "declined")}
                        variant="outline"
                      >
                        Decline
                      </Button>
                    </>
                  ) : (
                    <span
                      className={`text-sm font-medium ${
                        invite.status === "accepted" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No invites available.</p>
      )}
    </div>
  );
}

// Main Page
export default function InvitesPage() {
  const { invites, isLoading, updateInviteStatus } = useInvites();

  return (
    <div className="flex">
      <InvitesSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-2xl mx-auto">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-40 bg-gray-200 rounded"></div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-gray-200 rounded"></div>
                <div className="h-20 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : (
            <InvitesList invites={invites} onUpdateStatus={updateInviteStatus} />
          )}
        </div>
      </main>
    </div>
  );
}