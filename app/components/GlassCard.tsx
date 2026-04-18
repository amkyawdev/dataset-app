"use client";

import React, { CSSProperties } from "react";
import { LucideIcon } from "lucide-react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  style?: CSSProperties;
}

/**
 * GlassCard - Glassmorphism card container component
 * Features: backdrop blur, semi-transparent background, border
 */
export function GlassCard({ children, className = "", title, style }: GlassCardProps) {
  return (
    <div
      className={`
        bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl
        ${className}
      `}
      style={style}
    >
      {title && (
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export default GlassCard;