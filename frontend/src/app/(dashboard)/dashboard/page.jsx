import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import ManagerDashboard from "./ManagerDashboard";

const Dashboard = () => {
  const roles = ["admin", "manager", "employee"];
  const role = roles[0];

  let DashboardComponent = <AdminDashboard />;
  switch (role) {
    case roles[2]:
      DashboardComponent = <EmployeeDashboard />;
      break;
    case roles[1]:
      DashboardComponent = <ManagerDashboard />;
      break;
    default:
      DashboardComponent = <AdminDashboard />;
  }

  return DashboardComponent;
};

export default Dashboard;