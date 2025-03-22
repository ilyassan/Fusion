"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserProfile } from "../lib/types";
import { preferencesSchema, timezones, languages } from "../lib/schemas";
import * as z from "zod";

export default function AccountPreferencesSection({
  profile,
  onSave,
}: {
  profile: UserProfile;
  onSave: (updatedProfile: Partial<UserProfile>) => Promise<boolean>;
}) {
  const [formState, setFormState] = useState({
    language: profile.language,
    timezone: profile.timezone,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = preferencesSchema.parse(formState);
      setErrors({});
      setIsSaving(true);
      const success = await onSave(validatedData);
      setIsSaving(false);

      if (success) {
        toast({ title: "Account preferences updated successfully", variant: "default" });
      } else {
        toast({ title: "Failed to update preferences. Please try again.", variant: "destructive" });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Account Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={formState.language}
              onValueChange={(value) => setFormState((prev) => ({ ...prev, language: value }))}
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.language && <p className="text-xs text-red-500">{errors.language}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={formState.timezone}
              onValueChange={(value) => setFormState((prev) => ({ ...prev, timezone: value }))}
            >
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.timezone && <p className="text-xs text-red-500">{errors.timezone}</p>}
          </div>

          <Button type="submit" disabled={isSaving} className="btn-primary">
            {isSaving ? "Saving Changes..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}