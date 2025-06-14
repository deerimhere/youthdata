"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  ListChecks,
  Compass,
  BookHeart,
  Coffee,
  Music,
  MessageSquare,
  Moon,
  Sun,
  Sparkles,
  Heart,
  RefreshCw,
} from "lucide-react"
import {
  emotions as allEmotions,
  mockEmotionLogs,
  mockLearningHistory,
  mockExplorationHistory,
  getTodaysDiarySummary,
} from "@/lib/api/mock-data"
import type { EmotionLog, LearningHistoryItem, ExplorationHistoryItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import AbilityRadarChart from "@/components/ability-radar-chart"

const EmotionGraphPlaceholder = ({ logs }: { logs: EmotionLog[] }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <Heart className="h-12 w-12 text-pink-400 mx-auto mb-4 floating-animation" />
        <p className="text-lg text-muted-foreground">
          감정 기록이 아직 없어요. <br />
          홈에서 오늘의 감정을 기록해보세요! ✨
        </p>
      </div>
    )
  }

  const emotionMap = new Map(allEmotions.map((e) => [e.id, e]))

  return (
    <div className="glass-card rounded-2xl p-6">
      <p className="text-lg font-semibold mb-6 text-center gradient-text">최근 감정 변화</p>
      <div className="flex space-x-2 md:space-x-4 h-48 items-end overflow-x-auto pb-4">
        {logs.slice(-7).map((log, index) => {
          const emotionDetails = emotionMap.get(log.emotionId)
          const Icon = emotionDetails?.icon || MessageSquare
          const height = Math.max(20, (log.intensity || 0) * 25)

          return (
            <div key={index} className="flex-shrink-0 w-16 md:w-20 flex flex-col items-center group">
              <div
                className={cn(
                  "w-full rounded-t-xl transition-all duration-500 ease-out group-hover:scale-110 relative overflow-hidden",
                  "bg-gradient-to-t from-purple-500 to-pink-500",
                )}
                style={{ height: `${height}%` }}
                title={`${log.date}: ${emotionDetails?.label} (강도: ${log.intensity})`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
              </div>
              <div className="mt-3 p-2 glass-card rounded-full">
                <Icon className={cn("h-5 w-5 md:h-6 md:w-6", emotionDetails?.color)} />
              </div>
              <span className="text-xs mt-2 text-muted-foreground font-medium">{log.date.substring(5)}</span>
            </div>
          )
        })}
      </div>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        실제 앱에서는 더 상세한 인터랙티브 그래프가 제공됩니다 📊
      </p>
    </div>
  )
}

