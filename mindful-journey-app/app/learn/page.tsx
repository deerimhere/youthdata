"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  HelpCircle,
  RefreshCw,
  Zap,
  BarChart,
  Play,
  Trophy,
  Star,
  TrendingUp,
  BookOpen,
  ArrowLeft,
  Clock,
  Target,
  Award,
  Lock,
} from "lucide-react"
import { getTodaysMission, missionIcons, getJobCurriculum } from "@/lib/api/mock-data"
import type { LearningMission, JobCurriculum } from "@/lib/types"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAbility } from "@/lib/contexts/ability-context"
import { useSearchParams, useRouter } from "next/navigation"

export default function LearnPage() {
  const [mission, setMission] = useState<LearningMission | null>(null)
  const [missionStatus, setMissionStatus] = useState<"idle" | "active" | "completed">("idle")
  const [showHelp, setShowHelp] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const [showAbilityGains, setShowAbilityGains] = useState(false)
  const [curriculum, setCurriculum] = useState<JobCurriculum | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [currentMissionIndex, setCurrentMissionIndex] = useState<number>(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [completedMissions, setCompletedMissions] = useState<Set<string>>(new Set())

  const { updateAbility, abilities } = useAbility()
  const searchParams = useSearchParams()
  const router = useRouter()
  const curriculumId = searchParams.get("curriculum")

  useEffect(() => {
    if (curriculumId) {
      const jobCurriculum = getJobCurriculum(curriculumId)
      if (jobCurriculum) {
        setCurriculum(jobCurriculum)
        setMission(jobCurriculum.steps[0].missions[0])
      }
    } else {
      setMission(getTodaysMission())
    }
  }, [curriculumId])

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
    setShowAbilityGains(true)

    // 능력치 업데이트
    if (mission?.abilityRewards) {
      Object.entries(mission.abilityRewards).forEach(([abilityName, increment]) => {
        updateAbility(abilityName, increment)
      })
    }

    // 커리큘럼 모드에서 미션 완료 처리
    if (curriculum && mission) {
      const newCompletedMissions = new Set(completedMissions)
      newCompletedMissions.add(mission.id)
      setCompletedMissions(newCompletedMissions)

      // 현재 스텝의 모든 미션이 완료되었는지 확인
      const currentStepMissions = curriculum.steps[currentStep].missions
      const allMissionsCompleted = currentStepMissions.every(
        (m) => newCompletedMissions.has(m.id) || m.id === mission.id,
      )

      if (allMissionsCompleted) {
        const newCompletedSteps = new Set(completedSteps)
        newCompletedSteps.add(curriculum.steps[currentStep].id)
        setCompletedSteps(newCompletedSteps)
      }
    }
  }

  const resetMission = () => {
    if (curriculum) {
      // 커리큘럼 모드에서는 다음 미션으로 이동
      const currentStepMissions = curriculum.steps[currentStep].missions
      if (currentMissionIndex < currentStepMissions.length - 1) {
        // 같은 스텝의 다음 미션
        setCurrentMissionIndex(currentMissionIndex + 1)
        setMission(currentStepMissions[currentMissionIndex + 1])
      } else if (currentStep < curriculum.steps.length - 1) {
        // 다음 스텝의 첫 번째 미션
        setCurrentStep(currentStep + 1)
        setCurrentMissionIndex(0)
        setMission(curriculum.steps[currentStep + 1].missions[0])
      } else {
        // 모든 커리큘럼 완료
        setMission(null)
      }
    } else {
      setMission(getTodaysMission())
    }

    setMissionStatus("idle")
    setShowHelp(false)
    setProgressValue(0)
    setShowAbilityGains(false)
  }

  const goBackToCurriculum = () => {
    setMission(null)
  }

  const selectMission = (stepIndex: number, missionIndex: number) => {
    setCurrentStep(stepIndex)
    setCurrentMissionIndex(missionIndex)
    setMission(curriculum!.steps[stepIndex].missions[missionIndex])
    setMissionStatus("idle")
    setShowHelp(false)
    setProgressValue(0)
    setShowAbilityGains(false)
  }

  // 커리큘럼 개요 화면
  if (curriculum && !mission) {
    return (
      <div className="min-h-screen py-12 space-y-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="glass-card border-white/20 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            뒤로가기
          </Button>
        </div>

        {/* Curriculum Header */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">{curriculum.jobTitle}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">{curriculum.description}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge variant="outline" className="glass-card px-4 py-2">
                <Clock className="h-4 w-4 mr-2" />
                {curriculum.totalDuration}
              </Badge>
              <Badge variant="outline" className="glass-card px-4 py-2">
                <Target className="h-4 w-4 mr-2" />
                {curriculum.difficulty}
              </Badge>
            </div>
          </div>
        </div>

        {/* Required Abilities */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold gradient-text flex items-center">
                <TrendingUp className="h-6 w-6 mr-3" />
                권장 능력치
              </CardTitle>
              <CardDescription className="text-lg">
                이 직업을 위해 권장되는 능력치입니다. 현재 능력치와 비교해보세요!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(curriculum.requiredAbilities).map(([abilityName, requiredValue]) => {
                  const currentAbility = abilities.find((a) => a.name === abilityName)
                  const currentValue = currentAbility?.value || 0
                  const isReady = currentValue >= requiredValue

                  return (
                    <div key={abilityName} className="glass-card p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{abilityName}</span>
                        <div className="flex items-center space-x-2">
                          <span className={cn("text-sm font-bold", isReady ? "text-green-500" : "text-orange-500")}>
                            {currentValue}/{requiredValue}
                          </span>
                          {isReady ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                      </div>
                      <Progress value={(currentValue / requiredValue) * 100} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Curriculum Steps */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold gradient-text text-center mb-8">학습 커리큘럼</h2>
          <div className="space-y-8">
            {curriculum.steps.map((step, stepIndex) => {
              const isStepCompleted = completedSteps.has(step.id)
              const isStepUnlocked = stepIndex === 0 || completedSteps.has(curriculum.steps[stepIndex - 1].id)

              return (
                <Card
                  key={step.id}
                  className={cn(
                    "glass-card border-0 shadow-2xl transition-all duration-300",
                    isStepCompleted && "bg-gradient-to-r from-green-500/10 to-emerald-500/10",
                    !isStepUnlocked && "opacity-50",
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={cn(
                            "p-3 rounded-full",
                            isStepCompleted
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : isStepUnlocked
                                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                : "bg-gray-400",
                          )}
                        >
                          {isStepCompleted ? (
                            <CheckCircle className="h-6 w-6 text-white" />
                          ) : isStepUnlocked ? (
                            <BookOpen className="h-6 w-6 text-white" />
                          ) : (
                            <Lock className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-xl md:text-2xl font-bold gradient-text">{step.title}</CardTitle>
                          <CardDescription className="text-base">{step.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="glass-card">
                          <Clock className="h-3 w-3 mr-1" />
                          {step.estimatedDuration}
                        </Badge>
                        <Badge variant="outline" className="glass-card">
                          {step.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {step.missions.map((stepMission, missionIndex) => {
                        const isMissionCompleted = completedMissions.has(stepMission.id)
                        const MissionIcon = missionIcons[stepMission.type]

                        return (
                          <Card
                            key={stepMission.id}
                            className={cn(
                              "glass-card border-0 cursor-pointer transition-all duration-300 hover:scale-105",
                              isMissionCompleted && "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
                              !isStepUnlocked && "pointer-events-none",
                            )}
                            onClick={() => isStepUnlocked && selectMission(stepIndex, missionIndex)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <div
                                  className={cn(
                                    "p-2 rounded-full flex-shrink-0",
                                    isMissionCompleted ? "bg-green-500" : "bg-purple-500",
                                  )}
                                >
                                  {isMissionCompleted ? (
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  ) : (
                                    <MissionIcon className="h-4 w-4 text-white" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm mb-1">{stepMission.title}</h4>
                                  <p className="text-xs text-muted-foreground mb-2">{stepMission.description}</p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-purple-600 dark:text-purple-400">
                                      {stepMission.duration}
                                    </span>
                                    {isMissionCompleted && <Award className="h-4 w-4 text-green-500" />}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Completion Status */}
        <div className="text-center">
          <div className="glass-card rounded-2xl p-6 max-w-md mx-auto">
            <h3 className="text-xl font-bold gradient-text mb-4">진행 상황</h3>
            <div className="space-y-2">
              <Progress value={(completedSteps.size / curriculum.steps.length) * 100} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {completedSteps.size}/{curriculum.steps.length} 단계 완료
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 기존 미션 실행 화면
  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-8 text-center">
          <RefreshCw className="h-12 w-12 mx-auto mb-4 animate-spin text-purple-500" />
          <p className="text-xl">미션을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  const MissionIcon = missionIcons[mission.type]

  return (
    <div className="min-h-screen py-12 space-y-12">
      {/* Header */}
      {curriculum && (
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={goBackToCurriculum}
            className="glass-card border-white/20 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            커리큘럼으로 돌아가기
          </Button>
          <div className="glass-card px-4 py-2 rounded-full">
            <span className="text-sm font-medium">
              {curriculum.jobTitle} • {curriculum.steps[currentStep].title}
            </span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text">
          {curriculum ? "커리큘럼 미션" : "오늘의 학습 미션"}
        </h1>
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

            {/* Ability Rewards Preview */}
            {mission.abilityRewards && Object.keys(mission.abilityRewards).length > 0 && (
              <div className="glass-card p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-semibold text-blue-600 dark:text-blue-400">획득 가능한 능력치</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(mission.abilityRewards).map(([ability, value]) => (
                    <div key={ability} className="px-3 py-1 bg-blue-500/20 rounded-full text-sm font-medium">
                      {ability} +{value}
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                  <p className="text-lg">정말 잘했어요! 학습 기록이 저장되었어요.</p>

                  {/* Ability Gains Display */}
                  {showAbilityGains && mission.abilityRewards && (
                    <div className="glass-card p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                      <h4 className="font-bold text-lg flex items-center mb-3">
                        <BarChart className="h-5 w-5 mr-2" />
                        능력치 상승! ✨
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(mission.abilityRewards).map(([ability, value]) => (
                          <div key={ability} className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                            <span className="font-medium">{ability}</span>
                            <span className="text-green-400 font-bold">+{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <p className="text-sm">마이룸에서 업데이트된 능력치를 확인해보세요! 📊</p>
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
                <RefreshCw className="h-5 w-5 mr-2" />
                {curriculum ? "다음 미션" : "새로운 미션 받기"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

LearnPage.defaultProps = {}
