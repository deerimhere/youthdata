"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, HelpCircle, RefreshCw, Zap, BarChart, Play, Trophy, Star } from "lucide-react"
import { getTodaysMission, missionIcons } from "@/lib/api/mock-data"
import type { LearningMission } from "@/lib/types"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function LearnPage() {
  const [mission, setMission] = useState<LearningMission | null>(null)
  const [missionStatus, setMissionStatus] = useState<"idle" | "active" | "completed">("idle")
  const [showHelp, setShowHelp] = useState(false)
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    setMission(getTodaysMission())
  }, [])

  const startMission = () => {
    setMissionStatus("active")
    setShowHelp(false)
    setProgressValue(0)
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 10
      if (currentProgress <= 100) {
        setProgressValue(currentProgress)
      } else {
        clearInterval(interval)
      }
    }, 300)
  }

  const completeMission = () => {
    setMissionStatus("completed")
    setProgressValue(100)
  }

  const resetMission = () => {
    setMission(getTodaysMission())
    setMissionStatus("idle")
    setShowHelp(false)
    setProgressValue(0)
  }

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-8 text-center">
          <RefreshCw className="h-12 w-12 mx-auto mb-4 animate-spin text-purple-500" />
          <p className="text-xl">오늘의 미션을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  const MissionIcon = missionIcons[mission.type]

  return (
    <div className="min-h-screen py-12 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text">오늘의 학습 미션</h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
          작은 성공을 체감하며{" "}
          <span className="text-green-600 dark:text-green-400 font-medium">"나 진짜 뭔가 했구나!"</span>
          <br className="md:hidden" /> 느껴보세요
        </p>
      </div>

      {/* Mission Card */}
      <div className="max-w-2xl mx-auto">
        <Card className="glass-card border-0 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>

          <CardHeader className="relative text-center pb-6">
            <div className="flex justify-center mb-6">
              <div
                className={cn(
                  "p-6 rounded-full transition-all duration-500",
                  missionStatus === "completed"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 pulse-glow"
                    : "bg-gradient-to-r from-purple-500 to-pink-500",
                )}
              >
                {missionStatus === "completed" ? (
                  <Trophy className="h-12 w-12 text-white" />
                ) : (
                  <MissionIcon className="h-12 w-12 text-white" />
                )}
              </div>
            </div>

            <CardTitle className="text-2xl md:text-3xl font-bold gradient-text mb-4">{mission.title}</CardTitle>
            <CardDescription className="text-lg leading-relaxed">{mission.description}</CardDescription>
          </CardHeader>

          <CardContent className="relative space-y-6">
            {/* Mission Info */}
            <div className="flex justify-between items-center p-4 glass-card rounded-xl">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">예상 소요: {mission.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-purple-500" />
                <span className="font-medium">🎁 {mission.reward}</span>
              </div>
            </div>

            {/* Progress Bar */}
            {missionStatus === "active" && (
              <div className="space-y-3">
                <Progress value={progressValue} className="h-4 bg-white/10" />
                <p className="text-center text-lg font-semibold text-purple-600 dark:text-purple-400">
                  {progressValue}% 진행 중... 🚀
                </p>
              </div>
            )}

            {/* Help Section */}
            {showHelp && (
              <Alert className="glass-card border-amber-200/50 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                <HelpCircle className="h-5 w-5 text-amber-500" />
                <AlertTitle className="text-amber-600 dark:text-amber-400 text-lg">
                  💡 GPT 조력자가 도와드려요!
                </AlertTitle>
                <AlertDescription className="text-amber-600/80 dark:text-amber-400/80 text-base leading-relaxed">
                  걱정 마세요! 이 미션은 {mission.title.toLowerCase()}에 대한 것이에요.
                  {mission.link ? (
                    <Link
                      href={mission.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                      {" "}
                      이 자료
                    </Link>
                  ) : (
                    " 관련 자료"
                  )}
                  를 참고하거나, 작은 단계부터 시작하면 괜찮아요! ✨
                </AlertDescription>
              </Alert>
            )}

            {/* Completion Section */}
            {missionStatus === "completed" && (
              <Alert className="glass-card border-green-200/50 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <AlertTitle className="text-green-600 dark:text-green-400 text-xl font-bold">🎉 미션 완료!</AlertTitle>
                <AlertDescription className="text-green-600/80 dark:text-green-400/80 space-y-4">
                  <p className="text-lg">정말 잘했어요! 오늘의 학습 기록이 저장되었어요. ({mission.reward})</p>

                  <div className="glass-card p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                    <h4 className="font-bold text-lg flex items-center mb-3">
                      <BarChart className="h-5 w-5 mr-2" />
                      나의 성장 그래프 ✨
                    </h4>
                    <div className="h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg pulse-glow">
                      능력치 UP! 🚀
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="relative flex flex-col sm:flex-row gap-4 pt-6">
            {missionStatus !== "completed" && (
              <Button
                variant="outline"
                onClick={() => setShowHelp(!showHelp)}
                disabled={missionStatus === "active" && progressValue > 0}
                className="glass-card border-amber-200/50 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400"
              >
                <HelpCircle className="h-4 w-4 mr-2" /> 잘 모르겠어요
              </Button>
            )}

            {missionStatus === "idle" && (
              <Button
                onClick={startMission}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Play className="h-5 w-5 mr-2" /> 시작하기
              </Button>
            )}

            {missionStatus === "active" && (
              <Button
                onClick={completeMission}
                disabled={progressValue < 100}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg disabled:opacity-50"
                size="lg"
              >
                <CheckCircle className="h-5 w-5 mr-2" /> 완료하기
              </Button>
            )}

            {missionStatus === "completed" && (
              <Button
                onClick={resetMission}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <RefreshCw className="h-5 w-5 mr-2" /> 새로운 미션 받기
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

LearnPage.defaultProps = {}
