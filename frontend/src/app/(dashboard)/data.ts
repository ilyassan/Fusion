import {
    LayoutDashboard,
    Users,
    Handshake,
    BarChart3,
    BarChart,
    UserPlus,
    Boxes,
    Receipt,
    DollarSign,
    BarChart2,
    FileText,
    Clock,
    TrendingUp,
    Home,
    Briefcase,
  } from "lucide-react";
  
  interface LinkItem {
    title: string;
    icon: any;
    href: string;
  }
  
  interface Page {
    title: string;
    icon: any;
    links: LinkItem[];
  }
  
  interface Pages {
    [key: string]: Page; // Dynamic keys for routes
  }
  
  const pages: Pages = {
    "/dashboard": {
        title: "Dashboard",
        icon: Home,
        links: []
    },
    "/crm": {
      title: "Customers",
      icon: Users,
      links: [
        {
          title: "Overview",
          icon: LayoutDashboard,
          href: "/crm",
        },
        {
          title: "Customers",
          icon: Users,
          href: "/crm/customers",
        },
        {
          title: "Deals",
          icon: Handshake,
          href: "/crm/deals",
        },
        {
          title: "Reports & Analytics",
          icon: BarChart3,
          href: "/crm/reports-analytics",
        },
      ],
    },
    "/employees": {
      title: "Employees",
      icon: Briefcase,
      links: [
        {
          title: "Overview",
          icon: BarChart,
          href: "/employees",
        },
        {
          title: "Employees",
          icon: Users,
          href: "/employees/employees",
        },
        {
          title: "Add Employee",
          icon: UserPlus,
          href: "/employees/add",
        },
      ],
    },
    "/reports": {
      title: "Reports",
      icon: DollarSign,
      links: [
        {
          title: "Sales Reports",
          icon: BarChart3,
          href: "/reports",
        },
        {
          title: "Customers",
          icon: Users,
          href: "/reports/customers",
        },
        {
          title: "Inventory",
          icon: Boxes,
          href: "/reports/inventory",
        },
        {
          title: "Expenses",
          icon: Receipt,
          href: "/reports/expenses",
        },
        {
          title: "Revenues",
          icon: DollarSign,
          href: "/reports/revenues",
        },
      ],
    },
    "/sales-orders": {
      title: "Sales & Orders",
      icon: BarChart2,
      links: [
        {
          title: "Sales Overview",
          icon: BarChart2,
          href: "/sales-orders",
        },
        {
          title: "Sales",
          icon: FileText,
          href: "/sales-orders/sales",
        },
        {
          title: "Orders",
          icon: Clock,
          href: "/sales-orders/orders",
        },
        {
          title: "Sales Forecast & Insights",
          icon: TrendingUp,
          href: "/sales-orders/insights",
        },
      ],
    },
  };
  
  export default pages;