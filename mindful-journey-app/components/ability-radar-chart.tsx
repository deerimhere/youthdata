"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useAbility } from "@/lib/contexts/ability-context"
import { RotateCcw } from "lucide-react"

export default function AbilityRadarChart() {
  const { abilities, resetAbilities } = useAbility()

  const centerX = 150
  const centerY = 150
  const radius = 100
  const maxRadius = 80

  // 육각형의 각 꼭짓점 계산
  const getPoint = (index: number, value: number) => {
    const angle = (index * 60 - 90) * (Math.PI / 180) // -90도로 시작해서 위쪽부터
    const r = (value / 100) * maxRadius
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    }
  }

  // 배경 육각형 그리드 생성
  const backgroundLevels = [20, 40, 60, 80, 100]

  const getBackgroundPoint = (index: number, level: number) => {
    const angle = (index * 60 - 90) * (Math.PI / 180)
    const r = (level / 100) * maxRadius
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    }
  }

  // 능력치 다각형 경로 생성
  const abilityPath =
    abilities
      .map((ability, index) => {
        const point = getPoint(index, ability.value)
        return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
      })
      .join(" ") + " Z"

  return (
    <Card className="glass-card border-0 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold gradient-text">내 능력치 현황</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={resetAbilities}
            className="glass-card border-white/20 hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            초기화
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* SVG 레이더 차트 */}
        <div className="flex justify-center">
          <svg width="300" height="300" className="drop-shadow-lg">
            {/* 배경 그리드 */}
            {backgroundLevels.map((level, levelIndex) => (
              <polygon
                key={levelIndex}
                points={abilities
                  .map((_, index) => {
                    const point = getBackgroundPoint(index, level)
                    return `${point.x},${point.y}`
                  })
                  .join(" ")}
                fill="none"
                stroke="rgba(148, 163, 184, 0.3)"
                strokeWidth="1"
              />
            ))}

            {/* 축선 */}
            {abilities.map((_, index) => {
              const endPoint = getBackgroundPoint(index, 100)
              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={endPoint.x}
                  y2={endPoint.y}
                  stroke="rgba(148, 163, 184, 0.3)"
                  strokeWidth="1"
                />
              )
            })}

            {/* 능력치 다각형 */}
            <path d={abilityPath} fill="rgba(139, 92, 246, 0.2)" stroke="rgba(139, 92, 246, 0.8)" strokeWidth="2" />

            {/* 능력치 점들 */}
            {abilities.map((ability, index) => {
              const point = getPoint(index, ability.value)
              return (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={ability.color}
                  stroke="white"
                  strokeWidth="2"
                />
              )
            })}

            {/* 라벨 */}
            {abilities.map((ability, index) => {
              const labelPoint = getBackgroundPoint(index, 115)
              return (
                <text
                  key={index}
                  x={labelPoint.x}
                  y={labelPoint.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-semibold fill-current"
                  fill="currentColor"
                >
                  {ability.name}
                </text>
              )
            })}
          </svg>
        </div>

        {/* 능력치 상세 정보 */}
        <div className="grid grid-cols-2 gap-4">
          {abilities.map((ability, index) => (
            <div key={index} className="glass-card p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{ability.name}</span>
                <span className="text-sm font-bold" style={{ color: ability.color }}>
                  {ability.value}%
                </span>
              </div>
              <Progress
                value={ability.value}
                className="h-2"
                style={{
                  background: `linear-gradient(to right, ${ability.color}20, ${ability.color}40)`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">학습한 활동을 통해 능력치를 향상시켜보세요! 📈</p>
        </div>
      </CardContent>
    </Card>
  )
}
