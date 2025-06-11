"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimatedHeartProps {
  isLiked?: boolean
  onToggle?: (liked: boolean) => void
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function AnimatedHeart({ isLiked = false, onToggle, size = "md", className }: AnimatedHeartProps) {
  const [liked, setLiked] = useState(isLiked)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    const newLiked = !liked
    setLiked(newLiked)
    setIsAnimating(true)

    setTimeout(() => setIsAnimating(false), 300)
    onToggle?.(newLiked)
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
        "hover:bg-red-50 active:scale-90",
        "focus:outline-none focus:ring-2 focus:ring-red-200",
        className,
      )}
    >
      <Heart
        className={cn(
          sizeClasses[size],
          "transition-all duration-300 transform",
          liked ? "fill-red-500 text-red-500 scale-110" : "text-gray-400 hover:text-red-400",
          isAnimating && "animate-bounce",
        )}
      />

      {/* Heart particles animation */}
      {isAnimating && liked && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full animate-ping"
              style={{
                left: `${50 + Math.cos((i * Math.PI) / 3) * 20}%`,
                top: `${50 + Math.sin((i * Math.PI) / 3) * 20}%`,
                animationDelay: `${i * 50}ms`,
                animationDuration: "0.6s",
              }}
            />
          ))}
        </>
      )}
    </button>
  )
}
