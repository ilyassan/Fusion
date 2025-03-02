"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Mail, UserPlus, Clock, AlertCircle } from "lucide-react"
import { mockInvitations } from "../data"
import type { Invitation } from "../types"

export default function AddEmployeePage() {
  const [invitations, setInvitations] = useState<Invitation[]>(mockInvitations)
  const [newInviteEmail, setNewInviteEmail] = useState("")
  const [newInviteRole, setNewInviteRole] = useState("Employee")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const handleSendInvite = async () => {
    if (!validateEmail(newInviteEmail)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address.",
      })
      return
    }

    if (invitations.some(invite => invite.email === newInviteEmail)) {
      toast({
        variant: "destructive",
        title: "Duplicate invitation",
        description: "An invitation has already been sent to this email.",
      })
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newInvite: Invitation = {
      id: invitations.length + 1,
      email: newInviteEmail,
      role: newInviteRole,
      sentAt: new Date().toISOString().split("T")[0],
    }
    
    setInvitations([newInvite, ...invitations])
    setNewInviteEmail("")
    setNewInviteRole("Employee")
    setIsSubmitting(false)
    
    toast({
      title: "Invitation sent successfully",
      description: `An invitation has been sent to ${newInviteEmail}`,
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="text-2xl font-bold">Add Employee</h2>
          <p className="text-gray-500">Send invitations to new team members</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            Send Invitation
          </CardTitle>
          <CardDescription>
            The invited person will receive an email with instructions to join your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  placeholder="employee@company.com"
                  value={newInviteEmail}
                  onChange={(e) => setNewInviteEmail(e.target.value)}
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select value={newInviteRole} onValueChange={setNewInviteRole}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employee">Employee</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button 
              onClick={handleSendInvite} 
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Invitation"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Pending Invitations
          </CardTitle>
          <CardDescription>
            Track the status of sent invitations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {invitations.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No pending invitations found.
              </AlertDescription>
            </Alert>
          ) : (
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
                  {invitations.map((invite) => (
                    <TableRow key={invite.id}>
                      <TableCell className="font-medium">{invite.email}</TableCell>
                      <TableCell>
                        <Badge variant={
                          invite.role === "Admin" ? "destructive" : 
                          invite.role === "Manager" ? "default" : 
                          "secondary"
                        }>
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
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}