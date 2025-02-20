"use client";

import {
  Bell,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Users,
  ClipboardList,
  Package,
  Briefcase,
  BarChart2,
  Home,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSublink, setActiveSublink] = useState("Overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [notifications, setNotifications] = useState(3);

  const mainNavItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { id: "sales", label: "Sales & Orders", icon: <DollarSign className="w-5 h-5" /> },
    { id: "customers", label: "Customers", icon: <Users className="w-5 h-5" /> },
    { id: "tasks", label: "Tasks & Projects", icon: <ClipboardList className="w-5 h-5" /> },
  ];

  const secondaryNavItems = {
    dashboard: ["Overview", "Analytics", "Insights"],
    sales: ["All Orders", "Invoices", "Quotations", "Subscriptions"],
    customers: ["All Customers", "Companies", "Segments", "Campaigns"],
    tasks: ["Board View", "Calendar", "Files", "Time Tracking"],
    inventory: ["Products", "Categories", "Suppliers", "Warehouses"],
    employees: ["Directory", "Attendance", "Payroll", "Training"],
    reports: ["Sales Reports", "Financial Reports", "Inventory Reports", "Custom Reports"],
  };

  const quickActions = [
    { label: "New Sale", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Add Customer", icon: <Users className="w-4 h-4" /> },
  ];

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const MobileSidebar = () => (
    <div
      className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <span className="text-2xl font-bold text-blue-600">Fusion</span>
        <button onClick={() => setIsSidebarOpen(false)}>
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <nav className="mt-4">
        {mainNavItems.map((item) => (
          <div key={item.id}>
            <button
              className={`w-full flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
              onClick={() => toggleSection(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
              {openSections[item.id] ? (
                <ChevronUp className="w-4 h-4 ml-auto" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-auto" />
              )}
            </button>
            {openSections[item.id] && (
              <div className="pl-8 space-y-2">
                {secondaryNavItems[item.id].map((sublink) => (
                  <button
                    key={sublink}
                    className={`block text-left text-sm w-full px-4 py-2 ${
                      activeSublink === sublink
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setActiveSublink(sublink);
                      setIsSidebarOpen(false);
                    }}
                  >
                    {sublink}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-gray-600 bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="h-16 flex items-center justify-between px-2 md:px-6">
          <div className="flex items-center space-x-8 lg:space-x-0">
            {/* Mobile Menu Button */}
            <button className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-blue-600">Fusion</span>
            </div>
          </div>

          {/* Quick Actions, Notifications, Profile */}
          <div className="flex items-center space-x-3 md:space-x-6">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"
              >
                {action.icon}
                <span className="text-sm font-medium hidden sm:inline">{action.label}</span>
              </button>
            ))}

            <div className="hidden md:block h-8 w-px bg-gray-200" />

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-1.5 right-1.5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <span className="text-sm text-gray-700 font-medium hidden sm:inline">John Doe</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>
            </div>

            {/* Help */}
            <button className="hidden md:block p-2 rounded-lg hover:bg-gray-100">
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden lg:flex px-2 md:px-6 items-center justify-between border-t border-gray-200">
          <div className="flex items-center space-x-1">
            {mainNavItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === item.id
                      ? "border-blue-600 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
                <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white shadow-lg rounded-lg">
                  {secondaryNavItems[item.id].map((sublink) => (
                    <button
                      key={sublink}
                      className={`block text-left text-sm px-4 py-2 w-full hover:bg-gray-100 ${
                        activeSublink === sublink ? "text-blue-600 font-medium" : "text-gray-600"
                      }`}
                      onClick={() => setActiveSublink(sublink)}
                    >
                      {sublink}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;