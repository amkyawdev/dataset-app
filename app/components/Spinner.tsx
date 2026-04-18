"use client";

import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Spinner - Loading spinner component
 */
export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} border-white/30 border-t-white rounded-full animate-spin
        ${className}
      `}
    />
  );
}

export default Spinner;