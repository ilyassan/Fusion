"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInView } from "../useInView";
import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}

export default function FeatureCard({ icon, title, description, bgColor, textColor }: FeatureCardProps) {
  const [ref, inView] = useInView();

  return (
    <Card
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${inView ? "fade-in-up" : "hidden-initial"}`}
    >
      <CardHeader>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${bgColor} ${textColor} flex items-center justify-center rounded-md mb-4`}>
          {icon}
        </div>
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm sm:text-base">{description}</p>
      </CardContent>
    </Card>
  );
}