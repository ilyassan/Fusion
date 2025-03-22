"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DeleteAccountDialog({ onClose }: { onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleDelete = () => {
    if (password !== "password123") { // Mock validation using the mock password
      setError("Incorrect password");
      return;
    }

    toast({
      title: "Account deleted",
      description: "Your account has been successfully deleted.",
      variant: "default",
    });
    onClose();
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <div className="space-y-4 py-4">
        <p className="text-sm font-medium">Please enter your password to confirm:</p>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>

      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose} className="btn-primary">Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
          Delete Account
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}