export default function MyRoomPage() {
  const [emotionLogs, setEmotionLogs] = useState<EmotionLog[]>([])
  const [learningHistory, setLearningHistory] = useState<LearningHistoryItem[]>([])
  const [explorationHistory, setExplorationHistory] = useState<ExplorationHistoryItem[]>([])
  const [diarySummary, setDiarySummary] = useState<string>("")
  const [isRelaxMode, setIsRelaxMode] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setEmotionLogs(mockEmotionLogs)
    setLearningHistory(mockLearningHistory)
    setExplorationHistory(mockExplorationHistory)
    setDiarySummary(getTodaysDiarySummary())
  }, [])

  if (isRelaxMode) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-200 via-purple-100 to-pink-200 dark:from-slate-900 dark:via-purple-900 dark:to-pink-900 flex flex-col items-center justify-center text-center p-8 space-y-8 transition-all duration-1000 ease-in-out">
        <div className="relative">
          <Music className="h-24 w-24 md:h-32 md:w-32 text-purple-400 floating-animation" />
          <div className="absolute inset-0 h-24 w-24 md:h-32 md:w-32 bg-purple-400/20 rounded-full blur-2xl"></div>
        </div>

        <div className="space-y-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">잠시 모든 것을 잊고 쉬어가세요</h2>
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
            당신은 충분히 잘하고 있어요. <br />이 공간에서 편안함을 느끼시길 바랍니다. <br />
            <span className="text-purple-600 dark:text-purple-400">잔잔한 음악이 흐른다고 상상해보세요 🎵</span>
          </p>
        </div>

        <Button
          onClick={() => setIsRelaxMode(false)}
          className="glass-card bg-white/20 hover:bg-white/30 backdrop-blur-xl border-white/30 text-foreground shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          <Heart className="h-5 w-5 mr-2" />
          마이룸으로 돌아가기
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">마이룸</h1>
          <p className="text-xl text-muted-foreground">나의 기록을 돌아보고, 편안하게 머무를 수 있는 공간입니다 ✨</p>
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="glass-card border-white/20 hover:bg-white/10 flex-shrink-0"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            onClick={() => setIsRelaxMode(true)}
            className="flex-1 lg:flex-initial glass-card bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border-purple-200/30 text-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Coffee className="h-5 w-5 mr-2" /> 오늘은 그냥 쉬고 싶어요
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="emotion" className="w-full">
        <TabsList className="glass-card grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-2 bg-transparent border border-white/10">
          {[
            { value: "emotion", icon: BarChart3, label: "능력치 현황", gradient: "from-pink-500 to-rose-500" },
            { value: "learning", icon: ListChecks, label: "학습 히스토리", gradient: "from-green-500 to-emerald-500" },
            { value: "exploration", icon: Compass, label: "탐색 히스토리", gradient: "from-blue-500 to-cyan-500" },
            { value: "diary", icon: BookHeart, label: "감정일기", gradient: "from-purple-500 to-violet-500" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "py-3 px-4 rounded-xl transition-all duration-300 relative overflow-hidden",
                "data-[state=active]:bg-white/10 data-[state=active]:backdrop-blur-sm",
                "data-[state=active]:border data-[state=active]:border-white/20",
                "data-[state=active]:shadow-lg hover:bg-white/5",
              )}
            >
              <div className="flex items-center relative z-10">
                <tab.icon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </div>

              {/* 활성 상태일 때 그라데이션 테두리 효과 */}
              <div
                className={cn(
                  "absolute inset-0 opacity-0 data-[state=active]:opacity-100 transition-opacity duration-300",
                  `bg-gradient-to-r ${tab.gradient} p-[1px] rounded-xl`,
                )}
              >
                <div className="w-full h-full bg-background/80 backdrop-blur-sm rounded-[calc(0.75rem-1px)]"></div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="emotion" className="mt-8">
          <AbilityRadarChart />
        </TabsContent>

        <TabsContent value="learning" className="mt-8">
          <Card className="glass-card border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold gradient-text flex items-center">
                <ListChecks className="h-6 w-6 mr-3" />
                학습 미션 히스토리
              </CardTitle>
              <CardDescription className="text-lg">완료했거나 진행 중인 학습 미션들을 볼 수 있어요 🎯</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {learningHistory.length > 0 ? (
                learningHistory.map((item, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-102"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-lg">{item.missionTitle}</p>
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-sm font-semibold",
                          item.status === "완료"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
                        )}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{item.date}</p>
                  </div>
                ))
              ) : (
                <div className="glass-card rounded-2xl p-8 text-center">
                  <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-4 floating-animation" />
                  <p className="text-lg text-muted-foreground">
                    아직 학습 기록이 없어요. <br />
                    학습 페이지에서 미션을 시작해보세요! 🚀
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exploration" className="mt-8">
          <Card className="glass-card border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold gradient-text flex items-center">
                <Compass className="h-6 w-6 mr-3" />
                직무 탐색 히스토리
              </CardTitle>
              <CardDescription className="text-lg">
                과거에 탐색했던 관심사와 추천 직무들을 확인하세요 🔍
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {explorationHistory.length > 0 ? (
                explorationHistory.map((item, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-102"
                  >
                    <p className="font-semibold text-lg mb-2">
                      관심사: <span className="gradient-text">{item.interest}</span>
                    </p>
                    {item.viewedJobs && item.viewedJobs.length > 0 && (
                      <p className="text-muted-foreground mb-2">확인한 직무: {item.viewedJobs.join(", ")}</p>
                    )}
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                ))
              ) : (
                <div className="glass-card rounded-2xl p-8 text-center">
                  <Compass className="h-12 w-12 text-blue-400 mx-auto mb-4 floating-animation" />
                  <p className="text-lg text-muted-foreground">
                    아직 직무 탐색 기록이 없어요. <br />
                    탐색 페이지에서 관심사를 선택해보세요! 🎯
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diary" className="mt-8">
          <Card className="glass-card border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold gradient-text flex items-center">
                <BookHeart className="h-6 w-6 mr-3" />
                오늘의 감정일기 요약
              </CardTitle>
              <CardDescription className="text-lg">하루 동안의 감정과 활동을 간략하게 요약해드려요 📝</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="glass-card p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2 gradient-text">AI 요약</h4>
                    <p className="text-base leading-relaxed">
                      {diarySummary || "오늘의 감정일기 요약을 불러오는 중입니다..."}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setDiarySummary(getTodaysDiarySummary())}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                요약 새로고침
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

MyRoomPage.defaultProps = {}
