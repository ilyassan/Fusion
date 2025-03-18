import { Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 sm:py-12">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
          <div className="col-span-2">
            <div className="text-blue-500 text-xl sm:text-2xl font-bold mb-4">
              FUSION
            </div>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Your all-in-one ERP solution for managing customers, inventory, sales, and teams—built to simplify and scale your business.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2025 Fusion. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap space-x-4 sm:space-x-6">
            <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-900">
              Terms of Service
            </a>
            <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-900">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}