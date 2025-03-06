"use client";

import { useState, useEffect } from "react";
import { Invitation } from "../../types/employeeTypes";

interface UseInvitationsProps {
  itemsPerPage: number;
  fetchInvitations: (page: number, itemsPerPage: number) => Promise<{ invitations: Invitation[]; totalItems: number }>;
  addInvitation: (email: string, role: string) => Promise<Invitation>;
}

export function useInvitations({ itemsPerPage, fetchInvitations, addInvitation }: UseInvitationsProps) {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const loadInvitations = async () => {
    setIsLoading(true);
    try {
      const { invitations: fetchedInvitations, totalItems: fetchedTotal } = await fetchInvitations(
        currentPage,
        itemsPerPage
      );
      setInvitations(fetchedInvitations);
      setTotalItems(fetchedTotal);
    } catch (err) {
      console.error("Failed to fetch invitations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInvitations();
  }, [currentPage, itemsPerPage]);

  const handleAddInvitation = async (email: string, role: string) => {
    try {
      const newInvite = await addInvitation(email, role);
      if (currentPage === 1) {
        setInvitations((prev) => [newInvite, ...prev].slice(0, itemsPerPage));
        setTotalItems((prev) => prev + 1);
      } else {
        setCurrentPage(1); // Jump to first page to show new invite
      }
    } catch (err) {
      throw err; // Let the caller handle the error
    }
  };

  return {
    invitations,
    currentPage,
    setCurrentPage,
    totalItems,
    totalPages,
    itemsPerPage,
    isLoading,
    addInvitation: handleAddInvitation,
  };
}