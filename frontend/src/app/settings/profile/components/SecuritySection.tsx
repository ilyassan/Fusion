"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import PasswordChangeDialog from "./PasswordChangeDialog";
import { UserProfile } from "../lib/types";

export default function SecuritySection({
  profile,
  onSave,
}: {
  profile: UserProfile;
  onSave: (updatedProfile: Partial<UserProfile>) => Promise<boolean>;
}) {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(profile.twoFactorEnabled);
  const { toast } = useToast();

  const handleToggle2FA = async () => {
    const newValue = !twoFactorEnabled;
    setTwoFactorEnabled(newValue);
    const success = await onSave({ twoFactorEnabled: newValue });
    if (success) {
      toast({
        title: `Two-factor authentication ${newValue ? "enabled" : "disabled"}`,
        variant: "default",
      });
    } else {
      setTwoFactorEnabled(!newValue); // Revert on failure
      toast({
        title: "Failed to update two-factor authentication settings",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">Password</h3>
            <p className="text-sm text-gray-500">Change your account password</p>
          </div>
          <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="btn-primary">Change Password</Button>
            </DialogTrigger>
            <PasswordChangeDialog
              profile={profile}
              onSave={onSave}
              onClose={() => setPasswordDialogOpen(false)}
            />
          </Dialog>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-500">Enable to receive a code via email during login</p>
          </div>
          <Switch checked={twoFactorEnabled} onCheckedChange={handleToggle2FA} />
        </div>
      </CardContent>
    </Card>
  );
}