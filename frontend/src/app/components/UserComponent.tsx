'use client';

import { useAuth } from "@/hooks/auth";
import Link from "next/link";

export default function UserComponent({ user }: { user: any}) {
  const { logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={() => logout()}>Logout</button>
        </>
      ) : (
        <p><Link href={"login"}>Login</Link></p>
      )}
    </div>
  );
}