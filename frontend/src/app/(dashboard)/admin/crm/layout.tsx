"use client"

import { useState, type ReactNode } from "react"
import { 
  Users, 
  LayoutDashboard, 
  FileText, 
  Handshake, 
  BarChart3, 
  ChevronRight 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SidebarItem = ({
  icon: Icon,
  title,
  isActive,
  href,
  children,
}: {
  icon: any
  title: string
  isActive?: boolean
  href: string
  children?: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(true)

  if (children) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100",
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="flex-1">{title}</span>
            <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "transform rotate-90")} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-9 py-1 space-y-1">{children}</CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{title}</span>
    </Link>
  )
}

export default function SalesOrdersLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname();
  
  return (
    <div className="flex bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r border-gray-200 p-4 pt-8">
        <div className="flex items-center gap-2 px-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg font-semibold">Customers</h1>
        </div>
        <nav className="space-y-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            title="Overview" 
            href="/admin/crm" 
            isActive={pathname === "/admin/crm"} 
          />
          <SidebarItem
            icon={Users}
            title="Customers"
            href="/admin/crm/customers"
            isActive={pathname === "/admin/crm/customers"}
          />
          <SidebarItem
            icon={Handshake}
            title="Deals"
            href="/admin/crm/deals"
            isActive={pathname === "/admin/crm/deals"}
          />
          <SidebarItem
            icon={BarChart3}
            title="Reports & Analytics"
            href="/admin/crm/reports-analytics"
            isActive={pathname === "/admin/crm/reports-analytics"}
          />
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-8 space-y-6">{children}</div>
      </div>
    </div>
  )
}
