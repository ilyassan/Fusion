"use client";

import { AddEmployeeHeader } from "./components/AddEmployeeHeader";
import { InvitationForm } from "./components/InvitationForm";
import { PendingInvitations } from "./components/PendingInvitations";
import { useInvitations } from "./hooks/useInvitations";
import { fetchInvitations, addInvitation } from "./data/invitationData";

export default function AddEmployeePage() {
  const {
    invitations,
    currentPage,
    setCurrentPage,
    totalItems,
    totalPages,
    itemsPerPage,
    isLoading,
    addInvitation: handleAddInvitation,
  } = useInvitations({
    itemsPerPage: 5,
    fetchInvitations,
    addInvitation,
  });

  return (
    <div className="space-y-8">
      <AddEmployeeHeader />
      <InvitationForm addInvitation={handleAddInvitation} />
      <PendingInvitations
        invitations={invitations}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}