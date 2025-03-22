"use client";

import HeaderNavbar from "./components/HeaderNavbar";
import Sidebar from "./components/Sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNavbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 pt-4">{children}</main>
      </div>
    </div>
  );
}