"use client"

import { useState } from "react"
import { Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimatedBookmarkProps {
  isBookmarked?: boolean
  onToggle?: (bookmarked: boolean) => void
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function AnimatedBookmark({
  isBookmarked = false,
  onToggle,
  size = "md",
  className,
}: AnimatedBookmarkProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    const newBookmarked = !bookmarked
    setBookmarked(newBookmarked)
    setIsAnimating(true)

    setTimeout(() => setIsAnimating(false), 400)
    onToggle?.(newBookmarked)
  }

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative p-2 rounded-full transition-all duration-200",
        "hover:bg-blue-50 active:scale-90",
        "focus:outline-none focus:ring-2 focus:ring-blue-200",
        className,
      )}
    >
      <Bookmark
        className={cn(
          sizeClasses[size],
          "transition-all duration-300 transform",
          bookmarked ? "fill-blue-500 text-blue-500 scale-110" : "text-gray-400 hover:text-blue-400",
          isAnimating && (bookmarked ? "animate-pulse" : "animate-bounce"),
        )}
      />

      {/* Bookmark save animation */}
      {isAnimating && bookmarked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-300 rounded-full animate-ping opacity-75" />
        </div>
      )}
    </button>
  )
}
