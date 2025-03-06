"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle } from "lucide-react";
import { InvitationPagination } from "./InvitationPagination";
import { Invitation } from "../../(overview)/types/employeeTypes";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

interface PendingInvitationsProps {
  invitations: Invitation[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
}

export function PendingInvitations({
  invitations,
  isLoading,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  setCurrentPage,
}: PendingInvitationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Pending Invitations
        </CardTitle>
        <CardDescription>Track the status of sent invitations</CardDescription>
      </CardHeader>
      <CardContent>
        {invitations.length === 0 && !isLoading ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>No pending invitations found.</AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="whitespace-nowrap">Sent At</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    ["skeleton1", "skeleton2", "skeleton3", "skeleton4"].map((key) => (
                      <TableRow key={key}>
                        <TableCell>
                          <Skeleton className="w-48 h-6" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-20 h-6" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-24 h-6" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-16 h-6" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    invitations.map((invite) => (
                      <TableRow key={invite.id}>
                        <TableCell className="font-medium">{invite.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              invite.role === "Admin"
                                ? "destructive"
                                : invite.role === "Manager"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {invite.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{invite.sentAt}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            Pending
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <InvitationPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}