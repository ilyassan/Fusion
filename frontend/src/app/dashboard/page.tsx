"use client";

import { useAuth } from "@/hooks/auth";

const Dashboard = () => {
    const {logout} = useAuth({middleware: "auth"});
    
  return (
    <div>
        This is a protected page no one can access it except the auth ones

        <button onClick={logout}>Sign out</button>
    </div>
  );
};

export default Dashboard;