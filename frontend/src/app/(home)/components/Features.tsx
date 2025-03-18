import { BarChart, Box, Users, Zap } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 md:py-24 bg-gray-50"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Why Fusion Stands Out
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600">
            Unify your business operations with tools designed to save time, reduce costs, and accelerate growth—all in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          <FeatureCard
            icon={<BarChart className="h-5 w-5 sm:h-6 sm:w-6"/>}
            title="Actionable Insights"
            description="Get real-time analytics across sales, inventory, and finances to make smarter decisions and spot opportunities instantly."
            bgColor="bg-orange-100"
            textColor="text-orange-500"
          />
          <FeatureCard
            icon={<Box className="h-5 w-5 sm:h-6 sm:w-6"/>}
            title="Inventory Mastery"
            description="Manage stock, suppliers, and warehouses effortlessly, ensuring you’re always ready to meet demand without overstocking."
            bgColor="bg-blue-100"
            textColor="text-blue-500"
          />
          <FeatureCard
            icon={<Zap className="h-5 w-5 sm:h-6 sm:w-6"/>}
            title="Centralized Control"
            description="Oversee your customers, inventory, sales, and team from one unified platform, simplifying management and boosting efficiency."
            bgColor="bg-purple-100"
            textColor="text-purple-500"
          />
          <FeatureCard
            icon={<Users className="h-5 w-5 sm:h-6 sm:w-6"/>}
            title="Team Empowerment"
            description="Equip your team with intuitive CRM, task management, and employee tools to collaborate effectively and drive results."
            bgColor="bg-green-100"
            textColor="text-green-500"
          />
        </div>
      </div>
    </section>
  );
}