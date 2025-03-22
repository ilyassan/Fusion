"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserProfile } from "../lib/types";
import { passwordSchema } from "../lib/schemas";
import * as z from "zod";

export default function PasswordChangeDialog({
  profile,
  onSave,
  onClose,
}: {
  profile: UserProfile;
  onSave: (updatedProfile: Partial<UserProfile>) => Promise<boolean>;
  onClose: () => void;
}) {
  const [formState, setFormState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = passwordSchema.parse({
        ...formState,
        oldPassword: formState.oldPassword === profile.password ? formState.oldPassword : "",
      });
      setErrors({});
      setIsSaving(true);
      const success = await onSave({ password: validatedData.newPassword });
      setIsSaving(false);

      if (success) {
        toast({ title: "Password updated successfully", variant: "default" });
        onClose();
      } else {
        toast({ title: "Failed to update password. Please try again.", variant: "destructive" });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      } else if (formState.oldPassword !== profile.password) {
        setErrors({ oldPassword: "Current password is incorrect" });
      }
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Change Password</DialogTitle>
        <DialogDescription>
          Update your password to keep your account secure.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="old-password">Current Password</Label>
          <Input
            id="old-password"
            type="password"
            value={formState.oldPassword}
            onChange={(e) => setFormState((prev) => ({ ...prev, oldPassword: e.target.value }))}
          />
          {errors.oldPassword && <p className="text-xs text-red-500">{errors.oldPassword}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={formState.newPassword}
            onChange={(e) => setFormState((prev) => ({ ...prev, newPassword: e.target.value }))}
          />
          {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={formState.confirmPassword}
            onChange={(e) => setFormState((prev) => ({ ...prev, confirmPassword: e.target.value }))}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <DialogFooter>
          <Button type="button" onClick={onClose} className="btn-primary">
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving} className="btn-primary">
            {isSaving ? "Updating..." : "Update Password"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}