"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimatedSearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export default function AnimatedSearch({
  placeholder = "검색어를 입력하세요...",
  onSearch,
  className,
}: AnimatedSearchProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsTyping(true)

    // Stop typing animation after a delay
    setTimeout(() => setIsTyping(false), 500)

    onSearch?.(value)
  }

  const handleClear = () => {
    setQuery("")
    setIsTyping(false)
    inputRef.current?.focus()
    onSearch?.("")
  }

  return (
    <div className={cn("relative", className)}>
      <div className={cn("relative transition-all duration-300 transform", isFocused && "scale-105")}>
        <Search
          className={cn(
            "absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300",
            isFocused || query ? "text-blue-500 scale-110" : "text-gray-400",
            isTyping && "animate-pulse",
          )}
          size={20}
        />

        <Input
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "pl-12 pr-12 py-4 text-lg rounded-2xl border-0 shadow-sm",
            "bg-white/80 backdrop-blur-sm transition-all duration-300",
            "focus:shadow-lg focus:bg-white",
            isFocused && "ring-2 ring-blue-200",
          )}
        />

        {query && (
          <button
            onClick={handleClear}
            className={cn(
              "absolute right-4 top-1/2 transform -translate-y-1/2",
              "text-gray-400 hover:text-gray-600 transition-all duration-200",
              "hover:scale-110 active:scale-90 p-1 rounded-full hover:bg-gray-100",
            )}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Search suggestions or loading indicator */}
      {isTyping && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-3 z-10">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin" />
            <span>검색 중...</span>
          </div>
        </div>
      )}
    </div>
  )
}
