"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="text-blue-500 text-xl sm:text-2xl font-bold">
            FUSION
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden md:flex gap-4 lg:gap-6">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              FAQ
            </a>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Button variant="outline" size="sm">
              Log In
            </Button>
            <Button className="btn-primary" size="sm">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <nav className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8 py-4">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              FAQ
            </a>
            <Button variant="outline" className="w-full">
              Log In
            </Button>
            <Button className="btn-primary w-full">
              Sign Up
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}