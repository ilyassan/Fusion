"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteAccountDialog from "./DeleteAccountDialog";
import { UserProfile } from "../lib/types";

export default function ActionsSection({ profile }: { profile: UserProfile }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Account Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">My Companies</h3>
            <p className="text-sm text-gray-500">View and manage your companies</p>
          </div>
          <Link href="/companies">
            <Button className="btn-primary">Go to Companies</Button>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-red-600">Delete Account</h3>
            <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
          </div>
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <DeleteAccountDialog onClose={() => setDeleteDialogOpen(false)} />
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}