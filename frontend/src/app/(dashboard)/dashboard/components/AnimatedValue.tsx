"use client";

import { useEffect, useState } from "react";

interface AnimatedValueProps {
  value: string; // is accept "$67,230" or "1,230" or "36"
}

export function AnimatedValue({ value }: AnimatedValueProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, "")); // Extract number
  const isCurrency = value.startsWith("$");

  // Animate the value progressively
  useEffect(() => {
    let start = displayValue;
    const end = numericValue;
    const duration = 1000; // 1 second animation
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 to 1
      const newValue = start + (end - start) * progress;

      setDisplayValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [numericValue]); // Re-run when the target value changes

  // Format the animated value to match the input format
  const formattedValue = isCurrency
    ? `$${Math.round(displayValue).toLocaleString()}`
    : Math.round(displayValue).toLocaleString();

  return <span>{formattedValue}</span>;
}