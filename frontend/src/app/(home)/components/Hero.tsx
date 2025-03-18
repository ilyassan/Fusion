"use client";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import DashboardImage from "@/../public/Dashboard.svg";
import { useState } from "react";
import Skeleton from "@/app/(dashboard)/components/Skeleton";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tighter">
                Run Your Business Smarter <br /> with Fusion ERP
              </h1>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600">
                Manage customers, inventory, sales, and teams in one powerful platform—designed to save time, cut costs, and grow your business faster.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto h-10 sm:h-12 px-6 sm:px-8 btn-primary"
                aria-label="Start your free trial"
              >
                Try for Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-10 sm:h-12 px-6 sm:px-8"
                aria-label="Watch a demo video"
              >
                <PlayCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Watch Demo
              </Button>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              No credit card required. 14-day free trial with all features unlocked.
            </div>
          </div>
          <div className="relative w-full max-h-[500px] hidden sm:block">
            {isLoading && (
              <Skeleton className="absolute inset-0 w-full h-full rounded-lg shadow-xl" />
            )}
            <Image
              src={DashboardImage}
              onLoad={() => setIsLoading(false)}
              alt="Fusion ERP Dashboard"
              className={`w-full h-full object-contain rounded-lg shadow-xl transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}