import AdminDashboard from "../components/AdminDashboard";
import EmployeeDashboard from "../components/EmployeeDashboard";
import ManagerDashboard from "../components/ManagerDashboard";

const Dashboard = () => {
  const role = "manager"; // Replace this with dynamic role logic (e.g., from context or API)

  let DashboardComponent = <AdminDashboard />; // Use a different variable name to avoid confusion
  switch (role) {
    case "employee":
      DashboardComponent = <EmployeeDashboard />;
      break;
    case "manager":
      DashboardComponent = <ManagerDashboard />;
      break;
    default:
      DashboardComponent = <AdminDashboard />; // Fallback to AdminDashboard
  }

  return DashboardComponent; // Directly return the JSX element
};

export default Dashboard;