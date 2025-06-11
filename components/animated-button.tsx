"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "outline" | "ghost" | "gradient"
  size?: "sm" | "default" | "lg"
  className?: string
  disabled?: boolean
  ripple?: boolean
}

export default function AnimatedButton({
  children,
  onClick,
  variant = "default",
  size = "default",
  className,
  disabled = false,
  ripple = true,
  ...props
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)

    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const newRipple = { id: Date.now(), x, y }

      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 600)
    }

    onClick?.()
  }

  const baseClasses = cn(
    "relative overflow-hidden transition-all duration-200 transform",
    "hover:scale-105 active:scale-95",
    isPressed && "scale-95",
    disabled && "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100",
  )

  const variantClasses = {
    default: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700",
    ghost: "text-blue-600 hover:bg-blue-50",
    gradient:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
  }

  return (
    <Button
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}

      {/* Ripple Effect */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </Button>
  )
}
