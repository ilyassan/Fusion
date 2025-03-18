"use client";
import { useState } from "react";
import Skeleton from "@/app/(dashboard)/components/Skeleton";
import Image from "next/image";
import DashboardImage from "@/../public/Dashboard.svg";

export default function HeroImage() {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
        {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-lg shadow-xl" />
        )}
        <Image
            src={DashboardImage}
            onLoad={() => setIsLoading(false)}
            priority={true}
            alt="Fusion ERP Dashboard"
            className={`w-full h-full object-contain rounded-lg shadow-xl transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        />
    </>
  )
}