"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
}

/**
 * SelectInput - Dropdown component for Location and Major selection
 */
export function SelectInput({
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  placeholder = "ရွေးပါ...",
  icon,
}: SelectInputProps) {
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

        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`
              w-full appearance-none px-4 py-3 
              bg-slate-800/50 border-slate-700/50 rounded-xl
              text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              focus:border-blue-500/50
              transition-all duration-200
              cursor-pointer
              ${icon ? "pl-10" : ""}
              ${error ? "border-red-500/50 focus:ring-red-500/50" : ""}
            `}
            style={{ 
              fontFamily: '"Noto Sans Myanmar", "Myanmar Text", sans-serif',
              color: value ? 'white' : 'rgba(255,255,255,0.4)'
            }}
          >
            <option value="" disabled className="bg-slate-800">
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value} className="bg-slate-800">
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-1 text-red-400 text-sm">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default SelectInput;