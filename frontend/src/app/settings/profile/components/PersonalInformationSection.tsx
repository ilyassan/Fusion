"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UserProfile } from "../lib/types";
import { personalInfoSchema } from "../lib/schemas";
import * as z from "zod";

export default function PersonalInformationSection({
  profile,
  onSave,
}: {
  profile: UserProfile;
  onSave: (updatedProfile: Partial<UserProfile>) => Promise<boolean>;
}) {
  const [formState, setFormState] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    phone: profile.phone,
    bio: profile.bio,
    avatar: profile.avatar,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024 && ["image/png", "image/jpeg"].includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => setFormState((prev) => ({ ...prev, avatar: reader.result as string }));
      reader.readAsDataURL(file);
    } else {
      setErrors((prev) => ({ ...prev, avatar: "Max 2MB, PNG/JPG only" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = personalInfoSchema.parse(formState);
      setErrors({});
      setIsSaving(true);
      const success = await onSave(validatedData);
      setIsSaving(false);
      if (success) {
        toast({ title: "Personal information updated successfully", variant: "default" });
      } else {
        toast({ title: "Failed to update profile. Please try again.", variant: "destructive" });
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
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border border-blue-400">
                {formState.avatar ? (
                  <AvatarImage src={formState.avatar} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {formState.firstName.charAt(0)}
                    {formState.lastName.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700"
              >
                <Upload className="w-4 h-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {errors.avatar && <p className="text-xs text-red-500">{errors.avatar}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formState.firstName}
                onChange={(e) => setFormState((prev) => ({ ...prev, firstName: e.target.value }))}
              />
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formState.lastName}
                onChange={(e) => setFormState((prev) => ({ ...prev, lastName: e.target.value }))}
              />
              {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={profile.email} disabled />
            <p className="text-xs text-gray-500">Your email cannot be changed</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formState.phone}
              onChange={(e) => setFormState((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio (Optional)</Label>
            <Textarea
              id="bio"
              value={formState.bio}
              onChange={(e) => setFormState((prev) => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself"
              rows={4}
            />
            {errors.bio && <p className="text-xs text-red-500">{errors.bio}</p>}
          </div>

          <Button type="submit" disabled={isSaving} className="w-full btn-primary">
            {isSaving ? "Saving Changes..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}