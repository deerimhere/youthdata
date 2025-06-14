"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface AbilityData {
  name: string
  value: number
  color: string
}

interface AbilityContextType {
  abilities: AbilityData[]
  updateAbility: (abilityName: string, increment: number) => void
  resetAbilities: () => void
}

const defaultAbilities: AbilityData[] = [
  { name: "운동", value: 75, color: "#ef4444" },
  { name: "공부", value: 85, color: "#3b82f6" },
  { name: "창의성", value: 90, color: "#8b5cf6" },
  { name: "소통", value: 70, color: "#10b981" },
  { name: "집중력", value: 80, color: "#f59e0b" },
  { name: "리더십", value: 65, color: "#ec4899" },
]

const AbilityContext = createContext<AbilityContextType | undefined>(undefined)

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const [abilities, setAbilities] = useState<AbilityData[]>(defaultAbilities)

  // 로컬 스토리지에서 능력치 불러오기
  useEffect(() => {
    const savedAbilities = localStorage.getItem("userAbilities")
    if (savedAbilities) {
      setAbilities(JSON.parse(savedAbilities))
    }
  }, [])

  // 능력치 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("userAbilities", JSON.stringify(abilities))
  }, [abilities])

  const updateAbility = (abilityName: string, increment: number) => {
    setAbilities((prev) =>
      prev.map((ability) =>
        ability.name === abilityName
          ? { ...ability, value: Math.min(100, Math.max(0, ability.value + increment)) }
          : ability,
      ),
    )
  }

  const resetAbilities = () => {
    setAbilities(defaultAbilities)
    localStorage.removeItem("userAbilities")
  }

  return (
    <AbilityContext.Provider value={{ abilities, updateAbility, resetAbilities }}>{children}</AbilityContext.Provider>
  )
}

export function useAbility() {
  const context = useContext(AbilityContext)
  if (context === undefined) {
    throw new Error("useAbility must be used within an AbilityProvider")
  }
  return context
}
