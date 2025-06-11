"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  color?: "blue" | "green" | "purple" | "gray"
}

export default function LoadingSpinner({ size = "md", className, color = "blue" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  const colorClasses = {
    blue: "border-blue-600",
    green: "border-green-600",
    purple: "border-purple-600",
    gray: "border-gray-600",
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-200",
          sizeClasses[size],
          colorClasses[color],
          "border-t-transparent",
          className,
        )}
      />
    </div>
  )
}
