"use client"

import { useEffect, useState } from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  message: string
  type?: "success" | "error" | "info" | "warning"
  duration?: number
  onClose?: () => void
  isVisible?: boolean
}

export default function ToastNotification({
  message,
  type = "info",
  duration = 3000,
  onClose,
  isVisible = true,
}: ToastProps) {
  const [show, setShow] = useState(isVisible)

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setShow(false)
        setTimeout(() => onClose?.(), 300)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  }

  const iconColors = {
    success: "text-green-500",
    error: "text-red-500",
    info: "text-blue-500",
    warning: "text-yellow-500",
  }

  const Icon = icons[type]

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 max-w-sm w-full",
        "transform transition-all duration-300 ease-in-out",
        show ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95",
      )}
    >
      <div className={cn("flex items-center p-4 rounded-lg border shadow-lg backdrop-blur-sm", colors[type])}>
        <Icon className={cn("w-5 h-5 mr-3 flex-shrink-0", iconColors[type])} />
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={() => {
            setShow(false)
            setTimeout(() => onClose?.(), 300)
          }}
          className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
