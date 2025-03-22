import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Bell, Settings, CreditCard, LucideIcon } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const navLinks: NavLink[] = [
    { href: "/settings/profile", label: "Profile", icon: User },
    { href: "/settings/notifications", label: "Notifications", icon: Bell },
    { href: "/settings/billing", label: "Billing & Subscription", icon: CreditCard },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed top-0 left-0 pt-16">
      <nav className="space-y-1 p-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md ${
              isActive(link.href)
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}