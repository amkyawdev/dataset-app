"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  rows?: number;
  icon?: React.ReactNode;
}

/**
 * FormInput - Reusable input component for Burmese text
 */
export function FormInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  rows = 1,
  icon,
}: FormInputProps) {
  const isTextarea = rows > 1;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
            {icon}
          </div>
        )}
        
        {isTextarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className={`
              w-full px-4 py-3 
              bg-slate-800/50 border-slate-700/50 rounded-xl
              text-white placeholder-white/40
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              focus:border-blue-500/50
              transition-all duration-200
              resize-none
              ${icon ? "pl-10" : ""}
              ${error ? "border-red-500/50 focus:ring-red-500/50" : ""}
            `}
            dir="ltr"
            style={{ fontFamily: '"Noto Sans Myanmar", "Myanmar Text", sans-serif' }}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`
              w-full px-4 py-3 
              bg-slate-800/50 border-slate-700/50 rounded-xl
              text-white placeholder-white/40
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              focus:border-blue-500/50
              transition-all duration-200
              ${icon ? "pl-10" : ""}
              ${error ? "border-red-500/50 focus:ring-red-500/50" : ""}
            `}
            dir="ltr"
            style={{ fontFamily: '"Noto Sans Myanmar", "Myanmar Text", sans-serif' }}
          />
        )}
      </div>
      
      {error && (
        <div className="flex items-center gap-1 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default FormInput;