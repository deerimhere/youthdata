"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

interface AnimatedTabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export default function AnimatedTabs({ tabs, defaultTab, className }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return

    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(tabId)
      setIsTransitioning(false)
    }, 150)
  }

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab)

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Headers */}
      <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-1 border border-white/20 shadow-sm">
        <div className="flex relative">
          {/* Active tab indicator */}
          <div
            className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl transition-all duration-300 ease-out shadow-md"
            style={{
              left: `${(activeIndex * 100) / tabs.length}%`,
              width: `${100 / tabs.length}%`,
            }}
          />

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "relative flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl",
                "text-sm font-medium transition-all duration-300",
                "hover:scale-105 active:scale-95",
                activeTab === tab.id ? "text-white z-10" : "text-gray-600 hover:text-gray-800",
              )}
            >
              {tab.icon && (
                <span className={cn("transition-transform duration-300", activeTab === tab.id && "scale-110")}>
                  {tab.icon}
                </span>
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6 relative">
        <div
          className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 transform translate-y-2" : "opacity-100 transform translate-y-0",
          )}
        >
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>
    </div>
  )
}
